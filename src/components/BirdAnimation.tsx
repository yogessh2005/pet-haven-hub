import React from 'react';

interface BirdProps {
  className?: string;
  color?: string;
  size?: number;
}

const Bird: React.FC<BirdProps> = ({ className = '', color = 'hsl(24, 80%, 50%)', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 40 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="20" cy="12" rx="12" ry="8" fill={color} />
      
      {/* Head */}
      <circle cx="30" cy="10" r="5" fill={color} />
      
      {/* Beak */}
      <polygon points="35,10 40,12 35,14" fill="hsl(45, 90%, 55%)" />
      
      {/* Eye */}
      <circle cx="32" cy="9" r="1.5" fill="white" />
      <circle cx="32.5" cy="9" r="0.8" fill="black" />
      
      {/* Wing */}
      <path
        className="wing"
        d="M12 8 C8 2, 4 4, 2 8 C4 6, 8 6, 12 10 Z"
        fill={`color-mix(in srgb, ${color} 80%, black)`}
      />
      
      {/* Tail */}
      <path
        d="M8 12 L2 8 L2 16 Z"
        fill={`color-mix(in srgb, ${color} 70%, black)`}
      />
    </svg>
  );
};

export const FlyingBirds: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Bird 1 - Orange */}
      <div className="bird absolute top-[15%] left-[5%]">
        <Bird color="hsl(24, 80%, 50%)" size={35} />
      </div>
      
      {/* Bird 2 - Teal (flying opposite) */}
      <div className="bird-reverse absolute top-[25%] right-[10%]">
        <Bird color="hsl(160, 40%, 45%)" size={30} />
      </div>
      
      {/* Bird 3 - Gold */}
      <div className="bird absolute top-[10%] left-[30%]" style={{ animationDelay: '2s' }}>
        <Bird color="hsl(45, 90%, 55%)" size={25} />
      </div>
      
      {/* Bird 4 - Orange variant */}
      <div className="bird-reverse absolute top-[20%] right-[35%]" style={{ animationDelay: '1s' }}>
        <Bird color="hsl(24, 70%, 60%)" size={28} />
      </div>
      
      {/* Bird 5 - Small accent */}
      <div className="bird absolute top-[8%] left-[60%]" style={{ animationDelay: '3s' }}>
        <Bird color="hsl(160, 50%, 50%)" size={22} />
      </div>
    </div>
  );
};

export default Bird;
