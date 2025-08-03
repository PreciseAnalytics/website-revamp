'use client'; // Optional if you're using client hooks

import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  clickable?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
}

export const PreciseAnalyticsLogo = ({
  width = 120,
  height = 40,
  className = '',
  clickable = false,
  onClick,
}: LogoProps) => {
  const logoContent = (
    <Image
      src="/logo.png"
      alt="Precise Analytics Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );

  if (clickable && onClick) {
    return (
      <a href="#" onClick={onClick} style={{ cursor: 'pointer' }}>
        {logoContent}
      </a>
    );
  }

  return <div>{logoContent}</div>;
};