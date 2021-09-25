import React from 'react';
import dynamic from 'next/dynamic';
import { Content, ContentSearch, MapContainer } from '../styles/styles';
import { Container } from '../styles/styles';
import ArrowImg from '../../public/images/arrow.svg';

// const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
    return (
        <Container>
            <Content>
                <div className="content-search">
                    <h1>IP Address Tracker</h1>

                    <div>
                        <input
                            type="text"
                            placeholder="Search for any IP address or domain"
                        />
                        <button>
                            <ArrowImg />
                        </button>
                    </div>
                </div>

                <ContentSearch>
                    <ul>
                        <li>
                            <div>
                                <h3>IP ADDRESS</h3>
                                <p>192.168.160.100</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>LOCATION</h3>
                                <p>Brooklyn, NY 10001</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>TIMEZONE</h3>
                                <p>UTC-5:00</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h3>ISP</h3>
                                <p>
                                    SpaceX <br /> Starlink
                                </p>
                            </div>
                        </li>
                    </ul>
                </ContentSearch>
            </Content>

            <MapContainer></MapContainer>
        </Container>
    );
};

export default Home;
