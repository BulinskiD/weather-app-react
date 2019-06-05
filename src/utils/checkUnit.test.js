import React from 'react';
import checkUnit from './checkUnit';

const unit = "metric";
const setUnit = jest.fn();

beforeEach(()=>{
   jest.resetAllMocks();
});

describe('Check unit helper', ()=>{

    it('should call setUnit when there is stored unit in local storage', ()=>{
       localStorage.getItem.mockReturnValue('imperial');
       const retUnit = checkUnit(unit, setUnit);
       expect(setUnit).toBeCalledWith('imperial');
       expect(retUnit).toBe('imperial');
   });

    it('should set default value when there is now unit stored in local storage', ()=>{
        localStorage.getItem.mockReturnValue(false);
        const retUnit = checkUnit(unit, setUnit);
        expect(setUnit).toBeCalledTimes(0);
        expect(retUnit).toBe('metric');
    });
});
