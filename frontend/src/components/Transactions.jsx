import React,{useContext} from 'react'

import Switch from "react-switch";
import {UserFetchData} from '../context/FetchData';


function Transactions(props) {
    const { handleSwitch,switchState } = useContext(UserFetchData)

    console.log(props.transactions)



    return (
        <>
            <div className='flex items-center justify-between '>
                <h1 className='font-lato text-2xl m-2 font-bold'>Transactions</h1>
                <Switch height={28} width={58} offColor='#00cdd6' className="px-8" checkedIcon={false} uncheckedIcon={false} onColor='#db5437' onChange={handleSwitch} checked={switchState} />
            </div>
            <div className='overflow-y-scroll h-[320px] bg-white'>
                {props.transactions && props.transactions.map((transaction) => {
                    return (
                        <div className="transaction-details flex items-center justify-evenly py-3">
                            <div className='w-[60px] h-[60px] flex items-start justify-center rounded-full overflow-hidden bg-slate-900'>
                                <img className='w-12 ' src={"http://127.0.0.1:8000" + transaction.additional_data.profile_pic} alt="" />
                            </div>
                            <div className="details">
                                <h1>{transaction.additional_data.full_name}</h1>
                                <h2>{transaction.additional_data.account_num}</h2>
                            </div>

                            <h1 className="status bg-green-500 text-white font-poppins text-md px-2 rounded-xl">{transaction.transaction_type}</h1>

                            <h2>{transaction.amount}</h2>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Transactions