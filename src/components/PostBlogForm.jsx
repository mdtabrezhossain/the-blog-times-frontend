import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { upload } from "@imagekit/react";
import { useNavigate } from "react-router-dom";

export default function PostBlogForm() {

    const navigate = useNavigate();
    const username = useSelector(state => state.userReducer.username);
    const [isPending, setIsPending] = useState({
        value: false,
        intervalId: null
    });

    async function submitBlog(event) {
        event.preventDefault();
        setIsPending(prev => ({
            ...prev,
            value: true
        }));

        const imageFile = document.getElementById("blogImageInput").files[0];
        const title = document.getElementById("blogTitleInput").value;
        const content = document.getElementById("blogContentInput").value;
        const imageKitToken = JSON.parse(sessionStorage.getItem("imageKitToken"));

        const imageUploadResponse = await upload({
            ...imageKitToken,
            file: imageFile,
            fileName: `${username}-blog_cover-${Date.now()}`
        });

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${username}/blog`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageUrl: imageUploadResponse.url,
                title,
                content
            })
        });

        const { blogid } = await response.json();
        navigate(`/blogs/${username}/${blogid}`);

        setIsPending(prev => ({
            ...prev,
            value: false,
        }));


    }

    function handleFormSubmit(event) {
        submitBlog(event);
    }

    useEffect(() => {
        const div = document.getElementById("form-container");
        if (isPending.value) {
            const intervalId = setInterval(() => {
                div.style.opacity = div.style.opacity === "1" ? "0.50" : "1";
            }, 200);

            setIsPending(prev => ({
                ...prev,
                intervalId
            }));
            return;
        }

        clearInterval(isPending.intervalId);
        if (div) {
            div.style.opacity = "1";
        }

        setIsPending(prev => ({
            ...prev,
            value: false
        }));


    }, [isPending.value]);


    return (
        <div
            id="form-container"
            className="flex flex-col justify-between items-center gap-5 p-5 w-full text-sm bg-white rounded transition-all duration-200">
            <p className='text-lg font-bold text-center'>Post new Blog</p>
            <form className='flex flex-col justify-center gap-5 w-full' onSubmit={handleFormSubmit}>
                <input
                    id="blogImageInput"
                    type="file"
                    accept="image/*"
                    className="w-full bg-white border file:mr-5 file:p-2 file:text-white file:bg-[#3e63dd]"
                />
                <input
                    id="blogTitleInput"
                    className='p-2 bg-white outline focus:outline-[#3e63dd] focus:outline-2'
                    type="text"
                    placeholder='Title'
                    required />
                <textarea
                    id="blogContentInput"
                    placeholder="Your content here"
                    className="p-3 h-50 bg-white resize-none outline focus:outline-[#3e63dd] focus:outline-2"
                    required
                />
                <button
                    className='py-2 px-5 text-sm font-bold text-white bg-[#3e63dd] rounded transition-all duration-200 hover:opacity-80 hover:cursor-pointer'
                    type='submit'
                >Done</button>
            </form>
        </div>
    )
}
