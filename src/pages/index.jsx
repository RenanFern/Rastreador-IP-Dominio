import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { isMobile } from 'react-device-detect';

import {
    Container,
    Content,
    ContentSearch,
    MapContainer,
} from '../styles/styles';
import ArrowImg from '../../public/images/arrow.svg';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Head from 'next/head';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const [search, setSearch] = useState({});
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getSearch() {
            try {
                setLoading(true);
                await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`)
                    .then((response) => response.json())
                    .then((data) => setSearch(data));
            } catch (error) {
                console.log('error');
            } finally {
                setLoading(false);
            }
        }
        getSearch();
    }, []);

    useEffect(() => {
        toast.warn('Desative o ADBlock para funcionar corretamente', {
            autoClose: '5000',
        });
    }, []);

    useEffect(() => {
        function App() {
            if (isMobile) {
                return toast.warn(
                    'Ligue o GPS para a localização funcionar corretamente',
                    {
                        autoClose: '5000',
                    }
                );
            }
        }
        App();
    }, []);

    async function handleGetAddress() {
        if (!address) return;

        try {
            setLoading(true);

            if (
                /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                    address
                )
            ) {
                await fetch(
                    `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${address}`
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => setSearch(data));
            } else {
                await fetch(
                    ` https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${address}`
                )
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setSearch(data);
                    });
            }
        } catch (error) {
            toast.error(
                'Ocorreu um error ao pesquisar por esse IP ou domínio! Tente novamente'
            );
        } finally {
            setLoading(false);
        }
    }

    const defaultPosition = [-20.32211, -40.340558];

    return (
        <Container>
            <Head>
                <title>
                    Rastreador de IP - Procure seu endereço de ip ou domínio
                </title>
            </Head>
            <Content search={search.location}>
                <div className="content-search">
                    <h1>Rastreador de endereço IP</h1>

                    <div>
                        <input
                            value={address}
                            type="text"
                            placeholder="Pesquise qualquer endereço IP ou domínio"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <button disabled={!!loading} onClick={handleGetAddress}>
                            {loading ? <Loader /> : <ArrowImg />}
                        </button>
                    </div>
                </div>

                {search?.location && (
                    <ContentSearch>
                        <ul>
                            <li>
                                <div>
                                    <h3>ENDEREÇO ​​DE IP</h3>
                                    <p>{search.ip}</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>LOCALIZAÇÃO</h3>
                                    <p>
                                        {`${search.location.city}, ${search.location.country}`}
                                        <br /> {`${search.location.region}`}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>FUSO HORÁRIO</h3>
                                    <p>UTC {search.location.timezone}</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>ISP</h3>
                                    <p>{search.isp}</p>
                                </div>
                            </li>
                        </ul>
                    </ContentSearch>
                )}
            </Content>

            <MapContainer loading={loading}>
                <Map
                    defaultPosition={defaultPosition}
                    location={
                        search.location
                            ? [search.location.lat, search.location.lng]
                            : defaultPosition
                    }
                />
            </MapContainer>
        </Container>
    );
};

export default Home;
