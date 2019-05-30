import React, {useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default (props) => {

    const [city, setCity] = useState('');

    const onAddCityHandler = async (e) => {
        e.preventDefault();
        if(city.length >= 3) {
            props.onAddCity(city);
            setCity("");
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
        </form>
    );
}
