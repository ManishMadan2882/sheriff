import React from 'react'
import { useNavigate } from 'react-router';
import ImportTable from '../components/ImportTable'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const host = import.meta.env.VITE_DOMAIN
const Import = ({ repos }: any) => {
    const navigate =useNavigate()
    const importRepoOnServer = (repoUrl: string) => {
        console.log(repoUrl);

        fetch(`${host}/checkoutCode`, {
            method: 'post',
            credentials: 'include',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                repoUrl: repoUrl+'.git'
            })
        }).then(res => res.json())
            .then((data) => {
                if (data.success){
                    toast.success("Repository linked successfully!");
                    navigate('/dashboard')
                }
                else
                    toast.error("Oops! Something went wrong")
            })
            .catch(error => {
                toast.error(error)
            })
    }
    return (
        <div>
            <ImportTable repos={repos} importRepo={importRepoOnServer} />
            <ToastContainer />
        </div>
    )
}

export default Import