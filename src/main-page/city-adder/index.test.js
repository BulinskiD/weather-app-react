import React from 'react';
import ReactDOM from 'react-dom';
import CityAdder from './index';
import {shallow, mount} from "enzyme";
import LoadingContext from '../../context/loading-context';
import { act } from 'react-dom/test-utils';

describe('City adder', ()=>{
    const clickFn = jest.fn();
    const e = {preventDefault: ()=>{}};
    const unit = "imperial";

    beforeEach(()=>{
        clickFn.mockClear();
    });


    it('should render correctly with given props', ()=>{
        const component = shallow(<CityAdder unit={unit} onAddCity={clickFn} />);
        expect(component).toMatchSnapshot();
    });

    it('should render without crash without props', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CityAdder />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call onAddCity func when form submitted with city name length >= 3', () => {
        act(() => {
            const component = shallow(<CityAdder unit={unit} onAddCity={clickFn} />);
            component.find('FormControl').props().onChange({target:{value:"sss"}});
            component.find('form').simulate('submit', e);
        });
        expect(clickFn).toBeCalledTimes(1);
    });

    it('should not call onAddCity func when form submitted with city name length < 3', () => {
        act(() => {
            const component = shallow(<CityAdder unit={unit} onAddCity={clickFn} />);
            component.find('FormControl').props().onChange({target:{value:"ss"}});
            component.find('form').simulate('submit', e);
        });
        expect(clickFn).toBeCalledTimes(0);
    });
});
