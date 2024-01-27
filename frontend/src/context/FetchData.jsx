import React, { createContext, useContext, useEffect, useState } from 'react'
import { Authenticate } from './AuthContext';



export const UserFetchData = createContext();

function FetchData(props) {
    const backendUrl = process.env.REACT_APP_API_URL;

    let { authTokens } = useContext(Authenticate);
    let [userData, setUserData] = useState({});
    let [userTransactions,setUseTransactions] = useState([])

    const [switchState,setSwitchState] = useState(false)
    let transactionType = switchState ? "send_by_me" : "received"

    const handleSwitch = () =>{
        console.log("handleSwitch")
        setSwitchState(!switchState)
    }
    let getUserData = async () => {
        let response = await fetch(`${backendUrl}/accounts/myaccount/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens.access
            },
            body: null

        })
        let data = await response.json()
        if (response.status === 200) {
            console.log('user', data)
            setUserData(data)
        }
    }
    let getUserTransactions = async () => {
        let response = await fetch(`${backendUrl}/accounts/account-details/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens.access
            },
            body: JSON.stringify({'transaction_type': transactionType})
           

    })
        let data = await response.json()
        if (response.status === 200) {
            console.log('transac', data)
         
            if (Array.isArray(data)) {
                setUseTransactions(data.reverse());
                console.log('saved as array')
            } else {
                // If not an array, convert it to an array
                setUseTransactions(data);
            }
        }
    }
    
    const data = {
        userData: userData,
        getUserData: getUserData,
        userTransactions: userTransactions,
        getUserTransactions: getUserTransactions,
        switchState:switchState,
        handleSwitch:handleSwitch
    }
    return (
        <UserFetchData.Provider value={data}>{props.children}</UserFetchData.Provider>
    )
}

export default FetchData