import styled from 'styled-components';

export const Container = styled.main`
    display: grid;

    grid-template-rows: 2.5fr 4fr;
    width: 100vw;
    height: 100vh;

    .leaflet-container {
        width: 100vw;
        height: 100vh;
    }
`;

export const Content = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    background: url('/images/bg.png') no-repeat center;
    background-size: cover;

    > div {
        h1 {
            margin-top: 25%;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2rem;
            color: #fff;
            font-weight: 700;
        }
        div {
            display: flex;
            justify-content: center;

            input {
                height: 3.5rem;
                border-radius: 0.8rem 0 0 0.8rem;
                border: none;
                outline: none;
                padding: 1rem;
                width: 350px;
                font-size: 1.1rem;

                &::placeholder {
                    font-size: 1rem;
                    color: #969696;
                }
            }

            button {
                height: 3.5rem;
                border: none;
                width: 60px;
                border-radius: 0 0.8rem 0.8rem 0;
                background: #000;
                cursor: pointer;
            }
            @media (max-width: 600px) {
                input {
                    width: calc(90vw - 4rem);
                    &::placeholder {
                        font-size: 0.7rem;
                    }
                }
            }
        }
        @media (max-width: 1150px) {
            h1 {
                font-size: 1.3rem;
                margin-top: 10%;
            }
        }
    }
`;

export const ContentSearch = styled.section`
    position: absolute;
    bottom: -100px;
    z-index: 100;
    background-color: #fff;
    border-radius: 0.8rem;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.3);
    padding: 1rem;
    margin: 1rem;

    h3 {
        font-size: 1rem;
        color: #969696;
        margin-bottom: 1rem;
    }
    p {
        color: #2b2b2b;
        font-weight: 700;
        font-size: 1.5rem;
    }

    ul {
        display: flex;
        list-style: none;
        padding: 2rem;
    }

    li + li {
        position: relative;
        margin-left: 3rem;

        div {
            padding-left: 3rem;
        }
        &:before {
            content: '';
            display: inline-block;
            width: 2px;
            height: 60px;
            background-color: #cfcfcf;
            position: absolute;
            top: 20%;
        }
    }
    @media (max-width: 1335px) {
        bottom: -95px;
        h3 {
            font-size: 1rem;
        }

        p {
            font-size: 1.3rem;
        }
        div {
            padding-left: 0;
        }
        li + li {
            margin-left: 0;
            div {
                padding-left: 1rem;
            }
        }
    }

    @media (max-width: 1210px) {
        bottom: -85px;

        li + li {
            div {
                padding-left: 0.5rem;
            }
        }
    }
    @media (max-width: 840px) {
        text-align: center;
        bottom: -200px;
        display: flex;
        width: 90vw;
        ul {
            flex-direction: column;
            align-items: center;
            padding: 0.5rem;
            width: 100%;
        }
        li + li {
            &:before {
                display: none;
            }
        }
    }
    @media (max-width: 600px) {
        bottom: -200px;
        h3 {
            font-size: 0.7rem;
            color: #969696;
            margin-bottom: 1rem;
        }
        p {
            color: #2b2b2b;
            font-weight: 700;
            font-size: 0.9rem;
        }
    }
`;

export const MapContainer = styled.section`
    z-index: 1;
    background-color: #ccc;
    width: 100%;

    pointer-events: ${(props) => (props.loading ? 'none' : 'auto')};

    .leaflet-top {
        top: initial;
        bottom: 1rem;
    }
`;
