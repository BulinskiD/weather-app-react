import calculateAvg from './calculateAvg';

describe('Calculate avg', ()=>{
    it('should return 3 for given values', () => {
       const data = [{main: {temp: 2 }}, {main: {temp: 4 }}];
       let val = 3;
       expect(calculateAvg(data)).toBe(val.toFixed(2));
    });

    it('should return 0 for empty array', () => {
       const data = [];
       let val = 0;
       expect(calculateAvg(data)).toBe(val.toFixed(2));
    });

    if('should throw error for data === null', () => {
       expect(calculateAvg(null)).toThrow("Data cannot be null");
    });
});
