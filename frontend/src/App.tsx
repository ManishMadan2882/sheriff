import Nav from "./components/Nav"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ImportTable from "./pages/Import"
import { useEffect, useState } from "react"
import Stats from "./pages/Stats"
import Report from "./pages/Report"
const host = import.meta.env.VITE_DOMAIN
export default function App() {
  const [repos,setRepos]=useState<any>()
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
  }, [])
  return (
    <>
      <div className="pointer-events-none absolute top-36 -left-24 z-0  hidden h-[286px] w-[286px] rounded-full bg-purple-x11 blur-3xl lg:block ">
        {/*  purple glow - only for wide screen */}
      </div>
      <div className="pointer-events-none absolute top-[100px] right-20 z-0 mx-auto h-[152px] w-[152px] rounded-full bg-ultramarine-light blur-3xl lg:h-[224px] lg:w-[224px]">
        {/* ultramarine glow */}
      </div>
      <div className="w-screen">
        <Nav />
        <div className="m-6 justify-center flex">
          <div className="max-w-screen-xl">
            <BrowserRouter>
              <Routes>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/import" element={<ImportTable repos={repos}/>} />
                <Route path="/stats" element={<Stats/>}/>
                <Route path="/report/:id" element={<Report/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </>
  )
}