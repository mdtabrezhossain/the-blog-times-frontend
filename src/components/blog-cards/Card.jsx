import { useNavigate } from "react-router-dom";

export default function Card({ blogId, authorName, title, imageSrc }) {
    const navigate = useNavigate();

    function handleCardBtnClick() {
        navigate(`/blogs/${authorName}/${blogId}`);
    }

    return (
        <>
            <div className={`flex flex-col justify-between h-[400px] w-[200px] bg-white overflow-hidden rounded-xl`}>
                <img
                    src={imageSrc}
                    alt="image"
                    loading='lazy'
                    className='h-sm w-sm aspect-square object-cover'
                />
                <h2 className='p-5 font-bold text-xl'>{title}</h2>
                <button
                    onClick={handleCardBtnClick}
                    className='p-2 text-white font-bold bg-[#3e63dd] cursor-pointer transition-all duration-200 hover:opacity-50'
                >Read more</button>
            </div>
        </>
    )
}