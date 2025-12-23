import React from 'react';
import styled from 'styled-components';

type Props = {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onDoNotSell: () => void;
};

export default function CookieConsentModal({
  onAcceptAll,
  onRejectAll,
  onDoNotSell,
}: Props) {
  return (
    <Backdrop role="dialog" aria-modal="true">
      <Modal>
        <Header>
          <Title>Your Privacy</Title>
          <Close onClick={onRejectAll}>×</Close>
        </Header>

        <Description>
          We use cookies and similar technologies to operate our site, analyze
          traffic, and improve your experience. You can accept all cookies,
          reject non-essential cookies, or manage your preferences.
        </Description>

        <Actions>
          <Primary onClick={onAcceptAll}>
            I’m OK with that
          </Primary>

          <Secondary onClick={onRejectAll}>
            Reject All
          </Secondary>

          <LinkButton onClick={onDoNotSell}>
            Do Not Sell My Information
          </LinkButton>
        </Actions>
      </Modal>
    </Backdrop>
  );
}

/* ================= STYLES ================= */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #ffffff;
  width: 520px;
  max-width: calc(100% - 3rem);
  border-radius: 0.6rem;
  padding: 2.4rem;
  font-family: 'Aptos', system-ui, sans-serif;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const Close = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Primary = styled.button`
  background: #0f1720;
  color: #ffffff;
  border: none;
  padding: 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 0.4rem;
  cursor: pointer;
`;

const Secondary = styled.button`
  background: transparent;
  border: 1px solid #0f1720;
  color: #0f1720;
  padding: 1.1rem;
  font-size: 1.4rem;
  border-radius: 0.4rem;
  cursor: pointer;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #0f1720;
  font-size: 1.3rem;
  text-decoration: underline;
  cursor: pointer;
  padding: 0.5rem 0;
`;
