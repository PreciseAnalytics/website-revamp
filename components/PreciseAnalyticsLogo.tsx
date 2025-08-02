'use client'; // Optional if you're using client hooks

import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const PreciseAnalyticsLogo = ({ width = 120, height = 40, className = '' }: LogoProps) => {
  return (
    <Image
      src="/PA-logo.png"
      alt="Precise Analytics Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
