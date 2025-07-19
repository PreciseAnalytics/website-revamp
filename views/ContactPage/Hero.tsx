import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';

export default function ContactHero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <HeroWrapper>
      <BackgroundGlow />
      <Container>
        <Content>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Title>
              <AccentText>Contact Us</AccentText>
            </Title>
            <Title>
              Let&apos;s Start a <AccentText>Conversation</AccentText>
            </Title>
            <Description>
              Ready to transform your data strategy? Schedule a consultation with our experts to discover how Precise Analytics can help drive your mission forward.
            </Description>
            <ContactOptions>
              <ContactOption>
                <OptionIcon>📅</OptionIcon>
                <OptionText>
                  <strong>Schedule a meeting directly</strong> using the calendar widget for immediate booking
                </OptionText>
              </ContactOption>
            </ContactOptions>
            <SubNote>
              Book your free 30-minute consultation below – we're here to help!
            </SubNote>
          </motion.div>

          {/* Calendly Widget Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CalendlySection>
              <SectionTitle>Schedule Your Free Consultation</SectionTitle>
              <SectionSubtitle>
                Book a 30-minute consultation to discuss your data challenges and explore solutions
              </SectionSubtitle>
              {isClient && (
                <CalendlyContainer>
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/contact-preciseanalytics/initial-consultation?back=1&month=2025-06"
                    style={{ minWidth: '320px', height: '800px' }}
                    dangerouslySetInnerHTML={{ __html: '' }}
                  />
                </CalendlyContainer>
              )}
              
              {/* Certification Badges */}
              <CertificationBadges>
                <CertificationTitle>Certified & Verified Business</CertificationTitle>
                <CertificationLogos>
                  <CertificationLogoLink 
                    href="https://search.certifications.sba.gov/profile/ZRCYVLWCXL57/9YR68?page=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CertificationLogo 
                      src="/sba-logo.png" 
                      alt="SBA Veteran-Owned Small Business Certified"
                    />
                  </CertificationLogoLink>
                  <CertificationLogoLink 
                    href="https://directory.sbsd.virginia.gov/#/executiveExport"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CertificationLogo 
                      src="/SWAM_LOGO.jpg" 
                      alt="SWaM Certified - Small, Women-owned, and Minority-owned Business"
                    />
                  </CertificationLogoLink>
                </CertificationLogos>
              </CertificationBadges>
            </CalendlySection>
          </motion.div>
        </Content>
      </Container>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  position: relative;
  padding: 12rem 0 8rem;
  overflow: hidden;
  
  ${media.tablet`
    padding: 10rem 0 6rem;
  `}
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 140rem;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  
  ${media.tablet`
    padding: 0 1rem;
  `}
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 1rem 0 2.5rem;
  color: rgb(var(--text));
  
  ${media.desktop`
    font-size: 4.6rem;
  `}
  
  ${media.tablet`
    font-size: 4rem;
  `}
  
  @media (max-width: 480px) {
    font-size: 3.4rem;
  }
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  margin: 0 auto 4rem;
  max-width: 70rem;
  
  ${media.tablet`
    font-size: 1.8rem;
    margin-bottom: 3rem;
  `}
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 60rem;
  margin: 0 auto 3rem;
  
  ${media.tablet`
    gap: 1.5rem;
    margin-bottom: 2rem;
  `}
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.2rem;
  border: 1px solid rgba(var(--accent), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(var(--cardBackground), 0.8);
    border-color: rgba(var(--accent), 0.2);
    transform: translateY(-2px);
  }
  
  ${media.tablet`
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    padding: 1.5rem;
  `}
`;

const OptionIcon = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
  
  ${media.tablet`
    font-size: 2rem;
  `}
`;

const OptionText = styled.p`
  font-size: 1.6rem;
  line-height: 1.5;
  color: rgb(var(--text));
  margin: 0;
  text-align: left;
  
  strong {
    color: rgb(var(--accent));
  }
  
  ${media.tablet`
    font-size: 1.4rem;
    text-align: center;
  `}
`;

const SubNote = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text));
  opacity: 0.7;
  font-style: italic;
  margin: 0 0 2rem;
  
  ${media.tablet`
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  `}
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  ${media.tablet`
    font-size: 2.4rem;
  `}
`;

const SectionSubtitle = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 2rem;
  line-height: 1.5;
  
  ${media.tablet`
    font-size: 1.4rem;
  `}
`;

const CalendlySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 4rem;
  
  ${media.tablet`
    margin-top: 3rem;
  `}
`;

const CalendlyContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  
  ${media.tablet`
    max-width: 100%;
    border-radius: 1.2rem;
  `}
`;

const CertificationBadges = styled.div`
  margin-top: 4rem;
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--accent), 0.1);
  
  ${media.tablet`
    margin-top: 3rem;
    padding: 2rem;
  `}
`;

const CertificationTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  text-align: center;
  
  ${media.tablet`
    font-size: 2rem;
  `}
`;

const CertificationLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  align-items: center;

  ${media.tablet`
    gap: 2rem;
  `}
`;

const CertificationLogoLink = styled.a`
  display: block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CertificationLogo = styled.img`
  height: 8rem;
  width: auto;
  max-width: 12rem;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;

  ${CertificationLogoLink}:hover & {
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2));
  }

  ${media.tablet`
    height: 6rem;
    max-width: 10rem;
  `}
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -20rem;
  right: -15rem;
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--accent), 0.15) 0%,
    transparent 70%
  );
  z-index: 0;
`;