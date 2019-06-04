import { act } from 'react-dom/test-utils';
import testHook from '../utils/testUtils/hookTestComponent';
import refreshCitiesTemperatureAndSetState from "../utils/refreshCitiesTemperatureAndSetState";
import calculateAvg from "../utils/calculateAvg";
import handleError from "../utils/handleError";
import useCities from './city-hook';
import axios from 'axios';

jest.mock('axios');
jest.mock('../utils/calculateAvg');
calculateAvg.mockReturnValue(10);
jest.mock('../utils/handleError');
jest.mock('../utils/refreshCitiesTemperatureAndSetState');

const axiosResponseOK = {data:{city: {coord: {lat: 1, lon: 1}, name: "Gorlice", id: 1}, list: []}};
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
    });

    it('Should call axios with correct params when onAddCity called', async () => {
        const cityToAssert = { id: 1, name: "Gorlice", temperature: 10 }
        const prom = Promise.resolve(axiosResponseOK);
        axios.mockResolvedValueOnce(prom);
        act(()=>{
            onAddCity('Gorlice');
        });
        await prom;
        expect(axios.get).toBeCalledWith('', {params: {q: 'Gorlice', units: 'metric'}});
    });
});
