import React from "react";
import working from "../assets/projects/workImg.jpeg";
import realestate from "../assets/projects/realestate.jpg";
import malabar from "../assets/projects/malabar.png";
import aljamia from "../assets/projects/aljamia.png";
import ecommerce from "../assets/projects/ecomerce.png";
import deconqustia from "../assets/projects/deconqustia.png";
import fooda_app from "../assets/projects/food-app.png"
const Work = () => {
  return (
    <div name="works" className="w-full md:h-screen text-gray-300 bg-[#0a192f]">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Work
          </p>
          <p className="py-6">// check out some of my recent works</p>
        </div>
        {/* container */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* grid items */}
          <div
            style={{ backgroundImage: `url(${fooda_app})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0  group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                ejs Application
              </span>
              <div className="pt-8 text-center">
                <a href="https://food-app-peach.vercel.app/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="https://github.com/kirank860/food-app/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${malabar})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0  group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                ejs Application
              </span>
              <div className="pt-8 text-center">
                <a href="https://malabarliteraturefestival.com/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${aljamia})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0  group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                Next.js Application
              </span>
              <div className="pt-8 text-center">
                <a href="https://www.aljamia.net/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${ecommerce})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0  group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                React js Application
              </span>
              <div className="pt-8 text-center">
                <a href="https://e-commerce-fzw8z1a8z-kirank860.vercel.app/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: `url(${deconqustia})` }}
            className="shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div"
          >
            {/* hover effect */}
            <div className="opacity-0  group-hover:opacity-100">
              <span className="text-2xl font-bold text-white tracking-wider">
                React js Application
              </span>
              <div className="pt-8 text-center">
                <a href="https://deconquista.siokerala.org/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Demo
                  </button>
                </a>
                <a href="/">
                  <button className="text-center py-3 px-4 m-2 rounded-lg bg-white text-gary-700 font-bold text-lg">
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
