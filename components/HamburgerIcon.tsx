import React from 'react';
import styled from 'styled-components';

export const HamburgerIcon: React.FC = () => {
  return (
    <IconWrapper aria-label="Open menu" role="img">
      <Bar />
      <Bar />
      <Bar />
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
`;

const Bar = styled.span`
  height: 3px;
  width: 100%;
  background-color: rgb(var(--text));
  border-radius: 2px;
`;
