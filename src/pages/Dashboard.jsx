import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import allBlogs from "../assets/json/blogs.json";
import Card from '../components/blog-cards/Card.jsx';
import { Pencil1Icon, } from '@radix-ui/react-icons';



export default function Dashboard() {
    const theme = useSelector(state => state.themeReducer.theme);
    const currentURL = window.location.pathname;
    const endIdx = currentURL.lastIndexOf("/");
    const username = currentURL.slice(7, endIdx);
    const [user, setUser] = useState({});
    const [editProfile, setEditProfile] = useState(false);

    async function getDashBoardData() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${username}/dashboard/`, {
            credentials: "include"
        });

        if (response.status === 403) {
            alert("You are not allowed to access this url");
            return
        }
        const data = await response.json();
        console.log(data)
        const { userName, nickName, email } = data;
        console.log({ userName, nickName, email });
        setUser({ userName, userNickName: nickName, userEmail: email });
    }

    function handleEditProfileBtnClick() {
        const elements = [
            document.getElementById("userNameInput"),
            document.getElementById("userNickNameInput"),
            document.getElementById("userEmailInput")
        ];

        if (!editProfile) {

            for (const x of elements) {
                x.removeAttribute("readOnly");
                x.classList.add("border-b");
            }

            setEditProfile(true);
            return;
        }

        for (const x of elements) {
            console.log(x.value);
            x.setAttribute("readOnly", "");
            x.classList.remove("border-b");
        }

        setEditProfile(false);
        return;
    }

    function handleProfileDetailsChange(event) {
        const InputFieldMap = {
            userNameInput: "userName",
            userNickNameInput: "userNickName",
            userEmailInput: "userEmail"
        }

        setUser((previousData) => {
            return {
                ...previousData,
                [InputFieldMap[event.target.id]]: event.target.value
            }
        });
    }

    useEffect(() => {
        if (username) getDashBoardData();
    }, [username]);

    if (!user) return null;

    return (
        <>
            <div className='flex items-start gap-5 p-5 w-full max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                <div className='flex flex-col items-center justify-center gap-10 min-w-1/2 p-5 bg-white/20 backdrop-blur-md rounded max-sm:w-full'>
                    <div className='w-full bg-white rounded'>
                        <div className='flex flex-col justify-between items-center gap-5 p-5 w-full'>
                            <img
                                className='max-w-20 rounded-full'
                                src="/images/default-pfp.jpg"
                                alt=""
                            />
                            <div className='flex flex-col gap-3 w-full'>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNameInput'
                                        className='font-bold w-full outline-none'
                                        type='text'
                                        value={user.userName}
                                        placeholder='Your username here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {editProfile ? <Pencil1Icon /> : null}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNickNameInput'
                                        className='w-full outline-none'
                                        type='text'
                                        value={user.userNickName}
                                        placeholder='Your nick name here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {editProfile ? <Pencil1Icon /> : null}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userEmailInput'
                                        className='w-full outline-none'
                                        type='text'
                                        value={user.userEmail}
                                        placeholder='Your email name here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {editProfile ? <Pencil1Icon /> : null}
                                </div>
                            </div>

                        </div>
                        <div className='flex max-sm:flex-col max-sm:gap-1'>
                            <button
                                className='w-full p-1 text-white bg-[#3e63dd] transition-all duration-200 hover:opacity-50 hover:cursor-pointer hover:scale-[0.9]'
                                onClick={handleEditProfileBtnClick}
                            >
                                {!editProfile ? "Edit profile" : "Save changes"}
                            </button>
                            <button className='w-full p-1 text-white bg-gray-700 transition-all duration-200 hover:opacity-50 hover:cursor-pointer hover:scale-[0.9]'>
                                Log out
                            </button>
                            <button className='w-full p-1 text-white bg-[#ff0033] transition-all duration-200 hover:opacity-50 hover:cursor-pointer hover:scale-[0.9]'>
                                Delete account
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between items-center gap-5 p-5 w-full text-sm bg-white rounded'>
                        <p className='text-lg font-bold text-center'>Post new Blog</p>
                        <form className='flex flex-col justify-center gap-5 w-full'>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full bg-white border file:mr-5 file:p-2 file:text-white file:bg-[#3e63dd]"
                            />
                            <input
                                className='p-2 bg-white outline focus:outline-[#3e63dd] focus:outline-2'
                                type="textarea"
                                placeholder='Title' />
                            <textarea
                                placeholder="Your content here"
                                className="p-3 h-50 bg-white resize-none outline focus:outline-[#3e63dd] focus:outline-2"
                            />
                            <button
                                className='py-2 px-5 text-sm font-bold text-white bg-[#3e63dd] rounded transition-all duration-200 hover:opacity-80 hover:cursor-pointer'
                                type='submit'
                            >Done</button>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-10 w-1/2 pt-5 pb-5 bg-white/20 backdrop-blur-2xl rounded max-sm:w-full'>
                    <p className={`text-center text-lg font-bold ${theme === "dark" ? "text-white" : ""}`}>My Blogs</p>
                    <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center gap-10 p-5 w-full'>
                        {
                            allBlogs.map((blog, idx) =>
                                <Card
                                    key={idx}
                                    title={blog.title}
                                    imageSrc={`images/${blog.image}`}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}