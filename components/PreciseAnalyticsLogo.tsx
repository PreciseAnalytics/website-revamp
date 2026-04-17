'use client'; // Optional if you're using client hooks

import Image from 'next/image';
import Link from 'next/link';
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
      <Link href="/" onClick={onClick} style={{ cursor: 'pointer' }} aria-label="Precise Analytics homepage">
        {logoContent}
      </Link>
    );
  }

  return <div>{logoContent}</div>;
};
