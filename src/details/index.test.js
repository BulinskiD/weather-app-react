import React from 'react';
import mockAxios from 'jest-mock-axios';
import Details from './index';
import handleError from '../utils/handleError';
import {shallow, mount} from "enzyme";
import {act} from "react-dom/test-utils";

jest.mock('../utils/handleError');

handleError.mockReturnValue("Test");

afterEach(()=>{
    mockAxios.reset();
    handleError.mockClear();
});

describe('Details', ()=>{

    const id = {match: {params:{id: 1}}};
    const unit = "imperial";

    const axiosResponseOK = {city: {coord: {lat: 1, lon: 1}}, list: []};
    const axiosResponseError = {
        data: {},
        status: 500,
        statusText: 'Internal server error',
        headers: {},
        config: {},
    };

    it('should call axios on load', ()=>{
        let component;
        act(()=>{
            component= mount(<Details {...id} unit={unit}/>);
        });
        mockAxios.mockResponse(axiosResponseOK);
        expect(component).toMatchSnapshot();
        expect(mockAxios.get).toBeCalledTimes(1);
    });

    it('should set error message properly when request fails on load', ()=>{
        act(()=>{
            mount(<Details {...id} unit={unit}/>);
        });
        try {
            mockAxios.mockError(axiosResponseError);
        } catch(error) {
            expect(mockAxios.get).toBeCalledTimes(1);
            expect(handleError).toBeCalledWith(axiosResponseError);
        }
    });

});
