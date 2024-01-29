import React, { useContext, useEffect, useState } from 'react'
import { Authenticate } from '../context/AuthContext'
import imgPNG from '../assets/images/salary01-ai.png';
import { Link, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'

function SignupPage() {
  const navigate = useNavigate();

  const { signupUser, signupWait, signupResponse, signupErrorResponse,handleSignupErrorBox, user } = useContext(Authenticate);
  const [errorBox, setErrorBox] = useState(null)
  console.log(errorBox)

  let handleCloseMe = () => {
    setErrorBox(null)
    console.log(errorBox)
  }

  useEffect(() => {
    if (signupErrorResponse !== null) {
      setErrorBox(signupErrorResponse)
    }
  }, [signupErrorResponse])

  useEffect(() => {

    if (user !== null) {
      navigate('/')
    }
  }, [])

  return (

    <div className='bg-[#eee9e6] flex items-start py-[8%] font-poppins relative'>
      <form onSubmit={signupUser} method='post' encType="multipart/form-data" className="flex flex-col w-[500px] mx-auto gap-4">
        <div>
          <h1 className='text-2xl text-slate-900'>Create a account</h1>
          <p>Join Us Today</p>
        </div>
        <input className="rounded-md px-2 py-[4px]" type="text" name="first_name" id="" placeholder="First Name" />
        <input className="rounded-md px-2 py-[4px]" type="text" name="last_name" id="" placeholder="Last Name" />
        <input className="rounded-md px-2 py-[4px]" type="date" name="dob" id="" />
        <select name="gender" className="py-1 px-1 rounded-md" id="" >
          <option value="">--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="file" name="image" />
        <input className="rounded-md px-2 py-[4px]" type="email" name="email" id="" placeholder="Email Address" />
        <input className="rounded-md px-2 py-[4px]" type="tel" name="phone" id="" placeholder="Phone Number" />
        <input className="rounded-md px-2 py-[4px]" type="password" name="password" id="" placeholder="Set your password" />


        {signupWait ? <div className='flex justify-center'>
          <Circles
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div> : <button className='bg-slate-900 text-white py-1 rounded-md'>Sign Up</button>}
        {signupResponse && signupResponse['detail'] && <><h2 className='text-red-500 font-lato text-sm'>Something went wrong! check your credintials</h2></>}
        <p className='text-sm text-center'>Already have an account? <Link className='underline' to="/login">Login</Link></p>
      </form>

      {signupErrorResponse !== null ? <>

        <div id='erroBox' className='absolute bg-white w-[500px] h-[500px] left-[35%]' >
          <button className='hover:bg-orange p-2' onClick={handleSignupErrorBox} >
            <img width="30" height="30" src="https://img.icons8.com/ios/50/delete-sign--v1.png" alt="delete-sign--v1" />
          </button>
          <div className='flex flex-col items-start px-6 gap-2'>
            {signupErrorResponse.map((ele) => {
              return Object.entries(ele).map(([key, value], i) => {
                return (
                  <><li className='text-red-500'>{key} : {value}</li></>
                )
              })
            })
            }
          </div>
        </div>
      </> : <></>}

      <div className="px-16 w-[700px] ">
        <img className='h-fit w-[600px]' src={imgPNG} alt="" />
      </div>
    </div>





  )
}

export default SignupPage