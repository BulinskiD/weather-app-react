import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons'

const ForecastRow = (props) => {

    const onClickHandler = () => {
        props.removeForecast(props.city);
    }

    return (
      <tr>
          <td className="text-center">{props.index}</td>
          <td className="text-center"><Link to={'/details/'+props.city.id}>{props.city.name}</Link></td>
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
    }),
    unit: PropTypes.string
}


export default ForecastRow;
