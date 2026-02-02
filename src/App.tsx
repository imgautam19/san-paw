
import React, { useState, useEffect, useCallback } from 'react';
import { generateDogPun } from './services/gemini';
import FloatingBones from './components/FloatingBones';
import BoneCatchGame from './components/BoneCatchGame';

type AdventureStep = 'intro' | 'diary' | 'walk' | 'pet' | 'game' | 'ask' | 'success';

const App: React.FC = () => {
  const [step, setStep] = useState<AdventureStep>('intro');
  const [pun, setPun] = useState({ pun: "You're paw-sitively amazing!", message: "I'd be barking mad not to ask you!" });
  const [noButtonPos, setNoButtonPos] = useState({ top: 'auto', left: 'auto' });
  const [noButtonCount, setNoButtonCount] = useState(0);
  const [happiness, setHappiness] = useState(0);
  const [walkProgress, setWalkProgress] = useState(0);
  const [barking, setBarking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPun = async () => {
      setLoading(true);
      const result = await generateDogPun();
      setPun(result);
      setLoading(false);
    };
    fetchPun();
  }, []);

  const triggerBark = () => {
    setBarking(true);
    const audio = new Audio("https://www.soundjay.com/communication/sounds/dog-bark-1.mp3");
    audio.volume = 0.2;
    // Note: Audio might be blocked by browser policy until interaction
    audio.play().catch(() => {}); 
    setTimeout(() => setBarking(false), 500);
  };

  const nextStep = () => {
    const steps: AdventureStep[] = ['intro', 'diary', 'walk', 'pet', 'game', 'ask', 'success'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 60) + 20;
    const randomLeft = Math.floor(Math.random() * 60) + 20;
    setNoButtonPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setNoButtonCount(prev => prev + 1);
  };

  const getPuppyImage = (type: AdventureStep | 'party' | 'begging') => {
    const images: Record<string, string> = {
      intro: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=400',
      diary: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
      walk: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=400',
      pet: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
      game: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=400',
      ask: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400',
      success: 'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?auto=format&fit=crop&q=80&w=400',
      begging: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400'
    };
    return images[type] || images.intro;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative bg-[#fff9f0] text-[#5d4037] overflow-hidden">
      <FloatingBones />
      
      {/* Bark UI */}
      {barking && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-bounce bg-[#8B4513] text-white px-6 py-2 rounded-full font-heading text-xl shadow-2xl">
          WOOF! 🐾
        </div>
      )}

      <main className="z-10 bg-white/95 backdrop-blur-sm rounded-[3rem] shadow-2xl border-8 border-[#e6d5c3] p-8 max-w-xl w-full text-center transition-all duration-700 transform relative overflow-hidden">
        
        {/* Progress Bar (Bone Meter) */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#f0e68c]/30">
          <div 
            className="h-full bg-[#8B4513] transition-all duration-1000" 
            style={{ width: `${(['intro', 'diary', 'walk', 'pet', 'game', 'ask', 'success'].indexOf(step) / 6) * 100}%` }}
          />
        </div>

        {step === 'intro' && (
          <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative">
              <img src={getPuppyImage('intro')} className="w-56 h-56 rounded-full border-8 border-[#f0e68c] object-cover wiggle" alt="Puppy" />
              <div className="absolute -bottom-4 bg-white px-4 py-1 rounded-full shadow-md font-heading text-[#8B4513]">Hi!</div>
            </div>
            <h1 className="text-4xl font-heading text-[#8B4513]">Ready for an Adventure?</h1>
            <p className="text-lg">I've been preparing a special surprise for you all day!</p>
            <button onClick={nextStep} className="group relative px-10 py-4 bg-[#8B4513] text-white font-heading rounded-full shadow-xl overflow-hidden transition-all hover:scale-110">
              <span className="relative z-10">Start the Journey! 🐾</span>
              <div className="absolute inset-0 bg-[#a0522d] translate-y-full group-hover:translate-y-0 transition-transform" />
            </button>
          </div>
        )}

        {step === 'diary' && (
          <div className="flex flex-col items-center space-y-6 animate-in slide-in-from-right-10 duration-500">
            <div className="bg-[#fdf5e6] p-8 rounded-3xl border-4 border-double border-[#d2b48c] shadow-inner relative">
              <h2 className="text-2xl font-heading text-[#8B4513] mb-4 text-left">Dear Human,</h2>
              <p className="text-left italic leading-relaxed text-lg">
                Today started with a big stretch. I saw a squirrel, but I didn't chase it because I was busy thinking about how much I like you. I hope you like my surprise...
              </p>
              <div className="flex justify-end mt-4">
                <span className="font-heading text-[#8B4513]">Signed, The Goodest Puppy</span>
              </div>
            </div>
            <button onClick={nextStep} className="px-8 py-3 bg-[#f0e68c] text-[#5d4037] font-heading rounded-full shadow-lg hover:bg-[#ebd95e] transition-all">
              Next: The Morning Walk 🎾
            </button>
          </div>
        )}

        {step === 'walk' && (
          <div className="flex flex-col items-center space-y-6 animate-in slide-in-from-bottom-10 duration-500">
            <h2 className="text-2xl font-heading text-[#8B4513]">The Morning Walk</h2>
            <p>Click the puppy to help it walk to the park!</p>
            <div className="relative w-full h-32 bg-[#fdf5e6] rounded-2xl border-2 border-dashed border-[#d2b48c] overflow-hidden flex items-center">
                <div 
                    onClick={() => {
                        setWalkProgress(p => Math.min(p + 10, 90));
                        triggerBark();
                        if (walkProgress >= 80) setTimeout(nextStep, 600);
                    }}
                    className="absolute transition-all duration-300 cursor-pointer hover:scale-110"
                    style={{ left: `${walkProgress}%` }}
                >
                    <span className="text-6xl">🐕</span>
                    <div className="absolute -top-4 -right-2 bg-white rounded-full px-2 text-xs shadow-sm">Click!</div>
                </div>
                {Array.from({length: Math.floor(walkProgress/10)}).map((_, i) => (
                    <div key={i} className="absolute text-[#d2b48c] opacity-30" style={{ left: `${i*10 + 2}%`, bottom: '10%' }}>🐾</div>
                ))}
            </div>
            <div className="text-sm opacity-60">Progress: {walkProgress}%</div>
          </div>
        )}

        {step === 'pet' && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-heading text-[#8B4513]">Puppy Petting Station</h2>
            <div 
                className="relative group cursor-pointer"
                onClick={() => {
                    setHappiness(h => Math.min(h + 5, 100));
                    triggerBark();
                    if (happiness >= 95) setTimeout(nextStep, 1000);
                }}
            >
                <img src={getPuppyImage('pet')} className="w-48 h-48 rounded-full border-8 border-[#f0e68c] object-cover shadow-lg group-active:scale-95 transition-transform" alt="Puppy to pet" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/80 px-4 py-2 rounded-full font-bold text-[#8B4513]">GIVE SCRITCHES! 🦴</span>
                </div>
            </div>
            <div className="w-full max-w-xs h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-[#8B4513]">
                <div className="h-full bg-orange-400 transition-all" style={{ width: `${happiness}%` }} />
            </div>
            <p className="font-heading text-[#8B4513]">Happiness Level: {happiness}%</p>
          </div>
        )}

        {step === 'game' && (
          <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-500">
            <h2 className="text-2xl font-heading text-[#8B4513]">Treat Fetching!</h2>
            <p className="text-sm">Catch 5 treats to unlock the final surprise!</p>
            <BoneCatchGame onComplete={nextStep} />
          </div>
        )}

        {step === 'ask' && (
          <div className="flex flex-col items-center space-y-6 relative min-h-[400px] animate-in slide-in-from-right-10 duration-500">
            <img 
              src={noButtonCount > 5 ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400' : getPuppyImage('ask')} 
              className="w-44 h-44 rounded-full border-8 border-[#f0e68c] object-cover mb-2 transition-all"
              alt="The Ask"
            />
            
            <div className="space-y-4 w-full">
              <h2 className="text-4xl font-heading text-[#8B4513]">Will you be my Valentine?</h2>
              {loading ? (
                <div className="animate-pulse text-[#8B4513]">Sniffing out a good pun...</div>
              ) : (
                <div className="bg-[#fffdfa] p-5 rounded-2xl border-2 border-dashed border-[#d2b48c] shadow-inner transform -rotate-1">
                    <p className="text-xl font-bold italic text-[#8B4513]">"{pun.pun}"</p>
                    <p className="text-sm opacity-70 mt-2 font-medium">{pun.message}</p>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-6 mt-10 w-full">
              <button 
                onClick={() => setStep('success')}
                style={{ fontSize: `${1.4 + (noButtonCount * 0.15)}rem` }}
                className="px-14 py-6 bg-[#8cc63f] hover:bg-[#7db238] text-white font-heading rounded-full shadow-2xl transform hover:scale-110 transition-all z-20"
              >
                YES! 🐾
              </button>
              
              <button 
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="px-6 py-3 bg-gray-200 text-gray-500 font-heading rounded-full shadow-md transition-all absolute"
                style={{ 
                  top: noButtonPos.top === 'auto' ? 'unset' : noButtonPos.top,
                  left: noButtonPos.left === 'auto' ? 'unset' : noButtonPos.left,
                  position: noButtonCount > 0 ? 'fixed' : 'relative',
                  zIndex: 30
                }}
              >
                No 🦴
              </button>
            </div>
            {noButtonCount > 3 && <p className="text-xs italic opacity-50 mt-4 animate-pulse">The puppy is getting confused! 🐶</p>}
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center space-y-6 animate-in zoom-in duration-700">
            <div className="bg-[#fffdfa] p-6 rounded-[2rem] border-8 border-[#f0e68c] shadow-2xl relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border-4 border-[#8B4513] font-heading text-[#8B4513] whitespace-nowrap">
                CERTIFICATE OF PAWSOMENESS
              </div>
              <img src={getPuppyImage('success')} className="w-56 h-56 rounded-full border-4 border-[#8B4513] object-cover mb-4" alt="Celebration" />
              <h1 className="text-5xl font-heading text-[#8B4513]">IT'S A MATCH!</h1>
              <p className="text-xl font-medium">You have been officially claimed by the Goodest Puppy in town!</p>
              <div className="flex justify-center gap-4 mt-6">
                <span className="text-4xl animate-bounce">🦴</span>
                <span className="text-4xl animate-bounce delay-100">🦴</span>
                <span className="text-4xl animate-bounce delay-200">🦴</span>
              </div>
            </div>
            <button onClick={() => setStep('intro')} className="text-[#8B4513] opacity-40 hover:opacity-100 underline text-sm font-bold">Start Adventure Over</button>
          </div>
        )}

      </main>

      <footer className="mt-8 text-[#8B4513] opacity-50 text-sm font-heading z-10 flex items-center gap-4">
        <span>🐾 Wag More</span>
        <span className="h-1 w-1 bg-[#8B4513] rounded-full"></span>
        <span>Bark Less 🐾</span>
      </footer>
    </div>
  );
};

const PawIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6zM8 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM12 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM5 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm14 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
)

export default App;
