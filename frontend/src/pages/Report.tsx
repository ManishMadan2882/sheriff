import React, { useEffect, useState } from 'react'
import checkmark from '../assets/check.svg'
import cross from '../assets/error.svg'
import branch from '../assets/code-branch.svg'
import { useParams } from 'react-router'
import { useContext } from 'react'
import warn from '../assets/exclamation.svg'
import { DataContext } from '../components/context/RepoSync'
const host = import.meta.env.VITE_DOMAIN
const Report = () => {
    const [repo, setRepo] = useState<any>(null)
    const [url, setUrl] = useState('')
    const params = useParams();
    const id = params.id;
    // console.log(id)
    const [report, setReport] = useState<any>([])
    const [success, setSuccess] = useState(false)
    const sliceFromSecondLastSlash = (str: string): string => {
        const lastSlashIndex = str.lastIndexOf('/');
        if (lastSlashIndex === -1) return str; // No slashes found

        const secondLastSlashIndex = str.lastIndexOf('/', lastSlashIndex - 1);
        if (secondLastSlashIndex === -1) return str.slice(lastSlashIndex + 1); // Only one slash found

        return str.slice(secondLastSlashIndex + 1);
    };
    const getDepTest = async () => {
        fetch(`${host}/get-analysis/${id}`)
            .then(res => res.json())
            .then((resjson: any) => {
                const { data } = resjson;
                setRepo(resjson?.repo)
                console.log(resjson)
                const arr = [];
                if (!data) return;
                const keys = Object.keys(data);
                const vals = Object.values(data);
                for (let i = 0; i < keys.length; i++) {
                    arr.push({
                        key: keys[i],
                        val: vals[i]
                    });
                }
                if (resjson.success) setSuccess(true);
                console.log(arr);
                setUrl(resjson.repo.url)

                console.log('repo', resjson?.repo);

                setReport(arr)

            })
            .catch(err => console.log(err)
            )
    }

    useEffect(() => {
        getDepTest();
    }, [])

    return (
        <div className='min-w-max space-grotesk'>

            <div className='flex justify-center rounded-md shadow-md w-full metallic-gradient p-[2px]'>
                <div className=' rounded-md p-4 w-full bg-chinese-black'>
                    <div className='flex justify-start w-full items-center gap-6'>
                        <img className='w-12 filter invert py-2' src={branch} />
                        <div className='flex text-white flex-col w-full p-2'>
                            {repo && <h1 className='text-2xl'>{sliceFromSecondLastSlash(repo?.url)}</h1>}
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

            {!success ?
                <div className='bg-chinese-black p-4  flex justify-start text-silver'>
                    <img src={warn} className='inline mr-4 w-8 h-8  bg-cadmium-orange rounded-3xl' />
                    <div >
                        <p>Run the Dependency analysis </p>
                        <span className='text-xl text-cadmium-orange'>Report not found</span>
                    </div>
                </div> :
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