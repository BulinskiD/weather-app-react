import React from 'react';
import Button from "react-bootstrap/Button";

export default (props) => {

    const onClickHandler = () => {
        props.removeForecast(props.city);
    }

    return (
      <tr>
          <td className="text-center">{props.index}</td>
          <td className="text-center">{props.city.name}</td>
          <td className="text-center">{props.city.temperature}</td>
          <td className="text-center">
              <Button onClick={onClickHandler} className="col-12 bg-light text-danger" variant="danger">Usuń</Button>
          </td>
      </tr>
    );
}
