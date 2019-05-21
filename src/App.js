import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Header from './header'
import CityAdder from './city-adder';
import ForecastTable from './forecast-table';

export default () => {

    const [cities, addCity] = useState([]);

    const onAddCity = async (data) =>{
        console.log(data);
        const city = {  id: data.city.id,
                        name: data.city.name,
                        temperature: 18 }

        await addCity([...cities, city]);
    }

    return (
        <>
            <Header />
            <Container>
                <CityAdder onAddCity={onAddCity} />
                <hr />
                <ForecastTable cities={cities} />
            </Container>
        </>
    );
}
