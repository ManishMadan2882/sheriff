import React, { Fragment } from 'react'
import github from '../assets/github-mark-white.png'
const Repos = () => {
    const repos = ['algoRythm', 'sheriff', 'zulip', 'keploy', 'docker', 'excpedia']
    return (
        <div className='texr-silver my-4 rounded-xl py-4 px-16 border-[#7765E3] border'>
            <h1 className='text-3xl text-silver'>Import Git Repository</h1>
            <div className=' my-4 rounded-lg text-silver flex flex-col w-[450px]'>
                
                    {repos.map((repo, key) => {
                        return (
                            <Fragment key={key}>
                                <div className='flex justify-between border-b last:border-none py-4 px-6 border-[#7765e3] bg-transparent hover:bg-black duration-300 transition'>
                                    <div>
                                        <img src={github} alt='github' className='inline mx-2' width={24} />
                                         <span className='text-lg'>{repo}</span>   
                                    </div>
                                    <button className='bg-[#3b60e4] py-2 px-4 rounded-md text-sm hover:bg-indigo-600 transition duration-500'>
                                        Import
                                    </button>
                                </div>
                            </Fragment>)
                    })}
           
            </div>
        </div>
    )
}

export default Repos