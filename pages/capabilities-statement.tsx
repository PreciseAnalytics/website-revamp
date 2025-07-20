import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { EnvVars } from 'env';
import { media, mq } from 'utils/media';
import Link from 'next/link';


const coreCompetencies = [
  {
    id: 1,
    title: 'Data Engineering and Analytics',
    description: 'Designing end-to-end data infrastructure, optimizing ETL processes, and enhancing data architecture for secure management. Skilled in advanced analytics, predictive modeling, and data processing.',
    icon: '📊'
  },
  {
    id: 2,
    title: 'Business Intelligence (BI)',
    description: 'Develop and deploy BI dashboards and reports to convert raw data into actionable insights, integrating platforms like Google Ads and CRMs for real-time campaign performance and client retention analysis.',
    icon: '📈'
  },
  {
    id: 3,
    title: 'Software Development',
    description: 'Deliver full-stack development using modern frameworks, cloud-native solutions with AWS, Azure, and GCP, and seamless enterprise integration with platforms like Salesforce, EHRs, and Medicaid systems.',
    icon: '💻'
  },
  {
    id: 4,
    title: 'Machine Learning and AI',
    description: 'Develop custom AI/ML models for predictive analytics, NLP, and computer vision to enable lead scoring, patient outcome predictions, and image-based diagnostics.',
    icon: '🤖'
  },
  {
    id: 5,
    title: 'Healthcare Compliance and Security',
    description: 'Ensure compliance with HIPAA, DEA, and state-specific regulations through automated reporting, secure systems, and advanced security measures like encryption and role-based access controls (RBAC).',
    icon: '🔐'
  },
  {
    id: 6,
    title: 'Inventory and Resource Management',
    description: 'Optimize inventory and resource management with real-time tracking, automated planning, and forecasting to ensure operational efficiency and minimize disruptions.',
    icon: '📦'
  }
];

const differentiators = [
  'Extensive Expertise: Experience delivering tailored data solutions for state, and local agencies.',
  'Secure Data Solutions: Compliance with FISMA, HIPAA, and NIST regulations, ensuring robust cybersecurity.',
  'Customizable Services: Flexible solutions designed to meet the unique requirements of diverse agencies.',
  'Proven Track Record: Demonstrated success in improving decision-making, operational efficiency, and resource allocation.',
  'Innovation in Healthcare: Advanced platforms showcasing our ability to blend technology and healthcare expertise.'
];

const pastProjects = [
  {
    id: 1,
    title: 'Imani Mental Health Services',
    location: 'Queen Creek, AZ',
    scope: 'Enhanced data infrastructure, improved reporting capabilities, and leveraged data insights to optimize operational efficiencies and patient outcomes.'
  },
  {
    id: 2,
    title: 'QC Medchain (SBIR)',
    location: 'Minneapolis, MN',
    scope: 'Designed data solutions to improve supply chain management, reduce counterfeit drugs, enhance traceability, and boost efficiency.'
  },
  {
    id: 3,
    title: 'Agencies on Aging',
    location: 'NorthEastern States',
    scope: 'Delivered a scalable, cloud-based healthcare platform on Microsoft Azure for seamless service management, billing, and compliance. Reduced administrative costs by 30%, achieved a 95% success rate in first-pass claims processing, and improved care delivery.'
  },
  {
    id: 4,
    title: 'Hercules Touch Anesthesia',
    location: 'Nationwide',
    scope: 'Deployed in 65+ clinics across 7 states, this system integrates appointment scheduling, procedure recording, history management, vitals monitoring, compliance reporting, and inventory tracking. This reduced compliance costs, increased operational efficiency, and enhanced patient safety.'
  },
  {
    id: 5,
    title: 'Lose the Back Pain',
    location: 'Multi-State',
    scope: 'Built a BI platform to centralize marketing data, optimize campaigns, and increase client retention. Boosted campaign ROI by 15%, increased sales productivity by 25%, and reduced customer acquisition costs by 20%.'
  }
];

const naicsCodes = [
  { code: '518210', description: 'Data Processing, Hosting, and Related Services' },
  { code: '541511', description: 'Custom Computer Programming Services' },
  { code: '541512', description: 'Computer Systems Design Services' },
  { code: '541519', description: 'Other Computer Related Services' },
  { code: '541611', description: 'Administrative Management and General Management Consulting' },
  { code: '541690', description: 'Other Scientific and Technical Consulting Services' }
];

export default function CapabilitiesStatementPage() {
  return (
    <>
      <Head>
        <title>Capabilities Statement - {EnvVars.SITE_NAME}</title>
        <meta
          name="description"
          content="Precise Analytics Capabilities Statement - Leading data engineering, analytics, and consulting firm delivering precision-driven insights to federal, state, and local agencies."
        />
        <meta
          name="keywords"
          content="capabilities statement, data engineering, business intelligence, software development, machine learning, AI, healthcare compliance, VOSB, SWaM"
        />
      </Head>
      
      <AnimatedHeader />
      
      <PageWrapper>
        <Container>
                <CenteredWrapper>
                  <DownloadCTA href="/capabilities-statement.pdf" download>
                    📄 Download Full Capabilities Statement (PDF)
                  </DownloadCTA>
                  <ViewCTA
                    href="/capabilities-statement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    👁️ View Full Capabilities Statement (PDF)
                  </ViewCTA>
                </CenteredWrapper>
   
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroSection>
              <HeroTitle>Capabilities Statement</HeroTitle>
              <HeroSubtitle>
                Precision-Driven Insights for Mission Success
              </HeroSubtitle>
              <CertificationSection>
                <CertificationLogos>
                  <LogoContainer>
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
                    <LogoLabel>VETERAN-OWNED CERTIFIED</LogoLabel>
                  </LogoContainer>
                  <LogoContainer>
                    <CertificationLogoLink 
                      href="https://directory.sbsd.virginia.gov/#/executiveExport"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <EnlargedSwamLogo 
                        src="/SWAM_LOGO.jpg" 
                        alt="SWaM Certified - Small, Women-owned, and Minority-owned Business"
                      />
                    </CertificationLogoLink>
                    <LogoLabel>SWaM CERTIFIED</LogoLabel>
                  </LogoContainer>
                </CertificationLogos>
                <ComplianceBadge>
                  <ComplianceIcon>🔒</ComplianceIcon>
                  <ComplianceText>NIST COMPLIANT</ComplianceText>
                </ComplianceBadge>
              </CertificationSection>
            </HeroSection>
          </motion.div>

          {/* Company Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Company Overview</SectionTitle>
              <OverviewText>
                Precise Analytics is a leading data engineering, analytics, and consulting firm. We are committed to delivering 
                precision-driven insights and cutting-edge solutions to federal, state, and local agencies. By combining expertise 
                in data analytics, software development, and AI/ML integration, we empower organizations with actionable intelligence 
                to enhance decision-making, operational efficiency, and mission success.
              </OverviewText>
            </Section>
          </motion.div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Core Competencies</SectionTitle>
              <CompetenciesGrid>
                {coreCompetencies.map((competency, index) => (
                  <motion.div
                    key={competency.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <CompetencyCard>
                      <CompetencyIcon>{competency.icon}</CompetencyIcon>
                      <CompetencyTitle>{competency.title}</CompetencyTitle>
                      <CompetencyDescription>{competency.description}</CompetencyDescription>
                    </CompetencyCard>
                  </motion.div>
                ))}
              </CompetenciesGrid>
            </Section>
          </motion.div>

          {/* Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Differentiators</SectionTitle>
              <DifferentiatorsList>
                {differentiators.map((diff, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <DifferentiatorItem>{diff}</DifferentiatorItem>
                  </motion.div>
                ))}
              </DifferentiatorsList>
            </Section>
          </motion.div>

          {/* Past Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Past Projects</SectionTitle>
              <ProjectsGrid>
                {pastProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <ProjectCard>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      {project.location && <ProjectLocation>{project.location}</ProjectLocation>}
                      <ProjectScope>
                        <strong>Scope:</strong> {project.scope}
                      </ProjectScope>
                    </ProjectCard>
                  </motion.div>
                ))}
              </ProjectsGrid>
            </Section>
          </motion.div>

          {/* Products Created */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Products Created</SectionTitle>
              <ProductsShowcase>
                <ProductItem>
                  <ProductIcon>📊</ProductIcon>
                  <ProductTitle>Healthcare Analytics Dashboard</ProductTitle>
                  <ProductDescription>
                    Comprehensive BI platform for healthcare providers with real-time analytics, 
                    patient outcome tracking, and compliance reporting.
                  </ProductDescription>
                </ProductItem>
                <ProductItem>
                  <ProductIcon>🏥</ProductIcon>
                  <ProductTitle>Anesthesia Management System</ProductTitle>
                  <ProductDescription>
                    Integrated clinic management solution deployed across 65+ clinics, featuring 
                    scheduling, procedure tracking, and inventory management.
                  </ProductDescription>
                </ProductItem>
                <ProductItem>
                  <ProductIcon>📈</ProductIcon>
                  <ProductTitle>Marketing Intelligence Platform</ProductTitle>
                  <ProductDescription>
                    Advanced BI solution that centralized marketing data, optimized campaigns, 
                    and increased ROI by 15% for healthcare clients.
                  </ProductDescription>
                </ProductItem>
              </ProductsShowcase>
            </Section>
          </motion.div>

          {/* Company Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>Company Data</SectionTitle>
              <CompanyDataGrid>
                <DataCard>
                  <DataLabel>UEI</DataLabel>
                  <DataValue>ZRCYVLWCXL57</DataValue>
                </DataCard>
                <DataCard>
                  <DataLabel>CAGE Code</DataLabel>
                  <DataValue>9YR68</DataValue>
                </DataCard>
                <DataCard>
                  <DataLabel>D-U-N-S #</DataLabel>
                  <DataValue>12-463-3796</DataValue>
                </DataCard>
                <DataCard>
                  <DataLabel>Phone</DataLabel>
                  <DataValue>(804) 396-4148</DataValue>
                </DataCard>
                <DataCard>
                  <DataLabel>Email</DataLabel>
                  <DataValue>contact@preciseanalytics.io</DataValue>
                </DataCard>
                <DataCard>
                  <DataLabel>Website</DataLabel>
                  <DataValue>www.preciseanalytics.io</DataValue>
                </DataCard>
              </CompanyDataGrid>
            </Section>
          </motion.div>

          {/* NAICS Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Section>
              <SectionTitle>NAICS Codes</SectionTitle>
              <NAICSGrid>
                {naicsCodes.map((naics, index) => (
                  <motion.div
                    key={naics.code}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <NAICSItem>
                      <NAICSCode>{naics.code}</NAICSCode>
                      <NAICSDescription>{naics.description}</NAICSDescription>
                    </NAICSItem>
                  </motion.div>
                ))}
              </NAICSGrid>
            </Section>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CTASection>
              <CTATitle>Ready to Partner with Us?</CTATitle>
              <CTADescription>
                Contact Precise Analytics today to discuss how our proven capabilities can support your mission.
              </CTADescription>
              <Link href="/contact" passHref legacyBehavior>
                <a>
                  <CTAButton as="span">Get Started</CTAButton>
                </a>
              </Link>
            </CTASection>
                <CenteredWrapper>
                  <DownloadCTA href="/capabilities-statement.pdf" download>
                    📄 Download Full Capabilities Statement (PDF)
                  </DownloadCTA>
                  <ViewCTA
                    href="/capabilities-statement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    👁️ View Full Capabilities Statement (PDF)
                  </ViewCTA>
                </CenteredWrapper>

          </motion.div>
        </Container>
      </PageWrapper>
      
      
    </>
  );
}

// Styled Components
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
  margin-bottom: 4rem;

  ${mq('<=tablet', 'font-size: 1.8rem;')}
`;

const CertificationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const CertificationLogos = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
  align-items: center;

  ${mq('<=tablet', 'gap: 2rem;')}
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
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

  ${mq('<=tablet', `
    height: 6rem;
    max-width: 10rem;
  `)}
`;

const EnlargedSwamLogo = styled(CertificationLogo)`
  height: 16rem;
  max-width: 20rem;
  
  ${mq('<=tablet', `
    height: 12rem;
    max-width: 16rem;
  `)}
`;

const LogoLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgb(var(--text), 0.8);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${mq('<=tablet', 'font-size: 1rem;')}
`;

const ComplianceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #1a237e, #3f51b5);
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 2px solid rgba(255, 125, 0, 0.3);
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.3);

  ${mq('<=tablet', `
    padding: 1.2rem 2.5rem;
    font-size: 1.2rem;
  `)}
`;

const ComplianceIcon = styled.div`
  font-size: 1.8rem;
`;

const ComplianceText = styled.div`
  font-weight: 700;
`;

const Section = styled.section`
  margin-bottom: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin-bottom: 4rem;
  text-align: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
    height: 4px;
    background: linear-gradient(90deg, rgb(255, 125, 0), rgb(255, 165, 0));
    border-radius: 2px;
  }

  ${mq('<=tablet', 'font-size: 2.8rem;')}
`;

const OverviewText = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgb(var(--text), 0.9);
  text-align: center;
  max-width: 90rem;
  margin: 0 auto;

  ${mq('<=tablet', 'font-size: 1.6rem;')}
`;

const CompetenciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const CompetencyCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 125, 0, 0.1);
  height: 100%;

  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: rgba(255, 125, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const CompetencyIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const CompetencyTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const CompetencyDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
`;

const DifferentiatorsList = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const DifferentiatorItem = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.9);
  margin-bottom: 2rem;
  padding-left: 3rem;
  position: relative;

  &:before {
    content: '✓';
    color: rgb(255, 125, 0);
    font-weight: bold;
    font-size: 1.8rem;
    position: absolute;
    left: 0;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const ProjectCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 125, 0, 0.1);

  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: rgba(255, 125, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const ProjectLocation = styled.p`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ProjectScope = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
`;

const ProductsShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const ProductItem = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.6rem;
  border: 1px solid rgba(255, 125, 0, 0.1);
`;

const ProductIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 1.4rem;
  line-height: 1.5;
  color: rgb(var(--text), 0.8);
`;

const CompanyDataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;

  ${mq('<=tablet', 'grid-template-columns: repeat(2, 1fr);')}

  ${mq('<=phone', 'grid-template-columns: 1fr;')}
`;

const DataCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.2rem;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 125, 0, 0.1);
`;

const DataLabel = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const DataValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--text));
`;

const NAICSGrid = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const NAICSItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 125, 0, 0.1);

  ${mq('<=phone', `
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  `)}
`;

const NAICSCode = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  min-width: 8rem;
`;

const NAICSDescription = styled.div`
  font-size: 1.5rem;
  color: rgb(var(--text), 0.9);
  flex: 1;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 6rem 0;
  background: linear-gradient(135deg, #1a237e, #3f51b5);
  border-radius: 2rem;
  margin-top: 4rem;
`;

const CTATitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;

  ${mq('<=tablet', 'font-size: 2.4rem;')}
`;

const CTADescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  max-width: 60rem;
  margin-left: auto;
  margin-right: auto;

  ${mq('<=tablet', 'font-size: 1.6rem;')}
`;


// Styled wrappers & buttons
const CenteredWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const DownloadCTA = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 1.2rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 126, 95, 0.3);
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #ff6a40, #ffaf7b);
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 126, 95, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.2rem 2.5rem;
    font-size: 1.4rem;
  }
`;

const ViewCTA = styled.a`
  display: inline-block;
  background-color: #28a745; /* green */
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 1.2rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);

  &:hover {
    background-color: #218838;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(33, 136, 56, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.2rem 2.5rem;
    font-size: 1.4rem;
  }
`;


const CTAButton = styled.div`
  display: inline-block;
  cursor: pointer;
  background: linear-gradient(135deg, #ff7d00 0%, #ffa500 100%);
  color: white;
  padding: 1.8rem 3.6rem;
  border-radius: 1.2rem;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 125, 0, 0.3);
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #e66a00 0%, #ff9500 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 125, 0, 0.4);
  }

  ${mq('<=tablet', `
    padding: 1.4rem 2.8rem;
    font-size: 1.6rem;
  `)}
`;