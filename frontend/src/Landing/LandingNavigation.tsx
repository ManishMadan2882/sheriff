import React from 'react';
import { useNavigate } from 'react-router-dom';
export const LandingNavigation = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex w-full justify-between p-8">
      <a
        href="https://app.docsgpt.cloud/"
        className="font-outfit text-lg font-bold"
      >
        LexEU
      </a>
      <div className="flex text-sm sm:text-base">
        <button
          id="login-btn"
          onClick={() => {
            window.location.href = 'https://app.docsgpt.cloud/';
          }}
          className="h-8 w-16 rounded-md bg-gradient-to-r from-purple-X11 to-ultramarine-blue font-outfit sm:w-24"
        >
          Login
        </button>
      </div>

      {/* <div className="flex lg:hidden absolute right-4 top-8 justify-between">
                <button id="mobile-hamburger" className='p-2'><img width={18} src={hamburgerIcon} /></button>
                <ul
                    className=" absolute backdrop-blur-md bg-dark-gunmetal/30 top-6 z-30 bac right-0 rounded-xl mx-auto shadow-2xl shadow-cyan-950 bg-dark-gunmetal p-2"
                    id="mobile-menu"
                >
                    <li className="border-b border-granite-gray p-2">
                        <a target="_blank" href="https://app.docsgpt.cloud/">Login</a>
                    </li>
                </ul>
            </div> */}
    </div>
  );
};
