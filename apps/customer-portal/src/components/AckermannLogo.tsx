import React from 'react';

interface AckermannLogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon' | 'text';
}

const AckermannLogo: React.FC<AckermannLogoProps> = ({ 
  size = 48, 
  className = '',
  variant = 'full'
}) => {
  const logoSize = size;
  const iconSize = variant === 'text' ? 0 : size * 0.6;
  const textSize = variant === 'icon' ? 0 : size * 0.4;

  return (
    <div className={`flex items-center ${className}`}>
      {/* Icon */}
      {variant !== 'text' && (
        <div 
          className="relative flex-shrink-0"
          style={{ width: iconSize, height: iconSize }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
          >
            {/* Main cube structure */}
            <defs>
              <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            
            {/* Back face */}
            <path
              d="M20 20 L60 20 L80 40 L40 40 Z"
              fill="url(#cubeGradient)"
              opacity="0.3"
            />
            
            {/* Left face */}
            <path
              d="M20 20 L40 40 L40 80 L20 60 Z"
              fill="url(#cubeGradient)"
              opacity="0.5"
            />
            
            {/* Top face */}
            <path
              d="M20 20 L60 20 L60 40 L40 40 Z"
              fill="url(#cubeGradient)"
              opacity="0.7"
            />
            
            {/* Right face */}
            <path
              d="M60 20 L80 40 L80 80 L60 60 Z"
              fill="url(#cubeGradient)"
              opacity="0.6"
            />
            
            {/* Front face */}
            <path
              d="M40 40 L80 40 L80 80 L40 80 Z"
              fill="url(#cubeGradient)"
              opacity="0.8"
            />
            
            {/* Center X pattern */}
            <path
              d="M45 45 L55 55 M55 45 L45 55"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>
      )}
      
      {/* Text */}
      {variant !== 'icon' && (
        <div 
          className="ml-3 flex-shrink-0"
          style={{ fontSize: textSize }}
        >
          <span className="font-bold text-gray-900" style={{ fontSize: textSize }}>
            Ackermann
          </span>
        </div>
      )}
    </div>
  );
};

export default AckermannLogo;
