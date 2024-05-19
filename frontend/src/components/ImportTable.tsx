import React, { Fragment } from 'react'
import github from '../assets/github-mark-white.png'
import { useState } from 'react'
const ImportTable = ({ repos, importRepo }: { repos: any, importRepo: (repoUrl: string) => void }) => {
    const [queue, setQueue] = useState<string[]>([])
    return (
        <div className='text-silver my-4 rounded-xl py-4 border-cadet-gray border max-h-[80vh] w-[550px]'>
            <h1 className='text-3xl text-silver mx-4'>Import Git Repository</h1>
            <div className=' my-4 rounded-lg text-silver flex flex-col overflow-y-auto h-[70vh] '>

                {repos?.data.map((repo: any, key: number) => {
                    return (
                        <Fragment key={key}>
                            <div className='flex justify-between border-b last:border-none py-4 px-6 border-cadet-gray bg-transparent hover:bg-black duration-300 transition'>
                                <div>
                                    <img src={github} alt='github' className='inline mx-2' width={24} />
                                    <span className='text-lg'>{repo.name}</span>
                                </div>
                                <button
                                    disabled={typeof queue.find((elem) => elem === repo?.html_url) === 'string'}
                                    onClick={() => {
                                        importRepo(repo?.html_url)
                                        repo && setQueue((prev) => [...prev, repo.html_url])
                                    }}
                                    className='bg-[#3b60e4] py-2 px-4 rounded-md text-sm hover:bg-indigo-600 transition duration-500'>
                                    {queue.find((elem) => elem === repo?.html_url) ? <div className="flex items-center justify-center space-x-2">
                                        <div className="dot bg-white w-2 h-2 rounded-full animate-bounce" />
                                        <div className="dot bg-white w-2 h-2 rounded-full animate-bounce delay-150" />
                                        <div className="dot bg-white w-2 h-2 rounded-full animate-bounce delay-300" />
                                    </div> : 'Import'}
                                </button>
                            </div>
                        </Fragment>)
                })}

            </div>
        </div>
    )
}

export default ImportTable