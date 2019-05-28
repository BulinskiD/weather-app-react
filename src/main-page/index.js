import React from 'react';
import UnitContext from '../context/unit-context';
import CityAdder from "./city-adder";
import ForecastTable from "./forecast-table";

export default (props) => {
    return (
        <>
            <UnitContext.Consumer>
                {({unit}) => (
                    <CityAdder unit={unit} onAddCity={props.onAddCity}/>
                    )}
            </UnitContext.Consumer>
            <hr />
            <ForecastTable cities={props.cities} removeForecast={props.onRemoveCity} />
        </>
    );
}
