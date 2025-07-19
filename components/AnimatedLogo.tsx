import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  size?: string;
}

export default function AnimatedLogo({ size = '7rem' }: LogoProps) {
  return (
    <LogoContainer size={size}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
      >
        <Image 
          src="/logo.png" 
          alt="Precise Analytics Logo" 
          width={280} 
          height={80}
          style={{ height: 'auto', maxWidth: '100%' }} 
        />
      </motion.div>
    </LogoContainer>
  );
}

const LogoContainer = styled.div<{ size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.size};
  height: auto;
`;
