import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Rocket,
    Palette,
    Cpu,
    Globe,
    MessageSquare,
    Download,
    ArrowRight,
    Menu,
    X,
    ChevronRight,
    Star,
    Zap,
    Layout,
    Layers
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind classes */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/** Magnetic Effect Component */
const Magnetic = ({ children }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const PremiumPortfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const moveCursor = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const projects = [
        {
            title: 'Ocean Island Inn',
            description: 'A high-end resort booking platform with immersive UI/UX.',
            tech: ['React', 'Astro', 'Tailwind'],
            link: 'https://oceanisland-web.netlify.app/',
            github: 'https://github.com/ocean-island/oceanisland-web',
            image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Novintus',
            description: 'Educational tutoring platform with personalized learning flows.',
            tech: ['React', 'Tailwind', 'Framer'],
            link: 'https://noviindus.vercel.app/',
            github: 'https://github.com/kirank860/Noviindus',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Quick Stay',
            description: 'Premium property rental platform with seamless booking experience.',
            tech: ['Next.js', 'MongoDB', 'Clerk'],
            link: 'https://quick-stay-teal.vercel.app/',
            github: 'https://github.com/kirank860/quick-stay',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Femida Legal Portal',
            description: 'A professional legal consultation platform with complex form handling.',
            tech: ['React', 'Node.js', 'Tailwind'],
            link: 'https://femida-kiran.vercel.app/',
            github: 'https://github.com/kirank860/femida',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
        }
    ];

    const industrialProjects = [
        {
            company: 'Institutional Portal',
            title: 'Aljamia Al Islamiya',
            description: 'Built a college website with dynamic course/event feeds, reducing manual updates by 50%.',
            impact: '50% faster updates',
            tech: ['Next.js', 'API Integration', 'Real-time'],
            link: 'https://www.aljamia.net/',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
        },
        {
            company: 'Cultural Event Site',
            title: 'Malabar Literature Festival',
            description: 'Designed an interactive platform supporting 10,000+ virtual attendees with event calendars.',
            impact: '10K+ virtual attendees',
            tech: ['EJS', 'Node.js', 'MongoDB'],
            link: 'https://malabarliteraturefestival.com/',
            image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800',
        },
        {
            company: 'Socio-Political Portal',
            title: 'De Conquista',
            description: 'Engineered a contemporary content site for cultural discourse with modular layouts.',
            impact: 'Modular Content Architecture',
            tech: ['EJS', 'Responsive', 'UI/UX'],
            link: 'https://deconquista.siokerala.org/',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
        },
        {
            company: 'Personal Enterprise',
            title: 'E-Commerce Storefront',
            description: 'Full-scale interface with cart, wishlist, and product filtering; optimized for high performance.',
            impact: 'LocalStorage Persistence',
            tech: ['React.js', 'Context API', 'State'],
            link: 'https://e-commerce-2-kiran.vercel.app/',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        }
    ];

    const featuredProjects = [
        {
            title: 'Spotify Clone',
            description: 'A fully functional Spotify clone built with React, Tailwind CSS, and Spotify API.',
            tech: ['React', 'Tailwind', 'API'],
            link: 'https://spotify-clone-kiran.vercel.app/',
            github: 'https://github.com/kirank860/spotify-clone',
            image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'FoodFlow App',
            description: 'Enterprise-level food delivery & fleet management system.',
            tech: ['Node.js', 'MongoDB', 'Socket.io'],
            link: 'https://food-app-peach.vercel.app/',
            github: 'https://github.com/kirank860/food-app/',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Aranoz Stores',
            description: 'Sophisticated e-commerce dashboard and storefront for modern retail.',
            tech: ['React', 'Redux', 'Node.js'],
            link: 'https://aranoz-stores.vercel.app/',
            github: 'https://github.com/kirank860/Aranoz-stores',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: '10.10 Project',
            description: 'A specialized coding challenge project focusing on efficiency and clean architecture.',
            tech: ['JavaScript', 'CSS', 'Logic'],
            link: '#',
            github: 'https://github.com/kirank860/10.10',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
        }
    ];

    const skills = [
        { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript'], icon: Globe },
        { name: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'mongoose'], icon: Cpu },
        { name: 'Tools', items: ['Git', 'Docker', 'vercel', 'Framer Motion'], icon: Layers },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-primary-500/30 overflow-hidden">
            {/* Custom Cursor */}
            <motion.div
                className="cursor-dot hidden md:block"
                animate={{ x: cursorPosition.x - 4, y: cursorPosition.y - 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="cursor-outline hidden md:block"
                animate={{ x: cursorPosition.x - 20, y: cursorPosition.y - 20 }}
                transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
            />

            {/* Noise Texture */}
            <div className="noise" />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-600 z-[100] origin-left"
                style={{ scaleX }}
            />

            {/* Grid Overlay */}
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none z-0" />

            {/* Decorative Shadows */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/10 blur-[120px] rounded-full z-0 animate-pulse-slow" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full z-0 animate-pulse-slow" />

            {/* Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 glass rounded-full z-50">
                <div className="hidden md:flex gap-1">
                    {sections.map((section) => (
                        <Magnetic key={section}>
                            <button
                                onClick={() => {
                                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                                    setActiveSection(section);
                                }}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize",
                                    activeSection === section
                                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                                        : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                                )}
                            >
                                {section}
                            </button>
                        </Magnetic>
                    ))}
                </div>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2.5 text-zinc-400 hover:text-zinc-100"
                >
                    <Menu size={20} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[100] glass-darker md:hidden flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-10 right-10 p-2 text-zinc-400 hover:text-zinc-100"
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col items-center gap-8">
                            {sections.map((section) => (
                                <button
                                    key={section}
                                    onClick={() => {
                                        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                                        setActiveSection(section);
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-4xl font-bold text-zinc-400 hover:text-primary-400 transition-colors uppercase tracking-tighter"
                                >
                                    {section}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center section-padding">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary-400 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Open for opportunities
                        </motion.span>
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter">
                            <span className="text-gradient block">KIRAN K.</span>
                            <span className="text-gradient-vibrant block">FULL STACK DEV</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
                            Transforming complex problems into elegant digital solutions with over
                            <span className="text-zinc-100 font-semibold italic"> 2 years of experience </span>
                            building high-performance web systems.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary group"
                            >
                                View Projects
                                <ArrowRight size={18} className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
                            </button>
                            <div className="flex items-center gap-4">
                                <Magnetic>
                                    <a href="https://github.com/kirank860" className="p-3 glass rounded-full hover:bg-white/10 transition-colors block">
                                        <Github size={20} />
                                    </a>
                                </Magnetic>
                                <Magnetic>
                                    <a href="https://www.linkedin.com/in/kiran-k-b25b2b262/" className="p-3 glass rounded-full hover:bg-white/10 transition-colors block">
                                        <Linkedin size={20} />
                                    </a>
                                </Magnetic>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* About & Skills (Bento) */}
                <section id="about" className="section-padding">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
                        {/* About Card */}
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            className="md:col-span-2 p-6 md:p-8 glass rounded-[32px] flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-4xl font-bold mb-6 text-gradient italic">Crafting digital excellence</h2>
                                <p className="text-zinc-400 leading-relaxed mb-8">
                                    I specialize in the MERN stack and modern cloud architectures. My focus is on
                                    building scalable applications that provide seamless user experiences through
                                    performance-driven code and intuitive design.
                                </p>
                            </div>
                            <div className="flex items-center gap-8 border-t border-white/5 pt-8">
                                <div>
                                    <div className="text-3xl font-bold text-white">2+</div>
                                    <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Years Exp</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">10+</div>
                                    <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Projects</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-white">SVG</div>
                                    <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Creative</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Skills Card */}
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            id='skills'
                            onMouseMove={handleCardMouseMove}
                            className="p-6 md:p-8 glass rounded-[32px] md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8 glow-card"
                        >
                            {skills.map((skill, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="p-3 glass w-fit rounded-2xl text-primary-400">
                                        <skill.icon size={24} />
                                    </div>
                                    <h3 className="font-bold text-xl">{skill.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item, i) => (
                                            <span key={i} className="text-sm text-zinc-500">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Resume Card */}
                        <motion.a
                            href="/KIRAN_K MERN_STACK_DEVELOPER (1).pdf"
                            download="KIRAN_K MERN_STACK_DEVELOPER (1).pdf"
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -20 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 glass rounded-[32px] md:col-span-1 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer no-underline block"
                        >
                            <Download size={48} className="text-primary-500 transition-transform group-hover:-translate-y-2" />
                            <h3 className="font-bold text-xl uppercase tracking-widest">Resume</h3>
                            <p className="text-sm text-zinc-500">Get my full technical profile in PDF</p>
                        </motion.a>

                        {/* Contact Status */}
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 20 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 glass rounded-[32px] md:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative h-16 w-16 glass rounded-full flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-500/20 animate-pulse" />
                                    <MessageSquare className="text-primary-400 relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Have a project in mind?</h3>
                                    <p className="text-zinc-500">I'm currently accepting new freelance projects.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary"
                            >
                                Hire Me
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Industrial Projects (Professional Experience) */}
                <section className="section-padding overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full -z-10" />

                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                            <div className="max-w-xl">
                                <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-4 block">Professional Impact</span>
                                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-gradient mb-6 uppercase">Industrial Projects</h2>
                                <p className="text-zinc-400 text-lg leading-relaxed">High-scale solutions delivered for institutions and enterprises, focusing on architecture and business results.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {industrialProjects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    viewport={{ once: true }}
                                    onMouseMove={handleCardMouseMove}
                                    className="group relative flex flex-col md:flex-row glass rounded-[40px] overflow-hidden hover:bg-white/[0.02] transition-colors glow-card"
                                >
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-zinc-900">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 md:from-transparent to-transparent" />
                                    </div>

                                    <div className="p-8 md:p-10 md:w-3/5 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{project.company}</span>
                                            <span className="text-primary-400 text-[10px] font-bold uppercase tracking-widest">{project.impact}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-400 transition-colors italic uppercase">{project.title}</h3>
                                        <p className="text-zinc-500 mb-8 text-sm leading-relaxed">{project.description}</p>

                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-2 mr-auto">
                                                {project.tech.map((t, i) => (
                                                    <span key={i} className="text-[10px] text-zinc-600 font-medium">{t}</span>
                                                ))}
                                            </div>
                                            <a href={project.link} target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-gradient mb-6 uppercase">Selected Works</h2>
                                <p className="text-zinc-400 text-lg">A curated collection of projects where I've blended technical precision with creative design.</p>
                            </div>
                            <div className="p-1 glass rounded-full flex items-center gap-1">
                                <button className="px-6 py-2 bg-white/10 rounded-full text-sm font-medium">All</button>
                                <button className="px-6 py-2 hover:bg-white/5 rounded-full text-sm font-medium transition-colors">Web</button>
                                <button className="px-6 py-2 hover:bg-white/5 rounded-full text-sm font-medium transition-colors">Mobile</button>
                            </div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    onMouseMove={handleCardMouseMove}
                                    className="group relative h-[500px] rounded-[40px] overflow-hidden glass glow-card"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                        <div className="flex gap-2 mb-4">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="px-3 py-1 glass rounded-full text-xs font-medium text-primary-300">{t}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-primary-400 transition-colors uppercase italic">{project.title}</h3>
                                        <p className="text-zinc-400 mb-8 line-clamp-2">{project.description}</p>

                                        <div className="flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary py-3 px-6 ring-1 ring-white/10">
                                                Live Demo
                                            </a>
                                            <a href={project.github} target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-white/10 text-white transition-colors">
                                                <Github size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mt-16 text-center">
                            <a
                                href="https://github.com/kirank860"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full text-zinc-400 hover:text-zinc-100 transition-all hover:border-zinc-100/20"
                            >
                                View More Projects on GitHub
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <section className="section-padding bg-zinc-900/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter text-gradient mb-4 uppercase">Featured Projects</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl">Exploring new technologies and building innovative solutions across different domains.</p>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {featuredProjects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    onMouseMove={handleCardMouseMove}
                                    className="group glass rounded-3xl p-6 hover:bg-white/5 transition-all duration-300 flex flex-col h-full glow-card"
                                >
                                    <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/0 transition-colors" />
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors uppercase italic">{project.title}</h3>
                                    <p className="text-zinc-500 text-sm mb-6 line-clamp-3 overflow-hidden">{project.description}</p>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex gap-2">
                                            {project.tech.slice(0, 2).map((t, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{t}</span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                <Github size={18} />
                                            </a>
                                            {project.link !== '#' && (
                                                <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                                    <ExternalLink size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section-padding relative overflow-hidden">
                    <div className="max-w-5xl mx-auto relative z-10 glass rounded-[48px] p-6 md:p-12 lg:p-24 overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/10 blur-[100px] -z-10" />

                        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-gradient mb-8 uppercase">Let's talk</h2>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 glass rounded-2xl group-hover:text-primary-400 transition-colors">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Email</p>
                                            <a href="mailto:kirankrishnan889@gmail.com" className="text-lg md:text-xl font-medium hover:text-primary-400 transition-colors break-all">kirankrishnan889@gmail.com</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 glass rounded-2xl group-hover:text-primary-400 transition-colors">
                                            <Linkedin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Social</p>
                                            <a href="https://linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="text-xl font-medium hover:text-primary-400 transition-colors">LinkedIn Profile</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 glass rounded-2xl group-hover:text-primary-400 transition-colors">
                                            <Globe size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Location</p>
                                            <p className="text-xl font-medium">India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                                    <input type="text" className="w-full glass bg-white/5 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                                    <input type="email" className="w-full glass bg-white/5 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all" placeholder="Enter your email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                                    <textarea rows={4} className="w-full glass bg-white/5 p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none" placeholder="How can I help you?" />
                                </div>
                                <button type="submit" className="w-full btn-primary py-4 md:py-5 text-base md:text-lg">Send Message</button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/5">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center font-black italic">K</div>
                            <span className="font-bold tracking-tighter uppercase">Kiran K.</span>
                        </div>
                        <p className="text-zinc-500 text-sm">© 2024 Built with passion by Kiran K.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">Privacy</a>
                            <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">Terms</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default PremiumPortfolio;
