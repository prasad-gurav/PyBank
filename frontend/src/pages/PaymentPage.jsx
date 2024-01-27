import React, { useContext, useEffect, useState } from 'react'
import { Authenticate } from '../context/AuthContext'
import patternPNG from '../assets/images/credit-cards.gif';
import successIcon from '../assets/images/icons8-success-144.png'
import errorIcon from '../assets/images/cross-.png'
import { Circles } from 'react-loader-spinner'


function PaymentPage() {
    const backendUrl = process.env.REACT_APP_API_URL;
    let { authTokens } = useContext(Authenticate);
    const [loading, setLoading] = useState(false)
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [responseIMG, setResponseIMG] = useState(errorIcon)

    let payment = async (e) => {
        e.preventDefault()
        setLoading(true)
        let email = e.target.email.value;
        let amount = e.target.amount.value;

        let response = await fetch(`${backendUrl}/accounts/payment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens.access
            },
            body: JSON.stringify({ "email": email, "amount": amount })

        })
        let data = await response.json()
        console.log(data)
        console.log(response.status)
        if (response.status === 200) {
            setPaymentStatus(data)
            setLoading(false)
  
        }
        else {
            setLoading(false)
            console.log(response.status)

        }
    }
    let handleCloseMe = () =>{
        setPaymentStatus(null)
        document.getElementById("payement-form").reset();
    }
    useEffect(() => {
        console.log(paymentStatus)

       if (paymentStatus !== null){
        if (paymentStatus['Transaction Status'] === "Completed"){
            setResponseIMG(successIcon)
        }
       }
    }, [paymentStatus])
    return (
        <>
            <div className={`flex justify-between items-center relative  h-full bg-[#fff2e1] `}>
                {paymentStatus !== null ? <>   <div id='response-box' className="absolute z-10 bg-white text-black w-[500px] h-[300px] left-[45%] top-[40%]">
                    <button className='hover:bg-orange p-2' onClick={handleCloseMe}>
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/delete-sign--v1.png" alt="delete-sign--v1" />
                    </button>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-center text-2xl font-poppins'>Transaction :{paymentStatus['Transaction Status']}</h1>
                        {paymentStatus['Reason'] &&
                            <>Reason : {paymentStatus['Reason']}</>}
                        <img className='w-[160px]' src={responseIMG} alt="" />
                    </div>
                </div></> : <></>}
                <div className={`flex items-center mb-16 mx-auto ${paymentStatus ? 'blur-me':''}`}>
                    <div className='text-6xl font-bold font-josefin pl-6'>
                        <h1>Make Digital</h1>
                        <h1>Transaction</h1>
                        <h1>Easily</h1>
                    </div>
                    <img className='w-[300px]' src={patternPNG} alt="" />
                </div>

                <form id='payement-form' onSubmit={payment} method="post" className={`bg-white flex flex-col gap-6 w-[650px] px-4 h-full py-[10%] font-lato  ${paymentStatus ? 'blur-me':''}`}>
                    <div className="text-4xl text-center font-poppins font-bold">Payment</div>
                    <input type="email" className='px-2 border-2 border-black rounded-md' required name="email" id="" placeholder='receiver@gmail.com' />
                    <input type="text" required className='px-2 border-2 border-black rounded-md' name="amount" id="" placeholder='Amount' />
                    <input type="text" className='px-2 border-2 border-black rounded-md' name="purpose" id="" placeholder='Purpose' />
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" name="" id="" />
                        <p>Notify to receiver</p>
                    </div>
                    {loading ? <div className='flex justify-center'>
                        <Circles
                            height="30"
                            width="30"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div> : <button className='bg-slate-900 text-white py-1 rounded-md'>Pay</button>}
                </form>
            </div>
        </>
    )
}

export default PaymentPage