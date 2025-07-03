import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentModalProps {
  onAccept?: () => void;
  onCustomize?: () => void;
  onCancel?: () => void;
}

export default function CookieConsentModal({
  onAccept,
  onCustomize,
  onCancel,
}: CookieConsentModalProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkCookieConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        const consentTimestamp = localStorage.getItem('cookieConsentTimestamp');

        if (!consent || !consentTimestamp) {
          setIsVisible(true);
        } else {
          const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
          if (parseInt(consentTimestamp) < thirtyDaysAgo) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
        setIsVisible(true);
      }
    };

    const timer = setTimeout(checkCookieConsent, 1000);
    return () => clearTimeout(timer);
  }, [isClient]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const saveConsent = useCallback((accepted: boolean, preferences?: any) => {
    try {
      localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
      localStorage.setItem('cookieConsentTimestamp', Date.now().toString());

      if (preferences) {
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
      }

      console.log('Cookie consent saved:', { accepted, preferences });
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }, []);

  const handleAccept = useCallback(() => {
    console.log('Accept Cookies clicked');

    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    saveConsent(true, preferences);
    setIsVisible(false);

    if (onAccept) {
      onAccept();
    }
  }, [saveConsent, onAccept]);

  const handleCustomize = useCallback(() => {
    console.log('Customize Cookies clicked');

    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };

    saveConsent(true, preferences);
    setIsVisible(false);

    if (onCustomize) {
      onCustomize();
    }
  }, [saveConsent, onCustomize]);

  const handleCancel = useCallback(() => {
    console.log('Cancel/Close clicked');
    setIsVisible(false);

    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        handleCancel();
      }
    },
    [handleCancel]
  );

  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
        >
          <ModalContainer
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={handleCancel}
              aria-label="Close cookie consent modal"
              type="button"
            >
              ✕
            </CloseButton>

            <ModalContent>
              <CookieIcon>🍪</CookieIcon>

              <Title id="cookie-consent-title">Cookie Consent</Title>

              <Description>
                We use cookies to enhance your browsing experience, serve personalized content,
                and analyze our traffic. Choose your preferences or accept all to continue.
              </Description>

              <ButtonContainer>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  aria-label="Close without saving preferences"
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCustomize}
                  aria-label="Accept only necessary cookies"
                >
                  Necessary Only
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  onClick={handleAccept}
                  aria-label="Accept all cookies"
                >
                  Accept All
                </Button>
              </ButtonContainer>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}

// Styled Components

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
`;

const ModalContainer = styled(motion.div)`
  background: rgba(var(--cardBackground, 255,255,255), 0.98);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(var(--accent, 0, 123, 255), 0.2);
  max-width: 50rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    margin: 1rem;
    border-radius: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(var(--text, 0,0,0), 0.1);
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: rgb(var(--text, 0,0,0), 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: rgba(var(--text, 0,0,0), 0.2);
    color: rgb(var(--text, 0,0,0));
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgb(var(--accent, 0,123,255));
    outline-offset: 2px;
  }
`;

const ModalContent = styled.div`
  padding: 4rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const CookieIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text, 0,0,0));
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text, 0,0,0), 0.8);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
}

const Button = styled.button<ButtonProps>`
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 12rem;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: rgb(var(--accent, 0,123,255));
      color: white;
      border-color: rgb(var(--accent, 0,123,255));
      &:hover {
        background: rgba(var(--accent, 0,123,255), 0.9);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(var(--accent, 0,123,255), 0.4);
      }
    `}
  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background: rgba(var(--text, 0,0,0), 0.1);
      color: rgb(var(--text, 0,0,0), 0.8);
      border-color: rgba(var(--text, 0,0,0), 0.2);
      &:hover {
        background: rgba(var(--text, 0,0,0), 0.2);
        color: rgb(var(--text, 0,0,0));
        transform: translateY(-2px);
      }
    `}
  ${(props) =>
    props.variant === 'outline' &&
    css`
      background: transparent;
      color: rgb(var(--text, 0,0,0));
      border-color: rgba(var(--text, 0,0,0), 0.4);
      &:hover {
        background: rgba(var(--text, 0,0,0), 0.1);
        border-color: rgba(var(--text, 0,0,0), 0.6);
        transform: translateY(-2px);
      }
    `}

  &:focus {
    outline: 3px solid rgba(var(--accent, 0,123,255), 0.5);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
    font-size: 1.6rem;
  }
`;
