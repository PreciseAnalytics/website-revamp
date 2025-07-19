import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface AnimatedRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  noVertical?: boolean;
  className?: string;
  once?: boolean;
}

export default function AnimatedReveal({ 
  children, 
  width = 'fit-content', 
  direction = 'up', 
  noVertical = false,
  delay = 0,
  className,
  once = true
}: AnimatedRevealProps) {
  const getAnimationVariants = () => {
    const directions = {
      left: { x: -70, y: 0 },
      right: { x: 70, y: 0 },
      up: { x: 0, y: 50 },
      down: { x: 0, y: -50 },
    };
    
    const { x, y } = directions[direction];
    
    return {
      hidden: { 
        opacity: 0, 
        x: noVertical ? 0 : x, 
        y: noVertical ? 0 : y,
      },
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: delay,
        }
      }
    };
  };
  
  return (
    <RevealContainer 
      className={className}
      width={width}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={getAnimationVariants()}
    >
      {children}
    </RevealContainer>
  );
}

const RevealContainer = styled(motion.div)<{ width: 'fit-content' | '100%' }>`
  width: ${(p) => p.width};
  position: relative;
  display: inline-block;
`;
