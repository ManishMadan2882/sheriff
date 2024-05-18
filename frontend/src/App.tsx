import GitRepos from "./components/GitRepos"
import Nav from "./components/Nav"
import Profile from "./components/Profile"
import Repos from "./components/Repos"
export default function App() {
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
            <Profile />
            <GitRepos />
          </div>
        </div>
      </div>
    </>
  )
}