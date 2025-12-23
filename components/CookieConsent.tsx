import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styled, { keyframes } from 'styled-components';
import { loadGA } from '@/lib/analytics';

const GA_ID = 'G-QBCDN5PJ94';

interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'cookie-preferences';

function CookieConsentSystem() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <CookieConsentContent />;
}

function CookieConsentContent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferenceCenter, setShowPreferenceCenter] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    functional: false,
    targeting: false,
    timestamp: 0,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    
    if (!saved) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }

    try {
      const parsed = JSON.parse(saved);
      setPreferences(parsed);
      
      // Load GA if previously consented
      if (parsed.performance) {
        loadGA(GA_ID);
      }
    } catch (e) {
      console.error('Error parsing cookie preferences:', e);
      setShowBanner(true);
    }
  }, []);

  // Listen for footer "Cookie Preferences" button
  useEffect(() => {
    const handler = () => setShowPreferenceCenter(true);
    window.addEventListener('open-cookie-preferences', handler);
    return () => window.removeEventListener('open-cookie-preferences', handler);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreferenceCenter) {
        setShowPreferenceCenter(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showPreferenceCenter]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showPreferenceCenter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreferenceCenter]);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    const withTimestamp = { ...prefs, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
    setPreferences(withTimestamp);
    
    if (prefs.performance) {
      loadGA(GA_ID);
    }
    
    setShowBanner(false);
    setShowPreferenceCenter(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    savePreferences({
      necessary: true,
      performance: true,
      functional: true,
      targeting: true,
      timestamp: Date.now(),
    });
  }, [savePreferences]);

  const handleEssentialOnly = useCallback(() => {
    savePreferences({
      necessary: true,
      performance: false,
      functional: false,
      targeting: false,
      timestamp: Date.now(),
    });
  }, [savePreferences]);

  const handleSavePreferences = useCallback(() => {
    savePreferences(preferences);
  }, [preferences, savePreferences]);

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const cookieCategories = [
    {
      id: 'necessary',
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.',
      alwaysActive: true,
    },
    {
      id: 'performance',
      title: 'Performance Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.',
      alwaysActive: false,
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers.',
      alwaysActive: false,
    },
    {
      id: 'targeting',
      title: 'Targeting Cookies',
      description: 'These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.',
      alwaysActive: false,
    },
  ];

  return (
    <>
      {/* Bottom Banner */}
      {showBanner && (
        <Banner>
          <BannerContent>
            <BannerText>
              <BannerTitle>We value your privacy</BannerTitle>
              <BannerDescription>
                We use cookies and similar technologies to enhance your browsing experience, 
                analyze site traffic, and personalize content. By clicking &quot;Accept All&quot;, you 
                consent to our use of cookies.{' '}
                <PolicyLink href="/cookies-policy" target="_blank">
                  Cookie Policy
                </PolicyLink>
              </BannerDescription>
            </BannerText>
            <BannerActions>
              <CustomizeButton onClick={() => setShowPreferenceCenter(true)}>
                Customize Settings
              </CustomizeButton>
              <EssentialButton onClick={handleEssentialOnly}>
                Essential Only
              </EssentialButton>
              <AcceptAllButton onClick={handleAcceptAll}>
                Accept All
              </AcceptAllButton>
            </BannerActions>
          </BannerContent>
        </Banner>
      )}

      {/* Privacy Preference Center (Side Panel) */}
      {showPreferenceCenter && (
        <ModalOverlay onClick={() => setShowPreferenceCenter(false)}>
          <PreferencePanel onClick={(e) => e.stopPropagation()}>
            <PanelHeader>
              <CompanyLogo>
                <LogoIcon>🔒</LogoIcon>
                <LogoText>Privacy Preference Center</LogoText>
              </CompanyLogo>
              <CloseButton onClick={() => setShowPreferenceCenter(false)} aria-label="Close">
                <CloseIcon>×</CloseIcon>
              </CloseButton>
            </PanelHeader>

            <PanelBody>
              <IntroSection>
                <IntroTitle>Your Privacy</IntroTitle>
                <IntroText>
                  When you visit our website, we store cookies on your browser to collect information. 
                  The information collected might relate to you, your preferences, or your device, and is 
                  mostly used to make the site work as you expect it to and to provide a more personalized 
                  web experience. Because we respect your right to privacy, you can choose not to allow 
                  some types of cookies. Click on the different category headings to find out more and 
                  change our default settings.
                </IntroText>
                <MoreInfoLink href="/privacy-policy" target="_blank">
                  More information
                </MoreInfoLink>
              </IntroSection>

              <Divider />

              <CategoriesSection>
                <CategoriesTitle>Manage Consent Preferences</CategoriesTitle>
                
                {cookieCategories.map((category) => {
                  const isActive = preferences[category.id as keyof CookiePreferences] as boolean;
                  const isExpanded = expandedCategory === category.id;
                  
                  return (
                    <CategoryItem key={category.id}>
                      <CategoryHeader 
                        onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      >
                        <CategoryLeft>
                          <ExpandIcon $expanded={isExpanded}>
                            +
                          </ExpandIcon>
                          <CategoryTitle>{category.title}</CategoryTitle>
                        </CategoryLeft>
                        <CategoryRight>
                          {category.alwaysActive ? (
                            <AlwaysActiveLabel>Always Active</AlwaysActiveLabel>
                          ) : (
                            <ToggleSwitch
                              $active={isActive}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(category.id as keyof CookiePreferences);
                              }}
                            >
                              <ToggleKnob $active={isActive} />
                            </ToggleSwitch>
                          )}
                        </CategoryRight>
                      </CategoryHeader>
                      
                      <CategoryBody $expanded={isExpanded}>
                        <CategoryDescription>{category.description}</CategoryDescription>
                      </CategoryBody>
                    </CategoryItem>
                  );
                })}
              </CategoriesSection>
            </PanelBody>

            <PanelFooter>
              <FooterButtons>
                <RejectAllButton onClick={handleEssentialOnly}>
                  Reject All
                </RejectAllButton>
                <ConfirmButton onClick={handleSavePreferences}>
                  Confirm My Choices
                </ConfirmButton>
              </FooterButtons>
              <PoweredBy>
                <PoweredByText>Powered by</PoweredByText>
                <PoweredByLogo>Precise Analytics</PoweredByLogo>
              </PoweredBy>
            </PanelFooter>
          </PreferencePanel>
        </ModalOverlay>
      )}
    </>
  );
}

/* ================= ANIMATIONS ================= */

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

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/* ================= BANNER STYLES ================= */

const Banner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1a1a2e;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 99999;
  animation: ${slideUp} 0.4s ease-out;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
`;

const BannerContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 20px 24px;
  }
`;

const BannerText = styled.div`
  flex: 1;
  max-width: 720px;
`;

const BannerTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const BannerDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PolicyLink = styled.a`
  color: #4da3ff;
  text-decoration: underline;
  
  &:hover {
    color: #7dbdff;
  }
`;

const BannerActions = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    justify-content: flex-end;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ButtonBase = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;
`;

const CustomizeButton = styled(ButtonBase)`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const EssentialButton = styled(ButtonBase)`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.4);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
  }
`;

const AcceptAllButton = styled(ButtonBase)`
  background: #16a34a;
  color: #ffffff;
  border: none;

  &:hover {
    background: #15803d;
  }
`;

/* ================= PREFERENCE PANEL STYLES ================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100000;
  animation: ${fadeIn} 0.2s ease-out;
`;

const PreferencePanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 420px;
  max-width: 100%;
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.span`
  font-size: 24px;
`;

const LogoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #e5e7eb;
  }
`;

const CloseIcon = styled.span`
  font-size: 28px;
  color: #6b7280;
  line-height: 1;
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const IntroSection = styled.div`
  margin-bottom: 24px;
`;

const IntroTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const IntroText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 12px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MoreInfoLink = styled.a`
  font-size: 14px;
  color: #2563eb;
  text-decoration: underline;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    color: #1d4ed8;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0 0 24px 0;
`;

const CategoriesSection = styled.div``;

const CategoriesTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const CategoryItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  cursor: pointer;
  background: #f9fafb;
  transition: background 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

const CategoryLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Using transient props ($expanded) to prevent passing to DOM
const ExpandIcon = styled.span<{ $expanded: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  transition: transform 0.2s;
  transform: ${props => props.$expanded ? 'rotate(45deg)' : 'rotate(0)'};
`;

const CategoryTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const CategoryRight = styled.div``;

const AlwaysActiveLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #16a34a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

// Using transient props ($active) to prevent passing to DOM
const ToggleSwitch = styled.div<{ $active: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: ${props => props.$active ? '#16a34a' : '#d1d5db'};
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
`;

const ToggleKnob = styled.div<{ $active: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  top: 2px;
  left: ${props => props.$active ? '22px' : '2px'};
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

// Using transient props ($expanded) to prevent passing to DOM
const CategoryBody = styled.div<{ $expanded: boolean }>`
  max-height: ${props => props.$expanded ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const CategoryDescription = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: #6b7280;
  padding: 0 16px 16px 16px;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PanelFooter = styled.div`
  border-top: 1px solid #e5e7eb;
  padding: 20px 24px;
  background: #f9fafb;
`;

const FooterButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const RejectAllButton = styled(ButtonBase)`
  flex: 1;
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #d1d5db;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
`;

const ConfirmButton = styled(ButtonBase)`
  flex: 1;
  background: #1f2937;
  color: #ffffff;
  border: none;

  &:hover {
    background: #111827;
  }
`;

const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const PoweredByText = styled.span`
  font-size: 11px;
  color: #9ca3af;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const PoweredByLogo = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

// Export with SSR disabled
const CookieConsent = dynamic(() => Promise.resolve(CookieConsentSystem), {
  ssr: false,
});

export default CookieConsent;