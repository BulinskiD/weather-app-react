import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import forecastApi from '../../api/forecastApi';
import ErrorModal from '../../shared/error-modal';
import * as ReactDOM from "react-dom";
import handleError from "../../utils/handleError";

export default (props) => {

    const [city, setCity] = useState('');
    const [error, setError] = useState(null);

    const onAddCityHandler = async (e) => {
        e.preventDefault();
        if(city.length >= 3) {
            try {
                const response = await forecastApi.get('', {params: {q: city, units: props.unit}});
                props.onAddCity(response.data);
                setCity('');
            } catch (error) {
                setError(handleError(error));
                setCity("");
            }
        }
    };

    return (
        <form onSubmit={onAddCityHandler}>
        <Row className="mx-4">
        <InputGroup>
            <FormControl
                className="col-8"
                placeholder="Nazwa miasta"
                aria-label="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" className="offset-1 col-3" variant="primary">Dodaj</Button>
        </InputGroup>
        </Row>
            {ReactDOM.createPortal(<ErrorModal show={error ? true : false} onClose={() => setError(null)}>{error}</ErrorModal>, document.getElementById("root"))}
        </form>
    );
}
