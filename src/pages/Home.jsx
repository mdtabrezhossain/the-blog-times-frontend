import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/blog-cards/Card.jsx';


export default function Home() {
    const theme = useSelector(state => state.themeReducer.theme);
    const [allBlogs, setAllBlogs] = useState([]);
    const isUserLoggedIn = localStorage.getItem("isLogin");

    async function showFeed() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
            method: "GET",
            credentials: "include",
        });

        if (response.status == 401) {
            localStorage.removeItem("isLogin");
            localStorage.removeItem("username");
        }

        setAllBlogs(await response.json());
    }

    useEffect(() => {
        if (isUserLoggedIn === "true") showFeed();
    }, [isUserLoggedIn]);

    return (
        <div>
            <div className={`flex flex-col justify-center items-center gap-5 p-10 w-full h-[calc(100svh-56px)] ${theme === "light" ? "text-[var(--water-700)] bg-[var(--water-100)]" : "text-[var(--ash-100)] bg-[var(--ash-400)]"} rounded shadow-xl transition-all duration-300`}>
                <h2 className="font-bold text-6xl">Discover Ideas That Spark Curiosity</h2>
                <p className='text-xl '>Dive into different stories, smart tips, unexpected insights and beyond</p>
            </div>

            {
                isUserLoggedIn ? (
                    <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center gap-10 p-10 mt-25'>
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
                ) : null
            }
        </div>

    )
}
