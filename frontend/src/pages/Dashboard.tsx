import React from 'react'
import GitRepos from '../components/GitRepos'
import Profile from '../components/Profile'

const Dashboard = ({ profile }: { profile: any }) => {
    return (
        <div className='flex justify-center mt-8'>
            <div className='max-w-7xl'>
                <Profile profile={profile} />
                <GitRepos />
            </div>
        </div>
    )
}

export default Dashboard