import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import {MenuItem} from "@mui/material";
import useWebSocket from 'react-use-websocket';
import {FormEvent, useEffect, useState} from "react";
import Swal from 'sweetalert2'

//const ws = new WebSocket('wss://streamer.finance.yahoo.com');


// wss://marketdata.tradermade.com/feedadv

let data = require('../settings.json');
let backEndHost = data['backendhost'];



export function Home() {

    const [price, setPrice] = useState(0);

    const [counter, setCounter] = useState(0);

  

const { lastJsonMessage, sendMessage } = useWebSocket('ws://localhost:3001', {
  onOpen: () => console.log('Connected to WS'),
  onMessage: () => {
    if (lastJsonMessage) {
       setCounter(counter + 1);
        
    
        const mid = lastJsonMessage['mid'];
        setPrice(mid);

    /** 
        const gbp_price: any = lastJsonMessage;
        setPrice(gbp_price.mid);

*/
      
        



     // let asdasds = (document.getElementById('priceValue') as HTMLBodyElement).innerText = xmsg.mid;
      


    }

  },
 

  onError: (event) => { console.error(event); },
  shouldReconnect: (closeEvent) => true,
  reconnectInterval: 3000
});

// create a function called makeBuyTrade that gets input with id amount-quantity

async function makeBuyTrade() {
    let getAmountInput = (document.getElementById('amount-quantity') as HTMLInputElement).value;
 
   let amount = Number(getAmountInput);


if(price == null || price == 0 || price == undefined){ 

    Swal.fire({
        title: 'Error',
        text: 'Price is not available',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
}


   if(amount <= 0 || amount > 100000) {
   
    Swal.fire({
        title: 'Error!',
        text: 'Amount must be between 0 and 100000',
        icon: 'error',
        confirmButtonText: 'Ok'
    });

    return;
   }



const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        "instrument": "GBP/USD",
        "rate": price,
        "type": "BUY",
        "amount": amount

}) };
const response = await fetch(backEndHost + `post`, requestOptions);
Swal.fire({
    title: 'Success!',
    text: 'Your trade has been placed',
    icon: 'success',
    confirmButtonText: 'Ok'
})


}



async function makeSellTrade() {
    let getAmountInput = (document.getElementById('amount-quantity') as HTMLInputElement).value;
 
    let amount = Number(getAmountInput);
 
    if(price == null || price == 0 || price == undefined){ 

        Swal.fire({
            title: 'Error',
            text: 'Price is not available',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    
    
       if(amount <= 0 || amount > 100000) {
       
        Swal.fire({
            title: 'Error!',
            text: 'Amount must be between 0 and 100000',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    
        return;
       }

 
 const requestOptions = {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
         "instrument": "GBP/USD",
         "rate": price,
         "type": "SELL",
         "amount": amount
 
 }) };
 const response = await fetch(backEndHost + `post`, requestOptions);
 Swal.fire({
    title: 'Success!',
    text: 'Your trade has been placed',
    icon: 'success',
    confirmButtonText: 'Ok'
})


}






    return (
        <>
            <div>
                <div className="sidebar-container">
                    <div className="sidebar-logo">
                        Forex Dashboard
                    </div>
                    <ul className="sidebar-navigation">
                        <li className="header">Navigation</li>
                        <li>
                            <Link to='/'>
                                <i className="fa fa-home" aria-hidden="true" />Home
                            </Link>
                         </li>
                        <li>
                          <Link to='/trades'>
                                <i className="fa fa-history" aria-hidden="true"/> My Trades
                          </Link>
                        </li>
                        {/**<li className="header">Another Menu Header</li> */}


                </ul>
            </div>
            <div className="content-container">

                <div className="container-fluid text-center">

                    

                        <div className="col-md-10">
                        <h3 className="mt-2 symbol">GBP &gt; USD</h3>

                        <h3 className="mt-5">{price} </h3><i className='text-white'>[{counter} update(s)]</i>

                                <div className="row">
                                    
                                <div className="col-md-4">

                                </div>
                                <div className="form-group text-center mt-4 col-md-4">
                                    <label htmlFor="amount" className="form-group">Amount:</label>
                                    <input min='0' step='1' type="number" className="bg-dark form-group tradeInput" id="amount-quantity"
                                           placeholder="Amount" />
                                </div>

                                </div>

                            <div className='text-center'>
                                <div className="form-group text-center mt-5">

                                    <button type="button" onClick={makeSellTrade} className="form-group btn btn-danger p-5 tradeAction"><i className="fa fa-minus-circle"></i>&nbsp;SELL</button>
                                    <button type="button" onClick={makeBuyTrade} className="form-group btn btn-success p-5 tradeAction"><i className="fa fa-plus-circle"></i>&nbsp;BUY</button>

                                </div>
                          

                               
                            </div>

                        </div>

                        

                    </div>

                
            </div>
        </div>
        </>

    );
}
