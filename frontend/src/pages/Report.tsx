import React, { useEffect, useState } from 'react'
import checkmark from '../assets/check.svg'
import cross from '../assets/error.svg'
import { useParams } from 'react-router'
const host = import.meta.env.VITE_DOMAIN
const Report = () => {
    const params = useParams();

    const id = params.id;
    const [report, setReport] = useState<any>([])
    const getDepTest = () => {
        fetch(`${host}/get-analysis`)
            .then(res => res.json())
            .then((resjson: any) => {
                const { data } = resjson;
                const arr = [];
                const keys = Object.keys(data);
                const vals = Object.values(data);
                for (let i = 0; i < keys.length; i++) {
                    arr.push({
                        key: keys[i],
                        val: vals[i]
                    });
                }
                console.log(arr);

                setReport(arr)

            })
    }
    useEffect(() => {
        getDepTest();
    }, [])

    return (
        <div className='w-full space-grotesk'>

            <div className='flex justify-center rounded-md shadow-md w-full metallic-gradient p-[2px]'>
                <div className=' rounded-md p-4 w-full bg-chinese-black'>
                    <div className='flex justify-start items-center gap-6'>
                        {/* <img className='w-32 shadow-lg shadow-slate-black rounded-full' src={'https://avatars.githubusercontent.com/u/96079232?v=4'} /> */}
                        <div className='flex text-white flex-col w-full p-2'>
                            <h1 className='text-2xl'>algoRythm</h1>
                            <div className='flex justify-start gap-12 my-4'>
                                <div>
                                    <span className='text-silver'>Forks:{' '}</span>
                                    <a href='github.com/manishmadan2882' className='hover:text-blue-500'>
                                        5
                                        {/* <img src={''} alt='visit' className='inline ml-1' width={16} /> */}
                                    </a>
                                </div>
                                <div>
                                    <span className='text-silver'>Created :{' '}</span>
                                    <span>Nov 28, 2021</span>
                                </div>
                                <div>
                                    <span className='text-silver'>Forks:{' '}</span>
                                    <span>38</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className='text-silver mt-4 flex justify-between'>
                <h1>Static Code Analysis</h1>
                <h1>Report</h1>
            </div>
            <hr className='border-gun-metal my-6' />
 
            {
                report?.length > 0 ? report?.map((elem: { key: string, val: string[] }, key: number) => {
                    return (<>
                        <div className='bg-chinese-black p-4 flex justify-start text-silver my-2'>
                            <img src={cross} className='inline mr-4 w-8' />
                            <div >
                                <p>{elem.key}</p>
                                {
                                    elem.val?.map((child: string) => {
                                        return <span className='text-xl text-cyan-600'>{child}</span>
                                    })
                                }
                            </div>
                        </div>
                    </>)
                })
                    : <div className='bg-chinese-black p-4  flex justify-start text-silver'>
                        <img src={checkmark} className='inline mr-4 w-8' />
                        <div >
                            <p>All Checks successfully passed !</p>
                            <span className='text-xl text-cyan-600'>No vulnerability detected</span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Report