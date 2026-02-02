
import React, { useState, useEffect, useRef } from 'react';

interface Bone {
  id: number;
  x: number;
  y: number;
  speed: number;
}

interface BoneCatchGameProps {
  onComplete: () => void;
}

const BoneCatchGame: React.FC<BoneCatchGameProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [bones, setBones] = useState<Bone[]>([]);
  const [bowlX, setBowlX] = useState(50); // percentage
  const gameRef = useRef<HTMLDivElement>(null);
  const targetScore = 5;

  useEffect(() => {
    if (score >= targetScore) {
      setTimeout(onComplete, 500);
      return;
    }

    const interval = setInterval(() => {
      setBones((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          y: -10,
          speed: Math.random() * 2 + 2,
        },
      ]);
    }, 1200);

    return () => clearInterval(interval);
  }, [score, onComplete]);

  useEffect(() => {
    const moveBones = setInterval(() => {
      setBones((prev) => {
        const nextBones = prev.map((b) => ({ ...b, y: b.y + b.speed }));
        
        // Check collisions
        const remainingBones = nextBones.filter((b) => {
          const isCaught = b.y > 80 && b.y < 95 && Math.abs(b.x - bowlX) < 15;
          if (isCaught) {
            setScore((s) => s + 1);
            return false;
          }
          return b.y < 110;
        });

        return remainingBones;
      });
    }, 30);

    return () => clearInterval(moveBones);
  }, [bowlX]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBowlX(Math.max(10, Math.min(90, x)));
  };

  return (
    <div 
      ref={gameRef}
      className="relative w-full h-64 bg-[#fffdfa] border-4 border-dashed border-[#e6d5c3] rounded-2xl overflow-hidden cursor-none touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <div className="absolute top-2 left-4 font-heading text-[#8B4513] z-20">
        Treats Caught: {score}/{targetScore}
      </div>

      {bones.map((bone) => (
        <div
          key={bone.id}
          className="absolute text-2xl"
          style={{ left: `${bone.x}%`, top: `${bone.y}%` }}
        >
          🦴
        </div>
      ))}

      <div 
        className="absolute bottom-4 transform -translate-x-1/2 transition-all duration-75 text-5xl"
        style={{ left: `${bowlX}%` }}
      >
        🐶
      </div>

      {score >= targetScore && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-30 animate-pulse">
            <span className="font-heading text-2xl text-[#8B4513]">Goodest Boy/Girl! ✨</span>
        </div>
      )}
    </div>
  );
};

export default BoneCatchGame;
