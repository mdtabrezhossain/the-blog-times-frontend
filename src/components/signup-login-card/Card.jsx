import React from 'react'
import googleIcon from "../../assets/icons/google-icon.svg";

export default function Card() {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 p-10 w-lg bg-white rounded-md">
                <h2 className='text-2xl font-bold'>Sign up</h2>
                <div className='w-full'>
                    <button className='flex justify-center items-center gap-2 p-2 w-full border-1 rounded text-sm'>
                        <img className='h-6' src={googleIcon} alt="" />
                        Continue with Google
                    </button>
                </div>
                <div className="flex justify-center items-center gap-2 w-full text-gray-500">
                    <hr className="flex-grow border-gray-500" />
                    <p className="text-sm">or</p>
                    <hr className="flex-grow border-gray-500" />
                </div>
                <div className="flex flex-col gap-1 w-full rounded text-sm">
                    <label className="font-semibold" htmlFor="emailInput">Email address</label>
                    <input className='w-full p-2 border-1'
                        id='emailInput'
                        type="email"
                        placeholder='Enter your email' />
                </div>
                <div className="flex flex-col gap-1 w-full rounded text-sm">
                    <label className="font-semibold" htmlFor="passwordInput">Password</label>
                    <input className='w-full p-2 border-1'
                        id='passwordInput'
                        type="password"
                        placeholder='Enter your password' />
                </div>
                <button className='py-2 px-5 bg-[#3e63dd] text-sm font-bold text-white rounded'>Done</button>
            </div>
        </>
    )
}
