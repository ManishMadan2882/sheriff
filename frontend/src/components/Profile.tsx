import redirectIcon from '../assets/redirect.png'
import moment from 'moment'
const Profile =({profile}:{profile:any}) => {
    return (
        <div className='flex justify-center rounded-md shadow-md w-full metallic-gradient p-[2px] space-grotesk'>
            <div className=' rounded-md p-4 w-full bg-chinese-black'>
                <div className='flex justify-start items-center gap-6'>
                    <img className='w-32 shadow-lg shadow-slate-black rounded-full' src={profile?.data?.avatar} />
                    <div className='flex text-white flex-col w-full p-2'>
                        <h1 className='text-2xl'>{profile?.data.Name}</h1>
                        <div className='flex justify-start gap-12 my-4'>
                            <div>
                                <span className='text-silver'>Github Id:{' '}</span>
                                <a href={profile?.data.profileUrl} className='hover:text-blue-500'>
                                    {profile?.data.username}
                                    <img src={redirectIcon} alt='visit' className='inline ml-1' width={16} /></a>
                            </div>
                            <div>
                                <span className='text-silver'>Since </span>
                                <span>{moment(profile?.data.createdAt).fromNow()}</span>
                            </div>
                            <div>
                                <span className='text-silver'>Repos:{' '}</span>
                                <span>{profile?.data.numOfRepos}</span>
                            </div>
                        </div>
                        <hr className='border-gun-metal' />

                    </div>

                </div>
                <div className='flex justify-start text-sm gap-12 my-2 text-silver'>
                    {/* <div className='hover:text-sky-400'>
                        <a target='_blank' href='https://github.com/manishmadan2882'>
                            Github Profile
                            <img src={redirectIcon} alt='visit' className='inline ml-1' width={16} />
                        </a>
                    </div> */}
                    <span>{profile?.data.bio}</span>
                </div>
            </div>
        </div>
    )
}

export default Profile