import NextImage from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

const PARTNER_LOGOS = [
  { 
    name: 'Payflow',
    file: '/SmartHomeAutomation_logo.png',
    url: 'https://smartinvoiceautomation.com'
  },
  { 
    name: 'Terralogic Africa',
    file: '/TerralogicAfrica_logo.png',
    url: 'https://www.terralogic.co.ke'
  },
  { 
    name: 'Proventus Analytics',
    file: '/ProventusAnalytics_logo.png',
    url: 'https://www.proventusanalytics.com'
  },
  { 
    name: 'Robotics For Sure',
    file: '/Roboticsforsure_logo.png',
    url: 'https://roboticsforsure.com/'
  },
  { 
    name: 'Imani Mental Health',
    file: '/ImaniMentalHealth_logo.png',
    url: 'https://www.facebook.com/share/16hZNpxSNd/?mibextid=wwXIfr'
  },
];

export default function Partners() {
  return (
    <PartnersWrapper>
      <SectionTitle>Our Partners</SectionTitle>
      <Description>
        Collaborating with industry leaders to deliver exceptional data solutions
      </Description>
      
      <PartnersGrid>
        {PARTNER_LOGOS.map((partner, index) => (
          <PartnerCard
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            as="a"
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogoWrapper>
              <NextImage 
                src={partner.file} 
                alt={`${partner.name} logo`} 
                width={180}
                height={100}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  maxHeight: '100px'
                }}
              />
            </LogoWrapper>
            <PartnerName>{partner.name}</PartnerName>
          </PartnerCard>
        ))}
      </PartnersGrid>
    </PartnersWrapper>
  );
}

const Description = styled.p`
  font-size: 1.8rem;
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 5rem;
  color: rgb(var(--text), 0.8);
`;

const PartnersWrapper = styled(Container)`
  padding: 5rem 0;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  
  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
  `}
  
  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  `}
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PartnerCard = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(var(--text), 0.08);
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: rgba(var(--accent), 0.3);
  }
  
  ${media.desktop`
    padding: 2.5rem 1.5rem;
  `}
  
  ${media.tablet`
    padding: 2rem 1rem;
  `}
`;

const LogoWrapper = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const PartnerName = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-top: auto;
`;