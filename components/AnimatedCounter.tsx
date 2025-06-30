import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useInView } from '../hooks/useInView';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  className,
  once = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const delayTimeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);
    
    return () => clearTimeout(delayTimeout);
  }, [inView, end, duration, delay]);
  
  return (
    <CounterContainer 
      ref={ref}
      className={className}
    >
      {prefix}{count}{suffix}
    </CounterContainer>
  );
}

const CounterContainer = styled(motion.div)`
  display: inline-block;
  font-weight: 700;
`;
