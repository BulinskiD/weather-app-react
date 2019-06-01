import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ErrorModal =  (props) => {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header>
                <Modal.Title>Wystąpił błąd!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center">{props.children}</div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onClose} variant="danger">Zamknij</Button>
            </Modal.Footer>
        </Modal>
    );
}

ErrorModal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.string
}


export default ErrorModal;
