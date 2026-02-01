
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, ChevronDown, CheckCircle2, Wallet, Rocket, Coins } from 'lucide-react';
import { SED_CA, SED_LOGO_URL, SED_TWITTER_URL, PUMPFUN_URL, MEME_IMAGES } from './constants';

const XLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);

const FloatingBackground = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const newItems = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.4,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      img: SED_LOGO_URL
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.img
          key={item.id}
          src={item.img}
          alt=""
          className="absolute w-24 h-24 rounded-full grayscale opacity-20 border border-white/10"
          initial={{ left: `${item.x}%`, top: `${item.y}%`, opacity: 0 }}
          animate={{
            top: [`${item.y}%`, `${(item.y - 20 + 100) % 100}%`, `${item.y}%`],
            left: [`${item.x}%`, `${(item.x + 10) % 100}%`, `${item.x}%`],
            rotate: [0, 360],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay
          }}
        />
      ))}
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-[#b7983b]/90 backdrop-blur-lg shadow-lg">
    <div className="flex items-center gap-3">
      <img src={SED_LOGO_URL} alt="SED Logo" className="w-10 h-10 rounded-full border-2 border-white/50" />
      <span className="text-3xl font-meme tracking-widest text-outline">$SED</span>
    </div>
    <div className="hidden lg:flex gap-8 xl:gap-12">
      {['ABOUT', 'MEMES', 'BUY', 'CHART'].map((item) => (
        <a key={item} href={`#${item.toLowerCase()}`} className="font-meme text-xl hover:scale-110 transition-transform tracking-widest text-white/90 hover:text-white hover:text-outline">
          {item}
        </a>
      ))}
    </div>
    <a href={PUMPFUN_URL} target="_blank" className="bg-white text-[#b7983b] px-6 py-2 rounded-full font-meme text-xl hover:shadow-xl transition-all hover:-translate-y-1 border-2 border-[#b7983b]">
      BUY NOW
    </a>
  </nav>
);

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = () => {
    navigator.clipboard.writeText(SED_CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#b7983b]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <FloatingBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-6xl"
        >
          <div className="relative inline-block mb-10 group">
             <div className="absolute inset-0 bg-white/50 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
             <motion.img 
                src={SED_LOGO_URL} 
                alt="Smoking Eagle Dog" 
                className="relative w-48 h-48 md:w-80 md:h-80 mx-auto rounded-full border-8 border-white/20 sed-glow object-cover shadow-2xl" 
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-meme text-white mb-6 leading-none text-outline uppercase drop-shadow-xl">
            Smoking Eagle Dog
          </h1>
          
          <p className="text-2xl md:text-4xl font-meme tracking-[0.2em] mb-12 text-white/90 drop-shadow-md">
            THE HYBRID LEGEND
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div 
              onClick={copyCA}
              className="flex items-center gap-4 bg-black/20 hover:bg-black/30 px-8 py-4 rounded-full border-2 border-white/30 transition-all cursor-pointer backdrop-blur-md active:scale-95"
            >
              <span className="font-mono text-lg font-bold text-white">{SED_CA.slice(0, 10)}...{SED_CA.slice(-10)}</span>
              {copied ? <CheckCircle2 className="text-green-400" /> : <Copy size={20} className="text-white" />}
            </div>
            
            <div className="flex gap-4">
                <a 
                  href={SED_TWITTER_URL} 
                  target="_blank" 
                  className="p-4 bg-white text-[#b7983b] rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-white/20"
                >
                  <XLogo size={32} />
                </a>
                <a 
                  href={PUMPFUN_URL} 
                  target="_blank" 
                  className="px-8 py-4 bg-white text-[#b7983b] rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-white/20 font-meme text-2xl"
                >
                  PUMP.FUN
                </a>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 animate-bounce text-white/40 z-20">
          <ChevronDown size={40} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white text-[#b7983b] relative z-10 rounded-t-[3rem] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-meme mb-16 text-outline drop-shadow-md"
          >
            THE LORE
          </motion.h2>
          
          <div className="grid gap-12 text-left">
            <motion.div 
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              className="bg-[#b7983b]/5 p-8 rounded-3xl border-l-8 border-[#b7983b] hover:bg-[#b7983b]/10 transition-colors"
            >
              <h3 className="text-4xl font-meme mb-4 text-[#b7983b]">THE NARRATIVE</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-700">
                $SED – Smoking Eagle Dog continues to emerge as a compelling narrative in the Solana meme ecosystem. This token draws from a bold, instantly recognizable archetype: an eagle-dog hybrid perpetually engaged in its signature habit. What sets it apart is not just the humor, but the sustained community alignment driving its evolution.
              </p>
            </motion.div>

            <motion.div 
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: 50, opacity: 0 }}
              className="bg-[#b7983b]/5 p-8 rounded-3xl border-r-8 border-[#b7983b] hover:bg-[#b7983b]/10 transition-colors text-right"
            >
              <h3 className="text-4xl font-meme mb-4 text-[#b7983b]">COMMUNITY RESILIENCE</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-700">
                Community resilience stands out as a core differentiator. $SED has cultivated a dedicated following that prioritizes long-term participation over short-term speculation. This organic engagement fosters network effects, consistent promotion, and a level of holder conviction rarely seen in early-stage meme projects.
              </p>
            </motion.div>

            <motion.div 
              whileInView={{ x: 0, opacity: 1 }}
              initial={{ x: -50, opacity: 0 }}
              className="bg-[#b7983b]/5 p-8 rounded-3xl border-l-8 border-[#b7983b] hover:bg-[#b7983b]/10 transition-colors"
            >
              <h3 className="text-4xl font-meme mb-4 text-[#b7983b]">PROVEN LEGACY</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-700">
                Backed by the same developer responsible for $FKH's notable run (which scaled to multi-million market cap levels previously), $SED inherits valuable institutional knowledge of Solana's viral mechanics. Experience in executing high-visibility launches adds a layer of strategic depth to the project's trajectory.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Memes Section */}
      <section id="memes" className="py-32 px-6 bg-[#222] text-white relative z-10 border-t-8 border-[#b7983b]">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-meme text-center mb-20 text-[#b7983b] text-outline drop-shadow-lg"
          >
            MEME GALLERY
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEME_IMAGES.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                className="rounded-2xl overflow-hidden border-4 border-[#b7983b]/50 shadow-2xl bg-black"
              >
                <img 
                  src={src} 
                  alt={`SED Meme ${index + 1}`} 
                  className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="buy" className="py-32 px-6 bg-[#b7983b] text-white relative z-10 border-t-8 border-white/20">
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
                desc: "Visit Pump.fun and find $SED." 
              },
              { 
                icon: <Rocket />, 
                title: "MOON", 
                desc: "Swap your SOL for the Hybrid Legend." 
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/20 p-10 rounded-3xl border border-white/10 text-center hover:bg-black/30 transition-all transform hover:-translate-y-2"
              >
                <div className="mb-6 flex justify-center scale-150 text-white">{step.icon}</div>
                <h3 className="text-3xl font-meme mb-4">{step.title}</h3>
                <p className="opacity-80 font-semibold">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a 
              href={PUMPFUN_URL}
              target="_blank"
              className="inline-block bg-white text-[#b7983b] font-meme text-3xl px-12 py-6 rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-2xl hover:bg-gray-100"
            >
              🚀 VIEW ON PUMP.FUN 🚀
            </a>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section id="chart" className="py-32 px-6 bg-white text-[#b7983b] relative z-10 rounded-t-[3rem] -mt-10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-meme text-center mb-16 text-outline">STATS</h2>
          <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden border-8 border-[#b7983b] shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://dexscreener.com/solana/${SED_CA}?embed=1&theme=light`}
              frameBorder="0"
              title="Chart"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#a38734] text-white text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <img src={SED_LOGO_URL} alt="SED" className="w-24 h-24 mx-auto rounded-full mb-8 border-4 border-white/30" />
          <h3 className="text-6xl font-meme mb-6">$SED</h3>
          <p className="mb-12 opacity-80 text-xl font-medium max-w-2xl mx-auto">
            Smoking Eagle Dog is a community-driven memecoin. 
            No financial promises, just legendary vibes.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            <a href={SED_TWITTER_URL} target="_blank" className="bg-white text-[#b7983b] p-4 rounded-full hover:scale-125 transition-transform shadow-lg">
              <XLogo size={28} />
            </a>
            <a href={PUMPFUN_URL} target="_blank" className="bg-white text-[#b7983b] px-8 py-4 rounded-full font-meme text-xl hover:scale-110 transition-transform shadow-lg">
              PUMP.FUN
            </a>
          </div>
          
          <div className="text-xl font-meme opacity-50 tracking-widest pt-10 border-t border-white/10">
            &copy; 2025 SMOKING EAGLE DOG - THE HYBRID LEGEND
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
