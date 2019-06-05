import React, {useState} from 'react';
import PropTypes from 'prop-types';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearchPlus, faSpinner} from '@fortawesome/free-solid-svg-icons'
import LoadingContext from "../../context/loading-context";

const CityAdder = (props) => {

    const [city, setCity] = useState('');

    const onAddCityHandler = e => {
        e.preventDefault();
        if(city.length >= 3) {
            props.onAddCity(city, props.unit);
            setCity("");
        }
    };

    return (
        <form onSubmit={onAddCityHandler}>
            <Row className="mx-4">
                <InputGroup>
                    <FormControl
                        className="col-lg-8 col-12"
                        placeholder="Nazwa miasta"
                        aria-label="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                <Button type="submit" className="offset-lg-1 col-lg-3 offset-0 col-12 my-3 my-lg-0" variant="primary">
                    <LoadingContext.Consumer>
                        {({loading}) => {
                            return loading ? <FontAwesomeIcon className="fa-spin" style={{marginRight: "3%"}} icon={faSpinner}/> : <FontAwesomeIcon style={{marginRight: "3%"}} icon={faSearchPlus}/>
                        }}
                    </LoadingContext.Consumer>
                    Dodaj
                </Button>
                </InputGroup>
            </Row>
        </form>
    );
}

CityAdder.propTypes = {
    unit: PropTypes.string,
    onAddCity: PropTypes.func
};

export default CityAdder;
