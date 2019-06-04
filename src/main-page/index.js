import React from 'react';
import { Online, Offline } from "react-detect-offline";
import CityAdder from "./city-adder";
import ForecastTable from "./forecast-table";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

const MainPage = (props) => {
    return (
        <>
            <Online>
                <CityAdder unit={props.unit} onAddCity={props.onAddCity}/>
            </Online>
            <Offline>
                <Alert variant="warning">Dodawanie nowych miast niemożliwe w trybie offline!</Alert>
            </Offline>
            <hr />
            <ForecastTable cities={props.cities} unit={props.unit} onRemoveCity={props.onRemoveCity} />
        </>
    );
}

MainPage.propTypes = {
    onRemoveCity: PropTypes.func,
    onAddCity: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        temperature: PropTypes.string
    }))
}

export default MainPage;
