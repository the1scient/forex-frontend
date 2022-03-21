import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/Users.css';
import Moment from 'moment';
import Menu from "@mui/material/Menu";
import {MenuItem} from "@mui/material";

let data = require('../settings.json');
let backEndHost = data['backendhost'];

export function Trades() {

    
    const [trades, setTrades] = useState<any[]>( [] );
  
    useEffect(() => {
      const fetchTrades = async () => {

        const response = await fetch(`${backEndHost}users`);
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
                <td>{Moment(tradeTime).format('DD/MM/YYYY')}</td>
                 <td>{trade.instrument}</td>
                <td>{trade.rate}</td>
                <td id="trade-type">{trade.type}</td>
                <td>{trade.amount}</td>

            </tr>
    });





    return (

      <div className="container">

          <aside className='col-md-2'>

              <Menu open>
                  <MenuItem component={Link} to={'/'}>Home</MenuItem>
                  <MenuItem component={Link} to={'/trades'}>My Trades</MenuItem>

              </Menu>

          </aside>
          <div className='col-md-10'>
            <table>
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
    );
}



