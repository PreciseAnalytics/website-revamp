import React, { Ref } from 'react';
import styled from 'styled-components';

// Simplify props to avoid type errors with refs
export type IconProps = {
  _ref?: Ref<any>;
  isButton?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

export default function Icon(props: IconProps) {
  // Extract props we need, and put the rest in restProps
  const { _ref, isButton = true, children, ...restProps } = props;
  
  // Use the appropriate component based on isButton
  if (isButton) {
    return (
      <ButtonIconWrapper 
        type="button" 
        {...restProps}
        ref={_ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </ButtonIconWrapper>
    );
  }
  
  return (
    <DivIconWrapper 
      {...restProps}
      ref={_ref as React.Ref<HTMLDivElement>}
    >
      {children}
    </DivIconWrapper>
  );
}

// Shared styles
const iconStyles = `
  border: none;
  background-color: transparent;
  width: 4rem;
`;

const ButtonIconWrapper = styled.button`
  ${iconStyles}
`;

const DivIconWrapper = styled.div`
  ${iconStyles}
  display: flex;
  align-items: center;
  justify-content: center;
`;
