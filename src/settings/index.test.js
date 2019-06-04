import React from 'react';
import Settings from './index';
import {mount, shallow} from "enzyme";
import {StaticRouter} from "react-router-dom";
import UnitContext from '../context/unit-context';


let unit = "imperial";
const toggleUnit = jest.fn();

beforeEach(()=>{
    toggleUnit.mockClear();
});

describe('Settings', ()=>{

    it('should match snapshot', ()=>{
        const component = mount(<StaticRouter><UnitContext.Provider value={{unit, toggleUnit}}><Settings /></UnitContext.Provider></StaticRouter>);
        expect(component).toMatchSnapshot();
    });

    it('should invoke toggleUnit on #cel change', ()=>{
        const component = mount(<StaticRouter><UnitContext.Provider value={{unit, toggleUnit}}><Settings /></UnitContext.Provider></StaticRouter>);
        component.find("#cel").props().onChange();

        expect(toggleUnit).toBeCalledTimes(1);
    });

    it('should invoke toggleUnit on #far change', ()=>{
        const component = mount(<StaticRouter><UnitContext.Provider value={{unit, toggleUnit}}><Settings /></UnitContext.Provider></StaticRouter>);
        component.find("#far").props().onChange();

        expect(component).toMatchSnapshot();
        expect(toggleUnit).toBeCalledTimes(1);
    });

    it('should check #far when unit === imperial', ()=>{
        unit = 'imperial';
        const component = mount(<StaticRouter><UnitContext.Provider value={{unit, toggleUnit}}><Settings /></UnitContext.Provider></StaticRouter>);
        expect(component.find("#far").props().checked).toBeTruthy();
        expect(component.find("#cel").props().checked).toBeFalsy();
    });

    it('should check #cel when unit === metric', ()=>{
        unit = 'metric';
        const component = mount(<StaticRouter><UnitContext.Provider value={{unit, toggleUnit}}><Settings /></UnitContext.Provider></StaticRouter>);
        expect(component.find("#far").props().checked).toBeFalsy();
        expect(component.find("#cel").props().checked).toBeTruthy();
    });
});
