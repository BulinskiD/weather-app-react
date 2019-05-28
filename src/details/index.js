import React, { useState, useEffect } from 'react';

import forecastApi from '../api/forecastApi';

import calculateAvg from '../utils/calculateAvg';
import DataRow from "./data-row";
import LinkButton from "../shared/link-button";

export default (props) => {

    const [cityDetails, setCityDetails] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            const result = await forecastApi.get("", {params: {id: props.match.params.id}})
            setCityDetails(result.data);
            console.log(result.data);
        }
        fetchData();
    }, [props.match.params.id]);


    if(cityDetails.city)
        return (
            <div>
                <h2>{cityDetails.city.name}</h2>
                <hr />
                    <DataRow data={cityDetails.city.coord.lat} title='Szerokość geograficzna'></DataRow>
                    <DataRow data={cityDetails.city.coord.lon} title='Długość geograficzna'></DataRow>
                    <DataRow data={calculateAvg(cityDetails.list)} title='Srednia temperatura'></DataRow>
                <hr />
                <LinkButton path="/">Powrót</LinkButton>
            </div>
        );
    else
        return ''
}
