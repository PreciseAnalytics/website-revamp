import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media, mq } from 'utils/media';
import Link from 'next/link';

const certifications = [
  {
    id: 1,
    name: 'NIST Cybersecurity Framework',
    description: 'Comprehensive cybersecurity framework for managing and reducing cybersecurity risk across critical infrastructure.',
    icon: '🔒',
    category: 'Security & Compliance',
    details: 'Full implementation of NIST CSF standards including risk assessment, security controls, continuous monitoring, and incident response protocols.',
    benefits: ['Enhanced threat detection', 'Risk mitigation strategies', 'Regulatory compliance', 'Continuous security monitoring'],
    logo: '/certifications/nist.svg'
  },
  {
    id: 2,
    name: 'HIPAA Compliance',
    description: 'Health Insurance Portability and Accountability Act compliance for comprehensive healthcare data protection.',
    icon: '🏥',
    category: 'Healthcare',
    details: 'Strict adherence to HIPAA privacy and security rules ensuring protection of Protected Health Information (PHI) with administrative, physical, and technical safeguards.',
    benefits: ['PHI data protection', 'Privacy rule compliance', 'Security rule implementation', 'Breach notification protocols'],
    logo: '/certifications/hipaa.svg'
  },
  {
    id: 3,
    name: 'ITAR/EAR Compliance',
    description: 'International Traffic in Arms Regulations and Export Administration Regulations compliance for defense contractors.',
    icon: '🛡️',
    category: 'Defense & Export',
    details: 'Full compliance with export control regulations for defense articles and dual-use technologies, including personnel screening and secure facilities.',
    benefits: ['Defense contractor eligibility', 'Export control compliance', 'Secure data handling', 'Personnel security clearance'],
    logo: '/certifications/itar.svg'
  },
  {
    id: 4,
    name: 'ISO/IEC 27001',
    description: 'International standard for information security management systems and data protection.',
    icon: '🌐',
    category: 'Security & Compliance',
    details: 'Systematic approach to managing sensitive information through documented security controls, risk assessments, and continuous improvement processes.',
    benefits: ['Information security management', 'Risk-based approach', 'Continuous improvement', 'Global recognition'],
    logo: '/certifications/iso-27001.svg'
  },
  {
    id: 5,
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2 Type II audit for security, availability, processing integrity, and confidentiality.',
    icon: '📋',
    category: 'Security & Compliance',
    details: 'Independent third-party verification of security controls effectiveness over a minimum six-month period, demonstrating operational excellence.',
    benefits: ['Third-party validation', 'Operational effectiveness', 'Trust and transparency', 'Risk management'],
    logo: '/certifications/soc2.svg'
  },
  {
    id: 6,
    name: 'CMMI Level 3',
    description: 'Capability Maturity Model Integration for process improvement and organizational development excellence.',
    icon: '📈',
    category: 'Process Excellence',
    details: 'Defined processes with documented standards, procedures, and methods. Demonstrates organizational maturity in project management and service delivery.',
    benefits: ['Process standardization', 'Quality assurance', 'Performance predictability', 'Continuous improvement'],
    logo: '/CMMI_LOGO.png'
  },
  {
    id: 7,
    name: 'FedRAMP Ready',
    description: 'Federal Risk and Authorization Management Program readiness for secure cloud service delivery to government.',
    icon: '☁️',
    category: 'Government Cloud',
    details: 'Comprehensive security assessment and authorization process for cloud services used by federal agencies, ensuring robust security controls.',
    benefits: ['Government cloud services', 'Security authorization', 'Continuous monitoring', 'Federal compliance'],
    logo: '/fedramp-logo-vert.svg'
  },
  {
    id: 8,
    name: 'SWaM Certification',
    description: 'Small, Women-owned, and Minority-owned Business certification from the Commonwealth of Virginia.',
    icon: '🏅',
    category: 'Business Certification',
    details: 'Certified small, women-owned, and minority business providing contracting opportunities with Virginia state and local governments.',
    benefits: ['State contracting opportunities', 'Diversity goals support', 'Local government access', 'Virginia preference'],
    logo: '/SWAM_LOGO.jpg',
    verificationLink: 'https://directory.sbsd.virginia.gov/#/directory'
  },
  {
    id: 9,
    name: 'SDVOSB Certified',
    description: 'Service-Disabled Veteran-Owned Small Business certification from the U.S. Small Business Administration.',
    icon: '🎖️',
    category: 'Business Certification',
    details: 'SBA-verified Service-Disabled Veteran-Owned Small Business providing access to federal set-aside contracts and veteran business opportunities.',
    benefits: ['Federal set-aside contracts', 'SDVOSB preferences', 'Veteran business network', 'Government contracting advantages'],
    logo: '/sba-logo.png',
    verificationLink: 'https://dsbs.sba.gov/search/dsp_profile.cfm?SAM_UEI=ZRCYVLWCXL57'
  }
];

const certificationsByCategory = certifications.reduce((acc, cert) => {
  if (!acc[cert.category]) {
    acc[cert.category] = [];
  }
  acc[cert.category].push(cert);
  return acc;
}, {} as Record<string, typeof certifications>);

export default function CertificationsPage() {
  return (
    <>
      <Head>
        <title>Certifications & Compliance - {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Precise Analytics maintains the highest standards of security and compliance with industry certifications including NIST, HIPAA, ISO 27001, SOC 2, CMMI, and FedRAMP. SDVOSB and SWaM certified."
        />
        <meta
          name="keywords"
          content="certifications, compliance, NIST, HIPAA, ISO 27001, SOC 2, CMMI, FedRAMP, ITAR, EAR, SDVOSB, SWaM, veteran owned business"
        />
      </Head>
      
      <AnimatedHeader />
      
      <PageWrapper>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroSection>
              <HeroTitle>Certifications & Compliance</HeroTitle>
              <HeroSubtitle>
                Maintaining the highest standards of security, quality, and business excellence
              </HeroSubtitle>
              <HeroDescription>
                Our comprehensive certifications demonstrate our commitment to security, compliance, and operational excellence. 
                We meet the stringent requirements of government and commercial clients across multiple industries.
              </HeroDescription>
            </HeroSection>
          </motion.div>

          <TrustSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TrustGrid>
                <TrustItem>
                  <TrustIcon>🏛️</TrustIcon>
                  <TrustTitle>Government Ready</TrustTitle>
                  <TrustDescription>FedRAMP and NIST compliant for federal projects</TrustDescription>
                </TrustItem>
                <TrustItem>
                  <TrustIcon>🔒</TrustIcon>
                  <TrustTitle>Security First</TrustTitle>
                  <TrustDescription>SOC 2 Type II and ISO 27001 certified</TrustDescription>
                </TrustItem>
                <TrustItem>
                  <TrustIcon>⚖️</TrustIcon>
                  <TrustTitle>Compliance Expert</TrustTitle>
                  <TrustDescription>HIPAA, ITAR/EAR, and industry standards</TrustDescription>
                </TrustItem>
                <TrustItem>
                  <TrustIcon>🎖️</TrustIcon>
                  <TrustTitle>Veteran Owned</TrustTitle>
                  <TrustDescription>SDVOSB and SWaM certified business</TrustDescription>
                </TrustItem>
              </TrustGrid>
            </motion.div>
          </TrustSection>

          {Object.entries(certificationsByCategory).map(([category, certs], categoryIndex) => (
            <CategorySection key={category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <CategoryTitle>{category}</CategoryTitle>
                <CertificationsGrid>
                  {certs.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <CertificationCard>
                        <CardHeader>
                          <CertIcon>{cert.icon}</CertIcon>
                          {cert.logo && (
                            <CertLogo>
                              <Image 
                                src={cert.logo} 
                                alt={cert.name} 
                                width={100}
                                height={60}
                                style={{
                                  objectFit: 'contain',
                                  maxHeight: '6rem',
                                  maxWidth: '10rem'
                                }}
                              />
                            </CertLogo>
                          )}
                        </CardHeader>
                        
                        <CardContent>
                          <CertName>{cert.name}</CertName>
                          <CertDescription>{cert.description}</CertDescription>
                          <CertDetails>{cert.details}</CertDetails>
                          
                          {cert.benefits && (
                            <BenefitsSection>
                              <BenefitsTitle>Key Benefits:</BenefitsTitle>
                              <BenefitsList>
                                {cert.benefits.map((benefit, i) => (
                                  <BenefitItem key={i}>{benefit}</BenefitItem>
                                ))}
                              </BenefitsList>
                            </BenefitsSection>
                          )}
                          
                          {cert.verificationLink && (
                            <VerificationLink 
                              href={cert.verificationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Verify Certification →
                            </VerificationLink>
                          )}
                        </CardContent>
                      </CertificationCard>
                    </motion.div>
                  ))}
                </CertificationsGrid>
              </motion.div>
            </CategorySection>
          ))}

          <ActionBarWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ActionBarContainer>
                <ActionBarBackground />
                <ActionBarContent>
                  <ActionBarLeft>
                    <ActionIcon>🤝</ActionIcon>
                    <ActionTextSection>
                      <ActionTitle>Ready to Work with a Certified Federal Partner?</ActionTitle>
                      <ActionSubtitle>
                        SDVOSB • SWaM • NIST • FedRAMP Ready • Security Cleared
                      </ActionSubtitle>
                      <ActionDescription>
                        Our certifications ensure we meet your security, compliance, and quality requirements for federal contracting.
                      </ActionDescription>
                    </ActionTextSection>
                  </ActionBarLeft>
                  
                  <ActionBarRight>
                    <ActionStats>
                      <StatItem>
                        <StatNumber>9+</StatNumber>
                        <StatLabel>Active Certifications</StatLabel>
                      </StatItem>
                      <StatItem>
                        <StatNumber>100%</StatNumber>
                        <StatLabel>Federal Compliance</StatLabel>
                      </StatItem>
                    </ActionStats>
                    
                    <ActionButtons>
                      <Link href="/contact" passHref legacyBehavior>
                        <a>
                          <MotionButton
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            $primary
                          >
                            <ButtonIcon>🚀</ButtonIcon>
                            Start Your Project
                          </MotionButton>
                        </a>
                      </Link>

                      <Link href="/capabilities-statement" passHref legacyBehavior>
                        <a>
                          <MotionButton
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            View Capabilities
                          </MotionButton>
                        </a>
                      </Link>
                    </ActionButtons>
                  </ActionBarRight>
                </ActionBarContent>
                
                <DecorativeShape1 />
                <DecorativeShape2 />
                <DecorativeShape3 />
              </ActionBarContainer>
            </motion.div>
          </ActionBarWrapper>
        </Container>
      </PageWrapper>
      
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0 8rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05) 0%, rgba(255, 165, 0, 0.02) 100%);
  border-radius: 2rem;
  margin-bottom: 6rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;

  ${mq('<=tablet', 'font-size: 3.6rem;')}
`;

const HeroSubtitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;

  ${mq('<=tablet', 'font-size: 1.8rem;')}
`;

const HeroDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  max-width: 70rem;
  margin: 0 auto;

  ${mq('<=tablet', 'font-size: 1.6rem;')}
`;

const TrustSection = styled.section`
  margin-bottom: 6rem;
`;

const TrustGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  ${mq('<=tablet', 'grid-template-columns: repeat(2, 1fr);')}

  ${mq('<=phone', 'grid-template-columns: 1fr;')}
`;

const TrustItem = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 125, 0, 0.1);
`;

const TrustIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const TrustTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const TrustDescription = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
`;

const CategorySection = styled.section`
  margin-bottom: 6rem;
`;

const CategoryTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 8rem;
    height: 3px;
    background: linear-gradient(90deg, rgb(255, 125, 0), rgb(255, 165, 0));
    border-radius: 2px;
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const CertificationCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 125, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: rgba(255, 125, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const CertIcon = styled.div`
  font-size: 3.5rem;
`;

const CertLogo = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CertName = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const CertDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.9);
  margin-bottom: 1.5rem;
`;

const CertDetails = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: rgb(var(--text), 0.7);
  margin-bottom: 2rem;
`;

const BenefitsSection = styled.div`
  margin: 2rem 0;
  flex: 1;
`;

const BenefitsTitle = styled.h4`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  padding-left: 2rem;
  position: relative;
  color: rgb(var(--text), 0.8);

  &:before {
    content: '✓';
    color: rgb(255, 125, 0);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const VerificationLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: rgb(255, 125, 0);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: auto;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(255, 165, 0);
    text-decoration: underline;
  }
`;

const ActionBarWrapper = styled.section`
  margin-top: 8rem;
  padding: 0 2rem;

  ${mq('<=tablet', 'padding: 0 1rem;')}
`;

const ActionBarContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1a237e 0%, #303f9f 50%, #3f51b5 100%);
  border-radius: 2.4rem;
  padding: 4rem;
  overflow: hidden;
  border: 2px solid rgba(255, 125, 0, 0.2);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 0 100px rgba(255, 125, 0, 0.1);

  ${mq('<=tablet', `
    padding: 3rem 2rem;
    border-radius: 2rem;
  `)}

  ${mq('<=phone', `
    padding: 2.5rem 1.5rem;
    border-radius: 1.6rem;
  `)}
`;

const ActionBarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 125, 0, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
`;

const ActionBarContent = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;

  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  `)}
`;

const ActionBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  ${mq('<=tablet', `
    flex-direction: column;
    text-align: center;
  `)}
`;

const ActionIcon = styled.div`
  font-size: 5rem;
  flex-shrink: 0;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));

  ${mq('<=tablet', 'font-size: 4rem;')}
`;

const ActionTextSection = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  ${mq('<=tablet', 'font-size: 2.6rem;')}

  ${mq('<=phone', 'font-size: 2.2rem;')}
`;

const ActionSubtitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255, 125, 0, 1);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${mq('<=phone', 'font-size: 1.2rem;')}
`;

const ActionDescription = styled.p`
  font-size: 1.7rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;

  ${mq('<=tablet', 'font-size: 1.6rem;')}

  ${mq('<=phone', 'font-size: 1.4rem;')}
`;

const ActionBarRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-end;

  ${mq('<=tablet', `
    align-items: center;
    width: 100%;
  `)}
`;

const ActionStats = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 1rem;

  ${mq('<=phone', 'gap: 2rem;')}
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  color: rgba(255, 125, 0, 1);
  line-height: 1;

  ${mq('<=phone', 'font-size: 2.4rem;')}
`;

const StatLabel = styled.div`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  ${mq('<=phone', `
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  `)}
`;

const ButtonIcon = styled.span`
  font-size: 1.6rem;
`;

const MotionButton = styled(motion.div)<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.8rem 3.6rem;
  border-radius: 1.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow:
    0 10px 25px rgba(255, 125, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  ${({ $primary }) =>
    $primary
      ? `
    background: linear-gradient(135deg, #ff7d00 0%, #ffa500 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #e66a00 0%, #ff9500 100%);
      transform: translateY(-2px);
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }
  `}

  ${mq('<=phone', `
    width: 100%;
    padding: 1.6rem 2rem;
    font-size: 1.6rem;
  `)}
`;

const DecorativeShape1 = styled.div`
  position: absolute;
  top: -5rem;
  right: -3rem;
  width: 15rem;
  height: 15rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.2) 0%, rgba(255, 165, 0, 0.1) 100%);
  border-radius: 50%;
  filter: blur(20px);
  z-index: 1;
`;

const DecorativeShape2 = styled.div`
  position: absolute;
  bottom: -4rem;
  left: -2rem;
  width: 12rem;
  height: 12rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%);
  border-radius: 50%;
  filter: blur(15px);
  z-index: 1;
`;

const DecorativeShape3 = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(196, 181, 253, 0.1) 100%);
  border-radius: 50%;
  filter: blur(10px);
  z-index: 1;
  transform: translateY(-50%);
`;