import React from 'react'
import allBlogs from "../assets/json/blogs.json";
import Card from '../components/blog-cards/Card.jsx'
import { useSelector } from 'react-redux';

export default function Home() {
    const theme = useSelector(state => state.themeReducer.theme);
    return (
        <div>
            <div className={`flex flex-col justify-center items-center gap-5 mb-25 p-10 w-full h-[calc(100svh-56px)] ${theme === "light" ? "text-[var(--water-700)] bg-[var(--water-100)]" : "text-[var(--ash-100)] bg-[var(--ash-400)]"} rounded shadow-xl transition-all duration-300`}>
                <h2 className="font-bold text-6xl">Discover Ideas That Spark Curiosity</h2>
                <p className='text-xl '> Dive into different stories, smart tips, unexpected insights and beyond</p>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] place-items-center gap-10 mb-10'>
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
    )
}
