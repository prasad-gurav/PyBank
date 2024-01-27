import React from 'react'

function DebitCard(props) {
    return (
        <div id='debit-card' className="card rounded-lg w-[530px] h-[260px] flex flex-col items-start justify-center px-6 my-2">
            <div className='flex text-white font-poppins items-center justify-between gap-[200px]'>
                <h1 className='text-3xl  font-lato'>Master Card</h1>
                <img width="60" height="60" src="https://img.icons8.com/office/80/sim-card-chip.png" alt="sim-card-chip" />
            </div>
            <div>
                <div className='flex text-white font-poppins gap-[200px] text-lg'>
                    <h2>{`${props.user.first_name}  ${props.user.last_name}`}</h2>
                    <p>10/27</p>
                </div>
                <div className='flex gap-4 text-white font-poppins py-2 text-lg'>
                    <p>1234</p>
                    <p>5678</p>
                    <p>9123</p>
                    <p>4567</p>
                </div>
            </div>
        </div>
    )
}

export default DebitCard