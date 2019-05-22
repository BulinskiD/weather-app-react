import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default (props) => {
    return (
        <Row className="mx-3 my-4">
            <Col>{props.title}</Col>
            <Col>{props.data}</Col>
        </Row>
    );
}
