import refreshCitiesTemperatureAndSetState from './refreshCitiesTemperatureAndSetState';
import handleError from './handleError';
import calculateAvg from './calculateAvg';
import axios from 'axios';

jest.mock('./calculateAvg');
calculateAvg.mockReturnValue(20);

jest.mock('./handleError');
const units = jest.fn();

const cities = [{ id: 1, name: "Gorlice", temperature: 30}, {  id: 1, name: "Gorlice", temperature: 30}];
const axiosResponseOK = {data:{city: {coord: {lat: 1, lon: 1}, name: "Gorlice", id: 1}, list: []}};
const axiosResponseError = {
    data: {},
    status: 500,
    statusText: 'Internal server error',
    headers: {},
    config: {},
};

const setCities = jest.fn();
const setError = jest.fn();
const setLoading = jest.fn();

jest.mock('axios');

beforeEach(()=>{
   units.mockClear();
   setCities.mockClear();
   setError.mockClear();
   setLoading.mockClear();
   axios.mockClear();
});


describe('Refresh Cities temperature and set state', ()=>{
    it('should call set new cities list with 2 axiosResponseOK objects', async () => {
            expect.assertions(1);
            const prom = Promise.resolve(axiosResponseOK);
            axios.get.mockReturnValue(prom);

            await refreshCitiesTemperatureAndSetState(units, cities, setCities, setError, setLoading);

            try {
                await prom;
                expect(setCities).toBeCalledWith([axiosResponseOK, axiosResponseOK]);
            }
            catch(error) {

            }
    });

    it('should call handle error with proper arguments when api response is errored', async () => {
        expect.assertions(1);
        const prom = Promise.reject(axiosResponseError);
        axios.get.mockReturnValue(prom);

        await refreshCitiesTemperatureAndSetState(units, cities, setCities, setError, setLoading);

        try {
            await prom;
        }
        catch(error) {
            expect(handleError).toBeCalledWith(axiosResponseError, setLoading);
        }
    });
});
