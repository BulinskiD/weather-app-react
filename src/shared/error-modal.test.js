import React from 'react';
import ReactDOM from 'react-dom';
import ErrorModal from './error-modal';
import {shallow} from "enzyme";


describe('Error modal', ()=>{

    it('should should render without crash without props', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<ErrorModal />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('should render correctly with given props', ()=>{
        const clickFn = jest.fn();
        const component = shallow(<ErrorModal onClose={clickFn}>Error</ErrorModal>);
        expect(component).toMatchSnapshot();
    });

    it('should invoke clickFn when button is clicked', ()=>{
        const clickFn = jest.fn();
        const component = shallow(<ErrorModal onClose={clickFn}>Error</ErrorModal>);
        component.find("Button").simulate('click');

        expect(clickFn).toHaveBeenCalledTimes(1);
    });
});
