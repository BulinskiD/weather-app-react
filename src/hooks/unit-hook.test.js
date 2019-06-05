import { act } from 'react-dom/test-utils';
import testHook from '../utils/testUtils/hookTestComponent';
import useUnit from './unit-hook';



let [unit, toggleUnit, setUnit] = [];
beforeEach(() => {
    jest.resetAllMocks();
    testHook(() => {
        [unit, toggleUnit, setUnit] = useUnit();
    });
});


describe('Unit hook', () => {

    it('Should set unit to metric on default', ()=>{
        expect(unit).toBe('metric');
    }) ;


    it('Should toggle unit from metric to imperial', ()=>{
       expect(unit).toBe('metric');
       act(()=> {
          toggleUnit();
       });

       expect(unit).toBe('imperial');
       expect(localStorage.setItem).toBeCalledWith("unit", "imperial");
    });

});
