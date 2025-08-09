import { useEffect, useState } from "react";
import allBlogs from "../assets/json/blogs.json"
import Card from "./blog-cards/Card"

export default function BlogCardsContainer({ url }) {

  const [blogs, setBlogs] = useState([]);
  console.log(blogs)

  async function fetchBlogs() {
    const response = await fetch(url, {
      credentials: "include"
    });

    const { blogs } = await response.json();
    setBlogs(blogs);
  }

  useEffect(() => { fetchBlogs() }, []);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center gap-10'>
      {
        blogs.map((blog, idx) =>
          <Card
            key={idx}
            title={blog.title}
            imageSrc={blog.imageUrl}
          />
        )
      }
    </div>
  )
}