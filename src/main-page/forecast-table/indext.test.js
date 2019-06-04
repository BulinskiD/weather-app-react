import React from 'react';
import ForecastTable from './index';
import {mount, shallow} from "enzyme";
import {StaticRouter} from "react-router-dom";
import LoadingContext from "../../context/loading-context";


const onRemoveCity = jest.fn();
const cities = [{id: 1, name: "Gorlice", temperature: "20.00"}, {id: 2, name: "Gorlice", temperature: "20.00"}];
let unit = "imperial";
let loading = true;

const props = {onRemoveCity, cities, unit}

beforeEach(()=>{
    onRemoveCity.mockClear();
});

describe('ForecastTable', ()=>{

    it('should display loading component when loading is true', ()=>{
        const component = mount(<StaticRouter><LoadingContext.Provider value={{loading}}><ForecastTable {...props} /></LoadingContext.Provider></StaticRouter>);
        expect(component).toMatchSnapshot();
    });

    it('should display table when loading is false', ()=>{
        loading = false;
        const component = mount(<StaticRouter><LoadingContext.Provider value={{loading}}><ForecastTable {...props} /></LoadingContext.Provider></StaticRouter>);
        expect(component).toMatchSnapshot();
    });

    it('should display cities from props as table rows', ()=>{
        loading = false;
        const component = mount(<StaticRouter><LoadingContext.Provider value={{loading}}><ForecastTable {...props} /></LoadingContext.Provider></StaticRouter>);
        expect(component.find("tbody ForecastRow").length).toBe(cities.length);
    });

});
