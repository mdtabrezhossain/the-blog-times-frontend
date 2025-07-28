import { useActionState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    PersonIcon,
    LockClosedIcon,
    EnvelopeClosedIcon
} from '@radix-ui/react-icons';

export default function Card({ title }) {
    const [state, formAction, isPending] = useActionState(handleFormSubmit);
    const navigate = useNavigate();

    async function handleFormSubmit() {
        const userEmail = document.querySelector("#emailInput").value;
        const userPassword = document.querySelector("#passwordInput").value;

        if (title === "Sign up") {
            const userName = document.querySelector("#nameInput").value;
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword
                })
            });

            if (response.status === 201) {
                localStorage.setItem("isLogin", "true");
                navigate('/');
            }
            else if (response.status === 400) {
                alert("Username is invalid !");
            }
            else if (response.status === 409) {
                alert("User already exists! Please Login.");
            }
            else if (response.status === 500) {
                alert("Something went wrong on our side.");
            }
        }

        else if (title === "Login") {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    userEmail: userEmail,
                    passwordToVerify: userPassword
                })
            });

            if (response.ok) {
                const { userName } = await response.json();
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("username", userName);
                navigate('/');
            }
            else if (response.status === 401) {
                alert("Incorrect Password !");
            }
            else if (response.status === 404) {
                alert("User not found !");
            }
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-5 p-10 w-sm bg-white rounded-md shadow-2xl">
                <h2 className='text-2xl font-bold'>{title}</h2>
                <form
                    action={formAction}
                    className='flex flex-col items-center justify-center gap-5 w-full'>
                    {
                        title === "Sign up" ?
                            (
                                <div className="flex flex-col gap-1 w-full rounded text-sm">
                                    <label
                                        className="flex items-center gap-2 font-semibold"
                                        htmlFor="nameInput">
                                        Username
                                        <PersonIcon />
                                    </label>
                                    <input
                                        id='nameInput'
                                        className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                                        type="text"
                                        placeholder="Enter username"
                                        required />
                                </div>
                            ) : null
                    }
                    <div className="flex flex-col gap-1 w-full rounded text-sm">
                        <label
                            className="flex items-center gap-2 font-semibold"
                            htmlFor="emailInput">
                            Email address
                            <EnvelopeClosedIcon />
                        </label>
                        <input
                            id='emailInput'
                            className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                            type="email"
                            placeholder="Enter your email"
                            required />
                    </div>
                    <div className="flex flex-col gap-1 w-full rounded text-sm">
                        <label
                            className="flex items-center gap-2 font-semibold"
                            htmlFor="passwordInput">
                            Password
                            <LockClosedIcon />
                        </label>
                        <input
                            id='passwordInput'
                            className='w-full p-2 border-1 transition-all duration-200 focus:outline-[#3e63dd]'
                            type="password"
                            placeholder='Enter your password'
                            required />
                    </div>
                    <button
                        className={`py-2 px-5 bg-[#3e63dd] text-sm font-bold text-white rounded transition-all duration-200 hover:opacity-80 hover:cursor-pointer ${isPending ? "opacity-50 " : ''}`}
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
                                <div className='flex justify-center gap-2 w-full text-sm'>
                                    <span>Already have an account?</span>
                                    <Link
                                        to="/users/login"
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