import 'bootstrap/dist/css/bootstrap.css';

import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Header from './header'
import MainPage from './main-page/index';
import Settings from './settings';
import Details from './details';
import UnitContext from './context/unit-context';
import calculateAvg from './utils/calculateAvg';

export default () => {
    const storage = window.localStorage;

    //State for unit context
    const [unit, changeUnit] = useState("metric");

    //TODO Refresh temperatures when unit changes
    const toggleUnit = () => {
        const unitParam = unit === "metric" ? "imperial" : "metric";
        changeUnit(unitParam);
    }

    //Cities state
    const [cities, setCities] = useState([]);

    useEffect(() => {
        //Get cities from localStorage, and store them in state
        setCities(JSON.parse(storage.getItem("cities")));
        },
        // eslint-disable-next-line
        []);

    const onAddCity = data =>{
        const city = {  id: data.city.id,
                        name: data.city.name,
                        temperature: calculateAvg(data.list) }

        if(cities.filter(item => city.id === item.id).length !== 0 ){
            alert("Already on list!");
        }else {
            setCities([...cities, city]);
            //Store stringified array in localStorage
            //Should be placed in effect return function?
            storage.setItem("cities", JSON.stringify([...cities, city]));
        }
    }

    const onRemoveCity = (city) => {
        setCities(cities.filter(cityItem=> cityItem.id !== city.id));
        //Store stringified array in localStorage
        //Should be placed in effect return function?
        storage.setItem("cities", JSON.stringify(cities.filter(cityItem=> cityItem.id !== city.id)));
    }

    return (
            <BrowserRouter>
                <UnitContext.Provider value={{unit, toggleUnit}}>
                    <Header />
                    <Container>
                        <Route path="/" exact component={() => <MainPage onRemoveCity={onRemoveCity} onAddCity={onAddCity} cities={cities} />}></Route>
                        <Route path="/settings" component={Settings} />
                        <Route path="/details/:id" component={Details} />
                    </Container>
                </UnitContext.Provider>
            </BrowserRouter>
    );
}
