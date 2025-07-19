import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from 'components/Button';
import { media, mq } from 'utils/media';

interface CookieConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsentModal({ onAccept, onDecline }: CookieConsentModalProps) {
  return (
    <ModalWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <ModalContent>
        <ModalTitle>We Use Cookies</ModalTitle>
        <ModalText>
          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
          By continuing to use our site, you consent to our use of cookies.
        </ModalText>
        <ButtonGroup>
          <AcceptButton onClick={onAccept}>Accept All</AcceptButton>
          <DeclineButton onClick={onDecline}>Decline</DeclineButton>
        </ButtonGroup>
        <PrivacyLink href="/privacy-policy">Learn more in our Privacy Policy</PrivacyLink>
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 1000;
  max-width: 600px;
  background: white;
  border-radius: 1.2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  
  ${mq('<=tablet', `
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  `)}
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ModalText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  ${mq('<=phone', 'flex-direction: column;')}
`;

const AcceptButton = styled(Button)`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
`;

const DeclineButton = styled(Button)`
  background: transparent;
  color: #333;
  border: 1px solid #ccc;
  padding: 1.2rem 2.4rem;
  font-size: 1.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const PrivacyLink = styled.a`
  font-size: 1.3rem;
  color: #1e88e5;
  text-decoration: none;
  text-align: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0d47a1;
    text-decoration: underline;
  }
`;