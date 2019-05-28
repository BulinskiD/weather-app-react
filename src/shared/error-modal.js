import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./error-modal.css";

export default (props) => {
    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Wystąpił błąd!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center">{props.children}</div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onClose} variant="danger">Zamknij</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}
