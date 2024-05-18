import React, { Fragment } from 'react'
import github from '../assets/github-mark-white.png'
import { useState } from 'react'
const ImportTable = ({ repos, importRepo }: { repos: any, importRepo: (repoUrl: string) => void }) => {
    console.log('table c', repos);
    const [search, setSearch] = useState('')
    return (
        <div className='texr-silver my-4 rounded-xl py-4 px-16 border-cadet-gray border max-h-[80vh] overflow-y-auto'>
            <h1 className='text-3xl text-silver'>Import Git Repository</h1>
            <input value={search} onChange={((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value))} />
            <div className=' my-4 rounded-lg text-silver flex flex-col w-[450px]'>

                {repos?.data.map((repo: any, key: number) => {
                    return (
                        <Fragment key={key}>
                            <div className='flex justify-between border-b last:border-none py-4 px-6 border-cadet-gray bg-transparent hover:bg-black duration-300 transition'>
                                <div>
                                    <img src={github} alt='github' className='inline mx-2' width={24} />
                                    <span className='text-lg'>{repo.name}</span>
                                </div>
                                <button
                                    onClick={() => importRepo(repo?.html_url)}
                                    className='bg-[#3b60e4] py-2 px-4 rounded-md text-sm hover:bg-indigo-600 transition duration-500'>
                                    Import
                                </button>
                            </div>
                        </Fragment>)
                })}

            </div>
        </div>
    )
}

export default ImportTable