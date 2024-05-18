import React from 'react'
import GitRepos from '../components/GitRepos'
import Profile from '../components/Profile'

const Dashboard = () => {
    return (
        <div>
            <Profile/>
            <GitRepos/>
        </div>
    )
}

export default Dashboard