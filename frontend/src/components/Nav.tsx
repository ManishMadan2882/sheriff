import Git from '../assets/github-mark-white.png'
import Shield from '../assets/shield-alt-solid.svg'
const BACKEND_URL = import.meta.env.VITE_DOMAIN
const Nav = () => {
  return (
    <nav className="bg-gradient-to-l from-gray-800 to-gray-900 p-4 backdrop-blur-lg bg-opacity-75 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <img className='w-6 inline-block mb-2 mr-2' src={Shield}/>
          <a className='text-cadmium-orange hover:underline underline-offset-8 germania-one-regular text-4xl' href="/">sheriff.</a>
        </div>
        <div className=''>
          <button
            onClick={
              () => {
                window.open(`${BACKEND_URL}/auth/github`,"_self");
              }
            }
            className="bg-chinese-black flex gap-3 text-white px-6 py-2 rounded transition duration-300 outline-cadet-gray  outline-1 hover:outline ">
            Login with
            <img src={Git} width={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
