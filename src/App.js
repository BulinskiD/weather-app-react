import 'bootstrap/dist/css/bootstrap.css';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import Header from './header'
import MainPage from './main-page/index';
import Settings from './settings';
import Details from './details';
import UnitContext from './context/unit-context';
import calculateAvg from './utils/calculateAvg';
import ErrorModal from "./shared/error-modal";

export default () => {
    const storage = window.localStorage;

    //State for unit context
    const [unit, changeUnit] = useState("metric");

    //Cities state
    const [cities, setCities] = useState([]);

    //Error state
    const [error, setError] = useState(null);

    const toggleUnit = () => {
        const unitParam = unit === "metric" ? "imperial" : "metric";
        localStorage.setItem("unit", unitParam);
        changeUnit(unitParam);
        refreshCitiesTemperatureAndSetState(unitParam, cities, setCities, setError);
    }


    useEffect(() => {
        //Get cities from localStorage, and store them in state
            const citiesFromStorage = JSON.parse(storage.getItem("cities"));
            let unitParam = storage.getItem("unit");

            //If unit param is set in localStorage, set in in state, else use default value
            if(unitParam)
                changeUnit(unitParam);
            else
                unitParam = unit;

            if(citiesFromStorage)
                refreshCitiesTemperatureAndSetState(unitParam, citiesFromStorage, setCities, setError);
        },
        // eslint-disable-next-line
        []);

    const onAddCity = data =>{
        const city = {  id: data.city.id,
                        name: data.city.name,
                        temperature: calculateAvg(data.list) }
        if(cities.filter(item => city.id === item.id).length !== 0 ){
            setError("Miasto znajduje się już na liście!");
        } else {
            setCities([...cities, city]);
            //Should be placed in effect return function?
            storage.setItem("cities", JSON.stringify([...cities, city]));
        }
    }

    const onRemoveCity = (city) => {
        setCities(cities.filter(cityItem=> cityItem.id !== city.id));

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
                    {ReactDOM.createPortal(<ErrorModal show={error ? true : false} onClose={() => setError(null)}>{error}</ErrorModal>, document.getElementById("root"))}
                </UnitContext.Provider>
            </BrowserRouter>
    );
}
