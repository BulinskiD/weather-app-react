import React from 'react';
import { act } from 'react-dom/test-utils';
import refreshCitiesTemperatureAndSetState from './utils/refreshCitiesTemperatureAndSetState';
import checkUnit from './utils/checkUnit';
import useCities from "./hooks/city-hook";
import useUnit from "./hooks/unit-hook";
import App from './App';
import {shallow, mount} from 'enzyme';

jest.mock('./hooks/city-hook');
jest.mock('./hooks/unit-hook');
jest.mock('./utils/refreshCitiesTemperatureAndSetState');
jest.mock('./utils/checkUnit');

const loading = true;
const setLoading = jest.fn();
const onAddCity = jest.fn();
const onRemoveCity = jest.fn();
let cities = [];
const setCities = jest.fn();
const error = null;
const setError = jest.fn();

useCities.mockReturnValue([loading, setLoading, onAddCity, onRemoveCity, cities, setCities, error, setError]);

let unit = 'metric';
const toggleUnit = jest.fn();
const setUnit = jest.fn();

useUnit.mockReturnValue([unit, toggleUnit, setUnit]);

const navigatorMock = jest.spyOn(navigator, 'onLine', 'get');

const e = {preventDefault: ()=>{}};

// add a div with #root id for react.createPortal
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'root');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

beforeEach(() => {
    setLoading.mockClear();
    onAddCity.mockClear();
    onRemoveCity.mockClear();
    setCities.mockClear();
    setError.mockClear();
    toggleUnit.mockClear();
    setUnit.mockClear();
    checkUnit.mockClear();
});


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
        expect(setCities).toBeCalledWith([{ id: 1, name: "Gorlice", temperature: "10.00" }]);
        expect(setLoading).toBeCalledTimes(1);
    });

    it('should call refreshCitiesTemperatureAndSetState when navigator is online', ()=>{
        navigatorMock.mockReturnValue(true);
        checkUnit.mockReturnValue(unit);
        localStorage.getItem.mockReturnValue(JSON.stringify([{ id: 1, name: "Gorlice", temperature: "10.00" }]));

        act(()=>{
           mount(<App />);
        });

        expect(checkUnit).toBeCalledTimes(1);
        expect(refreshCitiesTemperatureAndSetState).toBeCalledWith(unit, [{ id: 1, name: "Gorlice", temperature: "10.00" }], setCities, setError, setLoading);
        expect(setLoading).toBeCalledTimes(0);
    });

    it('should call only setLoading when there is no data in localStorage', ()=>{
        navigatorMock.mockReturnValue(true);
        checkUnit.mockReturnValue(unit);
        localStorage.getItem.mockReturnValue(null);

        act(()=>{
            mount(<App />);
        });

        expect(checkUnit).toBeCalledTimes(1);
        expect(setLoading).toBeCalledWith(false);
    });
});
