import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { 
  Wind, 
  BarChart3, 
  CreditCard, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  ShoppingCart,
  Users,
  Box,
  TrendingUp,
  Smartphone,
  MousePointer2,
  ChevronDown,
  Monitor,
  Layout,
  PieChart,
  Shield,
  SmartphoneIcon,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Custom Hooks ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mousePosition;
};

const Reveal = ({ children, direction = "up", delay = 0, duration = 1 }) => {
  const ref = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const getInitialProps = () => {
        switch(direction) {
          case "up": return { y: 60, opacity: 0 };
          case "down": return { y: -60, opacity: 0 };
          case "left": return { x: 60, opacity: 0 };
          case "right": return { x: -60, opacity: 0 };
          case "scale": return { scale: 0.8, opacity: 0 };
          default: return { y: 60, opacity: 0 };
        }
      };

      gsap.from(ref.current, {
        ...getInitialProps(),
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, ref);
    return () => ctx.revert();
  }, [direction, delay, duration]);

  return <div ref={ref}>{children}</div>;
};

// --- Components ---

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 border-2 border-brand-primary rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{ x: x - 16, y: y - 16 }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center">
      <motion.div
        animate={{ 
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-brand-primary/10 rounded-xl"
      />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-brand-primary">
        <path d="M4 4C4 4 9 4 12 12C15 20 20 20 20 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 20C4 20 9 20 12 12C15 4 20 4 20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 12H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    </div>
    <span className={`text-2xl font-display font-bold tracking-tight ${className.includes('text-white') ? 'text-white' : 'text-brand-dark'}`}>
      Kaze <span className="text-brand-primary">POS</span>
    </span>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none pt-6">
      <div className="max-w-5xl mx-auto px-6">
        <div className={`
          pointer-events-auto
          flex justify-between items-center 
          px-6 py-4 rounded-3xl
          transition-all duration-700 ease-out-expo
          ${isScrolled 
            ? 'glass-dark shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-[0.98] border-white/10' 
            : 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg shadow-black/5'
          }
        `}>
          <a href="#" className="group">
            <Logo className={isScrolled ? "!text-white" : ""} />
          </a>

          <div className="hidden lg:flex items-center gap-2">
            {['Fitur', 'Demo', 'Harga', 'Tentang'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase() === 'harga' ? 'pricing' : item.toLowerCase() === 'fitur' ? 'features' : item.toLowerCase() === 'tentang' ? 'about' : item.toLowerCase()}`} 
                className={`
                  px-5 py-2 rounded-xl text-sm font-bold tracking-tight transition-all duration-300 relative group
                  ${isScrolled ? 'text-white/70 hover:text-white' : 'text-brand-dark/70 hover:text-brand-dark'}
                `}
              >
                {item}
                <span className={`
                  absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300
                  ${isScrolled ? 'bg-brand-primary' : 'bg-brand-primary'}
                `} />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all">
              Beli Sekarang
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled ? 'text-white bg-white/10' : 'text-brand-dark bg-brand-primary/10'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-6 right-6 lg:hidden glass-dark rounded-[2rem] p-8 shadow-2xl z-40 pointer-events-auto"
          >
            <div className="flex flex-col gap-8">
              {['Fitur', 'Demo', 'Harga', 'Tentang'].map((item, i) => (
                <motion.a 
                  key={item} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase() === 'harga' ? 'pricing' : item.toLowerCase() === 'fitur' ? 'features' : item.toLowerCase() === 'tentang' ? 'about' : item.toLowerCase()}`} 
                  className="text-2xl font-display font-bold text-white hover:text-brand-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button className="bg-brand-primary text-white w-full py-5 rounded-2xl font-bold text-xl shadow-xl shadow-brand-primary/20">
                Beli Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const WaveBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Dynamic Mesh Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -40, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Floating Abstract Lines/Wind */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1440 800">
        {[...Array(3)].map((_, i) => (
          <motion.path
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 4, delay: i * 0.5, ease: "easeInOut" }}
            d={`M-100,${200 + i * 150} Q300,${100 + i * 50} 720,${400 + i * 100} T1540,${300 + i * 50}`}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="1"
          />
        ))}
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Layered Organic Waves */}
      <div className="absolute inset-0">
        {[
          { color: "var(--color-brand-primary)", delay: 0, height: "65%", opacity: 0.15 },
          { color: "var(--color-brand-secondary)", delay: 2, height: "60%", opacity: 0.1 },
          { color: "var(--color-brand-accent)", delay: 4, height: "55%", opacity: 0.12 },
          { color: "var(--color-brand-primary)", delay: 6, height: "50%", opacity: 0.08 }
        ].map((wave, i) => (
          <motion.div
            key={i}
            animate={{ 
              x: ["-25%", "0%", "-25%"],
              y: ["2%", "0%", "2%"]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: wave.delay 
            }}
            className="absolute bottom-0 left-0 w-[200%] pointer-events-none"
            style={{ height: wave.height, opacity: wave.opacity }}
          >
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
              <path 
                fill={wave.color}
                d="M0,160C240,120,480,240,720,160C960,80,1200,200,1440,160L1440,320L0,320Z"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Top Glass Highlight */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};


const Hero = () => {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-char", {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden px-6 text-center">
      <WaveBackground />
      
      <div className="max-w-5xl mx-auto z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border-white/40 shadow-sm mb-8"
        >
          <motion.div
            animate={{ rotate: 360}}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-brand-primary"
          >
            <Sparkles size={16} />
          </motion.div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark/70">Kaze POS</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline text-brand-dark leading-[1.1] mb-8 perspective-1000">
          {"Kelola Retail Anda".split("").map((char, i) => (
            <span key={i} className="hero-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
          ))}
          <br />
          <span className="text-brand-primary">
            {"Dengan Mudah".split("").map((char, i) => (
              <span key={i} className="hero-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-brand-dark/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Dashboard POS all-in-one dengan inventory management, sales tracking, dan analytics real-time. Cukup 5 menit setup, langsung bisa jual.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/10 flex items-center gap-3"
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
          >
            Lihat Paket <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/60 backdrop-blur-md border border-white/40 text-brand-dark px-10 py-5 rounded-2xl font-bold text-lg shadow-sm flex items-center gap-3"
          >
            Lihat Demo <Zap size={20} className="text-brand-primary" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/30">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-brand-primary"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

import kazeDashboard from './assets/kaze_dashboard_mockup.png';
import kazePos from './assets/kaze_pos_mockup.png';
import kazeInventory from './assets/kaze_inventory_mockup.png';
import kazeCustomerDisplay from './assets/kaze_customer_display_mockup.png';
import kazeKds from './assets/kaze_kds_mockup.png';

const AppMockupSection = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const sectionRef = useRef(null);
  const mockupRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(mockupRef.current, {
        y: -100,
        rotateX: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const screens = [
    {
      title: "Dashboard Overview",
      desc: "Lihat ringkasan bisnis Anda dalam satu layar intuitif tablet.",
      icon: Layout,
      color: "from-indigo-500 to-indigo-400",
      image: kazeDashboard
    },
    {
      title: "Point of Sale",
      desc: "Antarmuka kasir layar lebar untuk efisiensi maksimal.",
      icon: ShoppingCart,
      color: "from-indigo-600 to-indigo-500",
      image: kazePos
    },
    {
      title: "Monitoring Stok",
      desc: "Kelola inventory dan pantau ketersediaan barang real-time.",
      icon: Box,
      color: "from-violet-500 to-indigo-500",
      image: kazeInventory
    },
    {
      title: "Layar Pelanggan",
      desc: "Tampilkan detail belanjaan dan QRIS kepada pelanggan.",
      icon: Monitor,
      color: "from-indigo-400 to-indigo-600",
      image: kazeCustomerDisplay
    },
    {
      title: "Sistem Dapur (KDS)",
      desc: "Manajemen pesanan dapur yang sinkron secara instan.",
      icon: Utensils,
      color: "from-violet-600 to-indigo-400",
      image: kazeKds
    }
  ];

  return (
    <section ref={sectionRef} id="demo" className="py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20"> 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-headline text-brand-dark mb-6"
          >
            Fitur utama di Kaze POS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-dark/60 max-w-2xl mx-auto text-lg"
          >
            Antarmuka Kaze POS yang intuitif, kini lebih powerful di iPad dan Tablet.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
          {/* Mockup: iPad Landscape */}
          <div className="flex justify-center perspective-1000">
            <motion.div
              ref={mockupRef}
              initial={{ opacity: 0, rotateX: 5, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-[950px] aspect-[1.6/1] bg-slate-800 rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.3)] border-[12px] border-slate-900"
            >
              {/* Screen Content */}
              <div className="w-full h-full rounded-[1.8rem] bg-white overflow-hidden relative shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <img 
                      src={screens[activeScreen].image} 
                      alt={screens[activeScreen].title} 
                      className="w-full h-full object-contain" 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>


              {/* Home Button (Modern uniform bezel style doesn't need it, but adding a subtle power indicator) */}
              <div className="absolute right-[-14px] top-20 w-[4px] h-12 bg-slate-900 rounded-l-md" />
              <div className="absolute right-[-14px] top-36 w-[4px] h-12 bg-slate-900 rounded-l-md" />

              {/* Decorative elements around iPad */}
              <div className="absolute -z-10 -top-20 -left-20 w-80 h-80 bg-brand-primary/5 blur-[100px] rounded-full" />
              <div className="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-brand-secondary/5 blur-[100px] rounded-full" />
            </motion.div>
          </div>

          {/* Screen Selector Tabs (Below iPad) */}
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {screens.map((screen, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveScreen(i)}
                className={`flex-1 min-w-[240px] p-6 rounded-2xl cursor-pointer transition-all border ${
                  activeScreen === i 
                  ? 'bg-white border-brand-primary shadow-xl shadow-brand-primary/5 -translate-y-2' 
                  : 'bg-transparent border-brand-dark/5 grayscale opacity-50 hover:opacity-100 hover:grayscale-0'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${screen.color} text-white shadow-lg`}>
                    <screen.icon size={24} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-0.5 transition-colors ${activeScreen === i ? 'text-brand-dark' : 'text-brand-dark/40'}`}>
                      {screen.title}
                    </h3>
                    <p className="text-[10px] text-brand-dark/60 leading-tight">
                      {screen.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className="group relative"
  >
    <div className="bg-white p-12 rounded-[2.5rem] border border-brand-dark/5 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative z-10">
      <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
        <Icon size={32} className="text-brand-dark group-hover:text-white" />
      </div>
      <h3 className="text-3xl font-display text-brand-dark mb-6 leading-tight">{title}</h3>
      <p className="text-brand-dark/60 text-lg leading-relaxed">{desc}</p>
    </div>
    <div className="absolute inset-0 bg-brand-primary/10 rounded-[2.5rem] rotate-2 -z-0 transition-transform group-hover:rotate-6 duration-500" />
  </motion.div>
);

const Features = () => {
  const features = [
    { icon: ShoppingCart, title: "Kasir Pintar", desc: "Transaksi kilat dengan antarmuka intuitif yang dirancang untuk kecepatan tinggi." },
    { icon: Box, title: "Stok Real-time", desc: "Pantau setiap item di berbagai lokasi dengan pembaruan stok langsung dan peringatan otomatis." },
    { icon: Users, title: "Manajemen Member", desc: "Bangun loyalitas pelanggan dengan program membership dan diskon otomatis yang terintegrasi." },
    { icon: BarChart3, title: "Analitik Mendalam", desc: "Dapatkan insight berharga dengan laporan detail penjualan, performa staf, dan tren stok barang." },
    { icon: Monitor, title: "Layar Pelanggan", desc: "Tampilkan detail belanjaan dan media promosi kepada pelanggan secara real-time di layar kedua." },
    { icon: Utensils, title: "Sistem Dapur (KDS)", desc: "Optimalkan operasional dapur dengan antarmuka manajemen pesanan khusus yang sinkron secara instan." }
  ];

  return (
    <section id="features" className="py-32 relative bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <Reveal direction="down">
            <h2 className="text-5xl lg:text-7xl font-headline text-brand-dark mb-8">Fitur Unggulan</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-brand-dark/60">Semua yang Anda butuhkan untuk menjalankan bisnis retail dengan efisiensi maksimal dalam satu platform terpadu.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <Reveal key={i} direction={i % 3 === 0 ? "right" : i % 3 === 2 ? "left" : "up"} delay={i * 0.1}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};



const Pricing = () => {
  return (
    <section id="pricing" className="py-32 bg-brand-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
        <div className="text-center mb-24">
          <Reveal direction="down">
            <h2 className="text-5xl lg:text-7xl font-headline mb-10">Beli Sekali, <br/><span className="text-brand-primary">Pakai Selamanya</span></h2>
          </Reveal>
          <Reveal delay={0.2} direction="scale">
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Tanpa biaya langganan bulanan. Investasi sekali untuk efisiensi bisnis tanpa batas dengan lisensi lifetime.
            </p>
          </Reveal>
        </div>

        <div className="flex justify-center">
          {[
            { name: 'Kaze POS', price: '4.5jt', desc: 'Solusi lengkap untuk bisnis berkembang.', features: ['2 Outlet Lifetime', 'Analitik Bisnis Lanjutan', 'Manajemen Stok Multi-cabang', 'Program Loyalitas & Promo', 'Update Fitur Selamanya'], featured: true, direction: "up" },
          ].map((plan, i) => (
            <Reveal key={i} direction={plan.direction} delay={i * 0.1}>
              <div
                className={`p-12 h-full max-w-lg w-full rounded-[3rem] border transition-all duration-500 flex flex-col ${
                  plan.featured 
                  ? 'bg-white text-brand-dark scale-105 z-20 shadow-2xl' 
                  : 'bg-white/5 border-white/10 text-white'
                }`}
              >
                <h3 className="text-4xl font-display mb-4 font-bold">{plan.name}</h3>
                <p className={`mb-10 text-lg ${plan.featured ? 'text-brand-dark/60' : 'opacity-60'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-6xl font-display font-bold">
                    {plan.price === 'Custom' ? '' : 'Rp '}{plan.price}
                  </span>
                  <span className={`text-sm ${plan.featured ? 'text-brand-dark/40' : 'opacity-60'}`}>
                    {plan.price === 'Custom' ? 'Hubungi Kami' : '/ lifetime'}
                  </span>
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 font-bold">
                      <CheckCircle2 className="text-brand-primary" size={20} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${
                  plan.featured ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'bg-white/10 hover:bg-white/20'
                }`}>
                  Pilih Paket {plan.name}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-40 bg-brand-bg relative overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
      >
        <Wind size={800} className="text-brand-dark" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl lg:text-9xl font-headline text-brand-dark mb-12">
            Siap untuk <br />
            <span className="text-brand-primary">Melaju Lebih Cepat?</span>
          </h2>
          <p className="text-2xl text-brand-dark/60 mb-16 max-w-2xl mx-auto font-medium">
            Bergabunglah dengan ribuan pengusaha retail yang telah menemukan efisiensi bersama Kaze POS. Investasi cerdas untuk masa depan bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button className="bg-brand-primary text-white px-12 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:scale-105 transition-all group flex items-center gap-4">
              Beli Sekarang <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="text-brand-dark font-bold text-2xl hover:text-brand-primary transition-colors flex items-center gap-3">
              Hubungi Sales <ChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 px-6 border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Logo className="mb-8" />
            <p className="text-brand-dark/50 text-lg leading-relaxed">
              Memberdayakan pengusaha retail dengan desain modern dan performa kilat. Lisensi lifetime untuk kebebasan bisnis Anda.
            </p>
          </div>

          {[
            { title: 'Platform', links: ['Ikhtisar', 'Fitur', 'Harga', 'Dokumentasi'] },
            { title: 'Sumber Daya', links: ['Bantuan', 'Blog', 'Komunitas', 'Update'] },
            { title: 'Perusahaan', links: ['Tentang Kami', 'Karir', 'Kontak', 'Legal'] }
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-brand-dark font-bold text-lg mb-8 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-brand-dark/40 hover:text-brand-primary transition-colors font-medium text-lg">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-12 border-t border-brand-dark/5 text-brand-dark/30 font-bold tracking-widest text-xs uppercase text-center">
          &copy; {new Date().getFullYear()} Kaze POS. Built for the Modern World.
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="grain-bg overflow-x-hidden selection:bg-brand-primary selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <AppMockupSection />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

