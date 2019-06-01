import React from 'react';
import UnitContext from '../context/unit-context';
import CityAdder from "./city-adder";
import ForecastTable from "./forecast-table";
import PropTypes from "prop-types";

const MainPage = (props) => {
    return (
            <UnitContext.Consumer>
                {({unit}) => (
                    <>
                    <CityAdder unit={unit} onAddCity={props.onAddCity}/>
                    <hr />
                    <ForecastTable cities={props.cities} unit={unit} onRemoveCity={props.onRemoveCity} />
                    </>
                    )}
            </UnitContext.Consumer>
    );
}

MainPage.propTypes = {
    onRemoveCity: PropTypes.func,
    onAddCity: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        temperature: PropTypes.number
    }))
}

export default MainPage;
