import {
    useEffect,
    useRef,
} from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import Card from '../components/blog-cards/Card.jsx';
import {
    updateBlogsReadCountAction,
    updateBlogsReadAction
} from '../store/slices/Feed.js';


export default function Home() {
    const blogsContainerFootRef = useRef(null);
    const theme = useSelector(state => state.themeReducer.theme);
    const blogsReadCount = useSelector(state => state.feedReducer.blogsReadCount);
    const blogsRead = useSelector(state => state.feedReducer.blogsRead);
    const dispatch = useDispatch();
    const isUserLoggedIn = localStorage.getItem("isLogin");

    async function showFeed() {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ blogsReadCount })
        });

        dispatch(updateBlogsReadAction(await response.json()));
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                dispatch(updateBlogsReadCountAction());
            }
        });

        if (blogsContainerFootRef.current) {
            observer.observe(blogsContainerFootRef.current);
        }

        return () => {
            if (blogsContainerFootRef.current) {
                observer.unobserve(blogsContainerFootRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isUserLoggedIn === "true") showFeed();
    }, [blogsReadCount]);


    return (
        <div>
            <div className={`flex flex-col justify-center items-center gap-5 p-10 w-full h-[calc(100svh-56px)] ${theme === "light" ? "text-[var(--water-700)] bg-[var(--water-100)]" : "text-[var(--ash-100)] bg-[var(--ash-400)]"} rounded shadow-xl transition-all duration-300`}>
                <h2 className="font-bold text-6xl">Discover Ideas That Spark Curiosity</h2>
                <p className='text-xl '>Dive into different stories, smart tips, unexpected insights and beyond</p>
            </div>

            {
                isUserLoggedIn ? (
                    <>
                        <div
                            className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] place-items-center gap-10 p-10 mt-25'>
                            {
                                blogsRead.map((blog, idx) =>
                                    <Card
                                        key={idx}
                                        blogId={blog._id}
                                        authorName={blog.author.userName}
                                        title={blog.title}
                                        imageSrc={blog.imageUrl}
                                    />
                                )
                            }
                        </div>
                        <div ref={blogsContainerFootRef} className='h-1 w-full'></div>
                    </>
                ) : null
            }
        </div>

    )
}
