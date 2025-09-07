import { Pencil2Icon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";

export default function BigCard() {
    const theme = useSelector(state => state.themeReducer.theme);
    const blogid = window.location.pathname.slice(7);
    const [blog, setBlog] = useState({
        imageUrl: null,
        title: "",
        content: ""
    });
    const [editBlog, setEditBlog] = useState(false);
    const blogTitleRef = useRef(null);
    const blogContentRef = useRef(null);

    async function fetchBlog() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${blogid}`, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok) {
            const { imageUrl, title, content } = await response.json();
            setBlog({
                imageUrl,
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

    function handleUpdateBlogBtnClick() {
        editBlog === false ? setEditBlog(true) : setEditBlog(false);
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
                    <img
                        src={blog.imageUrl}
                        className="object-contain w-full rounded-md transition-opacity duration-300"
                        loading="lazy"
                    />
                    {
                        editBlog ?
                            (<span className="absolute inset-0 flex items-center justify-center font-bold text-black opacity-0 cursor-pointer transition-all duration-300 hover:bg-white/75 hover:opacity-100">
                                Change
                            </span>) : null
                    }
                </div>
                <div
                    className="flex gap-1 p-2 text-sm self-end text-white bg-[#3e63dd] cursor-pointer"
                    onClick={handleUpdateBlogBtnClick}
                >
                    {
                        editBlog ? (
                            <p className="px-5">Save</p>
                        ) : (
                            <>
                                <p>Update blog</p>
                                <Pencil2Icon />
                            </>
                        )
                    }
                </div>
                <textarea
                    className="text-4xl resize-none overflow-hidden outline-0"
                    ref={blogTitleRef}
                    value={blog.title}
                    onChange={editBlog ? handleBlogTitleChange : undefined}
                    required
                />
                <textarea
                    className="resize-none overflow-hidden outline-0"
                    ref={blogContentRef}
                    value={blog.content}
                    onChange={editBlog ? handleBlogContentChange : undefined}
                />
            </div>
        </div >
    )
}