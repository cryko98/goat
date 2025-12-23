
import React, { useState } from 'react';
import { generateGoatMeme, RANDOM_PROMPTS } from '../services/gemini';
import { MemeStyle } from '../types';
import { Sparkles, Image as ImageIcon, Loader2, Shuffle, Meh, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<MemeStyle>('cartoon');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const url = await generateGoatMeme(finalPrompt, style);
      setResult(url);
    } catch (err: any) {
      console.error("Detailed error from Gemini:", err);
      // Ha 403 vagy 401, az valószínűleg API kulcs hiba
      const errorMsg = err.message || "";
      if (errorMsg.includes("403") || errorMsg.includes("401") || errorMsg.includes("key")) {
        setError("Invalid API Key. The Goat demands a valid offering in Vercel settings.");
      } else if (errorMsg.includes("429")) {
        setError("The Goat is tired of your requests. (Rate limited)");
      } else {
        setError("The AI is unimpressed with your request. Or the API key is missing. Check the console.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const randomPrompt = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(randomPrompt);
    handleGenerate(randomPrompt);
  };

  return (
    <section id="generator" className="py-32 px-6 bg-[#a38734] relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-6xl md:text-8xl font-meme mb-4 text-white text-outline">
          MEME LAB
        </h2>
        <p className="text-xl font-medium text-white/70 mb-12 italic">"Try to impress the Goat. Most fail."</p>
        
        <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/30 shadow-2xl">
          <div className="mb-10 space-y-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Tell the Goat what to do. Make it mid, he's used to it."
              className="w-full p-6 rounded-2xl bg-white/10 border border-white/30 text-white text-xl placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white min-h-[120px]"
            />
            
            <div className="flex flex-wrap justify-center gap-4">
              {(['realistic', 'cartoon', 'gta'] as MemeStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-8 py-3 rounded-full font-meme text-2xl transition-all ${
                    style === s ? 'bg-white text-[#b7983b] scale-110 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-white text-[#b7983b] px-10 py-5 rounded-full font-meme text-3xl hover:scale-105 transition-all disabled:opacity-50 shadow-xl"
            >
              {loading ? <Loader2 className="animate-spin" size={32} /> : <Sparkles size={32} />}
              GENERATE
            </button>
            <button
              onClick={handleRandom}
              disabled={loading}
              className="flex items-center justify-center gap-3 bg-white/10 text-white px-10 py-5 rounded-full font-meme text-3xl hover:bg-white/20 transition-all disabled:opacity-50"
            >
              <Shuffle size={32} />
              RANDOM
            </button>
          </div>

          <div className="mt-12 min-h-[400px] flex items-center justify-center bg-black/5 rounded-[2rem] p-4 border-2 border-dashed border-white/10">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="text-3xl font-meme text-white flex flex-col items-center gap-4"
                >
                  <Loader2 size={80} className="animate-spin text-white/50" />
                  <span>THE GOAT IS CONSIDERING IT...</span>
                </motion.div>
              )}
              
              {!loading && result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group max-w-lg"
                >
                  <img 
                    src={result} 
                    alt="AI Generated" 
                    className="w-full rounded-2xl shadow-2xl border-4 border-white/50"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-[#b7983b] p-2 rounded-full shadow-lg">
                    <Meh size={24} />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all rounded-2xl">
                    <a 
                      href={result} 
                      download="goat-meme.png" 
                      className="bg-white text-[#b7983b] px-8 py-4 rounded-full font-meme text-2xl shadow-xl"
                    >
                      DOWNLOAD
                    </a>
                  </div>
                </motion.div>
              )}

              {!loading && !result && !error && (
                <div className="text-white/20 flex flex-col items-center gap-4">
                  <ImageIcon size={100} />
                  <p className="text-2xl font-meme uppercase tracking-widest">Awaiting your mid prompt</p>
                </div>
              )}

              {error && (
                <div className="text-red-200 font-bold p-10 text-xl max-w-md flex flex-col items-center gap-4">
                  <AlertCircle size={64} />
                  <p className="text-center">{error}</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
