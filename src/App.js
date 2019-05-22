import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Header from './header'
import MainPage from './main-page/index';
import Settings from './settings';
import Details from './details';


import calculateAvg from './utils/calculateAvg';
import {BrowserRouter, Route} from "react-router-dom";

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
            <BrowserRouter>
            <Header />
            <Container>
                <Route path="/" exact component={() => <MainPage onRemoveCity={onRemoveCity} onAddCity={onAddCity} cities={cities} />}></Route>
                <Route path="/settings" component={Settings} />
                <Route path="/details" component={Details} />
            </Container>
            </BrowserRouter>
    );
}
