import handleError from './handleError';

describe('Handle error', ()=>{
    it('should return correct message for 404 status and call setLoading 1 time', () => {
        const data = {response: {status: 404}};
        const setLoading = jest.fn();
        expect(handleError(data, setLoading)).toBe("Nie znaleziono miasta");
        expect(setLoading).toBeCalledTimes(1);
    });

    it('should return correct message for 500 status and call setLoading 1 time', () => {
        const data = {response: {status: 500}};
        const setLoading = jest.fn();
        expect(handleError(data, setLoading)).toBe("Serwer jest chwilowo niedostępny, spróbuj później!");
        expect(setLoading).toBeCalledTimes(1);
    });

    it('should return correct message for different statuses and call setLoading 1 time', () => {
        const data = {response: {status: 418}};
        const setLoading = jest.fn();
        expect(handleError(data, setLoading)).toBe("Coś poszło nie tak...");
        expect(setLoading).toBeCalledTimes(1);
    });
});
