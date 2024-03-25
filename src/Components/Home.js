import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name="home" className="w-full h-screen bg-[#0a192f]">
      {/* container */}
      <div className="max-w-[1000px] mx-auto  px-8 flex flex-col justify-center h-full">
        <p className="text-pink-600">Hi, My name is </p>
        <h1 className="text-4xl sm:text-7xl font-bold text-[#ccd6f6]">
          Kiran k
        </h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
          I'm a Full stack Developer.
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px]">
          {" "}
          I'm a full stack developer with a strong background in
          React.js. With a passion for creating efficient, user-friendly web
          applications, I bring a meticulous approach to crafting code that
          meets both user needs and business goals.
        </p>
        <div>
          <button className="text-white group border-2 px-5 py-3 my-7 flex items-center hover:bg-pink-600 hover:border-pink-600">
            
        
          <Link to="works" smooth={true} duration={900}>
          View Work{" "}
          </Link>
        
            
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight className="ml-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
