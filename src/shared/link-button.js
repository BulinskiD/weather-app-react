import React from 'react'
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const LinkButton = (props) => {
    return (
        <Link to={props.path} className="btn btn-primary offset-lg-10 col-lg-2 offset-0 col-6 bg-light text-info">{props.children}</Link>
    );
}

LinkButton.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ])
}

export default LinkButton;
