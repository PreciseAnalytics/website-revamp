import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const certifications = [
  {
    id: 1,
    name: 'NIST Cybersecurity Framework',
    description: 'Comprehensive cybersecurity framework for managing and reducing cybersecurity risk.',
    icon: '🔒',
    category: 'Security',
    details: 'Implementation of NIST standards for risk assessment, security controls, and continuous monitoring.'
  },
  {
    id: 2,
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act compliance for healthcare data protection.',
    icon: '🏥',
    category: 'Healthcare',
    details: 'Strict adherence to HIPAA privacy and security rules for protected health information (PHI).'
  },
  {
    id: 3,
    name: 'ITAR/EAR',
    description: 'International Traffic in Arms Regulations and Export Administration Regulations compliance.',
    icon: '🛡️',
    category: 'Defense',
    details: 'Compliance with export control regulations for defense and dual-use technologies.'
  },
  {
    id: 4,
    name: 'ISO/IEC 27001',
    description: 'International standard for information security management systems.',
    icon: '🌐',
    category: 'Security',
    details: 'Systematic approach to managing sensitive company information and ensuring data security.'
  },
  {
    id: 5,
    name: 'SOC 2 Type II',
    description: 'Service Organization Control 2 Type II audit for security, availability, and confidentiality.',
    icon: '📋',
    category: 'Audit',
    details: 'Independent verification of security controls and operational effectiveness over time.',
    
  },
  {
    id: 6,
    name: 'CMMI',
    description: 'Capability Maturity Model Integration for process improvement and organizational development.',
    icon: '📈',
    category: 'Process',
    details: 'Structured approach to improving processes and organizational capabilities.',
    logo: '/CMMI_LOGO.png'
  },
  {
    id: 7,
    name: 'FedRAMP',
    description: 'Federal Risk and Authorization Management Program for cloud service providers.',
    logo: '/fedramp-logo-vert.svg',
    icon: '☁️',
    category: 'Cloud',
    details: ''
  },
  {
    id: 8,
    name: 'SWaM Certification',
    description: 'Small, Women-owned, and Minority-owned Business certification from the Commonwealth of Virginia.',
    icon: '🏅',
    category: 'Business',
    details: '',
    logo: '/SWAM_LOGO.jpg'
  },
  {
    id: 9,
    name: 'SBA Certified',
    description: 'Small Business Administration certified as a Service-Disabled Veteran-Owned Small Business (SDVOSB).',
    icon: '🎖️',
    category: 'Business',
    details: 'Recognized by the U.S. government for veteran-owned small business compliance.',
    logo: '/sba-logo.png'
  }
];

export default function CertificationsPage() {
  return (
    <>
      <Head>
        <title>Certifications & Compliance - {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Precise Analytics maintains the highest standards of security and compliance with industry certifications including NIST, HIPAA, ISO 27001, SOC 2, and FedRAMP."
        />
        <meta
          name="keywords"
          content="certifications, compliance, NIST, HIPAA, ISO 27001, SOC 2, CMMI, FedRAMP, ITAR, EAR"
        />
      </Head>
      <AnimatedHeader />
      <MainContent>
        <Container>
          <StyledPageTitle>Certifications & Compliance</StyledPageTitle>
          <CertificationsGrid>
            {certifications.map((cert) => (
              <CertificationCard key={cert.id}>
                <CertIcon>{cert.icon}</CertIcon>
                <h3>{cert.name}</h3>
                <p>{cert.description}</p>
                <small>{cert.details}</small>
                {cert.logo && (
                  <img src={cert.logo} alt={cert.name} />
                )}
                {cert.download && (
                  <LogoBelow>
                    <a href={cert.download} download title={cert.downloadTitle}>
                      <img src={cert.download} alt={cert.downloadAlt} />
                    </a>
                  </LogoBelow>
                )}
              </CertificationCard>
            ))}
          </CertificationsGrid>
        </Container>
      </MainContent>
      <AnimatedFooter />
    </>
  );
}

const MainContent = styled.section`
  padding: 80px 0;
  text-align: center;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 40px;

  ${media('<=tablet')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media('<=phone')} {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled.div`
  min-height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
align-items: center;
text-align: center;
  background: #f9fafe;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease;
  h3 {
    margin-bottom: 10px;
    color: #0a2540;
    font-size: 1.8rem;
  }
  p {
    font-size: 15px;
    color: #333;
  }
  small {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    color: #666;
  }
  img {
    max-height: 120px;
    width: auto;
    margin: 20px auto 0;
    object-fit: contain;
    display: block;
  }
`;

const CertIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StyledPageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: orange;
  margin-bottom: 4rem;
  text-align: center;

  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const LogoBelow = styled.div`
  margin-top: 20px;
  a {
    display: block;
    text-decoration: none;
  }
  img {
    max-width: 80px;
    height: auto;
    display: block;
    margin: 0 auto;
    transition: transform 0.2s ease;
  }
  img:hover {
    transform: scale(1.05);
  }
`;
