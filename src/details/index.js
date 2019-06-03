import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {faArrowCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import handleError from '../utils/handleError';
import forecastApi from '../api/forecastApi';
import calculateAvg from '../utils/calculateAvg';
import DataRow from "./data-row";
import LinkButton from "../shared/link-button";
import ErrorModal from "../shared/error-modal";

const Details = (props) => {

    const [cityDetails, setCityDetails] = useState({});
    const [unitString, setUnitString] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await forecastApi.get("", {params: {id: props.match.params.id, units: props.unit}})
                setCityDetails(result.data);
                const unitSymbol = props.unit === 'metric' ? " C" : " F"
                setUnitString(unitSymbol);
            } catch(err) {
                setError(handleError(err, ()=>{}));
            }
        }
        fetchData();
    }, [props.match.params.id, props.unit]);
    
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
                {ReactDOM.createPortal(<ErrorModal show={error ? true : false} onClose={() => setError(null)}>{error}</ErrorModal>, document.getElementById("root"))}

            </div>
        );
    else
        return ''
}


Details.propTypes = {
    unit: PropTypes.string
}

export default Details;
