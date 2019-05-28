import React from 'react';
import ReactDOM from 'react-dom';
import ErrorModal from './error-modal';
import {shallow} from "enzyme";


describe('Error modal', ()=>{
    const clickFn = jest.fn();
    it('should render correctly with given props', ()=>{
        const component = shallow(<ErrorModal onClick={clickFn}>Error</ErrorModal>);
        expect(component).toMatchSnapshot();
    });

    it('should invoke clickFn when button is clicked', ()=>{
        const component = shallow(<ErrorModal onClick={clickFn}>Error</ErrorModal>);
        component.find("Button").simulate('click');

        expect(clickFn).toHaveBeenCalledTimes(1);
    });
});
