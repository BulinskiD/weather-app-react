import React from 'react';
import PropTypes from 'prop-types';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DataRow = (props) => {
    return (
        <Row className="mx-3 my-4">
            <Col>{props.title}</Col>
            <Col>{props.data}</Col>
        </Row>
    );
}

DataRow.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element
    ]).isRequired
}

export default DataRow;
