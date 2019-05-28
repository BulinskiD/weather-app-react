import React from 'react';
import LinkButton from './link-button';
import {shallow} from "enzyme";


describe('Link button', ()=>{

    it('should render correctly with given props', ()=>{
        const path= "test";
        const component = shallow(<LinkButton path={path}>Text</LinkButton>);
        expect(component).toMatchSnapshot();
    });
});
