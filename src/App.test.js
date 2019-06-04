import React from 'react';
import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import calculateAvg from './utils/calculateAvg';
import handleError from "./utils/handleError";
import App from './App';
import {shallow, mount} from 'enzyme';

jest.mock('./utils/refreshCitiesTemperatureAndSetState');
jest.mock('./utils/calculateAvg');
jest.mock('./utils/handleError');

// add a div with #root id for react.createPortal
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'root');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

describe('App', ()=>{
    it('should be filled with tests!:)', () => {
        const component = shallow(<App />);

        expect(component).toMatchSnapshot();
    });

    it('should toggle unit correctly in online mode', () => {
        //const component = shallow(<App />);
    });
});
