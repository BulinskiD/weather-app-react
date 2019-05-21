import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

export default () => {
    return (
        <Navbar bg="light" className="my-4 mx-4">
            <Button className="offset-11 col-1 bg-light text-info">Ustawienia</Button>
        </Navbar>
    );
}
