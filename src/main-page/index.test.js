import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './index';
import {shallow} from "enzyme";


describe('Main page', ()=>{

    const addFn = jest.fn();
    const removeFn = jest.fn();
    const cities = [{id: 1, name: "Sth", temperature: "20.0" }];

    beforeEach(()=>{
        addFn.mockClear();
        removeFn.mockClear();
    });

    it('should render correctly with given props', ()=>{
        const component = shallow(<MainPage onRemoveCity={removeFn} onAddCity={addFn} cities={cities} />);
        expect(component).toMatchSnapshot();
    });
});
