import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from './header'
import CityAdder from './city-adder';
import ForecastTable from './forecast-table';

export default () => {
    return (
        <>
            <Header />
            <Container>
                <CityAdder />
                <hr />
                <ForecastTable />
            </Container>
        </>
    );
}
