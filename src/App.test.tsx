import React from 'react';
import {getByText, render, screen} from '@testing-library/react';
import App from './App';
//import {Home} from './pages/Home';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom'
import { Trades } from './pages/trades';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import {renderToDOM} from "./index";
const ShallowRenderer = require('react-test-renderer/shallow');




describe('Tests', () => {

  // test if renders without crashing

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  

  // test if index.tsx renders the App in the function renderToDOM()

  test('renders App in the function renderToDOM()', () => {
    renderToDOM();
  expect(ReactDOM.render).toHaveBeenCalled();

  });



// check trades use effect
  test('trades use effect', () => {

    render(<Trades />, {wrapper: BrowserRouter});
 
    jest.spyOn(React, "useEffect").mockImplementationOnce(cb => void cb());
    
  });



  // create a test to see if 'Forex Dashboard' is going to be in the document at home.tsx

  test('renders Forex Dashboard', () => {
      
      render(<App />);
      const text = screen.getByText(/Forex Dashboard/i);
      expect(text).toBeInTheDocument();
  
    });


  // create a test to see if makeBuyTrade function is called when a button is clicked

    // create a const to storage the function makeBuyTrade
    const makeBuyTrade = jest.fn();
    const { getByTestId } = render(<App />);
    const button = screen.getByText(/Buy/i);
    button.click();



// swal = swal2-popup swal2-modal swal2-icon-error swal2-show




// test if the home page is going to have a button to go to the trades page

  test('renders a button to go to the trades page', () => {
        render(<App />);
        const text = screen.getByText(/My Trades/i);
        expect(text).toBeInTheDocument();
    
      });



// create a test to test makeBuyTrade function in pages/home.tsx

  test('renders a button to make a buy trade', () => {
        render(<App />);
        const text = screen.getByText(/Buy/i);
        expect(text).toBeInTheDocument();
    
      });







// create a test to test useState inside Trade component in pages/trades.tsx

test('Renders Trade', () => {

render(<Trades />, {wrapper: BrowserRouter});
const text = screen.getByText(/#ID/);
expect(text).toBeInTheDocument();
});






});
