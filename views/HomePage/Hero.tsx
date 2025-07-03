import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Container from 'components/Container';
import HeroIllustration from 'components/HeroIllustation';
import AnimatedBackground from 'components/AnimatedBackground';
import AnimatedReveal from 'components/AnimatedReveal';
import CertificationModal from 'components/CertificationModal';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { media } from 'utils/media';

export default function Hero() {
  const { setIsModalOpened } = useNewsletterModalContext();
  const [certificationModal, setCertificationModal] = useState<{
    isOpen: boolean;
    type: 'VOSB' | 'DSBSD' | null;
  }>({
    isOpen: false,
    type: null
  });

  const openCertificationModal = (type: 'VOSB' | 'DSBSD') => {
    setCertificationModal({ isOpen: true, type });
  };

  const closeCertificationModal = () => {
    setCertificationModal({ isOpen: false, type: null });
  };
  
  return (
    <HeroWrapper>
      <BackgroundContainer>
        <AnimatedBackground variant="particles" />
      </BackgroundContainer>
      <Contents>
        <AnimatedReveal direction="left" delay={0.2}>
          <CustomHeadingTagline>Welcome to Precise Analytics: Your Data-Driven Solutions Experts</CustomHeadingTagline>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.4}>
          <Heading>
            Your Data, <HighlightText>Our Insights!</HighlightText>
          </Heading>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.6}>
          <Description>
            We transform your complex data into actionable insights through industry-leading analytics, custom dashboards, and AI/ML technologies.
          </Description>
        </AnimatedReveal>
        
        <CustomButtonGroup>
          <AnimatedReveal direction="up" delay={0.8}>
            <NextLink href="/services" passHref>
              <Button accent>
                Explore Our Services <span>&rarr;</span>
              </Button>
            </NextLink>
          </AnimatedReveal>
          
          <AnimatedReveal direction="up" delay={0.9}>
            <Button 
              transparent 
              as="a" 
              href="/capabilities-statement.pdf" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Capabilities Statement <span>&rarr;</span>
            </Button>
          </AnimatedReveal>
        </CustomButtonGroup>
        
        <AnimatedReveal direction="up" delay={1.0}>
          <CertificationsContainer>
            <CertificationBadge 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => openCertificationModal('VOSB')}
            >
              VOSB
            </CertificationBadge>
            <CertificationBadge 
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => openCertificationModal('DSBSD')}
            >
              DSBSD
            </CertificationBadge>
          </CertificationsContainer>
        </AnimatedReveal>
      </Contents>
      <ImageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <HeroIllustration />
        </motion.div>
      </ImageContainer>
      
      {/* Certification Modal */}
      {certificationModal.type && (
        <CertificationModal
          isOpen={certificationModal.isOpen}
          onClose={closeCertificationModal}
          type={certificationModal.type}
        />
      )}
    </HeroWrapper>
  );
}

const HeroWrapper = styled(Container)`
  display: flex;
  padding-top: 8rem;
  padding-bottom: 5rem;
  position: relative;
  
  ${media.desktop`
    padding-top: 3rem;
    flex-direction: column;
    align-items: center;
  `}
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.4;
`;

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;
  z-index: 10;
  
  ${media.desktop`
    max-width: 100%;
  `}
`;

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
  
  ${media.tablet`
    margin-top: 3rem;
  `}
`;

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;

  svg {
    max-width: 45rem;
  }

  ${media.desktop`
    margin-top: 5rem;
    justify-content: center;
    svg {
      max-width: 80%;
    }
  `}
`;

const Description = styled.p`
  font-size: 2rem;
  opacity: 0.8;
  line-height: 1.6;
  margin-top: 2.5rem;

  ${media.desktop`
    font-size: 1.8rem;
  `}
  
  ${media.tablet`
    font-size: 1.6rem;
  `}
`;

const CustomHeadingTagline = styled.h2`
  font-size: 1.8rem;
  color: rgb(var(--accent));
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  ${media.tablet`
    font-size: 1.6rem;
  `}
`;

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;

  ${media.tablet`
    font-size: 4.6rem;
  `}
`;

const HighlightText = styled.span`
  color: rgb(var(--accent));
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: rgba(var(--accent), 0.15);
    z-index: -1;
  }
`;

const CertificationsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  
  ${media.tablet`
    margin-top: 3rem;
    gap: 1.5rem;
  `}
`;

const CertificationBadge = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--accent), 0.3);
  color: rgb(var(--text));
  padding: 0.8rem 1.5rem;
  border-radius: 5rem;
  font-size: 1.4rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    color: rgb(var(--accent));
    border-color: rgb(var(--accent));
  }
`;