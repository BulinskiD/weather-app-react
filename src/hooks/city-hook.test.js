import { act } from 'react-dom/test-utils';
import testHook from '../utils/testUtils/hookTestComponent';
import refreshCitiesTemperatureAndSetState from "../utils/refreshCitiesTemperatureAndSetState";
import calculateAvg from "../utils/calculateAvg";
import handleError from "../utils/handleError";
import useCities from './city-hook';
import axios from 'axios';

jest.mock('axios');
jest.mock('../utils/calculateAvg');
jest.mock('../utils/handleError');
jest.mock('../utils/refreshCitiesTemperatureAndSetState');

const axiosResponseOK = {data: { city: { id: 1, coord: {lat: 1, lon: 1}, name: "Gorlice" }, list: [] }};
const axiosResponseError = {
    data: {},
    status: 500,
    statusText: 'Internal server error',
    headers: {},
    config: {},
};

let [loading, unit, toggleUnit, onAddCity, onRemoveCity, cities, error, setError] = [];
testHook(() => {
    [loading, unit, toggleUnit, onAddCity, onRemoveCity, cities, error, setError] = useCities();
});

beforeEach(() => {
    jest.resetAllMocks();
});


describe('Cities hook', () => {

    it('should assign metric value to unit on load', () => {
            expect(unit).toBe("metric");
    });

    it('should toggle unit to imperial on toggle unit', () => {
        act(() => {
            toggleUnit();
        });
        expect(unit).toBe("imperial");
        expect(localStorage.setItem).toBeCalledWith('unit', 'imperial');

        act(() => {
            toggleUnit();
        });
        expect(localStorage.setItem).toBeCalledWith('unit', 'metric');
        expect(refreshCitiesTemperatureAndSetState).toBeCalledTimes(2);
    });

    it('Should add new item to local storage and set state when onAddCity is called with proper argument', async () => {
        expect.assertions(5);
        const cityToAssert = { id: 1, name: "Gorlice", temperature: 10 };
        calculateAvg.mockReturnValue(10);
        const prom = Promise.resolve(axiosResponseOK);
        axios.get.mockReturnValue(prom);

        act(()=>{
            onAddCity('Gorlice');
        });

        await prom;
        expect(axios.get).toBeCalledWith('', {params: {q: 'Gorlice', units: 'metric'}});
        expect(calculateAvg).toBeCalledWith([]);
        expect(localStorage.setItem).toBeCalledWith('cities', JSON.stringify([cityToAssert]));
        expect(cities.length).toBe(1);
        expect(loading).toBe(false);
    });


    it('Should set proper error when promise is rejected', async () => {
        expect.assertions(2);
        calculateAvg.mockReturnValue(10);
        handleError.mockReturnValue("Sample message");
        const prom = Promise.reject(axiosResponseOK);
        axios.get.mockReturnValue(prom);

        act(()=>{
            onAddCity('Gorlice');
        });

        try {
            await prom;
        } catch(err) {
            expect(axios.get).toBeCalledWith('', {params: {q: 'Gorlice', units: 'metric'}});
            expect(error).toBe("Sample message");
        }
    });

    it('Should set proper error when city was already on list', async () => {
        expect.assertions(4);
        const cityToAssert = { id: 1, name: "Gorlice", temperature: 10 };
        calculateAvg.mockReturnValue(10);
        const prom = Promise.resolve(axiosResponseOK);
        axios.get.mockReturnValue(prom);

        act(()=>{
            onAddCity('Gorlice');
            onAddCity('Gorlice');
        });

        await prom;
        expect(axios.get).toBeCalledTimes(2);
        expect(cities.length).toBe(1);
        expect(loading).toBe(false);
        expect(error).toBe("Miasto znajduje się już na liście!");
    });

    it('Should remove city when onRemoveCity with correct item is invoked', async () => {
        expect.assertions(4);
        const cityToRemove = { id: 1, name: "Gorlice", temperature: 10 };
        calculateAvg.mockReturnValue(10);
        const prom = Promise.resolve(axiosResponseOK);
        axios.get.mockReturnValue(prom);

        act(()=>{
            onAddCity('Gorlice');
            onRemoveCity(cityToRemove);
        });

        await prom;
        expect(axios.get).toBeCalledTimes(1);
        expect(cities.length).toBe(0);
        expect(loading).toBe(false);
        expect(localStorage.setItem).toBeCalledWith("cities", JSON.stringify([]));
    });

});
