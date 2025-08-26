import { useEffect, useState } from "react";
import Card from "./blog-cards/Card.jsx"

export default function BlogCardsContainer({ url }) {

  const [blogs, setBlogs] = useState([]);

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
            blogId={blog._id}
            authorName={blog.author.userName}
            key={idx}
            title={blog.title}
            imageSrc={blog.imageUrl}
          />
        )
      }
    </div>
  )
}