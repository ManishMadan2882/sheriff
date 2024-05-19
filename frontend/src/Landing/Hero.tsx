import React from 'react';
import { useNavigate } from 'react-router';
const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="mt-14 mb-24 flex justify-center" id="lexeu-hero">
      <div className="metallic-gradient w-full rounded-2xl p-0.5 md:w-[695px] 2xl:w-[40vw]">
        <div className="rounded-2xl bg-chinese-black px-0 py-6 text-center md:bg-dark-gunmetal md:px-8">
          <h1 className="mb-0 font-outfit text-4xl font-bold text-chinese-white">
            Secure you Software Suppy Chain with
          </h1>
          <h1 className="my-0 inline-block bg-gradient-to-b from-aryldine-yellow to-cadmium-orange bg-clip-text p-0.5 text-center font-outfit text-4xl font-bold text-transparent">
            Sherrif
          </h1>
          <p className="3xl:text-sm p-2 font-outfit text-xs font-bold text-philippine-silver">
            Sheriff provides an all-encompassing security framework that seamlessly integrates with your development and deployment processes. From source code to production, we protect your software supply chain from vulnerabilities and unauthorized changes.
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={()=> navigate('/dashboard')}
              id="start-now-btn"
              className="flex justify-center rounded-xl bg-gradient-to-r from-purple-X11 to-ultramarine-blue px-4 py-3 font-outfit text-chinese-white"
            >
              Get Started
            </button>
          </div>
          {/* <div className="flex justify-center gap-4 mt-4">
                        <a href="https://github.com/arc53/DocsGPT">
                            <img
                                src="https://img.shields.io/github/stars/arc53/docsgpt?style=social"
                            />
                        </a>
                        <a href="https://github.com/arc53/DocsGPT">
                            <img
                                src="https://img.shields.io/github/forks/arc53/docsgpt?style=social"
                            />
                        </a>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
