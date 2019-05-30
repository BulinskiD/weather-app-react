import React from 'react';
import Table from "react-bootstrap/Table";

import ForecastRow from './forecast-row';

export default (props) => {

    const renderCities = () => {
            return props.cities.map((city, index) => <ForecastRow removeForecast={props.removeForecast}
                                                                  city = {city}
                                                                  index = {index+1}
                                                                  unit = {props.unit}
                                                                  key = {city.id} /> );
    }

    return (
        <Table>
            <thead>
            <tr>
                <th className="text-center">#</th>
                <th className="text-center">Miasto</th>
                <th className="text-center">Srednia prognozowana temperatura</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {renderCities()}
            </tbody>
        </Table>
    );
}
