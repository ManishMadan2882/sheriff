import { LandingNavigation } from "../Landing/LandingNavigation";
import Hero from "../Landing/Hero";
import { CTA } from "../Landing/CTA";
import { Features } from "../Landing/Features";
import { Footer } from "../Landing/Footer";

const Landing = () => {
  return (
    <div className="relative bg-chinese-black text-chinese-white w-full overflow-x-none">
      <Hero />
      <CTA />
      <Features />
      <Footer />
      <div className="pointer-events-none absolute top-36 -left-24 z-0  hidden h-[286px] w-[286px] rounded-full bg-purple-x11 blur-3xl lg:block ">
        {/*  purple glow - only for wide screen */}
      </div>
      <div className="pointer-events-none absolute top-20 left-0 right-0 z-0 mx-auto h-[75vw] w-[75vw] rounded-full bg-fluorescent-blue blur-3xl md:h-[422px] md:w-[422px]">
        {/* flouroscent blue glow */}
      </div>
      <div className="pointer-events-none absolute top-96 right-0 z-0 mx-auto hidden h-[307px] w-[307px] rounded-full bg-blueberry blur-3xl sm:block">
        {/* blueberry glow - only for wide screen */}
      </div>
      <div className="pointer-events-none absolute top-[500px] left-1/4 z-0 mx-auto h-[152px] w-[152px] rounded-full bg-ultramarine-light blur-3xl lg:h-[224px] lg:w-[224px]">
        {/* ultramarine glow */}
      </div>
    </div>
  );
};

export default Landing;