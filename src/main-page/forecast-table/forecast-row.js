import React from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export default (props) => {

    const onClickHandler = () => {
        props.removeForecast(props.city);
    }

    return (
      <tr>
          <td className="text-center">{props.index}</td>
          <td className="text-center"><Link to={'/details/'+props.city.id}>{props.city.name}</Link></td>
          <td className="text-center">{props.city.temperature} &#176; {props.unit==='metric' ? 'C' : 'F'}</td>
          <td className="text-center">
              <Button onClick={onClickHandler} className="col-12 bg-light text-danger" variant="danger">Usuń</Button>
          </td>
      </tr>
    );
}
