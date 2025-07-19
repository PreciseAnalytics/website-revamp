import { PropsWithChildren, MouseEventHandler, forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type ButtonProps = PropsWithChildren<{ 
  transparent?: boolean;
  accent?: boolean;
  glass?: boolean;
  secondary?: boolean;
  orange?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  disabled?: boolean;
  as?: string;
  type?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}>;

// Create components for button and anchor versions
const MotionButton = motion.button;
const MotionAnchor = motion.a;

// Shared styles for both button and anchor
const buttonStyles = `
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  padding: 1.5rem 2.25rem;
  font-size: 1.2rem;
  text-transform: uppercase;
  font-family: var(--font);
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 0.5rem;
  will-change: transform;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  span {
    margin-left: 1rem;
    position: relative;
    z-index: 1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    transition: transform 0.6s ease;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledButtonElement = styled(MotionButton).withConfig({
  shouldForwardProp: (prop) => !['transparent', 'accent', 'glass', 'secondary', 'orange', 'onClick', 'disabled', 'as', 'type', 'download'].includes(prop),
})<ButtonProps>`
  ${buttonStyles}
  background: ${(p) => {
    if (p.transparent) return 'transparent';
    if (p.glass) return 'rgba(255, 255, 255, 0.1)';
    if (p.orange) return 'rgb(255, 125, 0)';
    if (p.accent) return 'rgb(var(--accent))';
    if (p.secondary) return 'rgb(var(--secondary))';
    return 'rgb(var(--primary))';
  }};
  color: ${(p) => {
    if (p.transparent) return 'rgb(var(--text))';
    if (p.orange) return '#ffffff';
    return 'rgb(var(--textSecondary))';
  }};
  border: ${(p) => {
    if (p.transparent) return 'none';
    if (p.glass) return '1px solid rgba(255, 255, 255, 0.2)';
    if (p.orange) return '2px solid rgb(255, 125, 0)';
    if (p.accent) return '2px solid rgb(var(--accent))';
    if (p.secondary) return '2px solid rgb(var(--secondary))';
    return '2px solid rgb(var(--primary))';
  }};
  box-shadow: ${(p) => (p.glass ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none')};
  backdrop-filter: ${(p) => (p.glass ? 'blur(10px)' : 'none')};
  
  &::before {
    background: ${(p) => {
      if (p.transparent) return 'rgba(var(--text), 0.1)';
      if (p.glass) return 'rgba(255, 255, 255, 0.2)';
      if (p.orange) return 'rgba(255, 165, 0, 0.8)';
      if (p.accent) return 'rgba(255, 120, 20, 0.8)';
      if (p.secondary) return 'rgba(0, 160, 100, 0.8)';
      return 'rgba(0, 70, 180, 0.8)';
    }};
  }
`;

const StyledAnchorElement = styled(MotionAnchor).withConfig({
  shouldForwardProp: (prop) => !['transparent', 'accent', 'glass', 'secondary', 'orange', 'onClick', 'disabled', 'as', 'type', 'download'].includes(prop),
})<ButtonProps>`
  ${buttonStyles}
  background: ${(p) => {
    if (p.transparent) return 'transparent';
    if (p.glass) return 'rgba(255, 255, 255, 0.1)';
    if (p.orange) return 'rgb(255, 125, 0)';
    if (p.accent) return 'rgb(var(--accent))';
    if (p.secondary) return 'rgb(var(--secondary))';
    return 'rgb(var(--primary))';
  }};
  color: ${(p) => {
    if (p.transparent) return 'rgb(var(--text))';
    if (p.orange) return '#ffffff';
    return 'rgb(var(--textSecondary))';
  }};
  border: ${(p) => {
    if (p.transparent) return 'none';
    if (p.glass) return '1px solid rgba(255, 255, 255, 0.2)';
    if (p.orange) return '2px solid rgb(255, 125, 0)';
    if (p.accent) return '2px solid rgb(var(--accent))';
    if (p.secondary) return '2px solid rgb(var(--secondary))';
    return '2px solid rgb(var(--primary))';
  }};
  box-shadow: ${(p) => (p.glass ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none')};
  backdrop-filter: ${(p) => (p.glass ? 'blur(10px)' : 'none')};
  
  &::before {
    background: ${(p) => {
      if (p.transparent) return 'rgba(var(--text), 0.1)';
      if (p.glass) return 'rgba(255, 255, 255, 0.2)';
      if (p.orange) return 'rgba(255, 165, 0, 0.8)';
      if (p.accent) return 'rgba(255, 120, 20, 0.8)';
      if (p.secondary) return 'rgba(0, 160, 100, 0.8)';
      return 'rgba(0, 70, 180, 0.8)';
    }};
  }
`;

const Button = (props: ButtonProps) => {
  // Determine if this should be a link or button based on href prop
  if (props.href) {
    return (
      <StyledAnchorElement 
        {...props} 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {props.children}
      </StyledAnchorElement>
    );
  }

  return (
    <StyledButtonElement 
      {...props} 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {props.children}
    </StyledButtonElement>
  );
};

export default Button;
