import React from 'react'
import redirectIcon from '../assets/redirect.png'
const Profile = () => {
    return (
        <div className='flex justify-center rounded-md shadow-md w-full metallic-gradient p-[2px] space-grotesk'>
            <div className=' rounded-md p-4 w-full bg-chinese-black'>
                <div className='flex justify-start items-center gap-6'>
                    <img className='w-32 shadow-lg shadow-slate-black rounded-full' src={'https://avatars.githubusercontent.com/u/96079232?v=4'} />
                    <div className='flex text-white flex-col w-full p-2'>
                        <h1 className='text-2xl'>Manish Madan</h1>
                        <div className='flex justify-start gap-12 my-4'>
                            <div>
                                <span className='text-silver'>Github Id:{' '}</span>
                                <a href='github.com/manishmadan2882' className='hover:text-blue-500'>
                                    ManishMadan2882
                                    <img src={redirectIcon} alt='visit' className='inline ml-1' width={16} /></a>
                            </div>
                            <div>
                                <span className='text-silver'>Join Date:{' '}</span>
                                <span>Nov 28, 2021</span>
                            </div>
                            <div>
                                <span className='text-silver'>Repos:{' '}</span>
                                <span>38</span>
                            </div>
                        </div>
                        <hr className='border-gun-metal' />

                    </div>

                </div>
                <div className='flex justify-evenly text-sm gap-12 my-2 text-silver'>
                    {/* <div className='hover:text-sky-400'>
                        <a target='_blank' href='https://github.com/manishmadan2882'>
                            Github Profile
                            <img src={redirectIcon} alt='visit' className='inline ml-1' width={16} />
                        </a>
                    </div> */}
                    <span>Software Developer</span>
                    <span>Bangalore, IN</span>
                </div>
            </div>
        </div>
    )
}

export default Profile