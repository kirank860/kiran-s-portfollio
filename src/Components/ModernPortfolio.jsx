import React, { useState, useEffect } from "react";
import { 
  FaBars, 
  FaTimes, 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp,
  FaArrowRight,
  FaCode,
  FaRocket,
  FaPalette,
  FaPlay,
  FaExternalLinkAlt,
  FaStar,
  FaDownload
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";

const ModernPortfolio = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const handleNav = () => setNav(!nav);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setNav(false);
    }
  };

  const skills = [
    { name: 'React', icon: '⚛️', level: '95%', color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript', icon: '⚡', level: '92%', color: 'from-yellow-400 to-orange-500' },
    { name: 'Node.js', icon: '🚀', level: '88%', color: 'from-green-400 to-emerald-500' },
    { name: 'MongoDB', icon: '🍃', level: '85%', color: 'from-emerald-400 to-green-600' },
    { name: 'TypeScript', icon: '📘', level: '80%', color: 'from-blue-400 to-indigo-500' },
    { name: 'Next.js', icon: '▲', level: '90%', color: 'from-gray-400 to-gray-600' },
    { name: 'Tailwind', icon: '💨', level: '93%', color: 'from-teal-400 to-cyan-500' },
    { name: 'AWS', icon: '☁️', level: '75%', color: 'from-orange-400 to-red-500' }
  ];

  const projects = [
    {
      title: 'Ocean Island Inn',
      description: 'Ocean Island Inn is a modern hotel and resort booking web application that highlights room details, guest discounts, extended stay options, and local travel guides. Built with React and Astro, it provides a clean, responsive UI with an easy booking experience and vibrant branding.',
      tech: ['React.js', 'Astro', 'Tailwind CSS'],
      demo: 'https://oceanisland-web.netlify.app/',
      code: 'https://github.com/ocean-island/oceanisland-web',
      gradient: 'from-[#FF2C92] via-[#4BC6F4] to-[#9CD82B]', // pink → ocean blue → lime green
      image: '🏨',
      featured: true
    },
    
    {
      title: 'Novintus',
      description: 'Novintus is a modern educational web application for Educare, designed to provide personalized one-to-one tutoring. The platform highlights features like skill development, growth mindset, passionate teaching, and enables parents/students to book demo classes seamlessly.',
      tech: ['React.js', 'Tailwind CSS'],
      demo: 'https://noviindus.vercel.app/',
      code: 'https://github.com/kirank860/Noviindus',
      gradient: 'from-[#7B1E3A] via-[#C94F5C] to-[#F8E1D4]', // burgundy → warm pink → cream
      image: '📚',
      featured: true
    },
    
    {
      title: 'Food Delivery Platform',
      description: 'Enterprise-level food delivery application with real-time tracking, payment integration, and advanced analytics dashboard.',
      tech: ['EJS', 'Node.js', 'MongoDB', 'Socket.io'],
      demo: 'https://food-app-peach.vercel.app/',
      code: 'https://github.com/kirank860/food-app/',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      image: '🍕',
      featured: true
    },
    {
      title: 'Malabar Literature Festival',
      description: 'Cultural event platform featuring interactive galleries, event management, and multilingual support.',
      tech: ['EJS', 'Express.js', 'CSS3', 'JavaScript'],
      demo: 'https://malabarliteraturefestival.com/',
      code: '#',
      gradient: 'from-blue-500 via-purple-500 to-indigo-500',
      image: '📚',
      featured: true
    },
    {
      title: 'Al-Jamia Educational Platform',
      description: 'Modern educational platform with course management, progress tracking, and interactive learning modules.',
      tech: ['Next.js', 'React', 'Tailwind', 'PostgreSQL'],
      demo: 'https://www.aljamia.net/',
      code: 'https://github.com/Aljamia/al-jamia-web',
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      image: '🎓',
      featured: true
    },
    {
      title: 'E-Commerce Store',
      description: 'Full-stack e-commerce solution with advanced filtering, payment gateway, and inventory management.',
      tech: ['React', 'Redux', 'Node.js', 'Stripe'],
      demo: 'https://e-commerce-fzw8z1a8z-kirank860.vercel.app/',
      code: '#',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      image: '🛒'
    },
    {
      title: 'DeConquista Interactive',
      description: 'High-performance React application with complex state management and real-time features.',
      tech: ['React', 'Context API', 'CSS3', 'WebSocket'],
      demo: 'https://deconquista.siokerala.org/',
      code: '#',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      image: '🎯'
    },
    {
      title: 'DataHex Solutions',
      description: 'Corporate website with advanced animations, CMS integration, and performance optimization.',
      tech: ['React', 'Tailwind', 'Framer Motion', 'Strapi'],
      demo: 'https://datahex.co/',
      code: '#',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      image: '📊'
    }
  ];

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full h-20 flex justify-between items-center px-6 lg:px-12 bg-black/80 backdrop-blur-2xl border-b border-white/10 z-50">
        <div className="flex items-center group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all duration-300">
              K
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
          </div>
          <div className="ml-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Kiran K
            </span>
            <div className="text-xs text-gray-400 font-medium">Full Stack Developer</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-2">
          {['home', 'about', 'skills', 'works', 'contact'].map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                className={`relative capitalize px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  activeSection === item 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
                {activeSection === item && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div onClick={handleNav} className="md:hidden cursor-pointer p-2">
          {!nav ? <FaBars size={24} /> : <FaTimes size={24} />}
        </div>

        {/* Mobile Menu */}
        {nav && (
          <div className="absolute top-20 left-0 w-full h-screen bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center md:hidden">
            {['home', 'about', 'skills', 'works', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="py-6 text-3xl capitalize hover:text-purple-400 transition-colors font-light"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Social Icons */}
      <div className="hidden lg:flex flex-col fixed top-1/2 left-8 transform -translate-y-1/2 space-y-4 z-40">
        {[
          { icon: FaLinkedin, href: "https://www.linkedin.com/in/kiran-k-b25b2b262/", color: "from-blue-500 to-blue-600" },
          { icon: FaGithub, href: "https://github.com/kirank860", color: "from-gray-600 to-gray-700" },
          { icon: HiOutlineMail, href: "mailto:kkiru889@gmail.com", color: "from-teal-500 to-teal-600" },
          { icon: BsFillPersonLinesFill, href: "#", color: "from-indigo-500 to-indigo-600" }
        ].map((social, index) => (
          <a
            key={index}
            href={social.href}
            className={`group relative w-14 h-14 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            <social.icon size={22} />
            <div className={`absolute -inset-1 bg-gradient-to-r ${social.color} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
          </a>
        ))}
      </div>

      {/* WhatsApp Float */}
      <div className="fixed bottom-8 right-8 z-40">
        <a
          href="https://wa.me/8606414991"
          className="group relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <FaWhatsapp size={28} />
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </a>
      </div>

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6 mt-6">
              <p className="text-purple-300 text-sm font-medium">👋 Hello, I'm available for work</p>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                KIRAN K
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-light">
                Full Stack Developer
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              I craft <span className="text-purple-400 font-medium">exceptional digital experiences</span> through 
              innovative web solutions, combining cutting-edge technology with 
              <span className="text-pink-400 font-medium"> artistic design</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('works')}
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full font-semibold text-lg transition-all duration-300 flex items-center shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Explore My Work</span>
              <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="group px-10 py-4 border-2 border-purple-500 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 flex items-center"
            >
              <HiOutlineMail className="mr-3" />
              Let's Connect
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '6+', label: 'Projects Completed' },
              { number: '2', label: 'Years Experience' },
              { number: '10+', label: 'Technologies' },
              { number: '99%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="relative">
                <h3 className="text-4xl font-bold mb-6">
                  <span className="text-purple-300">Passionate</span> Developer,
                  <br />
                  <span className="text-pink-300">Creative</span> Problem Solver
                </h3>
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                With over 2 years of experience in full-stack development, I specialize in creating 
                high-performance web applications that combine beautiful design with robust functionality. 
                My expertise spans across modern React ecosystems, Node.js backends
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in writing clean, maintainable code and creating user experiences that not only 
                look stunning but also perform exceptionally well. Every project is an opportunity to 
                push boundaries and deliver something extraordinary.
              </p>
              
              <div className="flex items-center space-x-4 pt-4">
  <a
    href="/Kiran-MERN-Resume.pdf"
    download="Kiran-MERN-Resume.pdf"
    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
  >
    <FaDownload />
    <span>Download CV</span>
  </a>
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar key={star} className="text-yellow-400" />
    ))}
    <span className="text-gray-400 ml-2">5.0 Rating</span>
  </div>
</div>

            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: FaCode, title: "Clean Code", desc: "Maintainable & scalable solutions", color: "from-purple-500 to-pink-500" },
                { icon: FaRocket, title: "Performance", desc: "Lightning-fast applications", color: "from-blue-500 to-cyan-500" },
                { icon: FaPalette, title: "Modern Design", desc: "Beautiful user experiences", color: "from-green-500 to-teal-500" },
                { icon: FaGithub, title: "Open Source", desc: "Contributing to community", color: "from-orange-500 to-red-500" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl bg-gradient-to-br ${item.color} bg-opacity-10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                  <item.icon className="text-4xl mb-4 text-white group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400">Technologies I master to build exceptional products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                  
                  <div className="relative w-full h-2 bg-gray-700 rounded-full mb-2">
                    <div 
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 delay-300`}
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="relative py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400">Showcasing my best work and creative solutions</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                  project.featured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={`relative h-64 ${project.featured ? 'lg:h-80' : ''} bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110">
                    {project.image}
                  </div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex space-x-4">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FaExternalLinkAlt className="text-white" />
                      </a>
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      >
                        <FaGithub className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-black/50 backdrop-blur-xl">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium text-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaPlay className="mr-2" />
                      Live Demo
                    </a>
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-purple-500 rounded-xl font-medium hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaCode className="mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Connect</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400">Ready to bring your vision to life? Let's create something amazing together.</p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/50 backdrop-blur-2xl rounded-3xl p-12 border border-white/10">
              <form method="POST" action="https://getform.io/f/paoxgxeb" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Project Details</label>
                  <textarea
                    name="message"
                    rows="6"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none placeholder-gray-500"
                    placeholder="Tell me about your project vision, requirements, and timeline..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-purple-500/50"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                      <HiOutlineMail className="text-xl" />
                    </div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-400">kirankrishnan889@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
                      <FaWhatsapp className="text-xl" />
                    </div>
                    <h4 className="font-semibold">WhatsApp</h4>
                    <p className="text-gray-400">+91 8606414991</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                      <FaLinkedin className="text-xl" />
                    </div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-gray-400">Connect with me</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold mr-3">
                K
              </div>
              <div>
                <div className="text-lg font-bold">Kiran K</div>
                <div className="text-sm text-gray-400">Full Stack Developer</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">© 2024 Kiran K. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernPortfolio;
