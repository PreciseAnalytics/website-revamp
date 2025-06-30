import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { media } from 'utils/media';

interface CookieConsentModalProps {
  onAccept?: () => void;
  onCustomize?: () => void;
  onCancel?: () => void;
}

export default function CookieConsentModal({ 
  onAccept, 
  onCustomize, 
  onCancel 
}: CookieConsentModalProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for existing consent on mount
  useEffect(() => {
    if (!isClient) return;

    const checkCookieConsent = () => {
      try {
        const consent = localStorage.getItem('cookieConsent');
        const consentTimestamp = localStorage.getItem('cookieConsentTimestamp');
        
        // Show modal if no consent or consent is older than 30 days
        if (!consent || !consentTimestamp) {
          setIsVisible(true);
        } else {
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          if (parseInt(consentTimestamp) < thirtyDaysAgo) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error checking cookie consent:', error);
        setIsVisible(true); // Show modal on error to be safe
      }
    };

    // Small delay to ensure page has loaded
    const timer = setTimeout(checkCookieConsent, 1000);
    return () => clearTimeout(timer);
  }, [isClient]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        handleCancel();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Save consent to localStorage
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

  // Handle accept cookies
  const handleAccept = useCallback(() => {
    console.log('Accept Cookies clicked');
    
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };

    saveConsent(true, preferences);
    setIsVisible(false);
    
    // Call optional callback
    if (onAccept) {
      onAccept();
    }
  }, [saveConsent, onAccept]);

  // Handle customize (accept only necessary)
  const handleCustomize = useCallback(() => {
    console.log('Customize Cookies clicked');
    
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };

    saveConsent(true, preferences);
    setIsVisible(false);
    
    // Call optional callback
    if (onCustomize) {
      onCustomize();
    }
  }, [saveConsent, onCustomize]);

  // Handle cancel/close
  const handleCancel = useCallback(() => {
    console.log('Cancel/Close clicked');
    setIsVisible(false);
    
    // Call optional callback
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  }, [handleCancel]);

  // Don't render on server-side
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
              duration: 0.4 
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
              
              <Title id="cookie-consent-title">
                Cookie Consent
              </Title>
              
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
  background: rgba(var(--cardBackground), 0.98);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(var(--accent), 0.2);
  max-width: 50rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  ${media('<=tablet')} {
    margin: 1rem;
    border-radius: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(var(--text), 0.1);
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: rgb(var(--text), 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    background: rgba(var(--text), 0.2);
    color: rgb(var(--text));
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgb(var(--accent));
    outline-offset: 2px;
  }
`;

const ModalContent = styled.div`
  padding: 4rem;
  text-align: center;
  
  ${media('<=tablet')} {
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
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  ${media('<=tablet')} {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
  
  ${media('<=tablet')} {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  
  ${media('<=tablet')} {
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
  
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background: rgb(var(--accent));
          color: white;
          border-color: rgb(var(--accent));
          
          &:hover {
            background: rgba(var(--accent), 0.9);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(var(--accent), 0.4);
          }
        `;
      case 'secondary':
        return `
          background: rgba(var(--text), 0.1);
          color: rgb(var(--text), 0.8);
          border-color: rgba(var(--text), 0.2);
          
          &:hover {
            background: rgba(var(--text), 0.2);
            color: rgb(var(--text));
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: rgb(var(--text));
          border-color: rgba(var(--text), 0.4);
          
          &:hover {
            background: rgba(var(--text), 0.1);
            border-color: rgba(var(--text), 0.6);
            transform: translateY(-2px);
          }
        `;
      default:
        return '';
    }
  }}
  
  &:focus {
    outline: 3px solid rgba(var(--accent), 0.5);
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${media('<=tablet')} {
    padding: 1.5rem 2rem;
    font-size: 1.6rem;
  }
`;
