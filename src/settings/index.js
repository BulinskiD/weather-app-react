import React from 'react';
import LinkButton from '../shared/link-button';
import DataRow from '../details/data-row';
import UnitContext from '../context/unit-context';

export default () =>{
   const radioButtons = (unit, toggleUnit) => {
       return(
           <div onChange={toggleUnit}>
               <div>
                   <input type="radio"id="cel" name="unit" value="metric"
                   />
                   <label htmlFor="cel">Celsjusz</label>
               </div>
               <div>
                   <input type="radio" id="far" name="unit" value="imperial" />
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
                <LinkButton path="/" >Powrót</LinkButton>
            </div>
        )}
    </UnitContext.Consumer>
    );
}
