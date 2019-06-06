import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Header from './header'
import MainPage from './main-page/index';
import Settings from './settings';
import Details from './details';
import UnitContext from './context/unit-context';
import LoadingContext from './context/loading-context';
import ErrorModal from "./shared/error-modal";
import useCities from "./hooks/city-hook";
import useUnit from "./hooks/unit-hook";
import checkUnit from "./utils/checkUnit";
import refreshCitiesTemperatureAndSetState from "./utils/refreshCitiesTemperatureAndSetState";

export default () => {

    const [loading, setLoading, onAddCity, onRemoveCity, cities, setCities, error, setError] = useCities();
    const [unit, toggleUnit, setUnit] = useUnit();

    /**** On load ****/
    useEffect(() => {
            /**** Get cities and unit from localStorage ****/
            const citiesFromStorage = JSON.parse(localStorage.getItem("cities"));
            const unitParam = checkUnit(unit, setUnit);

            /**** If online refresh temperatures on page load else if offline set cities from localStorage if available ****/
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

    /**** Refresh cities on unit change ****/
    useEffect( ()=>{
            if(cities.length !== 0) {
                refreshCitiesTemperatureAndSetState(unit, cities, setCities, setError, setLoading);
            }
        }, // eslint-disable-next-line
        [unit]);


    /**** Render content ****/
    return (
            <BrowserRouter>
                <LoadingContext.Provider value={{loading}}>
                    <UnitContext.Provider value={{unit, toggleUnit}}>
                        <Header />
                        <Container>
                            <Route path="/" exact component={() => <MainPage onRemoveCity={onRemoveCity} unit={unit} onAddCity={onAddCity} cities={cities} />}></Route>
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

