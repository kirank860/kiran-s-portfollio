import React from "react";
import javascript from "../assets/javascript.png";
import css from "../assets/css.png";
import github from "../assets/github.png";
import html from "../assets/html.png";
import react from "../assets/react.png";
import tailwind from "../assets/tailwind.png";
import mongo from "../assets/mongo.png";
import node from "../assets/node.png";

const Skills = () => {
  return (
    <div name="skills" className="w-full h-screen bg-[#0a192f] text-gray-300">
      {/* container */}
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div>
          <p className="text-4xl font-bold inline border-b-4 border-b-pink-600  py-4">Skills</p>
          <p className="py-6">These are the technologies that I,ve worked with</p>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-4 text-center py-8">
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={html} alt="html" />
            <p className="my-4">HTML</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={css} alt="html" />
            <p className="my-4">CSS</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={javascript} alt="html" />
            <p className="my-4">JAVASCRIPT</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={react} alt="html" />
            <p className="my-4">REACT JS</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={github} alt="html" />
            <p className="my-4">GITHUB</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={tailwind} alt="html" />
            <p className="my-4">TAILWIND</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={mongo} alt="html" />
            <p className="my-4">MONGODB</p>
          </div>
          <div className="shadow-md shadow-[#040c16] hover:scale-100 duration-300">
            <img className="w-20 mx-auto" src={node} alt="html" />
            <p className="my-4">NODE JS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
