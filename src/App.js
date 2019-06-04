import 'bootstrap/dist/css/bootstrap.css';

import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import forecastApi from './api/forecastApi';

import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import Header from './header'
import MainPage from './main-page/index';
import Settings from './settings';
import Details from './details';
import UnitContext from './context/unit-context';
import LoadingContext from './context/loading-context';
import calculateAvg from './utils/calculateAvg';
import ErrorModal from "./shared/error-modal";
import handleError from "./utils/handleError";

export default () => {
    const storage = window.localStorage;

    //State for unit context
    const [unit, changeUnit] = useState("metric");

    //Cities state
    const [cities, setCities] = useState([]);

    //Error state
    const [error, setError] = useState(null);

    //Loading state
    const [loading, setLoading] = useState("true");

    /**** Units methods ****/

    const toggleUnit = () => {
        if(navigator.onLine) {
            const unitParam = unit === "metric" ? "imperial" : "metric";
            localStorage.setItem("unit", unitParam);
            changeUnit(unitParam);
            refreshCitiesTemperatureAndSetState(unitParam, cities, setCities, setError, setLoading);
        } else {
            setError("Zmiana jednostki niemożliwa w trybie offline! Spróbuj później")
        }
    }

    const checkUnit = () => {
        let unitParam = storage.getItem("unit");
        //If unit param is set in localStorage, set in in state, else use default value
        if(unitParam)
            changeUnit(unitParam);
        else
            unitParam = unit;

        return unitParam;
    }

    /**** On component mount ****/

    useEffect(() => {
        //Get cities from localStorage, and store them in state
            const citiesFromStorage = JSON.parse(storage.getItem("cities"));
            const unitParam = checkUnit();

            //If online refresh temperatures on page load else if offline set cities from localStorage if available
            if(citiesFromStorage && navigator.onLine)
                refreshCitiesTemperatureAndSetState(unitParam, citiesFromStorage, setCities, setError, setLoading);
            else if (citiesFromStorage && !navigator.onLine) {
                setCities(citiesFromStorage);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        },
        // eslint-disable-next-line
        []);

    /**** Cities methods ****/

    const onAddCity = async city =>{
        setLoading(true);
        try {
            const {data} = await forecastApi.get('', {params: {q: city, units: unit}});
            const newCity = {  id: data.city.id, name: data.city.name, temperature: calculateAvg(data.list) }
            if(cities.filter(item => newCity.id === item.id).length !== 0 ){
                setError("Miasto znajduje się już na liście!");
            } else {
                setCities([...cities, newCity]);
                //Should be placed in effect return function?
                storage.setItem("cities", JSON.stringify([...cities, newCity]));
            }
        } catch(error) {
            setError(handleError(error, setLoading));
        }

        setLoading(false);
    }

    const onRemoveCity = (city) => {
        setCities(cities.filter(cityItem=> cityItem.id !== city.id));
        //Should be placed in effect return function?
        storage.setItem("cities", JSON.stringify(cities.filter(cityItem=> cityItem.id !== city.id)));
    }

    return (
            <BrowserRouter>
                <LoadingContext.Provider value={{loading}}>
                    <UnitContext.Provider value={{unit, toggleUnit}}>

                        <Header />

                        <Container>
                            <Route path="/" exact component={() => <MainPage onRemoveCity={onRemoveCity} onAddCity={onAddCity} cities={cities} />}></Route>
                            <Route path="/settings" component={Settings} />
                            <Route path="/details/:id" component={(props) => <Details {...props} unit={unit} />} />
                        </Container>

                        {ReactDOM.createPortal(<ErrorModal show={error ? true : false} onClose={() => setError(null)}>{error}</ErrorModal>,
                            document.getElementById("root"))}

                    </UnitContext.Provider>
                </LoadingContext.Provider>
            </BrowserRouter>
    );
}

