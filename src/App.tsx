import React, { Component	} from 'react';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import './styles/App.css';
import { Users } from './pages/users';
import axios from 'axios';
import { Login } from "./pages/login";
import {User} from "./pages/user";


function App() {



        return (
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/user/:id" element={<User />} />
                        <Route path="/users" element={<Users />}/>
                    </Routes>
            </BrowserRouter>

        );
    }

 




export default App;

