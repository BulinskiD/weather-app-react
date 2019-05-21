import React from 'react';
import Table from "react-bootstrap/Table";

import ForecastRow from './forecast-row';

export default () => {

    const mockData = {
        id: 1,
        city: 'Rzeszów',
        temperature: '18C'
    }

    return (
        <Table>
            <thead>
            <tr>
                <th className="text-center">#</th>
                <th className="text-center">Miasto</th>
                <th className="text-center">Srednia prognozowana temperatura</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <ForecastRow {...mockData} />
            </tbody>
        </Table>
    );
}
