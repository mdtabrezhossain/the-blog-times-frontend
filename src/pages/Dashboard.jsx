import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil1Icon, } from '@radix-ui/react-icons';
import { upload } from '@imagekit/react';
import allBlogs from "../assets/json/blogs.json";
import Card from '../components/blog-cards/Card.jsx';
import Modal from '../components/Modal.jsx';
import { toggleLoginAction, updateUserNameAction } from '../store/slices/UserSlice.js';


export default function Dashboard() {
    const theme = useSelector(state => state.themeReducer.theme);
    const username = useSelector(state => state.userReducer.username);
    const [user, setUser] = useState({
        userName: null,
        userEmail: null,
        userNickName: null,
        userPassword: null
    });
    const [profileOptions, setProfileOptions] = useState({
        editProfile: false,
        saveChanges: false,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function getDashBoardData() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${username}/dashboard/`, {
            credentials: "include"
        });

        if (response.status === 403) {
            alert("You are not allowed to access this url");
            return;
        }

        const {
            userName,
            nickName,
            email,
            token,
            signature,
            publicKey,
            expire
        } = await response.json();
        localStorage.setItem("username", userName);
        dispatch(updateUserNameAction());

        sessionStorage.setItem("imageKitToken", JSON.stringify({
            token,
            signature,
            publicKey,
            expire
        }));

        setUser({
            userName,
            userNickName: nickName,
            userEmail: email
        });
    }

    async function handleEditProfileBtnClick() {
        const elements = [
            document.getElementById("userNewNameInput"),
            document.getElementById("userNewNickNameInput"),
            document.getElementById("userNewEmailInput"),
        ];

        if (!profileOptions.editProfile) {

            for (const x of elements) {
                x.removeAttribute("readOnly");
                x.classList.add("border-b");
            }

            const userNewPasswordInput = document.getElementById("userNewPasswordInput");
            userNewPasswordInput.removeAttribute("readOnly")
            userNewPasswordInput.classList.remove("hidden");
            userNewPasswordInput.classList.add("border-b");

            setProfileOptions(prev => ({
                ...prev,
                editProfile: true,
            }));

            return;
        }

        for (const x of elements) {
            x.setAttribute("readOnly", "");
            x.classList.remove("border-b");
        }
        userNewPasswordInput.setAttribute("readOnly", "");
        userNewPasswordInput.classList.remove("border-b");
        userNewPasswordInput.classList.add("hidden");

        setProfileOptions({
            editProfile: false,
            saveChanges: true,
            confirmPassword: true
        });

        return;
    }

    function handleProfileDetailsChange(event) {
        const InputFieldMap = {
            userNewNameInput: "userName",
            userNewNickNameInput: "userNickName",
            userNewEmailInput: "userEmail",
            userNewPasswordInput: "userPassword"
        }

        setUser(previousData => {
            return {
                ...previousData,
                [InputFieldMap[event.target.id]]: event.target.value
            }
        });
    }

    async function handlePasswordConfirmBtnClick() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${username}/dashboard`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                newUserName: user.userName,
                newUserEmail: user.userEmail,
                newUserNickName: user.userNickName,
                newUserPassword: document.getElementById("userNewPasswordInput").value,
                passwordToVerify: document.getElementById("passwordInput").value
            })
        });
        document.getElementById("userNewPasswordInput").value = "";

        if (response.ok) {
            localStorage.setItem("username", user.userName);
            dispatch(updateUserNameAction());
        }

        else if (response.status === 401) {
            alert("Incorrect Password !");
        }

        else if (response.status === 500) {
            alert("Something went wrong on our side !");
        }

        setProfileOptions({
            editProfile: false,
            saveChanges: false,
            confirmPassword: false
        });

        setUser(prev => ({
            ...prev,
            userPassword: null
        }));
    }

    async function handlePasswordCancelBtnClick() {
        document.getElementById("userNewPasswordInput").value = "";
        setUser(prev => ({
            ...prev,
            userPassword: null
        }));

        setProfileOptions({
            editProfile: false,
            saveChanges: false,
            confirmPassword: false
        });

        await getDashBoardData();
    }

    async function handleLogoutBtnClick() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${username}/dashboard/logout`, {
            credentials: "include"
        });

        if (response.ok) {
            localStorage.clear();
            dispatch(toggleLoginAction());
            dispatch(updateUserNameAction());
            navigate("/");
        }
    }

    function handleProfileImageClick() {
        document.getElementById("profileImageInput").click();
    }

    async function handleProfileImageUpload(event) {
        const imageFile = event.target.files[0];
        console.log(event.target.files[0]);
        const imageKitToken = JSON.parse(sessionStorage.getItem("imageKitToken"));
        console.log(imageKitToken);
        const uploadResponse = await upload({
            fileName: imageFile.name,
            file: imageFile,
            ...imageKitToken
        });
        // const uploadResponse = await upload({
        //     expire,
        //     token,
        //     signature,
        //     publicKey,
        //     imageFile,
        // });
        const { url } = await uploadResponse.json();
        console.log("\n\nUpload response:", uploadResponse);
        console.log("\n\nUpload file url:", url);
    }

    useEffect(() => {
        (async () => {
            if (username) {
                await getDashBoardData();
                navigate(`/users/${username}/dashboard`);
            }
        })();
    }, [username]);

    if (user.userName === null) {
        return null;
    }

    return (
        <>
            <div className='flex items-start gap-5 p-5 w-full max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                <div className='flex flex-col items-center justify-center gap-10 min-w-1/2 p-5 bg-white/20 backdrop-blur-md rounded max-sm:w-full'>
                    <div className='w-full bg-white rounded'>
                        <div className='flex flex-col justify-between items-center gap-5 p-5 w-full'>
                            <div
                                className="relative overflow-hidden cursor-pointer before:absolute before:w-full before:h-full before:place-content-center before:text-center hover:before:content-['Change'] hover:before:bg-white/75"
                                onClick={handleProfileImageClick}
                            >
                                <img
                                    className='max-w-25 rounded-full'
                                    src="/images/default-pfp.jpg"
                                    alt="profile picture"
                                />
                                <input
                                    id="profileImageInput"
                                    type="file"
                                    accept="image/*"
                                    className='hidden'
                                    onChange={handleProfileImageUpload}
                                />
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNewNameInput'
                                        className='font-bold w-full outline-none'
                                        type='text'
                                        value={user.userName || ""}
                                        placeholder='Your username here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {profileOptions.editProfile ? <Pencil1Icon /> : null}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNewNickNameInput'
                                        className='w-full outline-none'
                                        type='text'
                                        value={user.userNickName || ""}
                                        placeholder='Your nick name here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {profileOptions.editProfile ? <Pencil1Icon /> : null}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNewEmailInput'
                                        className='w-full outline-none'
                                        type='text'
                                        value={user.userEmail || ""}
                                        placeholder='Your email name here'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {profileOptions.editProfile ? <Pencil1Icon /> : null}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input
                                        id='userNewPasswordInput'
                                        className='w-full outline-none hidden'
                                        type='password'
                                        value={user.userPassword || ""}
                                        placeholder='Your new password here (optional)'
                                        onChange={handleProfileDetailsChange}
                                        readOnly
                                    />
                                    {profileOptions.editProfile ? <Pencil1Icon /> : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex max-sm:flex-col max-sm:gap-1'>
                            <button
                                className='w-full p-1 text-white bg-[#3e63dd] transition-all duration-200 hover:opacity-50 hover:cursor-pointer hover:scale-[0.9]'
                                onClick={handleEditProfileBtnClick}
                            >
                                {!profileOptions.editProfile ? "Edit profile" : "Save changes"}
                            </button>
                            <button className='w-full p-1 text-white bg-gray-700 transition-all duration-200 hover:opacity-50 hover:cursor-pointer hover:scale-[0.9]'
                                onClick={handleLogoutBtnClick}
                            >
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
            {
                profileOptions.confirmPassword ? (
                    <Modal>
                        <div className=' flex flex-col gap-5 p-7 bg-white rounded-md'>
                            <input
                                className='p-1 outline focus:outline-[#3e63dd]'
                                id='passwordInput'
                                type="password"
                                placeholder='Enter password to confirm'
                            />
                            <div className='flex justify-between w-full'>
                                <button
                                    className='px-2 py-1 text-white rounded bg-[#3e63dd]'
                                    onClick={handlePasswordConfirmBtnClick}
                                >Confirm</button>
                                <button
                                    className='px-2 py-1 text-white rounded bg-[#3e63dd]'
                                    onClick={handlePasswordCancelBtnClick}
                                >Cancel</button>
                            </div>
                        </div>
                    </Modal>
                ) : null
            }
        </>
    )
}