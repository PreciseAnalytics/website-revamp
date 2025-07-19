import NextLink from 'next/link';
import React, { PropsWithChildren, Children, isValidElement, cloneElement } from 'react';
import styled from 'styled-components';

export interface LinkProps {
  href: string;
}

export default function Link({ href, children }: PropsWithChildren<LinkProps>) {
  // Check if the child is a valid element and if it has an 'href' prop
  // This avoids nested anchor tags
  const child = Children.only(children);
  
  if (isValidElement(child) && 
     (child.type === 'a' || 
      (typeof child.type === 'function' && child.props.href) || 
      child.props.as === 'a')) {
    // Pass the href to the child and return it directly
    return cloneElement(child, { 
      href: href,
      ...child.props 
    });
  }

  return (
    <NextLink href={href}>
      <Anchor>{children}</Anchor>
    </NextLink>
  );
}

const Anchor = styled.div`
  display: inline;
  width: fit-content;
  text-decoration: none;
  cursor: pointer;

  background: linear-gradient(rgb(var(--primary)), rgb(var(--primary)));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 100% 0px;
  transition: 100ms;
  transition-property: background-size, text-decoration, color;
  color: rgb(var(--primary));

  &:hover {
    background-size: 100% 100%;
    text-decoration: none;
    color: rgb(var(--background));
  }

  &:active {
    color: rgb(var(--background));
    background-size: 100% 100%;
  }
`;
