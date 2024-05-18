import React from 'react'
import GitRepos from '../components/GitRepos'
import Profile from '../components/Profile'

const Dashboard = ({profile}:{profile:any}) => {
    return (
        <div>
            <Profile profile={profile}/>
            <GitRepos/>
        </div>
    )
}

export default Dashboard