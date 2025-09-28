import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { upload } from '@imagekit/react';
import { Pencil2Icon } from "@radix-ui/react-icons";

export default function BigCard() {
    const theme = useSelector(state => state.themeReducer.theme);
    const username = useSelector(state => state.userReducer.username);
    const url = window.location.pathname;
    const blogParams = url.slice(7);
    const blogAuthorName = url.slice(7, url.lastIndexOf("/"));

    const [blog, setBlog] = useState({
        imageUrl: null,
        imageFileId: "",
        title: "",
        content: ""
    });
    const [editBlog, setEditBlog] = useState(false);
    const blogTitleRef = useRef(null);
    const blogContentRef = useRef(null);
    const blogImageRef = useRef(null);
    const navigate = useNavigate();

    async function fetchBlog() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}`, {
            method: "GET",
            credentials: "include"
        });

        if (response.ok) {
            const { imageUrl, imageFileId, title, content } = await response.json();
            setBlog({
                imageUrl,
                imageFileId,
                title,
                content
            });
        }

        if (response.status === 404) {
            alert("Not Found !")
        }

        else if (response.status === 401) {
            alert("Inaccessible");
        }
    }

    function handleBlogImageClick() {
        blogImageRef.current.click();
    }

    async function handleBlogImageChange(event) {
        const imageFile = event.target.files[0];
        const imageKitToken = JSON.parse(sessionStorage.getItem("imageKitToken"));

        const uploadResponse = await upload({
            fileName: `${username}-blog_cover-${Date.now()}`,
            file: imageFile,
            ...imageKitToken
        });

        if (uploadResponse?.url) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}/image`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageFileId: blog.imageFileId })
            });

            await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newBlogImageUrl: uploadResponse.url,
                })
            });

            setBlog(prev => ({
                ...setBlog,
                imageFileId: uploadResponse.imageFileId,
                imageUrl: uploadResponse.url
            }));

        }
    }

    function handleEditBlogBtnClick() {
        editBlog === false ? setEditBlog(true) : setEditBlog(false);
    }

    async function handleSaveBlogBtnClick() {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newBlogTitle: blogTitleRef.current.value,
                newBlogContent: blogContentRef.current.value,
            })
        });
    }

    function handleBlogTitleChange(event) {
        setBlog(prev => ({
            ...prev,
            title: event.target.value
        }));
    }

    function handleBlogContentChange(event) {
        setBlog(prev => ({
            ...prev,
            content: event.target.value
        }));
    }

    async function handleDeleteBlogBtnClick() {
        alert("Please wait");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (response.ok) {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogParams}/image`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageFileId: blog.imageFileId })
            });

            alert("Blog deleted successfully");
            navigate(`/users/${localStorage.getItem("username")}/dashboard`);
            return;
        }

        else if (response.status === 500) {
            alert("Something went wrong! ");
            return;
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    useEffect(() => {
        const textarea = blogTitleRef.current;
        if (textarea) {
            textarea.style.height = "inherit";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [blog.title]);

    useEffect(() => {
        const textarea = blogContentRef.current;
        if (textarea) {
            textarea.style.height = "inherit";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [blog.content]);

    return (
        <div className={`flex gap-2 w-full p-5 max-sm:flex-col max-sm:items-center max-sm:justify-center ${theme === "dark" ? "text-white" : ""}`}>
            <div className="flex flex-col gap-5 p-5 w-full max-sm:flex-col bg-[var(--water-100)]">
                <div className="relative w-full max-sm:w-full">
                    <div
                        className={
                            blogAuthorName === username ?
                                "relative overflow-hidden cursor-pointer before:absolute before:w-full before:h-full before:place-content-center before:text-center hover:before:content-['Change'] hover:before:bg-white/75 before:transition-all before:duration-100" : ""
                        }
                        onClick={handleBlogImageClick}
                    >
                        <img
                            src={blog.imageUrl}
                            className="object-contain w-full rounded-md transition-opacity duration-300"
                            loading="lazy"
                        />
                        <input
                            type="file"
                            ref={blogImageRef}
                            accept="image/*"
                            onChange={handleBlogImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="text-black">Author: {blogAuthorName}</div>
                    {
                        blogAuthorName === username ? (
                            <>
                                <div className="flex gap-5">
                                    <div
                                        className="flex gap-2 p-2 text-sm self-end text-white bg-[#3e63dd] cursor-pointer"
                                        onClick={handleEditBlogBtnClick}
                                    >
                                        {
                                            editBlog ? (
                                                <p className="px-5" onClick={handleSaveBlogBtnClick}>Save</p>
                                            ) : (
                                                <>
                                                    <p>Edit blog</p>
                                                    <Pencil2Icon />
                                                </>
                                            )
                                        }
                                    </div>
                                    <div
                                        className="flex gap-2 p-2 text-sm self-end text-white bg-[#ff0033] cursor-pointer"
                                        onClick={handleDeleteBlogBtnClick}
                                    >
                                        Delete blog
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <textarea
                    className="text-black text-4xl resize-none overflow-hidden outline-0"
                    ref={blogTitleRef}
                    value={blog.title}
                    onChange={editBlog ? handleBlogTitleChange : undefined}
                    required
                />
                <textarea
                    className="text-black resize-none overflow-hidden outline-0"
                    ref={blogContentRef}
                    value={blog.content}
                    onChange={editBlog ? handleBlogContentChange : undefined}
                />
            </div>
        </div >
    )
}