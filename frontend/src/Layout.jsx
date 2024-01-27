import React,{useContext, useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Authenticate } from './context/AuthContext';
import { UserFetchData } from './context/FetchData'

function Layout() {
    let { authTokens, user, logoutUser } = useContext(Authenticate);
    let { userData, getUserData } = useContext(UserFetchData);

    const [loading, setLoading] = useState(true);
    const [isUserReady, setIsUserReady] = useState(false);

    useEffect(() => {
        console.log("Now can fetch")
        console.log(user)
        setLoading(false)
    }, [user])

    useEffect(() => {
        getUserData()
    }, [loading])


  return (
    <>
        <div className='h-[100vh] flex bg-whitewall'>
            <Sidebar/>
            <div className='w-full'>
            <Navbar user_data={userData}  logOutFun={logoutUser}/>
            <Outlet />
            </div>
        </div>
    </>
  )
}

export default Layout