import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import LinkButton from "../shared/link-button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default () => {
    return (
        <Navbar bg="light" className="my-4 mx-4">
            <LinkButton className="d-flex justify-content-around" path="/settings">
                <FontAwesomeIcon style={{marginRight: "3%"}} icon={faCog}/>
                <span>Ustawienia</span>
            </LinkButton>
        </Navbar>
    );
}
