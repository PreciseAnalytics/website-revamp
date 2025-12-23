import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { media, mq } from 'utils/media';

// ✅ Import the GA loader
import { loadGA } from '@/lib/analytics';

// ✅ Your GA4 Measurement ID
const GA_ID = 'G-QBCDN5PJ94';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

function CookiePreferencesPopup() {
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side flag first
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything on server-side - return early before other hooks
  if (!isClient) {
    return null;
  }

  return <CookiePreferencesContent />;
}

function CookiePreferencesContent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (showPreferences) {
        setShowPreferences(false);
        // If no preferences saved, show banner again
        if (!localStorage.getItem('cookie-preferences')) {
          setShowBanner(true);
        }
      } else if (showBanner) {
        // Don't allow closing banner with ESC if no preferences set
        // User must make a choice
      }
    }
  }, [showBanner, showPreferences]);

  // Handle tab key for focus trapping
  const handleTabKey = useCallback((event: KeyboardEvent) => {
    if (!showPreferences) return;
    
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        // Shift + Tab (backwards)
        if (document.activeElement === firstFocusableRef.current) {
          event.preventDefault();
          focusLastElement();
        }
      } else {
        // Tab (forwards)
        const lastElementButton = lastFocusableRef.current?.querySelector('button');
        if (document.activeElement === lastElementButton) {
          event.preventDefault();
          focusFirstElement();
        }
      }
    }
  }, [showPreferences]);

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabKey);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [handleKeyDown, handleTabKey]);

  // Focus management for modal
  useEffect(() => {
    if (showPreferences && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [showPreferences]);

  // Focus trap helper
  const focusLastElement = () => {
    if (lastFocusableRef.current) {
      const button = lastFocusableRef.current.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  };

  const focusFirstElement = () => {
    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  };

  useEffect(() => {
    // Check if user has already set preferences
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    // Show cookie preferences on initial load if not already set
    setTimeout(() => {
      if (!savedPreferences) {
        setShowBanner(true);
      } else {
        try {
          const parsedPreferences = JSON.parse(savedPreferences);
          setPreferences(parsedPreferences);
          // Ensure banner stays hidden if preferences already exist
          setShowBanner(false);
          
          // ✅ NEW: Load GA if user previously accepted analytics
          if (parsedPreferences.analytics) {
            loadGA(GA_ID);
          }
        } catch (e) {
          console.error("Error parsing saved cookie preferences:", e);
          setShowBanner(true);
        }
      }
    }, 1000);
  }, []);

  // ✅ NEW: Listen for footer "Cookie Preferences" button
  useEffect(() => {
    const openPrefsHandler = () => {
      setShowPreferences(true);
    };

    window.addEventListener('open-cookie-preferences', openPrefsHandler);
    return () => {
      window.removeEventListener('open-cookie-preferences', openPrefsHandler);
    };
  }, []);

  const handleAcceptAll = useCallback(() => {
    console.log('Accept All clicked'); // Debug log
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    
    try {
      setPreferences(allAccepted);
      localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
      
      // Close both banner and preferences modal
      setShowBanner(false);
      setShowPreferences(false);
      
      // ✅ NEW: Load Google Analytics
      loadGA(GA_ID);
      
      console.log('Cookie preferences saved:', allAccepted); // Debug log
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  }, []);

  const handleAcceptSelected = useCallback(() => {
    console.log('Save Preferences clicked', preferences); // Debug log
    
    try {
      localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
      
      // Close both banner and preferences modal
      setShowBanner(false);
      setShowPreferences(false);
      
      // ✅ NEW: Load GA only if analytics is enabled
      if (preferences.analytics) {
        loadGA(GA_ID);
      }
      
      console.log('Custom preferences saved:', preferences); // Debug log
    } catch (error) {
      console.error('Error saving custom preferences:', error);
    }
  }, [preferences]);

  const handleRejectAll = useCallback(() => {
    console.log('Reject All clicked'); // Debug log
    const rejected = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    
    try {
      setPreferences(rejected);
      localStorage.setItem('cookie-preferences', JSON.stringify(rejected));
      
      // Close both banner and preferences modal
      setShowBanner(false);
      setShowPreferences(false);
      
      // ✅ NOTE: GA is NOT loaded when rejected
      
      console.log('Cookies rejected:', rejected); // Debug log
    } catch (error) {
      console.error('Error saving rejection preferences:', error);
    }
  }, []);

  const handleShowPreferences = useCallback(() => {
    console.log('Customize clicked'); // Debug log
    setShowPreferences(true);
  }, []);

  const handleClosePreferences = useCallback(() => {
    console.log('Close preferences clicked'); // Debug log
    setShowPreferences(false);
    
    // If no preferences have been saved, show the banner again
    if (!localStorage.getItem('cookie-preferences')) {
      setShowBanner(true);
    }
  }, []);

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <CookieBanner
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <CookieContent>
            <CookieIcon>🍪</CookieIcon>
            <CookieText>
              <CookieTitle>Cookie Preferences</CookieTitle>
              <CookieDescription>
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.
              </CookieDescription>
            </CookieText>
            <CookieActions>
              <StyledButton 
                secondary 
                onClick={handleShowPreferences}
                aria-label="Customize cookie preferences"
              >
                Customize
              </StyledButton>
              <StyledButton 
                accent
                onClick={handleAcceptAll}
                aria-label="Accept all cookies"
              >
                Accept All
              </StyledButton>
            </CookieActions>
          </CookieContent>
        </CookieBanner>
      )}

      {showPreferences && (
        <PreferencesModal
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <ModalOverlay onClick={handleClosePreferences} />
          <ModalContent ref={modalRef}>
            <ModalHeader>
              <ModalTitle>Cookie Preferences</ModalTitle>
              <CloseButton 
                ref={firstFocusableRef}
                onClick={handleClosePreferences}
                aria-label="Close cookie preferences"
              >
                ✕
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <PreferenceItem>
                <PreferenceHeader>
                  <PreferenceTitle>Necessary Cookies</PreferenceTitle>
                  <PreferenceToggle>
                    <ToggleSwitch checked={true} disabled>
                      <ToggleSlider />
                    </ToggleSwitch>
                  </PreferenceToggle>
                </PreferenceHeader>
                <PreferenceDescription>
                  These cookies are essential for the website to function properly. They cannot be disabled.
                </PreferenceDescription>
              </PreferenceItem>

              <PreferenceItem>
                <PreferenceHeader>
                  <PreferenceTitle>Analytics Cookies</PreferenceTitle>
                  <PreferenceToggle>
                    <ToggleSwitch 
                      checked={preferences.analytics}
                      onClick={() => handlePreferenceChange('analytics')}
                    >
                      <ToggleSlider checked={preferences.analytics} />
                    </ToggleSwitch>
                  </PreferenceToggle>
                </PreferenceHeader>
                <PreferenceDescription>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </PreferenceDescription>
              </PreferenceItem>

              <PreferenceItem>
                <PreferenceHeader>
                  <PreferenceTitle>Marketing Cookies</PreferenceTitle>
                  <PreferenceToggle>
                    <ToggleSwitch 
                      checked={preferences.marketing}
                      onClick={() => handlePreferenceChange('marketing')}
                    >
                      <ToggleSlider checked={preferences.marketing} />
                    </ToggleSwitch>
                  </PreferenceToggle>
                </PreferenceHeader>
                <PreferenceDescription>
                  These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                </PreferenceDescription>
              </PreferenceItem>
            </ModalBody>

            <ModalFooter>
              <StyledButton 
                secondary 
                onClick={handleRejectAll}
                aria-label="Reject all optional cookies"
              >
                Reject All
              </StyledButton>
              <FocusWrapper ref={lastFocusableRef}>
                <StyledButton 
                  accent
                  onClick={handleAcceptSelected}
                  aria-label="Save current cookie preferences"
                >
                  Save Preferences
                </StyledButton>
              </FocusWrapper>
            </ModalFooter>
          </ModalContent>
        </PreferencesModal>
      )}
    </AnimatePresence>
  );
}

const CookieBanner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(var(--cardBackground), 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(var(--accent), 0.2);
  padding: 2rem;
  z-index: 10000;
  box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.1);
`;

const CookieContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 120rem;
  margin: 0 auto;
  
  ${mq('<=tablet', `
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  `)}
`;

const CookieIcon = styled.div`
  font-size: 3rem;
  flex-shrink: 0;
`;

const CookieText = styled.div`
  flex: 1;
`;

const CookieTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const CookieDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.5;
  margin: 0;
`;

const CookieActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
  
  ${mq('<=tablet', `
    width: 100%;
    justify-content: center;
  `)}
`;

const PreferencesModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  width: 100%;
  max-width: 60rem;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(var(--accent), 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 3rem 2rem;
  border-bottom: 1px solid rgba(var(--accent), 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: rgb(var(--text), 0.6);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(var(--accent), 0.1);
    color: rgb(var(--text));
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(var(--accent), 0.5);
    outline-offset: 2px;
    background: rgba(var(--accent), 0.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ModalBody = styled.div`
  padding: 2rem 3rem;
`;

const PreferenceItem = styled.div`
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PreferenceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PreferenceTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0;
`;

const PreferenceToggle = styled.div``;

const ToggleSwitch = styled.div<{ checked: boolean; disabled?: boolean }>`
  width: 5rem;
  height: 2.8rem;
  background: ${props => props.checked ? 'rgb(var(--accent))' : 'rgb(var(--text), 0.3)'};
  border-radius: 1.4rem;
  position: relative;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const ToggleSlider = styled.div<{ checked?: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 0.2rem;
  left: ${props => props.checked ? '2.4rem' : '0.2rem'};
  transition: left 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PreferenceDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.5;
  margin: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem 3rem 3rem;
  border-top: 1px solid rgba(var(--accent), 0.1);
  
  ${mq('<=tablet', 'flex-direction: column;')}
`;

// Enhanced button with better visibility and accessibility
const StyledButton = styled(Button)`
  min-width: 12rem;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1.2rem 2rem;
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  position: relative;
  
  /* Ensure better contrast and visibility */
  ${props => props.accent && `
    background: rgb(var(--accent)) !important;
    color: white !important;
    border: 2px solid rgb(var(--accent)) !important;
    
    &:hover {
      background: rgba(var(--accent), 0.9) !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--accent), 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  ${props => props.secondary && `
    background: transparent !important;
    color: rgb(var(--text)) !important;
    border: 2px solid rgba(var(--text), 0.4) !important;
    
    &:hover {
      background: rgba(var(--text), 0.1) !important;
      border-color: rgba(var(--text), 0.6) !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--text), 0.2);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  /* Focus states for accessibility */
  &:focus {
    outline: 3px solid rgba(var(--accent), 0.5);
    outline-offset: 2px;
  }
  
  /* Ensure text is readable */
  &:not(:disabled) {
    cursor: pointer;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Focus wrapper for accessibility
const FocusWrapper = styled.div`
  display: inline-block;
`;

// Export as dynamic component to prevent SSR hydration issues
const CookiePreferences = dynamic(() => Promise.resolve(CookiePreferencesPopup), {
  ssr: false,
});

export default CookiePreferences;