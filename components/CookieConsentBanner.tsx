import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';

interface PrivacyCookieBannerProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onPreferenceCenter?: () => void;
}

const BannerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-bottom: 3px solid #3498db;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 968px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const ContentSection = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin: 0 0 0.8rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #ecf0f1;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Link = styled(NextLink)`
  color: #3498db;
  text-decoration: underline;
  transition: color 0.2s ease;
  
  &:hover {
    color: #2980b9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.8rem;
  }
  
  @media (max-width: 968px) and (min-width: 769px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Button = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'outline' 
}>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 120px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
  }
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #27ae60;
          color: white;
          box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
          
          &:hover {
            background: #229954;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: #e74c3c;
          color: white;
          box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
          
          &:hover {
            background: #c0392b;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
          }
        `;
      case 'outline':
      default:
        return `
          background: transparent;
          color: #3498db;
          border: 2px solid #3498db;
          
          &:hover {
            background: #3498db;
            color: white;
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;

const PrivacyCookieBanner: React.FC<PrivacyCookieBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onPreferenceCenter
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Only check localStorage after component mounts on client
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
    setIsVisible(false);
    onAcceptAll?.();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
    setIsVisible(false);
    onRejectAll?.();
  };

  const handlePreferences = () => {
    onPreferenceCenter?.();
    // Note: Keep banner visible when opening preferences
  };

  // Don't render anything until mounted on client to prevent hydration mismatch
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <BannerContainer>
      <BannerContent>
        <ContentSection>
          <Title>Your Privacy</Title>
          <Message>
            We use cookies to personalize content and ads, provide social media features and analyse our traffic. 
            We also share information about your use of our site with our social media, advertising and analytics partners. 
            You can control your cookie preferences by clicking on the buttons on the right and place a do not sell or 
            share my personal information request.{' '}
            <Link href="/privacy-policy">
              Data Protection Portal
            </Link>
          </Message>
        </ContentSection>
        
        <ButtonContainer>
          <Button variant="outline" onClick={handlePreferences}>
            Preference Center
          </Button>
          <Button variant="secondary" onClick={handleReject}>
            Reject All
          </Button>
          <Button variant="primary" onClick={handleAccept}>
           I&apos;m OK with that
          </Button>
        </ButtonContainer>
      </BannerContent>
    </BannerContainer>
  );
};

export default PrivacyCookieBanner;