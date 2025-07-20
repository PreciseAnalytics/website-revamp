import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

type HamburgerIconProps = React.HTMLAttributes<HTMLDivElement>;

export const HamburgerIcon: React.FC<HamburgerIconProps> = (props) => {
  return (
    <IconWrapper {...props} aria-label="Open menu" role="img">
      <Bar
        as={motion.span}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <Bar
        as={motion.span}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <Bar
        as={motion.span}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 36px;
  height: 30px;
  padding: 2px 0;
  cursor: pointer;

  &:hover span {
    background-color: rgb(var(--accent));
    transform: scaleX(1.1);
  }
`;

const Bar = styled.span`
  height: 5px;
  width: 100%;
  background-color: rgb(var(--text));
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgb(var(--accent));
  }

  &:nth-child(1) {
    transition-delay: 0ms;
  }

  &:nth-child(2) {
    transition-delay: 50ms;
  }

  &:nth-child(3) {
    transition-delay: 100ms;
  }
`;
