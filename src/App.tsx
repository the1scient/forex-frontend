import React, { Component	} from 'react';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import useWebSocket from 'react-use-websocket';
import './styles/App.css';
import { Trades } from './pages/trades';
import axios from 'axios';
import { Login } from "./pages/login";
import {User} from "./pages/user";
import {Home} from './pages/home';

function App() {

/**

*/
        return (
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/idk" element={<User />} />
                        <Route path="/trades" element={<Trades />}/>
                    </Routes>
            </BrowserRouter>

        );
    }

 




export default App;

