import React from 'react'

export default function MyAccount() {
    return (
        <>
            <div className=' flex flex-col items-center justify-center gap-10 p-5 max-w-1/3 bg-white/20 backdrop-blur-md'>
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
                <div className='flex flex-col justify-between items-center gap-5 p-5 w-full text-sm bg-white rounded border'>
                    <p className='text-lg font-bold text-center'>Post Blog</p>
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
        </>
    )
}
