import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import {MenuItem} from "@mui/material";
import useWebSocket from 'react-use-websocket';
import websocket from 'isomorphic-ws';
import protobuf from 'protobufjs';
import {FormEvent, useState} from "react";

const ws = new WebSocket('wss://streamer.finance.yahoo.com');


// wss://marketdata.tradermade.com/feedadv

let data = require('../settings.json');
let backEndHost = data['backendhost'];



export function Home() {

    const [price, setPrice] = useState(0);

    const [counter, setCounter] = useState(0);

  


const { lastJsonMessage, sendMessage } = useWebSocket('wss://marketdata.tradermade.com/feedadv', {
  onOpen: () => sendMessage("{\"userKey\":\"sioZfyXNXtuji47n2BMGA\", \"symbol\":\"GBPUSD\"}"),
  onMessage: () => {
    if (lastJsonMessage) {

        new Date('DD/MM/YYYY');

        let gbp_price: any = lastJsonMessage;
        
      console.log(gbp_price.mid);
        
        setPrice(gbp_price.mid);


     // let asdasds = (document.getElementById('priceValue') as HTMLBodyElement).innerText = xmsg.mid;
      


    }
    else {

    }
  },
 

  onError: (event) => { console.error(event); },
  shouldReconnect: (closeEvent) => true,
  reconnectInterval: 3000
});




    async function handleMakeTrade(event: FormEvent) {
        event.preventDefault();


        let typeElement = (document.getElementById('select-type') as HTMLFormElement).value;
        let amountElement = (document.getElementById('amount-quantity') as HTMLFormElement).value;
        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "instrument": "GBP/USD",
                "rate": price,
                "type": typeElement,
                "amount": amountElement
            })
        };
        const response = await fetch(backEndHost + `post`, requestOptions);
        const data = await response.json();
        console.log(data);



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

                <div className="container-fluid">

                    <div className="jumbotron text-center">

                        <div className="col-md-10">
                        <h1>GBP -&gt; USD</h1>

                        <h3 className="mt-3">{price} [{counter}s] </h3>

                            <form onSubmit={handleMakeTrade} className='text-center'>
                                <div className="form-group col-md-4 col-md-offset-6 mt-3 align-center">
                                    <label htmlFor="select-type align-center">Choose a type</label>
                                    <select className="form-control" id="select-type">
                                        <option selected disabled>Choose a type</option>
                                        <option value="BUY">BUY</option>
                                        <option value="SELL">SELL</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4 mt-3">
                                    <label htmlFor="amount-quantity">Amount</label>
                                    <input min='0' step='1' type="number" className="form-control" id="amount-quantity"
                                           placeholder="Amount" />
                                </div>

                                <button type="submit" className="btn btn-primary mt-4">Submit</button>
                            </form>


                        </div>

                        

                    </div>

                </div>
            </div>
        </div>
        </>

    );
}