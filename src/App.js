import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from './header'
import CityAdder from './city-adder';

export default () => {
    return (
        <>
            <Header />
            <Container>
                <CityAdder />
            </Container>
        </>
    );
}
