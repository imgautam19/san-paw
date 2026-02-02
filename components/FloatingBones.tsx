
import React, { useEffect, useState } from 'react';

const BoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#EADBC8">
    <path d="M17 3c-1.7 0-3 1.3-3 3 0 .4.1.8.2 1.2L9.8 11.6c-.4-.1-.8-.2-1.2-.2-1.7 0-3 1.3-3 3s1.3 3 3 3c.4 0 .8-.1 1.2-.2l4.4 4.4c-.1.4-.2.8-.2 1.2 0 1.7 1.3 3 3 3s3-1.3 3-3c0-.4-.1-.8-.2-1.2l-4.4-4.4c.1-.4.2-.8.2-1.2 0-1.7-1.3-3-3-3-.4 0-.8.1-1.2.2L9.8 11.6c.1-.4.2-.8.2-1.2 0-1.7-1.3-3-3-3-1.7 0-3 1.3-3 3s1.3 3 3 3c.4 0 .8-.1 1.2-.2l4.4-4.4C12.9 8.6 12.8 8.2 12.8 7.8c0-1.7 1.3-3 3-3s3 1.3 3 3c0 .4-.1.8-.2 1.2l4.4 4.4c.1-.4.2-.8.2-1.2 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .4.1.8.2 1.2l-4.4 4.4c.1.4.2.8.2 1.2 0 1.7-1.3 3-3 3s-3-1.3-3-3c0-.4.1-.8.2-1.2l4.4-4.4c-.1-.4-.2-.8-.2-1.2z" />
    <path d="M18 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM5 14c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm1.5-3.5l11 11M3.5 17.5l11-11" stroke="#8B4513" strokeWidth="1"/>
  </svg>
);

const SimpleBone = () => (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="#D2B48C">
        <path d="M19 13.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-14 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm14-10c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-14 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm12 5.5h-10v5h10v-5z" />
    </svg>
)

const FloatingBones: React.FC = () => {
  const [bones, setBones] = useState<{ id: number; left: number; delay: number; scale: number }[]>([]);

  useEffect(() => {
    const newBones = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1,
    }));
    setBones(newBones);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bones.map((bone) => (
        <div
          key={bone.id}
          className="floating-bone"
          style={{
            left: `${bone.left}%`,
            animationDelay: `${bone.delay}s`,
            transform: `scale(${bone.scale})`,
          }}
        >
          <SimpleBone />
        </div>
      ))}
    </div>
  );
};

export default FloatingBones;
