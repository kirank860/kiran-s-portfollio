import React from "react";

const About = () => {
  return (
    <div name="about" className="w-full mt-[-250px] px-4 h-screen bg-[#0a192f] text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-pink-600">
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
          <div className="sm:text-right text-4xl font-bold ">
            <p>Hi. I'm kiran, nice to meet you. please take a look around!</p>
          </div>
          <div>
            <p>
              My expertise lies in leveraging the power of React.js to build
              dynamic user interfaces that meet client specifications and exceed
              expectations. I am proficient in using React.js alongside other
              technologies such as [tailwind ,redux],
              enabling me to develop robust, scalable solutions tailored to the
              unique needs of each project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
