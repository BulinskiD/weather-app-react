import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
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
import setCities from "./hooks/city-hook";

export default () => {

    const [loading, unit, toggleUnit, onAddCity, onRemoveCity, cities, error, setError] = setCities();


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

