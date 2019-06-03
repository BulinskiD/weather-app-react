import React from 'react';
import {Online, Offline} from "react-detect-offline";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons'

const ForecastRow = (props) => {

    const onClickHandler = () => {
        props.onRemoveCity(props.city);
    }

    return (
      <tr>
          <td className="text-center">{props.index}</td>
          <td className="text-center">
              <Online><Link to={'/details/'+props.city.id}>{props.city.name}</Link></Online>
              <Offline>{props.city.name}</Offline>
          </td>
          <td className="text-center">{props.city.temperature} &#176; {props.unit==='metric' ? 'C' : 'F'}</td>
          <td className="text-center">
              <Button onClick={onClickHandler} className="col-12 bg-light text-danger" variant="danger">
                  <FontAwesomeIcon style={{marginRight: "3%"}} icon={faMinusCircle}/>
                  Usuń
              </Button>
          </td>
      </tr>
    );
}


ForecastRow.propTypes = {
    index: PropTypes.number,
    city: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        temperature: PropTypes.string
    }).isRequired,
    unit: PropTypes.string,
    onRemoveCity: PropTypes.func
}


export default ForecastRow;
