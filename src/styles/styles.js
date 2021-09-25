import styled from 'styled-components';

export const Container = styled.main`
    display: grid;

    grid-template-rows: 30vh 70vh;

    .leaflet-container {
        width: 100vw;
        height: 100vh;
    }
`;

export const Content = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: url('/images/bg.png') no-repeat center;
    background-size: cover;

    > div {
        h1 {
            text-align: center;
            margin: 2rem;
            font-size: 2rem;
            color: #fff;
            font-weight: 700;
        }
        div {
            display: flex;

            input {
                height: 3.5rem;
                border-radius: 0.8rem 0 0 0.8rem;
                border: none;
                outline: none;
                padding: 1rem;
                width: 350px;
                font-size: 1.1rem;

                &::placeholder {
                    font-size: 1.1rem;
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
        }
    }
`;

export const ContentSearch = styled.section`
    position: absolute;
    top: 320px;
    z-index: 100;
    background-color: #fff;
    border-radius: 0.8rem;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.3);
    padding: 1rem;

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
`;

export const MapContainer = styled.section`
    z-index: 1;
    background-color: #ccc;
`;
