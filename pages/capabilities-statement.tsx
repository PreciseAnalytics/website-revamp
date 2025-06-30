import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import { EnvVars } from 'env';
import { media } from 'utils/media';

export default function CapabilitiesStatement() {
  return (
    <>
      <Head>
        <title>{`Capabilities Statement - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Discover Precise Analytics' comprehensive capabilities in data analytics, federal contracting support, and compliance services."
        />
        <meta
          name="keywords"
          content="capabilities statement, data analytics, Power BI, Tableau, federal contracting, SDVOSB, FedRAMP, NIST"
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
            <PageTitle>Capabilities Statement</PageTitle>
            <PageSubtitle>
              Comprehensive overview of our data analytics expertise and federal contracting capabilities
            </PageSubtitle>
            
            <DownloadSection>
              <ButtonGroup>
                <Button 
                  as="a"
                  href="/api/download-capabilities"
                  accent
                >
                  📥 Download PDF
                </Button>
                
                <Button 
                  as="a" 
                  href="/capabilities-statement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  👁️ View PDF
                </Button>
              </ButtonGroup>
            </DownloadSection>
          </HeaderSection>

          <ContentSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SummaryCard>
              <SectionTitle>Core Capabilities</SectionTitle>
              
              <CapabilityGrid>
                <CapabilityItem>
                  <CapabilityIcon>📊</CapabilityIcon>
                  <CapabilityTitle>Data Analytics</CapabilityTitle>
                  <CapabilityDescription>
                    Advanced analytics solutions using Power BI, Tableau, and custom dashboard development.
                    Transform complex data into actionable insights with cutting-edge visualization tools.
                  </CapabilityDescription>
                  <TechList>
                    <TechTag>Power BI</TechTag>
                    <TechTag>Tableau</TechTag>
                    <TechTag>Custom Dashboards</TechTag>
                    <TechTag>ETL Processes</TechTag>
                  </TechList>
                </CapabilityItem>

                <CapabilityItem>
                  <CapabilityIcon>🏛️</CapabilityIcon>
                  <CapabilityTitle>Federal Contracting Support</CapabilityTitle>
                  <CapabilityDescription>
                    Specialized support for federal contracts with SDVOSB certification and deep understanding
                    of government procurement processes and compliance requirements.
                  </CapabilityDescription>
                  <TechList>
                    <TechTag>SDVOSB Certified</TechTag>
                    <TechTag>GSA Schedule</TechTag>
                    <TechTag>SEWP Contract</TechTag>
                    <TechTag>CIO-SP3</TechTag>
                  </TechList>
                </CapabilityItem>

                <CapabilityItem>
                  <CapabilityIcon>🔒</CapabilityIcon>
                  <CapabilityTitle>Compliance Services</CapabilityTitle>
                  <CapabilityDescription>
                    Comprehensive compliance solutions ensuring adherence to federal regulations and
                    industry standards for data security and privacy.
                  </CapabilityDescription>
                  <TechList>
                    <TechTag>FedRAMP</TechTag>
                    <TechTag>NIST Framework</TechTag>
                    <TechTag>HIPAA</TechTag>
                    <TechTag>SOC 2 Type II</TechTag>
                  </TechList>
                </CapabilityItem>
              </CapabilityGrid>
            </SummaryCard>

            <PDFViewer>
              <ViewerHeader>
                <ViewerTitle>Capabilities Statement Document</ViewerTitle>
                <ViewerNote>Interactive PDF viewer - Full document available for download above</ViewerNote>
              </ViewerHeader>
              
              <PDFContainer>
                <iframe 
                  src="/capabilities-statement.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  width="100%"
                  height="800"
                  title="Capabilities Statement PDF"
                  style={{ border: 'none' }}
                />
              </PDFContainer>
            </PDFViewer>
          </ContentSection>
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
  margin: 0 auto 4rem;
  line-height: 1.6;
  
  ${media('<=tablet')} {
    font-size: 1.8rem;
    margin-bottom: 3rem;
  }
`;

const DownloadSection = styled.div`
  margin-bottom: 4rem;
  
  ${ButtonGroup} {
    gap: 1.5rem;
    justify-content: center;
  }
`;

const ContentSection = styled(motion.div)`
  display: grid;
  gap: 6rem;
`;

const SummaryCard = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 3rem;
  text-align: center;
`;

const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CapabilityItem = styled.div`
  padding: 3rem;
  background: rgba(var(--secondBackground), 0.5);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--accent), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    border-color: rgba(var(--accent), 0.3);
  }
  
  ${media('<=tablet')} {
    padding: 2rem;
  }
`;

const CapabilityIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const CapabilityTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const CapabilityDescription = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TechTag = styled.span`
  background: linear-gradient(135deg, rgba(var(--accent), 0.2), rgba(var(--secondary), 0.2));
  color: rgb(var(--text));
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
  border: 1px solid rgba(var(--accent), 0.3);
`;

const PDFViewer = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
`;

const ViewerHeader = styled.div`
  padding: 3rem 4rem 2rem;
  background: linear-gradient(135deg, rgba(var(--accent), 0.1), rgba(var(--secondary), 0.1));
  text-align: center;
  
  ${media('<=tablet')} {
    padding: 2rem;
  }
`;

const ViewerTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const ViewerNote = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
`;

const PDFContainer = styled.div`
  padding: 0;
  height: 80rem;
  position: relative;
  overflow: hidden;
  
  iframe {
    border-radius: 0 0 2rem 2rem;
  }
  
  ${media('<=tablet')} {
    height: 60rem;
  }
`;

const PDFPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60rem;
  background: rgba(var(--background), 0.5);
  text-align: center;
  padding: 4rem;
`;

const PlaceholderIcon = styled.div`
  font-size: 8rem;
  margin-bottom: 2rem;
  opacity: 0.6;
`;

const PlaceholderText = styled.h4`
  font-size: 2.4rem;
  font-weight: 500;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const PlaceholderSubtext = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.7);
  margin-bottom: 3rem;
  max-width: 50rem;
  line-height: 1.6;
`;
