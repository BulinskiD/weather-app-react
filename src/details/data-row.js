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
    title: PropTypes.string,
    data: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element
    ])
}

export default DataRow;
