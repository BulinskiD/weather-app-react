import React from 'react';
import { act } from 'react-dom/test-utils';
import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import handleError from "./utils/handleError";
import checkUnit from './utils/checkUnit';
import App from './App';
import {shallow, mount} from 'enzyme';

jest.mock('./utils/refreshCitiesTemperatureAndSetState');
jest.mock('./utils/handleError');
jest.mock('./utils/checkUnit');

const navigatorMock = jest.spyOn(navigator, 'onLine', 'get');

const e = {preventDefault: ()=>{}};

// add a div with #root id for react.createPortal
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'root');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

describe('App', ()=>{

    it('should match snapshot', () => {
        const component = shallow(<App/>);
        expect(component).toMatchSnapshot();
    });

    it('should not call refreshCitiesTemperatureAndSetState when navigator is offline', ()=>{
        navigatorMock.mockReturnValue(false);
        localStorage.getItem.mockReturnValue(JSON.stringify([{ id: 1, name: "Gorlice", temperature: "10.00" }]));

        act(()=>{
            mount(<App />);
        });

        expect(refreshCitiesTemperatureAndSetState).toBeCalledTimes(0);
    });

    it('should call refreshCitiesTemperatureAndSetState when navigator is online', ()=>{
        navigatorMock.mockReturnValue(true);
        localStorage.getItem.mockReturnValue(JSON.stringify([{ id: 1, name: "Gorlice", temperature: "10.00" }]));

        act(()=>{
           mount(<App />);
        });

        expect(refreshCitiesTemperatureAndSetState).toBeCalledTimes(1);
    });
});
