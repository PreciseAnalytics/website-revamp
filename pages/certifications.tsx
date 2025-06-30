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
    details: 'Independent verification of security controls and operational effectiveness over time.'
  },
  {
    id: 6,
    name: 'CMMI',
    description: 'Capability Maturity Model Integration for process improvement and organizational development.',
    icon: '📈',
    category: 'Process',
    details: 'Structured approach to improving processes and organizational capabilities.'
  },
  {
    id: 7,
    name: 'FedRAMP',
    description: 'Federal Risk and Authorization Management Program for cloud service providers.',
    icon: '☁️',
    category: 'Cloud',
    details: 'Standardized approach to security assessment and authorization for cloud services.'
  }
];

export default function Certifications() {
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
      
      <PageWrapper>
        <Container>
          <HeaderSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageTitle>Certifications & Compliance</PageTitle>
            <PageSubtitle>
              We maintain the highest standards of security, compliance, and operational excellence 
              through industry-recognized certifications and frameworks.
            </PageSubtitle>
          </HeaderSection>

          <CertificationGrid>
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <CertHeader>
                  <CertIcon>{cert.icon}</CertIcon>
                  <CertCategory>{cert.category}</CertCategory>
                </CertHeader>
                
                <CertContent>
                  <CertName>{cert.name}</CertName>
                  <CertDescription>{cert.description}</CertDescription>
                  <CertDetails>{cert.details}</CertDetails>
                </CertContent>
              </CertificationCard>
            ))}
          </CertificationGrid>

          <ComplianceSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ComplianceCard>
              <ComplianceTitle>Our Commitment to Security & Compliance</ComplianceTitle>
              <ComplianceContent>
                <ComplianceItem>
                  <ComplianceIcon>🔐</ComplianceIcon>
                  <ComplianceText>
                    <strong>Data Security:</strong> End-to-end encryption and secure data handling practices
                  </ComplianceText>
                </ComplianceItem>
                <ComplianceItem>
                  <ComplianceIcon>🏛️</ComplianceIcon>
                  <ComplianceText>
                    <strong>Federal Standards:</strong> Full compliance with federal regulations and security requirements
                  </ComplianceText>
                </ComplianceItem>
                <ComplianceItem>
                  <ComplianceIcon>🔄</ComplianceIcon>
                  <ComplianceText>
                    <strong>Continuous Monitoring:</strong> Regular audits and assessments to maintain compliance
                  </ComplianceText>
                </ComplianceItem>
                <ComplianceItem>
                  <ComplianceIcon>👥</ComplianceIcon>
                  <ComplianceText>
                    <strong>Staff Training:</strong> Ongoing security awareness and compliance training for all team members
                  </ComplianceText>
                </ComplianceItem>
              </ComplianceContent>
            </ComplianceCard>
          </ComplianceSection>
        </Container>
      </PageWrapper>
      
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  min-height: 80vh;
  padding: 8rem 0 4rem;
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgb(var(--accent)), rgb(var(--secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  ${media('<=tablet')} {
    font-size: 3.6rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  color: rgb(var(--text), 0.8);
  max-width: 80rem;
  margin: 0 auto;
  line-height: 1.6;
  
  ${media('<=tablet')} {
    font-size: 1.8rem;
  }
`;

const CertificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  margin-bottom: 6rem;
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CertificationCard = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(var(--accent), 0.4);
    box-shadow: var(--shadow-xl);
  }
  
  ${media('<=tablet')} {
    padding: 2rem;
  }
`;

const CertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const CertIcon = styled.div`
  font-size: 4rem;
`;

const CertCategory = styled.span`
  background: linear-gradient(135deg, rgba(var(--accent), 0.2), rgba(var(--secondary), 0.2));
  color: rgb(var(--text));
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(var(--accent), 0.3);
`;

const CertContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CertName = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 0;
`;

const CertDescription = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  margin: 0;
`;

const CertDetails = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.6);
  line-height: 1.5;
  margin: 0;
  font-style: italic;
`;

const ComplianceSection = styled(motion.div)``;

const ComplianceCard = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  
  ${media('<=tablet')} {
    padding: 3rem 2rem;
  }
`;

const ComplianceTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 3rem;
  text-align: center;
`;

const ComplianceContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ComplianceItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const ComplianceIcon = styled.div`
  font-size: 3rem;
  flex-shrink: 0;
  margin-top: 0.5rem;
`;

const ComplianceText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: rgb(var(--accent));
    font-weight: 600;
  }
`;
