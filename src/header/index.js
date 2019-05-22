import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";

export default () => {
    return (
        <Navbar bg="light" className="my-4 mx-4">
            <Link to="/settings" className="btn btn-primary offset-11 col-1 bg-light text-info">Ustawienia</Link>
        </Navbar>
    );
}
