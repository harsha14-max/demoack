import React from 'react';
import AckermannLogo from './AckermannLogo';

interface LogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon' | 'text';
}

const Logo: React.FC<LogoProps> = ({ size = 48, className = '', variant = 'full' }) => {
  return (
    <AckermannLogo 
      size={size} 
      className={className} 
      variant={variant}
    />
  );
};

export default Logo;
