import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import {MenuItem} from "@mui/material";


export function Home() {

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
                            <a href="#">
                                <i className="fa fa-history" aria-hidden="true"/> My Trades
                            </a>
                        </li>
                        {/**<li className="header">Another Menu Header</li> */}


                </ul>
            </div>
            <div className="content-container">

                <div className="container-fluid">


                    <div className="jumbotron">
                        <h1>Forex Dashboard</h1>
                        asdasdasdsa

                    </div>

                </div>
            </div>
        </div>
        </>

    );
}