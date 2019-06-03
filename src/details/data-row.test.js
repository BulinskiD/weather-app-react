import React from 'react';
import DataRow from './data-row';
import {shallow} from "enzyme";

describe('DataRow', ()=>{

    const numericProps = {title: "test", data: 3};

    it('should render component correctly for given props', ()=>{
        const component = shallow(<DataRow {...numericProps} />)
        expect(component).toMatchSnapshot();
    });
});
