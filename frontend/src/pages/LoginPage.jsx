import React, {useContext} from 'react'
import {Authenticate} from '../context/AuthContext'
import peoplePNG from '../assets/images/people-ai.png'
import { Link } from 'react-router-dom';
export default function LoginPage() {

    const { loginUser,loginResponse } = useContext(Authenticate);
    console.log("user login ",loginResponse)
  return (
    <div className='bg-[#eee9e6] flex items-center py-[10%] font-poppins'>
   
        <form onSubmit={loginUser} method='post' encType="multipart/form-data" className="flex flex-col w-[400px] mx-auto gap-5 py-10">
            <div>
            <h1 className='text-2xl text-black '>Log In</h1>
            <p >Welcome back, Please enter your details</p>
            </div>
            <input className="rounded-md px-2 py-[4px]" type="email" name="email" id="" placeholder="Email Address"/>
            <input className="rounded-md px-2 py-[4px]" type="password" name="password" id="" placeholder="Set your password"/>
            <div className='text-sm flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <p>Remember for 30 days</p>
                </div>
                <Link >Forget Password</Link>
            </div>
            <button  className='bg-slate-900 text-white py-1 rounded-md'>Log In</button>
            {loginResponse['detail'] && <><h2 className='text-red-500 font-lato text-sm'>Something went wrong! check your credintials</h2></>}
            <button className='bg-white text-slate-900 py-1 rounded-md'>Sign in with Google</button>
            <p className='text-sm text-center'>Don't have an account? <Link className='underline' to="/signup">Signup</Link></p>
        </form>
        <div className="px-16 w-[700px] ">
            <img className='h-fit w-[400px]' src={peoplePNG} alt="" />
        </div>
    </div>
  )
}
