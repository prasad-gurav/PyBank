import React from 'react'
import { MdManageAccounts, MdPayments, MdShoppingCartCheckout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AiFillFund } from "react-icons/ai";
function Sidebar() {
    return (
        <div className='flex flex-col w-[18%] items-center justify-start gap-10 py-10'>

            <NavLink to='' className={({ isActive }) =>
                `${isActive ? "bg-orange text-white" : ""} text-xl font-manrope  text-center rounded-md hover:bg-orange w-[180px]  py-[3px] hover:text-white flex justify-center gap-2`}><MdManageAccounts size={30}/> Overview </NavLink>

            <NavLink to='payment' className={({ isActive }) =>
                `${isActive ? "bg-orange text-white" : ""} text-xl font-manrope  text-center rounded-md hover:bg-orange w-[180px]  py-[3px] hover:text-white flex justify-center gap-2`}> <MdPayments  size={30}/> Payment </NavLink>

            <NavLink to='services' className={({ isActive }) =>
                `${isActive ? "bg-orange text-white" : ""} text-xl font-manrope  text-center rounded-md hover:bg-orange w-[180px]  py-[3px] hover:text-white flex justify-center gap-2`}> <MdShoppingCartCheckout  size={30}/> Services </NavLink>

            <NavLink to='investment' className={({ isActive }) =>
                 `${isActive ? "bg-orange text-white" : ""} text-xl font-manrope  text-center rounded-md hover:bg-orange w-[180px]  py-[3px] hover:text-white flex justify-center gap-2`}> <AiFillFund  size={30}/> Investment </NavLink>

        </div>
    )
}

export default Sidebar