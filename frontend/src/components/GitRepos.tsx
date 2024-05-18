import React from 'react'
import github from '../assets/github-mark-white.png'
import statIcon from '../assets/stats.svg'
import branchIcon from '../assets/code-branch.svg'
const data = [
    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    },

    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    }
    ,

    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    },
    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    },

    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    }
    ,

    {
        name: "curious-content",
        url: "curious-content.vercel.app",
        repo: "ManishMadan2882/curiousCap",
        commit: "Merged into 'main' into main",
        desc: "39d ago on main"
    }
]
const GitRepos = () => {
    return (
        <div className='relative space-grotesk'>

            <div className="pointer-events-none absolute top-20 left-0 right-0 z-0 block mx-auto h-[75vw] w-[75vw] rounded-full bg-fluorescent-blue blur-3xl md:h-[422px] md:w-[422px]">
                {/* flouroscent blue glow */}
            </div>

            <button className='float-right rounded-md text-silver mt-8 px-2 py-1 bg-[#3b60e4] hover:bg-sky-700 transition duration-500'>Import +</button>
            <div className='w-full justify-center flex'>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 my-6 text-silver max-w-7xl'>

                    {data.map((elem) => {
                        return (
                            <div className='metallic-gradient p-[1px] rounded-lg'>
                                <div className='shadow-sm shadow-slate-800 w-96 p-6 rounded-lg bg-chinese-black'>
                                    <div className='flex justify-between '>
                                        <div className='flex '>
                                            <img src={github} width={32} height={32} className='h-fit' alt='image' />
                                            <div className='flex flex-col text-sm mx-2'>
                                                <span>{elem.name}</span>
                                                <a href={`https://github.com/${elem.url}`} className='hover:text-blue-600 duration-200 transition-all'>{elem.url}</a>
                                            </div>
                                        </div>
                                        <button className='p-1 bg-gray-950 rounded-full hover:opacity-50 opacity-75' title='Stats'>
                                            <img src={statIcon} width={32} height={32} className='h-fit' alt='image' />
                                        </button>
                                    </div>
                                    <div className='my-2'>
                                        <a className='rounded-xl py-1 px-3 text-sm bg-zinc-800 hover:bg-gray-600 duration-200 transition' href='/'>{elem.repo}</a>
                                    </div>
                                    <p className='text-sm mt-8'>{elem.commit}</p>
                                    <p className='text-sm'>{elem.desc}
                                        <img src={branchIcon} alt='branch' className='invert opacity-55 filter w-3 ml-2 inline' /></p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default GitRepos