import React from 'react';
import ReactDOM from 'react-dom';
import ForecastRow from './forecast-row';
import {shallow} from "enzyme";


describe('Forecast row', ()=>{

    const clickFn = jest.fn();
    const city = {id: 1, name: "Sth", temperature: "20.0" };
    const index = 1;
    const unit = 'imperial';

    it('should render correctly with given props', ()=>{
        const component = shallow(<ForecastRow index={index} city={city} unit={unit} onRemoveCity={clickFn} />);
        expect(component).toMatchSnapshot();
    });

    it('should call clickFn 1 times after Button click', ()=>{
        const component = shallow(<ForecastRow index={index} city={city} unit={unit} onRemoveCity={clickFn} />);
        component.find('Button').simulate('click');

        expect(clickFn).toBeCalledTimes(1);
    });
});
