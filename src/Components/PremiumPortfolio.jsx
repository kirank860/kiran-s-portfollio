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

const PremiumPortfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
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
            title: 'FoodFlow Platform',
            description: 'Enterprise-level food delivery & fleet management system.',
            tech: ['Node.js', 'MongoDB', 'Socket.io'],
            link: 'https://food-app-peach.vercel.app/',
            github: 'https://github.com/kirank860/food-app/',
            image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
        },
        {
            title: 'Al-Jamia EdTech',
            description: 'Comprehensive course management for educational institutions.',
            tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
            link: 'https://www.aljamia.net/',
            github: '#',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800',
        }
    ];

    const skills = [
        { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript'], icon: Globe },
        { name: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'mongoose'], icon: Cpu },
        { name: 'Tools', items: ['Git', 'Docker', 'vercel', 'Framer Motion'], icon: Layers },
    ];

    return (
        <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-primary-500/30">
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
                        <button
                            key={section}
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary-400 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                            </span>
                            Open for opportunities
                        </span>
                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter">
                            <span className="text-gradient block">KIRAN K.</span>
                            <span className="text-gradient-vibrant block">FULL STACK DEV</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed mb-12">
                            Transforming complex problems into elegant digital solutions with over
                            <span className="text-zinc-100 font-semibold italic"> 2 years of experience </span>
                            building high-performance web systems.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-primary group"
                            >
                                View Projects
                                <ArrowRight size={18} className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
                            </button>
                            <div className="flex items-center gap-4">
                                <a href="https://github.com/kirank860" className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://www.linkedin.com/in/kiran-k-b25b2b262/" className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
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
                            className="p-6 md:p-8 glass rounded-[32px] md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8"
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
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -20 }}
                            viewport={{ once: true }}
                            className="p-6 md:p-8 glass rounded-[32px] md:col-span-1 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer"
                        >
                            <Download size={48} className="text-primary-500 transition-transform group-hover:-translate-y-2" />
                            <h3 className="font-bold text-xl uppercase tracking-widest">Resume</h3>
                            <p className="text-sm text-zinc-500">Get my full technical profile in PDF</p>
                        </motion.div>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative h-[500px] rounded-[40px] overflow-hidden glass"
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
                        </div>

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
