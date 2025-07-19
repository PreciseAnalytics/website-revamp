import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { media, mq } from 'utils/media';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  glass?: boolean;
  delay?: number;
  onClick?: () => void;
  hoverScale?: number;
}

export default function AnimatedCard({ 
  children, 
  className, 
  icon, 
  title, 
  glass = false,
  delay = 0,
  onClick,
  hoverScale = 1.03
}: AnimatedCardProps) {
  return (
    <CardContainer 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: hoverScale }}
      onClick={onClick}
      glass={glass}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

const CardContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['glass'].includes(prop),
})<{ glass?: boolean }>`
  background: ${(p) => p.glass ? 'rgba(var(--cardBackground), 0.3)' : 'rgba(var(--cardBackground), 1)'};
  border-radius: 1rem;
  box-shadow: var(${(p) => p.glass ? '--shadow-md' : '--shadow-sm'});
  padding: 3rem;
  height: 100%;
  cursor: ${(p) => p.onClick ? 'pointer' : 'default'};
  transition: all 0.3s ease-in-out;
  backdrop-filter: ${(p) => p.glass ? 'blur(10px)' : 'none'};
  border: ${(p) => p.glass ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(var(--accent), 0.8) 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  ${mq('<=tablet', 'padding: 2rem;')}
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--primary));
  border-radius: 1rem;
  margin-bottom: 2rem;

  svg {
    width: 3rem;
    height: 3rem;
  }

  ${mq('<=tablet', `
    width: 5rem;
    height: 5rem;
    font-size: 2.5rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  `)}
`;

const CardTitle = styled.h3`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;

  ${mq('<=tablet', 'font-size: 1.8rem;')}
`;

const CardContent = styled.div`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.8);
  line-height: 1.5;
`;