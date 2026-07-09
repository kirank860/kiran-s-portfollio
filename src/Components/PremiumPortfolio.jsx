import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Cpu,
    Globe,
    MessageSquare,
    Download,
    ArrowRight,
    Menu,
    X,
    Layers,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/* ═══════════════════════════════════════════
   PRELOADER
   ═══════════════════════════════════════════ */
const Preloader = ({ onComplete }) => {
    const [counter, setCounter] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setExiting(true), 300);
                    setTimeout(() => onComplete(), 1100);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 8) + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`preloader ${exiting ? 'preloader-exit' : ''}`}>
            <div className="preloader-text">KIRAN K.</div>
            <div className="preloader-bar">
                <div className="preloader-bar-fill" />
            </div>
            <div className="text-sm text-zinc-500 font-mono tracking-widest">
                {Math.min(counter, 100)}%
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   SPLIT TEXT ANIMATION
   ═══════════════════════════════════════════ */
const SplitText = ({ text, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <span ref={ref} className={className} aria-label={text}>
            {text.split('').map((char, i) => (
                <span key={i} className="split-char">
                    <span
                        className={`split-char-inner ${isInView ? 'revealed' : ''}`}
                        style={{ animationDelay: `${delay + i * 0.04}s` }}
                        aria-hidden="true"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

/* ═══════════════════════════════════════════
   WORD-BY-WORD SCROLL REVEAL
   ═══════════════════════════════════════════ */
const WordReveal = ({ text, className = '' }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.9', 'end 0.5']
    });

    const words = text.split(' ');

    return (
        <p ref={containerRef} className={className}>
            {words.map((word, i) => (
                <WordRevealWord
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    index={i}
                    total={words.length}
                />
            ))}
        </p>
    );
};

const WordRevealWord = ({ word, progress, index, total }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const threshold = index / total;

    useMotionValueEvent(progress, 'change', (latest) => {
        setIsVisible(latest > threshold);
    });

    return (
        <span
            ref={ref}
            className={`word-reveal-word ${isVisible ? 'visible' : ''}`}
        >
            {word}&nbsp;
        </span>
    );
};

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════ */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const numericTarget = parseInt(target);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const increment = numericTarget / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= numericTarget) {
                setCount(numericTarget);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, numericTarget, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
};

/* ═══════════════════════════════════════════
   MARQUEE TEXT BAND
   ═══════════════════════════════════════════ */
const Marquee = ({ items, reverse = false, speed = 25, className = '' }) => {
    const content = [...items, ...items];
    return (
        <div className={`overflow-hidden ${className}`}>
            <div className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}>
                {content.map((item, i) => (
                    <div key={i} className="marquee-content">
                        <span className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter font-display text-stroke opacity-40 select-none uppercase whitespace-nowrap">
                            {item}
                        </span>
                        <span className="text-primary-500 text-4xl select-none">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   MAGNETIC EFFECT
   ═══════════════════════════════════════════ */
const Magnetic = ({ children, strength = 0.3 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

/* ═══════════════════════════════════════════
   3D TILT CARD
   ═══════════════════════════════════════════ */
const TiltCard = ({ children, className = '' }) => {
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        const card = ref.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`tilt-card transition-transform duration-300 ${className}`}
        >
            {children}
        </div>
    );
};


/* ═══════════════════════════════════════════
   MAIN PORTFOLIO
   ═══════════════════════════════════════════ */
const PremiumPortfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [cursorHover, setCursorHover] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [showPreloader, setShowPreloader] = useState(true);
    const containerRef = useRef(null);
    const projectsRef = useRef(null);
    const timelineRef = useRef(null);

    // Cursor tracking
    useEffect(() => {
        const moveCursor = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // Cursor hover detection for interactive elements
    useEffect(() => {
        const handleHoverElements = () => {
            const hoverables = document.querySelectorAll('a, button, .glow-card, input, textarea, .tilt-card');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => setCursorHover(true));
                el.addEventListener('mouseleave', () => setCursorHover(false));
            });
        };
        if (isLoaded) {
            setTimeout(handleHoverElements, 500);
        }
    }, [isLoaded]);

    // Intersection Observer for active section
    useEffect(() => {
        if (!isLoaded) return;
        const sectionElements = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.3 });
        sectionElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [isLoaded]);

    // Scroll progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Timeline scroll progress
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center']
    });
    const timelineHeight = useTransform(timelineProgress, [0, 1], ['0%', '100%']);

    // Horizontal scroll for projects
    const { scrollYProgress: projectsScrollProgress } = useScroll({
        target: projectsRef,
        offset: ['start start', 'end end']
    });
    const projectsX = useTransform(projectsScrollProgress, [0, 1], ['0%', '-60%']);

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const projects = [
        {
            title: 'Richard Mille Showcase',
            description: 'A high-end luxury interactive experience showcasing the RM 50-03 McLaren Tourbillon watch with custom scroll mechanics and canvas rendering.',
            tech: ['Next.js', 'Tailwind', 'Canvas', 'Framer Motion'],
            link: 'https://richardmille-lime.vercel.app/',
            github: 'https://github.com/kirank860/richard-mille',
            image: '/richard_mille.png',
            color: '#7c3aed',
        },
        {
            title: 'Ocean Island Inn',
            description: 'A high-end resort booking platform with immersive UI/UX.',
            tech: ['React', 'Astro', 'Tailwind'],
            link: 'https://oceanisland-web.netlify.app/',
            github: 'https://github.com/ocean-island/oceanisland-web',
            image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
            color: '#0ea5e9',
        },
        {
            title: 'Novintus',
            description: 'Educational tutoring platform with personalized learning flows.',
            tech: ['React', 'Tailwind', 'Framer'],
            link: 'https://noviindus.vercel.app/',
            github: 'https://github.com/kirank860/Noviindus',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
            color: '#f59e0b',
        },
        {
            title: 'Quick Stay',
            description: 'Premium property rental platform with seamless booking experience.',
            tech: ['Next.js', 'MongoDB', 'Clerk'],
            link: 'https://quick-stay-teal.vercel.app/',
            github: 'https://github.com/kirank860/quick-stay',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            color: '#10b981',
        },
        {
            title: 'Femida Legal Portal',
            description: 'A professional legal consultation platform with complex form handling.',
            tech: ['React', 'Node.js', 'Tailwind'],
            link: 'https://femida-kiran.vercel.app/',
            github: 'https://github.com/kirank860/femida',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
            color: '#ef4444',
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
        { name: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Mongoose'], icon: Cpu },
        { name: 'Tools', items: ['Git', 'Docker', 'Vercel', 'Framer Motion'], icon: Layers },
    ];

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    const handlePreloaderComplete = useCallback(() => {
        setShowPreloader(false);
        setIsLoaded(true);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
            {/* ── PRELOADER ── */}
            <AnimatePresence>
                {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
            </AnimatePresence>

            {/* ── CUSTOM CURSOR ── */}
            <motion.div
                className={`cursor-dot hidden md:block ${cursorHover ? 'cursor-hover' : ''}`}
                animate={{
                    x: cursorPosition.x - (cursorHover ? 30 : 6),
                    y: cursorPosition.y - (cursorHover ? 30 : 6),
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className={`cursor-outline hidden md:block ${cursorHover ? 'cursor-hover' : ''}`}
                animate={{
                    x: cursorPosition.x - (cursorHover ? 40 : 25),
                    y: cursorPosition.y - (cursorHover ? 40 : 25),
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.8 }}
            />

            {/* ── NOISE + GRID ── */}
            <div className="noise" />
            <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0" />

            {/* ── AMBIENT ORBS ── */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-900/8 blur-[150px] rounded-full z-0 animate-float pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/8 blur-[150px] rounded-full z-0 animate-float-delayed pointer-events-none" />
            <div className="fixed top-[40%] left-[50%] w-[30%] h-[30%] bg-pink-900/5 blur-[120px] rounded-full z-0 animate-pulse-slow pointer-events-none" />

            {/* ── SCROLL PROGRESS BAR ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #7c3aed, #a78bfa, #c084fc, #e879f9)',
                }}
            />

            {/* ── SOUND TOGGLE ── */}
            <button
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="sound-toggle glass"
                aria-label="Toggle sound"
            >
                <div className="sound-bars">
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className={`sound-bar ${isSoundOn ? 'playing' : ''}`} />
                    ))}
                </div>
            </button>

            {/* ── NAVIGATION ── */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 glass rounded-full z-50">
                <div className="hidden md:flex gap-0.5">
                    {sections.map((section) => (
                        <Magnetic key={section} strength={0.2}>
                            <button
                                onClick={() => {
                                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                                    setActiveSection(section);
                                }}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 capitalize relative",
                                    activeSection === section
                                        ? "text-white"
                                        : "text-zinc-500 hover:text-zinc-200"
                                )}
                            >
                                {activeSection === section && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute inset-0 bg-primary-600/80 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
                                    />
                                )}
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

            {/* ── MOBILE MENU ── */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-100"
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col items-center gap-6">
                            {sections.map((section, i) => (
                                <motion.button
                                    key={section}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => {
                                        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                                        setActiveSection(section);
                                        setIsMenuOpen(false);
                                    }}
                                    className={cn(
                                        "text-5xl font-black tracking-tighter uppercase font-display transition-colors",
                                        activeSection === section
                                            ? "text-gradient-vibrant"
                                            : "text-stroke text-stroke-hover"
                                    )}
                                >
                                    {section}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════
                MAIN CONTENT
                ══════════════════════════════════ */}
            <main className="relative z-10">

                {/* ── HERO SECTION ── */}
                <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
                    {isLoaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-6xl mx-auto"
                        >
                            {/* Status Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-sm font-medium text-primary-400 mb-10"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                                </span>
                                Open for opportunities
                            </motion.div>

                            {/* Split Text Name */}
                            <h1 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-4 font-display">
                                <SplitText text="KIRAN K." className="text-gradient block" delay={0.3} />
                            </h1>

                            {/* Role subtitle with stagger */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                <p className="text-xl md:text-2xl font-light text-zinc-500 tracking-widest uppercase mb-4">
                                    Full Stack Developer
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="max-w-xl mx-auto text-base md:text-lg text-zinc-500 leading-relaxed mb-12"
                            >
                                Transforming complex problems into elegant digital solutions with
                                <span className="text-zinc-200 font-medium"> 2+ years of experience </span>
                                building high-performance web systems.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-5"
                            >
                                <Magnetic>
                                    <button
                                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="btn-primary group flex items-center gap-2"
                                    >
                                        View Projects
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </button>
                                </Magnetic>
                                <div className="flex items-center gap-3">
                                    <Magnetic>
                                        <a href="https://github.com/kirank860" target="_blank" rel="noreferrer" className="p-3.5 glass rounded-full hover:bg-white/10 transition-all block hover:border-primary-500/30">
                                            <Github size={20} />
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href="https://www.linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="p-3.5 glass rounded-full hover:bg-white/10 transition-all block hover:border-primary-500/30">
                                            <Linkedin size={20} />
                                        </a>
                                    </Magnetic>
                                    <Magnetic>
                                        <a href="mailto:kirankrishnan889@gmail.com" className="p-3.5 glass rounded-full hover:bg-white/10 transition-all block hover:border-primary-500/30">
                                            <Mail size={20} />
                                        </a>
                                    </Magnetic>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-medium">Scroll</span>
                        <div className="scroll-indicator" />
                    </motion.div>
                </section>

                {/* ── MARQUEE BAND ── */}
                <div className="py-8 border-y border-white/[0.04] overflow-hidden">
                    <Marquee
                        items={['Full Stack Developer', 'MERN Stack', 'UI Engineer', 'React Expert', 'Next.js']}
                        speed={30}
                    />
                </div>

                {/* ── ABOUT & SKILLS SECTION ── */}
                <section id="about" className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        {/* About Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="mb-20"
                        >
                            <span className="text-primary-400 font-bold tracking-widest uppercase text-xs mb-6 block">About Me</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter font-display mb-8">
                                <span className="text-gradient">Crafting</span>{' '}
                                <span className="text-stroke">digital</span><br />
                                <span className="text-gradient-vibrant">excellence.</span>
                            </h2>
                        </motion.div>

                        {/* Word-by-word reveal paragraph */}
                        <WordReveal
                            text="I specialize in the MERN stack and modern cloud architectures. My focus is on building scalable applications that provide seamless user experiences through performance-driven code and intuitive design. Every project I take on is an opportunity to push boundaries and deliver something extraordinary."
                            className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight mb-20 max-w-5xl"
                        />

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                            {[
                                { value: '2', suffix: '+', label: 'Years Experience' },
                                { value: '10', suffix: '+', label: 'Projects Built' },
                                { value: '5', suffix: '+', label: 'Industrial Projects' },
                                { value: '100', suffix: '%', label: 'Passion & Dedication' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center md:text-left p-8 glass rounded-3xl"
                                >
                                    <div className="text-4xl md:text-5xl font-black text-gradient-vibrant font-display mb-2">
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="skills">
                            {/* Skills Cards */}
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
                            >
                                {skills.map((skill, idx) => (
                                    <TiltCard key={idx} className="p-8 glass rounded-3xl glow-card">
                                        <div className="relative z-10">
                                            <div className="p-3 glass-strong w-fit rounded-2xl text-primary-400 mb-5">
                                                <skill.icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-xl mb-4 font-display">{skill.name}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map((item, i) => (
                                                    <span key={i} className="text-xs px-3 py-1.5 glass rounded-full text-zinc-400">{item}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </TiltCard>
                                ))}
                            </motion.div>

                            {/* Resume Card */}
                            <motion.a
                                href="/KIRAN_K MERN_STACK_DEVELOPER (1).pdf"
                                download="KIRAN_K MERN_STACK_DEVELOPER (1).pdf"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="md:col-span-1 p-8 glass rounded-3xl flex flex-col items-center justify-center text-center gap-4 group cursor-pointer no-underline glow-card relative overflow-hidden"
                                onMouseMove={handleCardMouseMove}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <Download size={48} className="text-primary-500 transition-transform group-hover:-translate-y-2 duration-500 mx-auto" />
                                    <h3 className="font-bold text-xl uppercase tracking-widest font-display mt-4">Resume</h3>
                                    <p className="text-sm text-zinc-500 mt-2">Download my full profile</p>
                                </div>
                            </motion.a>
                        </div>

                        {/* Hire Me Banner */}
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 30 }}
                            viewport={{ once: true }}
                            className="mt-4 p-8 md:p-10 glass rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-6">
                                <div className="relative h-16 w-16 glass-strong rounded-2xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-500/20 animate-pulse" />
                                    <MessageSquare className="text-primary-400 relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-display">Have a project in mind?</h3>
                                    <p className="text-zinc-500">I'm currently accepting new freelance projects.</p>
                                </div>
                            </div>
                            <Magnetic>
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn-primary"
                                >
                                    Hire Me
                                </button>
                            </Magnetic>
                        </motion.div>
                    </div>
                </section>

                {/* ── MARQUEE BAND 2 ── */}
                <div className="py-6 border-y border-white/[0.04] overflow-hidden">
                    <Marquee
                        items={['Selected Works', 'Case Studies', 'Creative Projects', 'Web Experiences']}
                        reverse={true}
                        speed={35}
                    />
                </div>

                {/* ── INDUSTRIAL PROJECTS (Timeline) ── */}
                <section className="section-padding overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[150px] rounded-full -z-10" />

                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-20 max-w-2xl"
                        >
                            <span className="text-primary-400 font-bold tracking-widest uppercase text-xs mb-6 block">Professional Impact</span>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter font-display mb-6">
                                <span className="text-gradient">Industrial</span><br />
                                <span className="text-stroke">Projects</span>
                            </h2>
                            <p className="text-zinc-500 text-lg leading-relaxed">
                                High-scale solutions delivered for institutions and enterprises, focusing on architecture and business results.
                            </p>
                        </motion.div>

                        {/* Timeline */}
                        <div ref={timelineRef} className="timeline relative">
                            <motion.div
                                className="timeline-progress"
                                style={{ height: timelineHeight }}
                            />

                            {industrialProjects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 mb-20 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="timeline-dot hidden md:block" style={{ top: '50%' }} />

                                    {/* Card */}
                                    <div className={`md:w-[45%] ${idx % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'}`}>
                                        <TiltCard className="glass rounded-[32px] overflow-hidden glow-card group" onMouseMove={handleCardMouseMove}>
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                                            </div>
                                            <div className="p-8 relative z-10">
                                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                                    <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{project.company}</span>
                                                    <span className="text-primary-400 text-[10px] font-bold uppercase tracking-widest">{project.impact}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors font-display">{project.title}</h3>
                                                <p className="text-zinc-500 mb-6 text-sm leading-relaxed">{project.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        {project.tech.map((t, i) => (
                                                            <span key={i} className="text-[10px] text-zinc-600 font-medium">{t}</span>
                                                        ))}
                                                    </div>
                                                    <a href={project.link} target="_blank" rel="noreferrer" className="p-2.5 glass rounded-full hover:bg-primary-500 hover:text-white transition-all">
                                                        <ExternalLink size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SELECTED WORKS (Horizontal Scroll) ── */}
                <section id="projects" ref={projectsRef} className="relative" style={{ height: '400vh' }}>
                    <div className="sticky top-0 h-screen overflow-hidden">
                        <div className="h-full flex flex-col justify-center px-4 md:px-12 lg:px-24">
                            {/* Section Header */}
                            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
                                <div>
                                    <span className="text-primary-400 font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
                                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter font-display">
                                        <span className="text-gradient">Selected</span>{' '}
                                        <span className="text-stroke">Works</span>
                                    </h2>
                                </div>
                                <p className="text-zinc-500 max-w-sm text-sm">A curated collection of projects blending technical precision with creative design.</p>
                            </div>

                            {/* Horizontal Scroll Track */}
                            <motion.div
                                style={{ x: projectsX }}
                                className="flex gap-8"
                            >
                                {projects.map((project, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="project-card-hover group relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[55vh] rounded-[32px] overflow-hidden glass glow-card"
                                        onMouseMove={handleCardMouseMove}
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="project-image absolute inset-0 w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                                        <div
                                            className="absolute inset-0 opacity-20"
                                            style={{ background: `linear-gradient(135deg, ${project.color}22, transparent)` }}
                                        />

                                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end relative z-10">
                                            <div className="flex gap-2 mb-4">
                                                {project.tech.map((t, i) => (
                                                    <span key={i} className="px-3 py-1 glass-strong rounded-full text-xs font-medium text-primary-300">{t}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight font-display uppercase">{project.title}</h3>
                                            <p className="text-zinc-400 mb-6 line-clamp-2 max-w-md">{project.description}</p>

                                            <div className="project-overlay flex items-center gap-4">
                                                <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary py-3 px-6 text-sm">
                                                    Live Demo
                                                </a>
                                                <a href={project.github} target="_blank" rel="noreferrer" className="p-3 glass-strong rounded-full hover:bg-white/10 transition-colors">
                                                    <Github size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── FEATURED PROJECTS GRID ── */}
                <section className="section-padding">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter font-display mb-4">
                                <span className="text-gradient">Featured</span>{' '}
                                <span className="text-stroke">Projects</span>
                            </h2>
                            <p className="text-zinc-500 text-lg max-w-2xl">Exploring new technologies and building innovative solutions across different domains.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {featuredProjects.map((project, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <TiltCard className="glass rounded-3xl p-5 hover:bg-white/[0.04] transition-all duration-500 flex flex-col h-full glow-card group" onMouseMove={handleCardMouseMove}>
                                        <div className="relative h-44 mb-5 rounded-2xl overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/0 transition-colors duration-500" />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary-400 transition-colors font-display">{project.title}</h3>
                                            <p className="text-zinc-500 text-sm mb-5 line-clamp-2">{project.description}</p>
                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex gap-2">
                                                    {project.tech.slice(0, 2).map((t, i) => (
                                                        <span key={i} className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{t}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-primary-400 transition-colors">
                                                        <Github size={16} />
                                                    </a>
                                                    {project.link !== '#' && (
                                                        <a href={project.link} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-primary-400 transition-colors">
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="mt-12 text-center"
                        >
                            <a
                                href="https://github.com/kirank860"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 btn-outline rounded-full text-zinc-400 hover:text-zinc-100 transition-all"
                            >
                                View More on GitHub
                                <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* ── CONTACT SECTION ── */}
                <section id="contact" className="section-padding relative overflow-hidden">
                    {/* Giant Background Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-0">
                        <span className="text-[15vw] font-black italic tracking-tighter font-display text-white/[0.02] whitespace-nowrap">
                            LET'S TALK
                        </span>
                    </div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Giant CTA Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter font-display leading-[0.9]">
                                <span className="text-stroke block">LET'S WORK</span>
                                <span className="text-gradient-vibrant block">TOGETHER</span>
                            </h2>
                        </motion.div>

                        {/* Contact Content */}
                        <div className="glass rounded-[40px] p-8 md:p-14 lg:p-20 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/5 blur-[100px] -z-10" />

                            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold font-display mb-10">
                                        <span className="text-gradient">Get in touch</span>
                                    </h3>
                                    <div className="space-y-8">
                                        <a href="mailto:kirankrishnan889@gmail.com" className="flex items-center gap-5 group">
                                            <div className="p-4 glass-strong rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Mail size={22} className="text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-1">Email</p>
                                                <span className="text-base md:text-lg font-medium magnetic-link break-all">kirankrishnan889@gmail.com</span>
                                            </div>
                                        </a>
                                        <a href="https://linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                                            <div className="p-4 glass-strong rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Linkedin size={22} className="text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-1">Social</p>
                                                <span className="text-lg font-medium magnetic-link">LinkedIn Profile</span>
                                            </div>
                                        </a>
                                        <div className="flex items-center gap-5 group">
                                            <div className="p-4 glass-strong rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Globe size={22} className="text-primary-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold mb-1">Location</p>
                                                <span className="text-lg font-medium">India</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30 transition-all text-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30 transition-all text-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Message</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/30 transition-all resize-none text-sm"
                                            placeholder="How can I help you?"
                                        />
                                    </div>
                                    <Magnetic>
                                        <button type="submit" className="w-full btn-primary py-4 text-base font-bold">
                                            Send Message
                                            <ArrowRight size={18} className="inline-block ml-2" />
                                        </button>
                                    </Magnetic>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER MARQUEE ── */}
                <div className="py-10 border-t border-white/[0.04] overflow-hidden">
                    <Marquee
                        items={['Kiran K.', 'Full Stack Developer', 'Available for Work', 'Let\'s Connect']}
                        speed={40}
                        className="opacity-40"
                    />
                </div>

                {/* ── FOOTER ── */}
                <footer className="py-10 px-6 border-t border-white/[0.04]">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black italic font-display text-sm"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}>
                                K
                            </div>
                            <span className="font-bold tracking-tighter uppercase font-display text-sm">Kiran K.</span>
                        </div>
                        <p className="text-zinc-600 text-xs tracking-widest uppercase">© {new Date().getFullYear()} · Built with passion</p>
                        <div className="flex gap-5">
                            <a href="https://github.com/kirank860" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-primary-400 transition-colors">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-primary-400 transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:kirankrishnan889@gmail.com" className="text-zinc-600 hover:text-primary-400 transition-colors">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default PremiumPortfolio;
