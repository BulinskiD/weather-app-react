import React from 'react';
import Button from "react-bootstrap/Button";

export default (props) => {
    return (
      <tr>
          <td className="text-center">{props.index}</td>
          <td className="text-center">{props.name}</td>
          <td className="text-center">{props.temperature}</td>
          <td className="text-center"><Button className="col-12 bg-light text-danger" variant="danger">Usuń</Button></td>
      </tr>
    );
}
