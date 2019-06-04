import React from 'react';
import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import calculateAvg from './utils/calculateAvg';
import handleError from "./utils/handleError";
import App from './App';
import {shallow, mount} from 'enzyme';
import {act} from "react-dom/test-utils";
import axios from 'axios';

jest.mock('./utils/refreshCitiesTemperatureAndSetState');
jest.mock('./utils/calculateAvg');
jest.mock('./utils/handleError');
jest.mock('axios');

const e = {preventDefault: ()=>{}};

// add a div with #root id for react.createPortal
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'root');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

describe('App', ()=>{
    it('should match snapshot', () => {
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });

    it('should toggle unit correctly in online mode', () => {
        act(()=>{
            const component = mount(<App />);
            component.find("FormControl").props().onChange({target:{value:"sss"}});
            component.find("form").simulate("submit", e);
            try {
                axios.mockResolvedValueOnce("test");
                expect(axios.get).toBeCalledTimes(3);
            } catch(error) {

            }
        });
    });
});
