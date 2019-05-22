import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import LinkButton from "../shared/link-button";

export default () => {
    return (
        <Navbar bg="light" className="my-4 mx-4">
            <LinkButton path="/settings" >Ustawienia</LinkButton>
        </Navbar>
    );
}
