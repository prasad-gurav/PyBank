import { useContext } from "react";
import { Navigate,Outlet } from 'react-router-dom';
import  { Authenticate }  from './context/AuthContext';


const PrivateRoute = () => {
    let { user } = useContext(Authenticate);
    console.log('user logged' , user)
    return user ? <Outlet/> : <Navigate to='/login'/>;

}

export default PrivateRoute;