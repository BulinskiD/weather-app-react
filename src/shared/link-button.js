import React from 'react'
import {Link} from "react-router-dom";

export default (props) => {
    return (
        <Link to={props.path} className="btn btn-primary offset-11 col-1 bg-light text-info">{props.children}</Link>
    );
}
