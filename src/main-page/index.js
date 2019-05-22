import React from 'react';
import CityAdder from "./city-adder";
import ForecastTable from "./forecast-table";

export default (props) => {
    return (
        <>
            <CityAdder onAddCity={props.onAddCity} />
            <hr />
            <ForecastTable cities={props.cities} removeForecast={props.onRemoveCity} />
        </>
    );
}
