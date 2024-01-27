import React, { useContext } from 'react'
import { Authenticate } from '../context/AuthContext'
import imgPNG from '../assets/images/salary01-ai.png';
import { Link } from 'react-router-dom';
function SignupPage() {
  const { signupUser } = useContext(Authenticate);


  return (

    <div className='bg-[#eee9e6] flex items-start py-[8%] font-poppins'>
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
        <button className='bg-slate-900 text-white py-1 rounded-md'>Sign Up</button>
        <p className='text-sm text-center'>Already have an account? <Link className='underline' to="/login">Login</Link></p>
      </form>
      <div className="px-16 w-[700px] ">
        <img className='h-fit w-[600px]' src={imgPNG} alt="" />
      </div>
    </div>





  )
}

export default SignupPage