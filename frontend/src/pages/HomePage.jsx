import React,{ useContext, useEffect } from 'react'

import { BasicBars,DebitCard,Transactions } from '../components/components'
import { UserFetchData } from '../context/FetchData';

function HomePage() {
    const { userData,getUserTransactions,userTransactions,switchState } = useContext(UserFetchData);

    useEffect(()=>{
        getUserTransactions()
    },[switchState])

    return (
        <div className='text-black px-4 flex justify-center gap-5 '>
            <div>
            <div id="my-account" className='flex gap-4 my-2'>
                <div className='border-[1px] border-black w-[350px] bg-orange text-white h-[180px] flex  items-end justify-between px-5 py-4 rounded-md'>
                <h2 className='font-manrope text-2xl'>Balance</h2>
                 <h1 className='text-6xl'>₹{userData.account_bal}</h1>       
                </div>
                <div  className='border-[1px] border-black w-[350px] bg-yellow text-white h-[180px] flex  items-end justify-between px-5 py-4 rounded-md'>
                <h2 className='font-manrope text-2xl'>Spend</h2>
                 <h1 className='text-6xl'>₹2000</h1>       
                </div>
            </div>
            <div className="w-fit bg-white  ">
                <BasicBars />
            </div>
            </div>
            <div>
                <DebitCard user={userData}/>
                <Transactions transactions={userTransactions}/>
            </div>

        </div>
    )
}

export default HomePage