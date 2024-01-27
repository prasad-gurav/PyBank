import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { HomePage, PaymentPage, LoginPage, SignupPage, InvestmentPage, ServicesPage,VerifyUser } from './pages/Pages';
import Authenticate from './context/AuthContext';
import FetchData from './context/FetchData';
import PrivateRoute from './PrivateRoute';



function App() {
    return (
        <>
            <Authenticate>
            <FetchData>
                <Routes>
                    <Route exact path='signup' element={<SignupPage />} />
                    <Route exact path='login' element={<LoginPage />} />
                    <Route path="verifyuser/:userToken" element={<VerifyUser/>} />
                    <Route exact path='' element={<PrivateRoute />} >
                        <Route exact path='/' element={<Layout />} >
                            <Route exact path='' element={<HomePage />} />
                            <Route exact path='payment' element={<PaymentPage />} />
                            <Route exact path='services' element={<ServicesPage />} />
                            <Route exact path='investment' element={<InvestmentPage />} />
                        </Route>
                    </Route>
                </Routes>
                </FetchData>
            </Authenticate>
        </>
    )
}

export default App