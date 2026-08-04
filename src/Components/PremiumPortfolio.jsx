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
    Layers
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
            <div className="text-sm text-zinc-400 font-mono tracking-widest">
                {Math.min(counter, 100)}%
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════
   SPLIT TEXT ANIMATION
   ═══════════════════════════════════════════ */
const SplitText = ({ text, className = '', delay = 0 }) => {
    return (
        <motion.span 
            initial="initial"
            animate="animate"
            whileHover="hovered"
            className={`${className} inline-flex overflow-hidden`} 
            aria-label={text}
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    variants={{
                        initial: { y: "100%", opacity: 0, rotate: 8 },
                        animate: { y: 0, opacity: 1, rotate: 0 },
                        hovered: { 
                            y: [0, -15, 0], 
                            color: ["currentColor", "#a855f7", "currentColor"],
                            transition: {
                                duration: 0.5,
                                delay: i * 0.05,
                                ease: "easeInOut"
                            }
                        }
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: delay + i * 0.04
                    }}
                    className="inline-block origin-bottom"
                    aria-hidden="true"
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
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
    const heroVideoRef = useRef(null);
    const heroSectionRef = useRef(null);

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

    // Scroll-driven video scrubbing
    const heroScrollRef = useRef(null);
    useEffect(() => {
        const video = heroVideoRef.current;
        const scrollContainer = heroScrollRef.current;
        if (!video || !scrollContainer) return;

        // Pause autoplay — scroll controls it now
        video.pause();

        let currentTime = 0;
        let targetTime = 0;
        let rafId = null;

        const lerp = (start, end, factor) => start + (end - start) * factor;

        const updateVideoTime = () => {
            currentTime = lerp(currentTime, targetTime, 0.08);
            
            if (video.duration && isFinite(video.duration)) {
                video.currentTime = Math.max(0, Math.min(currentTime, video.duration - 0.01));
            }
            
            rafId = requestAnimationFrame(updateVideoTime);
        };

        const handleScroll = () => {
            if (!video.duration) return;
            
            // Fast calculation without triggering layout thrashing
            const scrollHeight = window.innerHeight * 2; // Because container is 300vh, minus 100vh viewport
            const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
            
            targetTime = progress * video.duration;
        };

        // Wait for video metadata to load
        const startScrubbing = () => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            rafId = requestAnimationFrame(updateVideoTime);
            handleScroll(); // set initial position
        };

        if (video.readyState >= 1) {
            startScrubbing();
        } else {
            video.addEventListener('loadedmetadata', startScrubbing);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
            video.removeEventListener('loadedmetadata', startScrubbing);
        };
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

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];

    const projects = [
        {
            title: 'TRUXO - Equipment Rental',
            description: 'Developed a heavy equipment rental web platform with real-time inventory management, admin dashboard, and booking system.',
            tech: ['Next.js 16', 'Tailwind CSS', 'Supabase'],
            link: 'https://truxo.ae',
            github: 'https://github.com/kirank860/truxo',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
            color: '#f59e0b',
        },
        {
            title: 'Aljamia Al Islamiya',
            description: 'Built a full-stack educational portal using the MERN stack. Designed responsive UI for campus facilities and configured scalable storage for institutional records.',
            tech: ['Next.js', 'Node.js', 'MongoDB'],
            link: 'https://www.aljamia.net/',
            github: '#',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
            color: '#0ea5e9',
        },
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
            description: 'Created a vibrant promotional site for a historic hostel, including amenity lists, video testimonials, and social proof sections to drive bookings.',
            tech: ['Astro', 'Tailwind', 'MongoDB'],
            link: 'https://www.oceanisland.com/',
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
            company: 'Island Tower Electromechanical',
            title: 'TRUXO - Equipment Rental',
            description: 'Led end-to-end web development for heavy equipment rental platform. Built admin dashboard, integrated real-time inventory management, and implemented responsive UI.',
            impact: 'Production System',
            tech: ['Next.js 16', 'Supabase', 'Tailwind CSS'],
            link: 'https://truxo.ae',
            image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
        },
        {
            company: 'DataHex Digital Solutions',
            title: 'Aljamia Al Islamiya',
            description: 'Built a full-stack educational portal using the MERN stack. Designed responsive UI for campus facilities and configured scalable storage for institutional records.',
            impact: 'Scalable Architecture',
            tech: ['React.js', 'Node.js', 'MongoDB'],
            link: 'https://www.aljamia.net/',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
        },
        {
            company: 'DataHex Digital Solutions',
            title: 'Ocean Island Inn',
            description: 'Created a vibrant promotional site for a historic hostel, including amenity lists, video testimonials, and social proof sections to drive bookings.',
            impact: 'Traveler Engagement',
            tech: ['Astro', 'Tailwind', 'MongoDB'],
            link: 'https://www.oceanisland.com/',
            image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
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

    const allProjects = [...projects, ...featuredProjects];

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
        <div ref={containerRef} className="relative min-h-screen bg-[#9C9691] text-zinc-100 selection:bg-primary-500/30 font-sans cursor-default">
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
                                        : "text-zinc-200 hover:text-white"
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
                        className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8"
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-100"
                        >
                            <X size={32} />
                        </button>
                        <div className="flex flex-col items-center gap-8">
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
                                        "text-4xl font-black tracking-tighter uppercase font-display transition-colors",
                                        activeSection === section
                                            ? "text-primary-400"
                                            : "text-zinc-100 hover:text-primary-300"
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

                {/* ── HERO SECTION (Scroll-Scrub Wrapper) ── */}
                <div ref={heroScrollRef} className="relative" style={{ height: '300vh', backgroundColor: '#8A8580' }}>
                <section id="home" ref={heroSectionRef} className="sticky top-0 h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: '#8A8580' }}>
                    
                    {/* Background Ambient Glow & Grid */}
                    <div className="absolute inset-0 z-0">
                        {/* Thin lines crossing like Trionn */}
                        <div className="absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-white/[0.06] rotate-[15deg] pointer-events-none" />
                        <div className="absolute top-[80%] left-[-10%] w-[120%] h-[1px] bg-white/[0.06] -rotate-[10deg] pointer-events-none" />
                    </div>

                    {/* Gradient transition at bottom to blend hero into rest of the site */}
                    <div className="absolute bottom-0 left-0 w-full h-48 z-20 pointer-events-none" style={{ background: 'linear-gradient(to top, #9C9691, transparent)' }} />

                    {/* HERO CENTER VIDEO */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="relative w-[100vw] h-[100vh] flex items-center justify-center"
                        >
                            <video 
                                ref={heroVideoRef}
                                src="/3d.mp4" 
                                muted 
                                playsInline
                                preload="auto"
                                className="w-full h-full object-contain scale-[2] sm:scale-150 md:scale-125 lg:scale-110"
                            />
                        </motion.div>
                    </div>

                    {/* Purple gradient overlay */}
                    <div 
                        className="absolute inset-0 z-[15] pointer-events-none"
                        style={{ 
                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(139, 92, 246, 0.15) 30%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)'
                        }} 
                    />

                    <div className="w-full h-full px-4 sm:px-6 lg:px-16 py-16 sm:py-24 flex flex-col justify-end relative z-20 pointer-events-none min-h-screen">
                        
                        {/* TOP NAV SPACER */}
                        <div className="h-16 sm:h-10" />
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 md:gap-0 mt-auto">
                            {/* LEFT SIDE: Typography */}
                            {isLoaded && (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="flex flex-col items-start text-left pointer-events-auto z-20 max-w-xl"
                                >
                                    <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="w-6 sm:w-12 h-[2px] bg-primary-500 flex-shrink-0" />
                                        <span className="text-primary-400 font-mono tracking-wider sm:tracking-widest uppercase text-[9px] sm:text-sm font-bold">Kiran K · Full-Stack Developer</span>
                                    </div>
                                    <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.05] font-display mb-6 sm:mb-10 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-30 relative">
                                        <SplitText text="Building the" className="text-zinc-100 block drop-shadow-xl" delay={0.3} />
                                        <SplitText text="web in motion." className="text-white/80 block drop-shadow-xl" delay={0.8} />
                                    </h1>
                                    
                                    <div className="flex items-center gap-4 sm:gap-6 group cursor-pointer" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                                        <span className="text-xs sm:text-sm font-mono tracking-widest text-white/70 uppercase group-hover:text-primary-400 transition-colors">Start a Project</span>
                                        <ArrowRight size={16} className="text-white/70 group-hover:text-primary-400 group-hover:translate-x-2 transition-all" />
                                    </div>
                                </motion.div>
                            )}

                            {/* RIGHT SIDE (BOTTOM): Stats & Paragraph */}
                            {isLoaded && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-start md:items-start text-left pointer-events-auto z-20 max-w-xs mb-6 md:mb-0"
                                >
                                    <div className="flex items-center border border-white/10 rounded-lg p-3 sm:p-5 bg-black/10 backdrop-blur-md mb-4 sm:mb-8 w-full">
                                        <div className="pr-3 sm:pr-5 border-r border-white/10 flex flex-col items-center">
                                            <Globe className="text-white/80 mb-2" size={22} />
                                            <span className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-mono">EST. 2022</span>
                                        </div>
                                        <div className="pl-3 sm:pl-5">
                                            <p className="text-[10px] sm:text-xs text-white font-mono tracking-widest leading-[1.8] uppercase font-bold">
                                                2+ Years Shaping<br/>Digital Direction.
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-medium">
                                        Websites, AI products, brands, and systems built for clarity, scale and impact.
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
                </div>

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
                            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter font-display mb-8">
                                <span className="text-gradient">Crafting</span>{' '}
                                <span className="text-stroke">digital</span><br />
                                <span className="text-gradient-vibrant">excellence.</span>
                            </h2>
                        </motion.div>

                        {/* Word-by-word reveal paragraph */}
                        <WordReveal
                            text="I specialize in the MERN stack and modern cloud architectures. My focus is on building scalable applications that provide seamless user experiences through performance-driven code and intuitive design. Every project I take on is an opportunity to push boundaries and deliver something extraordinary."
                            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight mb-12 sm:mb-20 max-w-5xl"
                        />

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
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
                                    className="text-center md:text-left p-4 sm:p-8 glass rounded-2xl sm:rounded-3xl"
                                >
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-black text-zinc-100 font-display mb-1 sm:mb-2">
                                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">{stat.label}</div>
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
                                    <TiltCard key={idx} className="p-8 glass rounded-3xl">
                                        <div className="relative z-10">
                                            <div className="p-3 bg-white/40 w-fit rounded-2xl text-primary-400 mb-5">
                                                <skill.icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-xl mb-4 font-display text-zinc-100">{skill.name}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {skill.items.map((item, i) => (
                                                    <span key={i} className="text-xs px-3 py-1.5 bg-white/40 text-zinc-400 rounded-full">{item}</span>
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
                                className="md:col-span-1 p-8 glass rounded-3xl flex flex-col items-center justify-center text-center gap-4 group cursor-pointer no-underline relative overflow-hidden"
                                onMouseMove={handleCardMouseMove}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <Download size={48} className="text-primary-500 transition-transform group-hover:-translate-y-2 duration-500 mx-auto" />
                                    <h3 className="font-bold text-xl uppercase tracking-widest font-display mt-4">Resume</h3>
                                    <p className="text-sm text-zinc-400 mt-2">Download my full profile</p>
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
                                <div className="relative h-16 w-16 bg-white/40 rounded-2xl flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-primary-500/10 animate-pulse" />
                                    <MessageSquare className="text-primary-400 relative z-10" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-display">Have a project in mind?</h3>
                                    <p className="text-zinc-400">I'm currently accepting new freelance projects.</p>
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
                            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter font-display mb-6">
                                <span className="text-gradient">Industrial</span><br />
                                <span className="text-stroke">Projects</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
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
                                        <TiltCard className="glass rounded-[32px] overflow-hidden group" onMouseMove={handleCardMouseMove}>
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                                            </div>
                                            <div className="p-8 relative z-10">
                                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                                    <span className="px-3 py-1 glass rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{project.company}</span>
                                                    <span className="text-primary-400 text-[10px] font-bold uppercase tracking-widest">{project.impact}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors font-display">{project.title}</h3>
                                                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-2">
                                                        {project.tech.map((t, i) => (
                                                            <span key={i} className="text-[10px] text-zinc-300 font-medium">{t}</span>
                                                        ))}
                                                    </div>
                                                    <a href={project.link} target="_blank" rel="noreferrer" className="p-2.5 bg-white/40 rounded-full hover:bg-primary-500 hover:text-zinc-100 transition-all">
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

                {/* ── PROJECTS (Sticky Stack) ── */}
                <section id="projects" ref={projectsRef} className="relative pb-[30vh]">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-4 md:px-12 lg:px-24 mb-20 pt-20">
                        <div>
                            <span className="text-primary-400 font-bold tracking-widest uppercase text-xs mb-4 block">Portfolio</span>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter font-display">
                                <span className="text-gradient">Selected</span>{' '}
                                <span className="text-stroke">Works</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 max-w-sm text-sm mt-6 md:mt-0">A curated collection of projects blending technical precision with creative design.</p>
                    </div>

                    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
                        {allProjects.map((project, idx) => (
                            <div 
                                key={idx} 
                                className="w-full h-[50vh] sm:h-[65vh] md:h-[75vh] flex items-center justify-center mb-8 sm:mb-16"
                            >
                                <div className="w-full h-full rounded-[40px] overflow-hidden relative group shadow-2xl shadow-black/10 glass transition-transform duration-500 hover:scale-[1.02]">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#9C9691] via-zinc-950/40 to-transparent" />
                                    
                                    {/* Content */}
                                    <div className="absolute inset-0 p-4 sm:p-8 md:p-16 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className="text-4xl sm:text-6xl md:text-[8rem] font-black text-zinc-100/10 font-display italic leading-none transition-colors duration-500 group-hover:text-zinc-100/20">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="flex gap-4">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#9C9691]/80 backdrop-blur-sm text-zinc-100 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300">
                                                        <Github size={20} />
                                                    </a>
                                                )}
                                                {project.link !== '#' && (
                                                    <a href={project.link} target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#9C9691]/80 backdrop-blur-sm text-zinc-100 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300 group/link">
                                                        <ExternalLink size={20} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex gap-2 mb-6 flex-wrap">
                                                {project.tech.map((t, i) => (
                                                    <span key={i} className="px-4 py-1.5 bg-[#9C9691]/50 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold text-zinc-300 tracking-widest uppercase border border-black/5">{t}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-4 tracking-tighter font-display uppercase text-zinc-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">{project.title}</h3>
                                            <p className="text-zinc-300 text-xs sm:text-base md:text-lg max-w-2xl drop-shadow-md line-clamp-2 md:line-clamp-none">{project.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center relative z-10"
                    >
                        <a
                            href="https://github.com/kirank860"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 glass hover:border-black/10 rounded-full text-zinc-400 hover:text-zinc-100 transition-all hover:bg-white/40 shadow-xl"
                        >
                            View More on GitHub
                            <ExternalLink size={16} />
                        </a>
                    </motion.div>
                </section>


                {/* ── CONTACT SECTION ── */}
                <section id="contact" className="section-padding relative overflow-hidden">
                    {/* Giant Background Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-0">
                        <span className="text-[15vw] font-black italic tracking-tighter font-display text-zinc-100/[0.02] whitespace-nowrap">
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
                            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter font-display leading-[0.9]">
                                <span className="text-stroke block">LET'S WORK</span>
                                <span className="text-gradient-vibrant block">TOGETHER</span>
                            </h2>
                        </motion.div>

                        {/* Contact Content */}
                        <div className="glass rounded-3xl sm:rounded-[40px] p-5 sm:p-8 md:p-14 lg:p-20 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-500/5 blur-[100px] -z-10" />

                            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                                <div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-6 sm:mb-10 text-zinc-800">
                                        Get in touch
                                    </h3>
                                    <div className="space-y-8">
                                        <a href="mailto:kirankrishnan889@gmail.com" className="flex items-center gap-5 group">
                                            <div className="p-4 bg-white/60 rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Mail size={22} className="text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">Email</p>
                                                <span className="text-base md:text-lg font-bold text-zinc-800 break-all">kirankrishnan889@gmail.com</span>
                                            </div>
                                        </a>
                                        <a href="https://linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                                            <div className="p-4 bg-white/60 rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Linkedin size={22} className="text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">Social</p>
                                                <span className="text-lg font-bold text-zinc-800">LinkedIn Profile</span>
                                            </div>
                                        </a>
                                        <div className="flex items-center gap-5 group">
                                            <div className="p-4 bg-white/60 rounded-2xl group-hover:bg-primary-500/20 transition-all duration-300">
                                                <Globe size={22} className="text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">Location</p>
                                                <span className="text-lg font-bold text-zinc-800">India</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/50 border border-black/[0.1] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all text-sm text-zinc-900 placeholder-zinc-500 font-medium"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Email</label>
                                        <input
                                            type="email"
                                            className="w-full bg-white/50 border border-black/[0.1] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all text-sm text-zinc-900 placeholder-zinc-500 font-medium"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 ml-1">Message</label>
                                        <textarea
                                            rows={4}
                                            className="w-full bg-white/50 border border-black/[0.1] p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all resize-none text-sm text-zinc-900 placeholder-zinc-500 font-medium"
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
                        <p className="text-zinc-300 text-xs tracking-widest uppercase">© {new Date().getFullYear()} · Built with passion</p>
                        <div className="flex gap-5">
                            <a href="https://github.com/kirank860" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-primary-400 transition-colors">
                                <Github size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/kiran-k-b25b2b262/" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-primary-400 transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:kirankrishnan889@gmail.com" className="text-zinc-300 hover:text-primary-400 transition-colors">
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
