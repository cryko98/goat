
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, ChevronDown, CheckCircle2, Wallet, Rocket, Coins, Star, Zap } from 'lucide-react';
import { GOAT_CA, GOAT_LOGO_URL, BG_GOAT_URL, TWITTER_URL, PUMPFUN_URL } from './constants';
import MemeGenerator from './components/MemeGenerator';

const XLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);

const FloatingBackground = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const newItems = [...Array(10)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      img: i % 2 === 0 ? GOAT_LOGO_URL : BG_GOAT_URL
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      {items.map((item) => (
        <motion.img
          key={item.id}
          src={item.img}
          alt=""
          className="absolute w-32 h-32 rounded-full"
          initial={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0 }}
          animate={{
            top: [`${item.y}%`, `${(item.y + 20) % 100}%`, `${item.y}%`],
            left: [`${item.x}%`, `${(item.x + 10) % 100}%`, `${item.x}%`],
            rotate: [0, 360],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-[#b7983b]/60 backdrop-blur-lg">
    <div className="flex items-center gap-3">
      <img src={GOAT_LOGO_URL} alt="Goat Logo" className="w-10 h-10 rounded-full border-2 border-white/50" />
      <span className="text-3xl font-meme tracking-widest text-outline">$GOAT</span>
    </div>
    <div className="hidden lg:flex gap-12">
      {['ABOUT', 'BUY', 'GENERATOR', 'CHART'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="font-meme text-xl hover:scale-110 transition-transform tracking-widest text-white/90 hover:text-white">
          {item}
        </a>
      ))}
    </div>
    <a href={PUMPFUN_URL} target="_blank" className="bg-white text-[#b7983b] px-6 py-2 rounded-full font-meme text-xl hover:shadow-xl transition-all hover:-translate-y-1">
      BUY NOW
    </a>
  </nav>
);

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(GOAT_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl"
        >
          <div className="relative inline-block mb-10">
             <motion.img 
                src={GOAT_LOGO_URL} 
                alt="Goatcoin" 
                className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-white/30 goat-glow" 
              />
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-meme text-white mb-4 leading-none text-outline">
            GOATCOIN
          </h1>
          
          <p className="text-2xl md:text-4xl font-meme tracking-[0.2em] mb-12 text-white/90">
            DOGE + GOAT = A BETTER WORLD
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div 
              onClick={copyCA}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full border-2 border-white/30 transition-all cursor-pointer backdrop-blur-md"
            >
              <span className="font-mono text-lg font-bold">{GOAT_CA.slice(0, 10)}...{GOAT_CA.slice(-10)}</span>
              {copied ? <CheckCircle2 className="text-green-400" /> : <Copy size={20} />}
            </div>
            
            <div className="flex gap-4">
                <a 
                  href={TWITTER_URL} 
                  target="_blank" 
                  className="p-4 bg-white text-[#b7983b] rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  <XLogo size={32} />
                </a>
                <a 
                  href={PUMPFUN_URL} 
                  target="_blank" 
                  className="px-8 py-4 bg-white text-[#b7983b] rounded-full hover:scale-110 transition-transform shadow-lg font-meme text-2xl"
                >
                  PUMP.FUN
                </a>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 animate-bounce text-white/40">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white text-[#b7983b] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-6xl md:text-8xl font-meme mb-16 text-outline"
          >
            THE STORY
          </motion.h2>
          
          <div className="space-y-12 text-2xl md:text-3xl leading-relaxed font-medium">
            <p>
              In 2014, Dogecoin co-creator <span className="font-bold">@ummjackson</span> created a repository with a vision:
            </p>
            
            <motion.div 
              whileInView={{ scale: [0.95, 1, 0.95] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl md:text-7xl font-meme py-10 px-8 bg-[#b7983b] text-white rounded-[2rem] shadow-2xl"
            >
              “Doge + Goat = a better world.”
            </motion.div>

            <p className="max-w-2xl mx-auto">
              This is the only other animal-based coin concept ever publicly proposed by a Dogecoin co-founder.
            </p>
            
            <p className="text-4xl font-meme text-black pt-10">
              $GOAT IS THE BETA TO DOGECOIN.
            </p>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="buy" className="py-32 px-6 bg-[#b7983b] text-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-meme text-center mb-24 text-outline">HOW TO BUY</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Wallet />, 
                title: "WALLET", 
                desc: "Get Phantom from the app store. Simple." 
              },
              { 
                icon: <Coins />, 
                title: "SOLANA", 
                desc: "Send some SOL to your new wallet." 
              },
              { 
                icon: <ExternalLink />, 
                title: "PUMP", 
                desc: "Visit Pump.fun and find $GOAT." 
              },
              { 
                icon: <Rocket />, 
                title: "MOON", 
                desc: "Swap your SOL for the Greatest Of All Time." 
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 p-10 rounded-3xl border border-white/20 text-center hover:bg-white/20 transition-all"
              >
                <div className="mb-6 flex justify-center scale-150">{step.icon}</div>
                <h3 className="text-3xl font-meme mb-4">{step.title}</h3>
                <p className="opacity-80 font-semibold">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a 
              href={PUMPFUN_URL}
              target="_blank"
              className="inline-block bg-white text-[#b7983b] font-meme text-3xl px-12 py-6 rounded-full hover:scale-105 transition-all shadow-xl"
            >
              🚀 VIEW ON PUMP.FUN 🚀
            </a>
          </div>
        </div>
      </section>

      {/* Meme Generator Section */}
      <MemeGenerator />

      {/* Chart Section */}
      <section id="chart" className="py-32 px-6 bg-white text-[#b7983b] relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-meme text-center mb-16 text-outline">GOAT STATS</h2>
          <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden border-4 border-[#b7983b] shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://dexscreener.com/solana/${GOAT_CA}?embed=1&theme=light`}
              frameBorder="0"
              title="Chart"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#a38734] text-white text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <img src={GOAT_LOGO_URL} alt="Goat" className="w-24 h-24 mx-auto rounded-full mb-8 border-2 border-white/30" />
          <h3 className="text-6xl font-meme mb-6">$GOAT</h3>
          <p className="mb-12 opacity-80 text-xl font-medium max-w-2xl mx-auto">
            Goatcoin is a community-driven memecoin created for fun. 
            No financial promises, just vibes and goats.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            <a href={TWITTER_URL} target="_blank" className="bg-white text-[#b7983b] p-4 rounded-full hover:scale-125 transition-transform">
              <XLogo size={28} />
            </a>
            <a href={PUMPFUN_URL} target="_blank" className="bg-white text-[#b7983b] px-8 py-4 rounded-full font-meme text-xl hover:scale-110 transition-transform">
              PUMP.FUN
            </a>
          </div>
          
          <div className="text-xl font-meme opacity-50 tracking-widest pt-10 border-t border-white/10">
            &copy; 2025 GOATCOIN - DOGE + GOAT = A BETTER WORLD
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
