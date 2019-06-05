import React from 'react';
import Details from './index';
import handleError from '../utils/handleError';
import {mount} from "enzyme";
import {act} from "react-dom/test-utils";
import axios from 'axios';

jest.mock('../utils/handleError');
jest.mock('axios');

handleError.mockReturnValue("Test");

afterEach(()=>{
    axios.mockClear();
    handleError.mockClear();
});

describe('Details', ()=>{

    const id = {match: {params:{id: 1}}};
    const unit = "imperial";

    // add a div with #root id for react.createPortal
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'root');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

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
            axios.mockResolvedValue(axiosResponseOK);
        });
        expect(component).toMatchSnapshot();
        expect(axios.get).toBeCalledTimes(1);
    });

    it('should set error message properly when request fails on load', ()=>{
        act(()=>{
            mount(<Details {...id} unit={unit}/>);
        });
        try {
            axios.mockRejectedValue(axiosResponseError);
        } catch(error) {
            expect(axios.get).toBeCalledTimes(1);
            expect(handleError).toBeCalledWith(axiosResponseError);
        }
    });

});
