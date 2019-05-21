import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default () => {
    return (
        <Row className="mx-4">
        <InputGroup>
            <FormControl
                className="col-8"
                placeholder="Nazwa miasta"
                aria-label="city"
                aria-describedby="basic-addon1"
            />
            <Button className="offset-1 col-3" variant="primary"> Dodaj</Button>
        </InputGroup>
        </Row>
    );
}
