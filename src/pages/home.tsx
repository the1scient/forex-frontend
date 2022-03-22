import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import {MenuItem} from "@mui/material";
import useWebSocket from 'react-use-websocket';
import {FormEvent, useState} from "react";

let data = require('../settings.json');
let backEndHost = data['backendhost'];


export function Home() {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com')



    /**
    const api_key = '38e11401e6f0431c56232c8d7203e48b';
    const { lastJsonMessage, sendMessage } = useWebSocket('wss://websockets.financialmodelingprep.com',  {
        onOpen: () =>  sendMessage('heartbeat' + api_key),
        onMessage: () => {
            if (lastJsonMessage) {
                console.log(lastJsonMessage);
            }
        },
        onError: (event) => { console.error(event); },
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000
    });


*/

    async function handleMakeTrade(event: FormEvent) {
        event.preventDefault();


        let type = (document.getElementById('select-type') as HTMLFormElement).value;
        let amount = (document.getElementById('amount-quantity') as HTMLFormElement).value;


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "instrument": "GBP/USD",
                "rate": 1.31,
                "type": type,
                "amount": amount
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


                    <div className="jumbotron">

                        <div className="col-md-10">
                        <h1>GBP -&gt; USD</h1>
                        <p id="priceValue">00000</p>

                            <form onSubmit={handleMakeTrade}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="select-type">Choose a type</label>
                                    <select className="form-control" id="select-type">
                                        <option selected disabled>Choose a type</option>
                                        <option value="BUY">BUY</option>
                                        <option value="SELL">SELL</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6 mt-3">
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