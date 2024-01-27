import React from 'react'
import { IoIosSearch } from "react-icons/io";

function Navbar(props) {
    return (
        <>
            <div className="h-[70px]  flex items-center px-4 justify-between">
                <div className="logo">
                    LOGO
                </div>
                <div id="serach-box" className='bg-white  w-[300px] h-[35px] flex items-center justify-between px-4'>
                    <input type="text" className='px-2 w-[250px] h-[35px] text-lg font-poppins' name="" id="" placeholder='Search' />
                    <IoIosSearch className='text-2xl' />
                </div>
                <div id="profile-img" className='w-[50px] h-[50px] overflow-hidden'>
                    <img className=' rounded-full' src={props.user_data ? "http://127.0.0.1:8000/" + props.user_data.profile_pic : "http://127.0.0.1:8000/media/profiles/profile-avtaar_8mLVAWK.png"} alt="" />
                </div>
                <div id="logout-button">
                    <button onClick={props.logOutFun} className=' font-poppins bg-orange hover:bg-red-500 text-white p-2'>LOG OUT</button>
                </div>
            </div>
        </>
    )
}

export default Navbar