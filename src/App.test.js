import React from 'react';
import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import calculateAvg from './utils/calculateAvg';
import handleError from "./utils/handleError";
import App from './App';
import {shallow, mount} from 'enzyme';
import axios from 'axios';

jest.mock('./utils/refreshCitiesTemperatureAndSetState');
jest.mock('./utils/calculateAvg');
jest.mock('./utils/handleError');
jest.mock('axios');


axios.mockReturnValue("test");


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

    it('should match snapshot', () => {
        const component = mount(<App />);
    });
});
