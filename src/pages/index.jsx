import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Content, ContentSearch, MapContainer } from '../styles/styles';
import { Container } from '../styles/styles';
import ArrowImg from '../../public/images/arrow.svg';
import Loader from '../components/Loader';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const Home = () => {
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
            console.log('error');
        } finally {
            setLoading(false);
        }
    }
    return (
        <Container>
            <Content>
                <div className="content-search">
                    <h1>IP Address Tracker</h1>

                    <div>
                        <input
                            value={address}
                            type="text"
                            placeholder="Search for any IP address or domain"
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
                                    <h3>IP ADDRESS</h3>
                                    <p>{search.ip}</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>LOCATION</h3>
                                    <p>
                                        {`${search.location.city}, ${search.location.country}`}
                                        <br /> {`${search.location.region}`}
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h3>TIMEZONE</h3>
                                    <p>{search.location.timezone}</p>
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

            <MapContainer>
                <Map />
            </MapContainer>
        </Container>
    );
};

export default Home;
