import { Link } from 'react-router-dom';
import '../styles/Home.css';
import useWebSocket from 'react-use-websocket';
import {useState} from "react";
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';
import {Sidebar} from '../components/Sidebar';


let data = require('../settings.json');
let backEndHost = data['backendhost'];



export function Home() {
    
    const { t, i18n } = useTranslation('common');


    const [price, setPrice] = useState(0);

    const [counter, setCounter] = useState(0);

    const [percent, setPercent] = useState(0);
  
    const [symbol, setSymbol] = useState('GBP > USD');


const { lastJsonMessage, sendMessage } = useWebSocket('ws://localhost:3001', {
  onOpen: () => console.log('Connected to WS'),
  onMessage: () => {
    if (lastJsonMessage) {
       
        
        type priceProps = {
           price: string;
        }

        const resSymbol = lastJsonMessage.id;

        let xSymbol = '';

        if(resSymbol === "GBPUSD=X"){
            xSymbol = 'GBP > USD';
        }
        else if (resSymbol === 'GBP=X') {
            xSymbol = 'USD > GBP';
        }


        if(xSymbol === symbol){
            
            const price = lastJsonMessage['price'];
       
            setPrice(price);      
            setPercent(Math.round(lastJsonMessage['changePercent'] * 100) / 100);
            setCounter(counter + 1);
        }
        
        else {
            
        }
         

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
      });
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
            "instrument": symbol,
            "rate": price,
            "type": "BUY",
            "amount": amount

    })
    };

    const response = await fetch(backEndHost + `post`, requestOptions);
    Swal.fire({
        title: 'Success!',
        text: 'Your trade has been placed',
        icon: 'success',
        confirmButtonText: 'Ok'
    });


}


function readjust() {
    
    // if tradeSymbol equals USD > GBP than tradeSymbol receives GBP > USD
    if(symbol == "USD > GBP"){
        setSymbol("GBP > USD");
    }
    else {
        setSymbol("USD > GBP");
    }
    
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
         "instrument": symbol,
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
        
            <div>
                <Sidebar />
                <div className="content-container">
                    <div className="container-fluid text-center">

                    

                        <div className="col-md-10">
                            <h3 className="mt-2 symbol" id="tradeSymbol">{symbol}  </h3><button onClick={readjust} className="text-white bg-danger border-dark rounded"><i className="fa fa-sync" aria-hidden="true"></i></button>

                            <h3 style={{display: 'inline-block;'}} className="mt-5">{price} ({percent}) </h3> <i className='text-white'>[{counter} {t('trades.updates')}(s)]</i>

                                <div className="row">
                                    
                                <div className="col-md-4"></div> {/* empty div for bootstrap */}
                                <div className="form-group text-center mt-4 col-md-4">
                                    <label htmlFor="amount" className="form-group">{t('trades.amount')}:</label>
                                    <input min='0' step='1' type="number" className="bg-dark form-group tradeInput" id="amount-quantity"
                                           placeholder={t('trades.amountInput') + '...'} />
                                </div>

                                </div>

                            <div className='text-center'>
                                    <div className="form-group text-center mt-5">

                                        <button type="button" onClick={makeSellTrade} className="form-group btn btn-danger p-5 tradeAction"><i className="fa fa-minus-circle"></i>&nbsp;{t('trades.sell')}</button>
                                        <button type="button" onClick={makeBuyTrade} className="form-group btn btn-success p-5 tradeAction"><i className="fa fa-plus-circle"></i>&nbsp;{t('trades.buy')}</button>

                                    </div>
                          

                               
                            </div>

                        </div>

                        

                        </div>

                
            </div>
        </div>
        

    );
}
