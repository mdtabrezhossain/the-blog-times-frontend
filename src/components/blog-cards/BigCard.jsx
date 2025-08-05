import { useEffect, useState } from "react"

export default function BigCard() {

    const blogid = window.location.pathname.slice(7);
    const [blog, setBlog] = useState({
        imageUrl: null,
        title: null,
        content: null
    });

    async function fetchBlog() {
        // http://localhost:5173/blogs/68922f95b35891037c764068
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

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="flex gap-2 w-full p-5 max-sm:flex-col max-sm:items-center max-sm:justify-center">
            <img
                src={blog.imageUrl}
                className="w-1/2 object-contain h-full rounded-md max-sm:w-full"
                loading="lazy"
            />
            <div className="flex flex-col p-5 max-sm:flex-col">
                <h2 className='font-bold text-5xl mb-5'>{blog.title}</h2>
                <p>{blog.content}</p>
            </div>
        </div>
    )
}