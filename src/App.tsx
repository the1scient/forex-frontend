import React, { Component	} from 'react';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import './styles/App.css';
import { Users } from './pages/users';
import axios from 'axios';
import { Login } from "./pages/login";
import {User} from "./pages/user";
import {Trades} from './pages/trades';


function App() {
/**
    const { lastJsonMessage, sendMessage } = useWebSocket('ws://localhost:3001', {
        onOpen: () => console.log(`Connected to App WS`),
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
        return (
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Trades/>} />
                        <Route path="/user/:id" element={<User />} />
                        <Route path="/users" element={<Users />}/>
                    </Routes>
            </BrowserRouter>

        );
    }

 




export default App;

