import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,

} from "react-icons/fa";
import { FaWhatsapp } from 'react-icons/fa';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import logo from "../assets/logo1.png";
import { Link } from "react-scroll";
const Navbar = () => {
  const [nav, setnav] = useState(false);

  const handleclick = () => setnav(!nav);


  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300">
      <div className="">
        {/* <img style={{ width: "50px" }} src={logo} alt="logo"></img> */}
      </div>
      {/* menu */}

      <ul className="hidden md:flex">
        <li>
          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500}>
            About
          </Link>
        </li>
        <li>
          <Link to="skills" smooth={true} duration={500}>
   Skills
          </Link>
        </li>
        <li>
          <Link to="works" smooth={true} duration={500}>
   Works
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500}>
          Contact
          </Link>
        </li>
      </ul>

      {/* hamburger menu */}
      <div onClick={handleclick} className="md:hidden  absolute right-10 z-10">
        {!nav ? <FaBars size={25} /> : <FaTimes size={25} />}
      </div>
      {/* mb menu */}
      <div
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center md:hidden"
        }
      >
        <li className="py-6 text-4xl">  <Link onClick={handleclick} to="home" smooth={true} duration={500}>
            Home
          </Link></li>
        <li className="py-6 text-4xl">  <Link onClick={handleclick} to="about" smooth={true} duration={500}>
            About
          </Link></li>
        <li className="py-6 text-4xl">   <Link onClick={handleclick} to="skills" smooth={true} duration={500}>
   Skills
          </Link></li>
          <li className="py-6 text-4xl"> <Link onClick={handleclick} to="works" smooth={true} duration={500}>
          Works
          </Link></li>
        <li className="py-6 text-4xl"> <Link  onClick={handleclick} to="contact" smooth={true} duration={500}>
          Contact
          </Link></li>
      </div>
      {/* ss icons */}
      
      <div className="hidden lg:flex flex-col fixed top-[35%] left-0">
        <ul>
          <li className="w-[150px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600">
            <a
              className="flex justify-between items-center w-full text-gray-300 "
              href="https://www.linkedin.com/in/kiran-k-b25b2b262/"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className="w-[150px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]">
            <a
              className="flex justify-between items-center w-full text-gray-300 "
              href="https://github.com/kirank860"
            >
              GitHub <FaGithub size={30} />
            </a>
          </li>
          <li className="w-[150px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]">
            <a
              className="flex justify-between items-center w-full text-gray-300 "
              href="kkiru889@gmail.com"
            >
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className="w-[150px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]">
            <a
              className="flex justify-between items-center w-full text-gray-300 "
              href="/"
            >
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      
      </div>
      <div className="absolute top-[550px] right-[0]">
    <a href="https://wa.me/8606414991">
        <FaWhatsapp size={30} />
    </a>
</div>

      
    </div>  
  );
};

export default Navbar;
