import React from 'react';
import ReactDOM from 'react-dom';
import CityAdder from './index';
import {shallow, mount} from "enzyme";
import { act } from 'react-dom/test-utils';


describe('City adder', ()=>{

    it('should render correctly with given props', ()=>{
        const clickFn = jest.fn();
        const unit = "imperial";
        const component = shallow(<CityAdder unit={unit} onAddCity={clickFn} />);
        expect(component).toMatchSnapshot();
    });

    it('should render without crash without props', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CityAdder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // it('should not call onAddCity func when form submitted with city name length < 3', () => {
    //     const clickFn = jest.fn();
    //     const unit = "imperial";
    //     act(() => {
    //         const component = shallow(<CityAdder unit={unit} onAddCity={clickFn} />);
    //         component.find('FormControl').props().onChange({target:{value:"asadadasdasds"}});
    //         component.find('Button').simulate('click');
    //     });
    //     expect(clickFn).toBeCalledTimes(1);
    // });

});
