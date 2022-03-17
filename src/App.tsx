import React, { Component	} from 'react';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import './styles/App.css';
import { Users } from './pages/users';
import axios from 'axios';
import { Login } from "./pages/login";


function App() {



        return (
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/users" element={<Users />}/>
                        <Route path="/user/:id" element={<User />} />
                        
                    </Routes>
            </BrowserRouter>

        );
    }

 




export default App;

