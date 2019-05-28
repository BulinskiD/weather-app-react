import React from 'react';
import LinkButton from '../shared/link-button';
import DataRow from '../details/data-row';

export default () =>{
   const radioButtons = (
           <div onChange={(e)=>console.log(e.target.value)}>
               <div>
                   <input type="radio"id="cel" name="unit" value="cel"
                          />
                       <label htmlFor="cel">Celsjusz</label>
               </div>
               <div>
                   <input type="radio" id="far" name="unit" value="far" />
                       <label htmlFor="far">Fahrenheit</label>
               </div>
           </div>);


return (
        <div>
            <h2>Ustawienia</h2>
            <hr />
            <DataRow title="Jednostka" data={radioButtons} />
            <hr />
            <LinkButton path="/" >Powrót</LinkButton>
        </div>
    );
}
