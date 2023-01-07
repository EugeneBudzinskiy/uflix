import './App.css';
import 'react-notifications/lib/notifications.css';

import { NotificationContainer } from 'react-notifications';
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';

import ApiProvider from "./utilites/ApiProvider.tsx";
import Session from "./utilites/Session.jsx";

import MainNavbar from './components/MainNavbar';
import Home from "./components/Home";
import Search from "./components/Search";
import Settings from "./components/Settings";
import ItemPage from "./components/ItemPage";


function App() {
    return (
        <ApiProvider>
            <Session>
                <NotificationContainer />
                <Container className='d-flex py-3'>
                    <div className='col-lg-2 d-lg-flex d-block justify-content-between'>
                        <MainNavbar />
                        <div className='vr d-lg-block d-none'></div>
                    </div>

                    <div className='col-lg-10 col-12 mt-lg-0 mt-5'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/search' element={<Search />} />
                            <Route path='/settings' element={<Settings />} />
                            <Route path='/item' element={<ItemPage />} />
                        </Routes>
                    </div>
                </Container>
            </Session>
        </ApiProvider>
    );
}

export default App;
