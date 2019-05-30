import React, { useState, useEffect } from 'react';

import forecastApi from '../api/forecastApi';

import calculateAvg from '../utils/calculateAvg';
import DataRow from "./data-row";
import LinkButton from "../shared/link-button";
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default (props) => {

    const [cityDetails, setCityDetails] = useState({});
    const [unitString, setUnitString] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await forecastApi.get("", {params: {id: props.match.params.id, units: props.unit}})
            setCityDetails(result.data);
            const unitSymbol =props.unit==='metric' ? " C" : " F"
            setUnitString(unitSymbol);
        }
        fetchData();
    }, [props.match.params.id, props.unit]);


    //TODO Add context for temperature unit
    if(cityDetails.city)
        return (
            <div>
                <h2>{cityDetails.city.name}</h2>
                <hr />
                    <DataRow data={cityDetails.city.coord.lat} title='Szerokość geograficzna'></DataRow>
                    <DataRow data={cityDetails.city.coord.lon} title='Długość geograficzna'></DataRow>
                    <DataRow data={calculateAvg(cityDetails.list) + unitString} title='Srednia temperatura'></DataRow>
                <hr />
                <LinkButton path="/">
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>Powrót
                </LinkButton>
            </div>
        );
    else
        return ''
}
