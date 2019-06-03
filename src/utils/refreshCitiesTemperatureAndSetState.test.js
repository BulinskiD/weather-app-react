import refreshCitiesTemperatureAndSetState from './refreshCitiesTemperatureAndSetState';
import handleError from './handleError';
import calculateAvg from './calculateAvg';
import mockAxios from 'jest-mock-axios';


jest.mock('./calculateAvg');
calculateAvg.mockReturnValue(20);
jest.mock('./handleError');
const units = jest.fn();
const cities = [{ id: 1, name: "Gorlice", temperature: 30}, {  id: 1, name: "Gorlice", temperature: 30}];
const axiosResponseOK = {city: {coord: {lat: 1, lon: 1}, name: "Gorlice", id: 1}, list: []};
const setCities = jest.fn();
const setError = jest.fn();
const setLoading = jest.fn();

beforeEach(()=>{
   units.mockClear();
   setCities.mockClear();
   setError.mockClear();
   setLoading.mockClear();
   mockAxios.reset();
});


describe('Refresh Cities temperature and set state', ()=>{
    it('should call axios 2 times for given arguments', () => {
            refreshCitiesTemperatureAndSetState(units, cities, setCities, setError, setLoading);
            mockAxios.mockResponse(axiosResponseOK);
            expect(mockAxios.get).toBeCalledTimes(2);
    });

    it('should call handle error 2 times for error response', () => {
        refreshCitiesTemperatureAndSetState(units, cities, setCities, setError, setLoading);
        try {
            mockAxios.mockError(axiosResponseOK);
            expect(mockAxios.get).toBeCalledTimes(2);
        } catch(error) {
            expect(handleError).toBeCalledTimes(1);
        }
    });
});
