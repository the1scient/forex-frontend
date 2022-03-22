import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Trades.css';
import Moment from 'moment';
import Menu from "@mui/material/Menu";
import {MenuItem} from "@mui/material";

let data = require('../settings.json');
let backEndHost = data['backendhost'];

export function Trades() {

    
    const [trades, setTrades] = useState<any[]>( [] );
  
    useEffect(() => {
      const fetchTrades = async () => {

        const response = await fetch(`${backEndHost}trades`);
        const tradesData = await response.json();
        setTrades(tradesData);
      };



        fetchTrades();
    }, []);
  
  const useTrades = trades.map((trade)=> {

      Moment.locale('en');
      let tradeTime = trade.time;

      return <tr>
                <td>{trade._id}</td>
                <td>{Moment(tradeTime).format('DD/MM/YYYY HH:mm')}</td>
                 <td>{trade.instrument}</td>
                <td>{trade.rate}</td>
                <td id="trade-type">{trade.type}</td>
                <td>{trade.amount}</td>

            </tr>
    });






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

                            <h3 className="trade-table-title">Sorting by new records</h3>
                            <table className="col-md-10">

                                <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Time</th>
                                    <th>Instrument</th>
                                    <th>Rate</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                </tr>

                                </thead>

                                <tbody>

                                {trades && useTrades}
                                </tbody>

                            </table>




                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}



