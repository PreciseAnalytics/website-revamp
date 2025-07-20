import React from 'react';
import styled from 'styled-components';

const CloseIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    return (
      <CloseWrapper ref={ref} style={style} {...props}>
        <Line />
        <Line rotated />
      </CloseWrapper>
    );
  }
);

CloseIcon.displayName = 'CloseIcon';
export default CloseIcon;

const CloseWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Line = styled.span<{ rotated?: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: rgb(var(--text));
  transform: ${({ rotated }) => (rotated ? 'rotate(-45deg)' : 'rotate(45deg)')};
  transform-origin: center;
`;
