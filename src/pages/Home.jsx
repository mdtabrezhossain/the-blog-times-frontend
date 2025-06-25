import React from 'react'
import allBlogs from "../assets/json/blogs.json";
import Card from '../components/post-cards/Card.jsx'

export default function Home() {
    return (
        <div className='p-10 max-sm:p-5'>
            <div className='grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] place-items-center gap-10 '>
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
