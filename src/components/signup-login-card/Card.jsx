import React from 'react'
import { Link } from 'react-router-dom';
import {
    PersonIcon,
    BackpackIcon,
    KeyboardIcon,
} from '@radix-ui/react-icons';
// import googleIcon from "../../assets/icons/google-icon.svg";

export default function Card({ title }) {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 p-10 w-sm bg-white rounded-md shadow-2xl">
                <h2 className='text-2xl font-bold'>{title}</h2>
                {/* <div className='w-full'>
                    <button className='flex justify-center items-center gap-2 p-2 w-full border-1 rounded text-sm transition-all duration-200 hover:scale-[0.95]'>
                        <img
                            className='h-6'
                            src={googleIcon}
                            alt="google icon" />
                        Continue with Google
                    </button>
                </div>
                */}
                <form className='flex flex-col items-center justify-center gap-5 w-full'>
                    {
                        title === "Sign up" ?
                            (
                                <div className="flex flex-col gap-1 w-full rounded text-sm">
                                    <label
                                        className="flex items-center gap-2 font-semibold"
                                        htmlFor="userNameInput">
                                        Username
                                        <PersonIcon />
                                    </label>
                                    <input
                                        id='emailInput'
                                        className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                                        type="email"
                                        placeholder="Enter username" />
                                </div>
                            ) : null
                    }
                    <div className="flex flex-col gap-1 w-full rounded text-sm">
                        <label
                            className="flex items-center gap-2 font-semibold"
                            htmlFor="emailInput">
                            Email address
                            <BackpackIcon />
                        </label>
                        <input
                            id='emailInput'
                            className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                            type="email"
                            placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col gap-1 w-full rounded text-sm">
                        <label
                            className="flex items-center gap-2 font-semibold"
                            htmlFor="passwordInput">
                            Password
                            <KeyboardIcon />
                        </label>
                        <input
                            id='passwordInput'
                            className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                            type="password"
                            placeholder='Enter your password' />
                    </div>
                    <button
                        className='py-2 px-5 bg-[#3e63dd] text-sm font-bold text-white rounded transition-all duration-200 hover:opacity-80 hover:cursor-pointer'
                        type='submit'
                    >Done</button>
                </form>
                {
                    title === "Sign up" ?
                        (
                            <>
                                <div className="flex justify-center items-center gap-2 w-full text-gray-500">
                                    <hr className="flex-grow border-gray-500" />
                                    <p className="text-sm">or</p>
                                    <hr className="flex-grow border-gray-500" />
                                </div>
                                <div className='flex justify-between w-full text-sm'>
                                    <span>already have an account?</span>
                                    <Link
                                        to="/login"
                                        className='text-[#3e63dd] font-bold hover:cursor-pointer'>
                                        Login
                                    </Link>
                                </div>
                            </>
                        ) : null
                }

            </div>
        </>
    )
}
