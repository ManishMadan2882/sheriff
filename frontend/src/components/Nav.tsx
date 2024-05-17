import Git from '../assets/github-mark-white.png'
const client_id = import.meta.env.VITE_CLIENT_ID
const Nav = () => {
  return (
    <nav className="bg-outer-space p-4 backdrop-blur-lg bg-opacity-75">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a className='text-yellow-600 hover:underline underline-offset-8' href="/">Sheriff.</a>
        </div>
        <div className=''>
          <button
          onClick={()=>{
            window.location.assign("https://github.com/login/oauth/authorize?client_id="+client_id)
          }}
          className="bg-chinese-black flex gap-3 text-white px-6 py-2 rounded hover:bg-raisin-black transition duration-300 ">
            Login with 
            <img src={Git} width={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
