
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { getCsrfToken } from './csrfToken';
import { useNavigate } from 'react-router-dom';

export const Authenticate = createContext();


function AuthContext(props) {
    const backendUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const csrfToken = getCsrfToken();

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    const [loginResponse,setLoginResponse] = useState()
    let signupUser = async (e) => {
        e.preventDefault();
        let userSubmitedData = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            profile_pic: e.target.image.files[0],
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            account_num: 'xxxx'
        }
        try {
            const signup = await axios({
                method: 'POST',
                url: `${backendUrl}/accounts/signup/`,

                // withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    xsrfHeaderName: 'X-CSRFToken',
                    // xsrfCookieName: 'csrftoken',
                    'X-CSRFToken': csrfToken,
                },
                "data": userSubmitedData
            }).then((response) => {
                console.log(response.data)
      
                console.log(response)
                if (response.status === 200) {
                    console.log("Succeed")
                    navigate('login')

                }
            })

        }
        catch (error) {
            console.log(error)
        }
    }
    const loginUser = async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let response = await fetch(`${backendUrl}/accounts/login/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email, 'password': password })

        })
        let data = await response.json()
        setLoginResponse(data)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }
        else {
            console.log('Something Went Wrong')
        }



    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens');
        navigate('login')
        // window.location.reload();
    }
    let refreshToken = async () => {
        let response = await fetch(`${backendUrl}/accounts/refresh/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })

        })
        let data = await response.json()

        if (response.status === 200) {
            console.log(data)
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }

    const data = {
        // this data will pass to components through context_API 
        signupUser: signupUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens,
        loginResponse:loginResponse
    }

    // this useEffect for refresh auth token after centain of time 
    useEffect(() => {
        let refreshTokenInterval = setInterval(() => {
            if (authTokens) {
                refreshToken()
                console.log("Updating Token")
            }
        }, 100000);
        return () => clearInterval(refreshTokenInterval)
    }, [authTokens, loading])

    return (
        <Authenticate.Provider value={data}>{props.children}</Authenticate.Provider>
    )
}

export default AuthContext