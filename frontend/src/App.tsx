import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ImportTable from "./pages/Import"
import { useEffect, useState } from "react"
import Stats from "./pages/Stats"
import Report from "./pages/Report"
import { DataContext, DataProvider } from "./components/context/RepoSync"
import Landing from "./pages/Landing"
const host = import.meta.env.VITE_DOMAIN
export default function App() {
  const [repos, setRepos] = useState<any>()
  const [profile, setProfile] = useState<any>(null);
  const getProfile = () => {
    fetch(`${host}/profile`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then((data: any) => {
        setProfile(data)
      })
  }
  useEffect(() => {
    fetch(`${host}/my-repos`, {
      method: 'GET',
      credentials: 'include',
    }
    ).then((res) => res.json())
      .then((data) => {
        setRepos(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
    getProfile();
  }, [])
  return (
    <DataProvider>
      <div className="pointer-events-none absolute top-36 -left-24 z-0  hidden h-[286px] w-[286px] rounded-full bg-purple-x11 blur-3xl lg:block ">
        {/*  purple glow - only for wide screen */}
      </div>
      <div className="pointer-events-none absolute top-[600px] right-20 z-0 mx-auto h-[152px] w-[152px] rounded-full bg-ultramarine-light blur-3xl lg:h-[224px] lg:w-[224px]">
        {/* ultramarine glow */}
      </div>
      <div className="w-screen">
        <Nav profile={profile} />
        <div className="">
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing/>}/>
                {profile && profile.success && <div className="max-w-6xl">
                  <Route path="/dashboard" element={<Dashboard profile={profile} />} />
                  <Route path="/import" element={<ImportTable repos={repos} />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/report/:id" element={<Report />} />
                </div>}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </DataProvider>
  )
}