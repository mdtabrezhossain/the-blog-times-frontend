import { Link } from "react-router-dom";

export default function Card({ blogId, authorName, title, imageSrc }) {
    return (
        <>
            <div className={`flex flex-col justify-between h-[400px] w-[200px] bg-white overflow-hidden rounded-xl`}>
                <img
                    src={imageSrc}
                    alt="image"
                    loading='lazy'
                    className='h-sm w-sm aspect-square object-cover'
                />
                <p className='p-3 font-bold text-xl line-clamp-5'>{title}</p>
                <Link
                    to={`/blogs/${authorName}/${blogId}`}
                    className='p-2 text-white text-center font-bold bg-[#3e63dd] cursor-pointer transition-all duration-200 hover:opacity-50'
                >Read more</Link>
            </div>
        </>
    )
}