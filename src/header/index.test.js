import React from 'react';
import Header from './index';
import {shallow} from 'enzyme';

describe('App', ()=>{
    it('should match snapshot', () => {
        const component = shallow(<Header />);
        expect(component).toMatchSnapshot();
    });
});
