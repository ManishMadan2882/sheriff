import React, { useEffect } from 'react'
import github from '../assets/github-mark-white.png'
import statIcon from '../assets/stats.svg'
import branchIcon from '../assets/code-branch.svg'
import { useNavigate } from 'react-router'
import report from '../assets/report.svg'
import moment from 'moment'
import { useState } from 'react'
const host = import.meta.env.VITE_DOMAIN
const GitRepos = () => {
    const [syncedRepos,setSyncedRepos] = useState<any>()
    const navigate = useNavigate();
    const getMyRepos = () => {
        fetch(`${host}/synced-repos`, {
            method: 'get',
            credentials: 'include'
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSyncedRepos(data)

            })
    }
    useEffect(() => {
        getMyRepos();
    }, [])
    return (
        <div className='relative space-grotesk'>

            <div className="pointer-events-none absolute top-20 left-0 right-0 z-0 block mx-auto h-[75vw] w-[75vw] rounded-full bg-fluorescent-blue blur-3xl md:h-[422px] md:w-[422px]">
                {/* flouroscent blue glow */}
            </div>

            <button onClick={() => navigate('/import')} className='float-right rounded-md text-silver mt-8 px-2 py-1 bg-[#3b60e4] hover:bg-sky-700 transition duration-500'>Import</button>
            <div className='w-full justify-center flex'>
                {(syncedRepos?.data?.length === 0) && <div className='flex justify-center text-white'>
                    No data found
                    {/* <img src={disconnected} alt='no data to show' width={40} height={36} /> */}
                </div>}
                <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 my-6 text-silver max-w-7xl'>

                    {syncedRepos?.data?.map((elem: any) => {
                        const splittedUrl = elem.url.split('/');
                        const timeline = moment(elem.updatedAt).fromNow();
                        const name = (splittedUrl[splittedUrl?.length - 2] + '/' + splittedUrl[splittedUrl?.length - 1]).split('.')[0];
                        const repo_name = splittedUrl[splittedUrl?.length - 1].split('.')[0]
                        return (
                            <div className='metallic-gradient p-[1px] rounded-lg'>
                                <div className='shadow-sm shadow-slate-800 w-96 p-6 h-full rounded-lg bg-chinese-black'>
                                    <div className='flex justify-between '>
                                        <div className='flex '>
                                            <img src={github} width={32} height={32} className='h-fit' alt='image' />
                                            <div className='flex flex-col text-sm mx-2'>
                                                <span>{repo_name}</span>
                                                <a href={elem.url} className='hover:text-blue-600 duration-200 transition-all text-xs'>{name}</a>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    navigate('/report/' + elem._id)
                                                }
                                                }
                                                className='p-1 rounded-full h-fit hover:opacity-50 opacity-75' title='Static code analysis'>
                                                <img src={report} width={32} height={32} className='h-fit  invert filter' alt='image' />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    navigate('/stats')
                                                }}
                                                className='p-1 bg-gray-950 rounded-full h-fit hover:opacity-50 opacity-75' title='Dynamic code analysis'>
                                                <img src={statIcon} width={32} height={32} className='h-fit' alt='image' />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                    onClick={()=>{
                                        fetch(`${host}/run-analysis/${elem._id}`)
                                        .then(res => res.json())
                                        .then((data:any)=>{
                                            
                                        })
                                    }}  
                                    className='bg-gray-800 hover:bg-gray-800 px-2 py-1 my-6 rounded-3xl'>Run dependency analysis</button>
                                    <p className='text-sm mt-2'>
                                        Last Sync
                                        {' '+timeline+' '}
                                        <img src={branchIcon} alt='branch' className='invert opacity-55 filter w-3 mx-2 inline' />
                                    </p>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default GitRepos