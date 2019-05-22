import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Header from './header'
import CityAdder from './city-adder';
import ForecastTable from './forecast-table';

import calculateAvg from './utils/calculateAvg';

export default () => {

    const [cities, setCities] = useState([]);

    const onAddCity = data =>{
        const city = {  id: data.city.id,
                        name: data.city.name,
                        temperature: calculateAvg(data.list) }

        if(cities.filter(item => city.id === item.id).length !== 0 ){
            alert("Already on list!");
        }else {
            setCities([...cities, city]);
        }
    }

    const onRemoveCity = (city) => {
        setCities(cities.filter(cityItem=> cityItem.id !== city.id));
    }

    return (
        <>
            <Header />
            <Container>
                <CityAdder onAddCity={onAddCity} />
                <hr />
                <ForecastTable cities={cities} removeForecast={onRemoveCity} />
            </Container>
        </>
    );
}
