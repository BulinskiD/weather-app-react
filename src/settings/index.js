import React from 'react';
import LinkButton from '../shared/link-button';
import DataRow from '../details/data-row';
import UnitContext from '../context/unit-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'

export default () =>{
   const radioButtons = (unit, toggleUnit) => {
       return(
           /** ASK ABOUT IT **/
           <div onChange={toggleUnit}>
               <div>
                   <input type="radio"id="cel" name="unit" value="metric" onChange={() => {}} checked={unit === "metric"} />
                   <label htmlFor="cel">Celsjusz</label>
               </div>
               <div>
                   <input type="radio" id="far" name="unit" value="imperial" onChange={() => {}}checked={unit === "imperial"} />
                   <label htmlFor="far">Fahrenheit</label>
               </div>
           </div>);
        }


return (
    <UnitContext.Consumer>
        {({unit, toggleUnit}) => (
            <div>
                <h2>Ustawienia</h2>
                <hr />
                <DataRow title="Jednostka" data={radioButtons(unit, toggleUnit)} />
                <hr />
                <LinkButton path="/">
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>
                    Powrót
                </LinkButton>
            </div>
        )}
    </UnitContext.Consumer>
    );
}
