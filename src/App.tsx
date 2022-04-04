import './styles/App.css';
import { Trades } from './pages/trades';
import {Home} from './pages/home';
import { Route, BrowserRouter, Routes} from "react-router-dom";


function App() {

/**

*/
        return (
            
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/trades" element={<Trades />}/>
                    </Routes>
            </BrowserRouter>

        );
    }


export default App;

