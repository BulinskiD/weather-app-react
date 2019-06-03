import React from 'react';
import mockAxios from 'jest-mock-axios';
import Details from './index';
import {mount} from "enzyme";


describe('Details', ()=>{

    afterEach(()=>{
        mockAxios.reset();
    });

    const id = {match: {params:{id: 1}}};
    const unit = "imperial";

    const axiosResponseOK = {city: {coord: {lat: 1, lon: 1}}, list: []};
    const axiosResponseError = {city: {coord: {lat: 1, lon: 1}}, list: []};

    it('should call axios on load', ()=>{
        const component = mount(<Details {...id} unit={unit} />);
        mockAxios.mockResponse(axiosResponseOK);

        expect(mockAxios.get).toBeCalledTimes(1);
        expect(component).toMatchSnapshot();
    });

    it('should call handleError on error response from axios', ()=>{
        const component = mount(<Details {...id} unit={unit} />);
        mockAxios.mockResponse(axiosResponseError);

        expect(mockAxios.get).toBeCalledTimes(1);
        expect(component).toMatchSnapshot();
    });
});
