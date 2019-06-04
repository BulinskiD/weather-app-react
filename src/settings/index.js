import React from 'react';
import {Online, Offline} from "react-detect-offline";
import LinkButton from '../shared/link-button';
import DataRow from '../details/data-row';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'

import UnitContext from '../context/unit-context';

export default () => {
    const radioButtons = (unit, toggleUnit) => {
        return (
            <>
                <Online>
                    <div className="radios-container">
                        <div className="radios">
                            <input type="radio" id="cel" name="unit" value="metric" onChange={toggleUnit} checked={unit === "metric"}/>
                            <label htmlFor="cel">Celsjusz</label>
                        </div>
                        <div className="radios">
                            <input type="radio" id="far" name="unit" value="imperial" onChange={toggleUnit} checked={unit === "imperial"}/>
                            <label htmlFor="far">Fahrenheit</label>
                        </div>
                    </div>
                </Online>
                <Offline>
                    {unit === "metric" ? "Celsjusz" : "Fahrenheit"}
                </Offline>
            </>);
    }


    return (
        <UnitContext.Consumer>
            {({unit, toggleUnit}) => (
                <div>
                    <h2>Ustawienia</h2>
                    <hr/>
                    <DataRow title="Jednostka" data={radioButtons(unit, toggleUnit)}/>
                    <hr/>
                    <LinkButton path="/">
                        <FontAwesomeIcon icon={faArrowCircleLeft}/>
                        Powrót
                    </LinkButton>
                </div>
            )}
        </UnitContext.Consumer>
    );
}
