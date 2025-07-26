import { useSelector } from 'react-redux';
import allBlogs from "../assets/json/blogs.json";
import Card from '../components/blog-cards/Card';
export default function Dashboard() {
    const theme = useSelector(state => state.themeReducer.theme);
    return (
        <>
            <div className='flex items-start gap-5 p-5 w-full max-sm:flex-col max-sm:justify-center max-sm:items-center'>
                <div className=' flex flex-col items-center justify-center gap-10 min-w-1/2 p-5 bg-white/20 backdrop-blur-md rounded max-sm:w-full'>
                    <div className='w-full bg-white rounded'>
                        <div className='flex justify-between items-center p-5 w-full'>
                            <div>
                                <p className='mb-2 font-bold'>Username</p>
                                <p className='text-sm'>Email address</p>
                            </div>
                            <img
                                className='max-w-20 rounded-full'
                                src="/images/default-pfp.jpg"
                                alt="" />
                        </div>
                        <button className='w-full p-1 text-white bg-[#3e63dd] rounded-b-sm transition-all duration-200 hover:opacity-90 hover:cursor-pointer'>
                            Edit profile
                        </button>
                    </div>
                    <div className='flex flex-col justify-between items-center gap-5 p-5 w-full text-sm bg-white rounded'>
                        <p className='text-lg font-bold text-center'>Post new Blog</p>
                        <form className='flex flex-col justify-center gap-5 w-full'>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full bg-white border file:mr-5 file:p-2 file:text-white file:bg-[#3e63dd]"
                            />
                            <input
                                className='p-2 bg-white outline focus:outline-[#3e63dd] focus:outline-2'
                                type="textarea"
                                placeholder='Title' />
                            <textarea
                                placeholder="Your content here"
                                className="p-3 h-50 bg-white resize-none outline focus:outline-[#3e63dd] focus:outline-2"
                            />
                            <button
                                className='py-2 px-5 text-sm font-bold text-white bg-[#3e63dd] rounded transition-all duration-200 hover:opacity-80 hover:cursor-pointer'
                                type='submit'
                            >Done</button>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-10 w-1/2 pt-5 pb-5 bg-white/20 backdrop-blur-2xl rounded max-sm:w-full'>
                    <p className={`text-center text-lg font-bold ${theme === "dark" ? "text-white" : ""}`}>My Blogs</p>
                    <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center gap-10 p-5 w-full'>
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
            </div>
        </>
    )
}