import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  onAccept: () => void;
  onManage: () => void;
};

const AUTO_DISMISS_MS = 8000;

export default function CookieConsentBanner({ onAccept, onManage }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Wrapper role="region" aria-label="Cookie consent">
      <Content>
        <Text>
          <Title>Your Privacy</Title>
          <Description>
            We use cookies to support secure operation, analyze performance,
            and improve your experience.
          </Description>
        </Text>

        <Actions>
          <ManageButton
            onClick={() => {
              onManage();
              // ❗ DO NOT close banner here
            }}
          >
            Manage Preferences
          </ManageButton>

          <AcceptButton
            onClick={() => {
              onAccept();
              setVisible(false); // Accept should dismiss
            }}
          >
            Accept
          </AcceptButton>
        </Actions>
      </Content>
    </Wrapper>
  );
}

/* ================= ANIMATION ================= */

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

/* ================= STYLES ================= */

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0f1720;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 3000;
  animation: ${slideUp} 0.45s ease-out forwards;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.2rem 2.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  font-family: 'Aptos', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
  }
`;

const Text = styled.div`
  max-width: 760px;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.6rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const ManageButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.35);
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border-radius: 0.6rem;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const AcceptButton = styled.button`
  background: #ffffff;
  color: #0f1720;
  border: none;
  padding: 1rem 2.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.6rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
