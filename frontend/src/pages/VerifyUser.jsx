import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Circles } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';

function VerifyUser() {
    const backendUrl = process.env.REACT_APP_API_URL;
    const { userToken } = useParams();
    let userCredintialstoVerify = userToken.split('-');
    const [loading, setLoading] = useState(false)
    const [userVerified, setUserVerified] = useState(false);


    let verifyUser = async () => {
        setLoading(true)
        let response = await fetch(`${backendUrl}/accounts/verify-me/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ 'user_id': userCredintialstoVerify[0], 'token': userCredintialstoVerify[1] })
        })
        let data = await response.json()
        if (response.status === 200) {
            console.log('user', data)
            setUserVerified(true)
            setLoading(false)

        }
    }

    return (
        <div className='flex flex-col justify-center items-center py-6 bg-yellow h-[100vh]'>
            <h1 className='text-4xl font-poppins font-bold uppercase bg-orange px-12 text-white'>Verify User</h1>
            <Player
                autoplay
                loop
                src="https://assets1.lottiefiles.com/packages/lf20_L7YrbxFm46.json"
                style={{ height: '500px', width: '400px' }}
            >
                <Controls visible={false} />
            </Player>

            {userVerified ? <> <NavLink className="font-poppins font-bold hover:bg-white hover:text-orange bg-orange w-[200px] text-slate-200 rounded-md my-4 text-center" to={'login'}>LOGIN</NavLink> </>:
            <>
            {loading ? <Circles
                height="30"
                width="30"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> : <button onClick={verifyUser} className='font-poppins font-bold hover:bg-white hover:text-orange bg-orange w-[200px] text-slate-200 rounded-md my-4'>Verify Me</button>}</>}

            {userVerified ? <h2 className='font-lato'> You are verified user now.Just click to login</h2>:<h2 className='font-lato'> Click on this button to verify your email</h2>}
        </div>
    )
}

export default VerifyUser