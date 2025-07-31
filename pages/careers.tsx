// pages/careers.tsx - COMPLETE FIXED VERSION WITH ALL STYLED COMPONENTS
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { mq } from 'utils/media';

// ATS API Configuration
const ATS_BASE_URL = process.env.NEXT_PUBLIC_ATS_API_URL || 'https://precise-analytics-ats.vercel.app';

// FIXED: Interface to match actual API response
interface Position {
  id: string; // API returns string ID, not number
  title: string;
  department: string;
  location: string;
  employment_type: string; // Mapped from API 'type' field
  description: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  benefits?: string;
  salary_range?: string; // Keep original for display
}

// FIXED: Parse salary range string into min/max numbers
const parseSalaryRange = (salaryRange: string): { min: number; max: number } | null => {
  if (!salaryRange) return null;
  
  // Extract numbers from strings like "$70,000 – $90,000/year" or "$110,000 – $140,000 per year (DOE)"
  const numbers = salaryRange.match(/\$[\d,]+/g);
  if (numbers && numbers.length >= 2) {
    const min = parseInt(numbers[0].replace(/[$,]/g, ''));
    const max = parseInt(numbers[1].replace(/[$,]/g, ''));
    return { min, max };
  }
  
  // Single number case
  if (numbers && numbers.length === 1) {
    const amount = parseInt(numbers[0].replace(/[$,]/g, ''));
    return { min: amount, max: amount };
  }
  
  return null;
};

export default function CareersPage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);

  // FIXED: Use useCallback to fix React Hook warning
  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching positions from ATS...');
      
      const response = await fetch(`${ATS_BASE_URL}/api/jobs`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 ATS API Response:', data);
      
      if (!data.success || !Array.isArray(data.jobs)) {
        throw new Error('Invalid API response format');
      }
      
      // FIXED: Map database fields to application expected format
      const processedPositions = data.jobs
        .filter((job: any) => job.status === 'published')
        .map((pos: any) => {
          const salaryParsed = parseSalaryRange(pos.salary_range);
          
          return {
            id: pos.id,
            title: pos.title,
            department: pos.department,
            location: pos.location,
            employment_type: pos.type || pos.employment_type || 'full_time', // Handle both field names
            description: pos.description,
            requirements: typeof pos.requirements === 'string' 
              ? pos.requirements.split('\n').filter((req: string) => req.trim()) 
              : pos.requirements || [],
            salary_min: salaryParsed?.min,
            salary_max: salaryParsed?.max,
            salary_range: pos.salary_range, // Keep original for display
            benefits: pos.benefits
          };
        });

      console.log('✅ Processed positions:', processedPositions);
      setPositions(processedPositions);
      
    } catch (error) {
      console.error('❌ Error fetching positions:', error);
      setPositions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED: Include fetchPositions in dependency array
  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  // Handle Learn More button click
  const handleLearnMore = (position: Position) => {
    setSelectedPosition(position);
    setShowJobModal(true);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'learn_more_clicked', {
        'job_position': position.title,
        'job_id': position.id,
        'source': 'careers_page'
      });
    }
  };

  // FIXED: Apply now navigation
  const handleApplyClick = (position: Position) => {
    const applicationUrl = `/application/${position.id}`;
    
    console.log('🚀 Navigating to application page:', applicationUrl);
    
    // Check if mobile device for navigation strategy
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: navigate in same window
      window.location.href = applicationUrl;
    } else {
      // Desktop: open in new tab
      window.open(applicationUrl, '_blank', 'noopener,noreferrer');
    }

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'apply_now_clicked', {
        'job_position': position.title,
        'job_id': position.id,
        'source': showJobModal ? 'job_details_modal' : 'careers_page'
      });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Careers`}</title>
        <meta name="description" content="Join the Precise Analytics team and help drive data transformation in mission-driven sectors." />
      </Head>

      <AnimatedHeader />
      
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Join Our Team</PageTitle>
            <PageSubtitle>Empowering missions through data—together.</PageSubtitle>
          </motion.div>

          <WelcomeSection>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <WelcomeCard>
                <WelcomeIcon>🚀</WelcomeIcon>
                <WelcomeTitle>Join Our Mission-Driven Team</WelcomeTitle>
                <WelcomeText>
                  At Precise Analytics, we&apos;re more than just a data company—we&apos;re a team of passionate professionals 
                  dedicated to transforming how government and enterprise organizations leverage data for mission-critical decisions.
                  As a <strong>Veteran-Owned Small Business (VOSB)</strong> and <strong>Service-Disabled Veteran-Owned Small Business (SDVOSB)</strong>, 
                  we bring unique perspectives and unwavering commitment to excellence.
                </WelcomeText>
                
                <WelcomeFeatures>
                  <FeatureItem>
                    <FeatureIcon>💡</FeatureIcon>
                    <FeatureText><strong>Innovative Work:</strong> Tackle complex data challenges for federal agencies</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🌟</FeatureIcon>
                    <FeatureText><strong>Growth Opportunities:</strong> Advance your career in a supportive environment</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🤝</FeatureIcon>
                    <FeatureText><strong>Team Culture:</strong> Collaborate with industry experts and veterans</FeatureText>
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon>🎯</FeatureIcon>
                    <FeatureText><strong>Meaningful Impact:</strong> Your work directly supports national priorities</FeatureText>
                  </FeatureItem>
                </WelcomeFeatures>
                
                <ApplicationProcess>
                  <ProcessTitle>How to Apply</ProcessTitle>
                  <WelcomeProcessSteps>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>1</WelcomeStepNumber>
                      <WelcomeStepText>Browse our open positions below</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>2</WelcomeStepNumber>
                      <WelcomeStepText>Click job title or &quot;Learn More&quot; for details</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>3</WelcomeStepNumber>
                      <WelcomeStepText>Click job title or &quot;Apply Now&quot; to apply</WelcomeStepText>
                    </WelcomeProcessStep>
                    <WelcomeProcessStep>
                      <WelcomeStepNumber>4</WelcomeStepNumber>
                      <WelcomeStepText>Complete and submit your application</WelcomeStepText>
                    </WelcomeProcessStep>
                  </WelcomeProcessSteps>
                </ApplicationProcess>
              </WelcomeCard>
            </motion.div>
          </WelcomeSection>

          <PositionsSection>
            <SectionTitle>Open Positions</SectionTitle>
            <SectionSubtitle>
              Explore opportunities to grow your career with us
              {!loading && positions.length > 0 && (
                <PositionCount>{positions.length} open position{positions.length !== 1 ? 's' : ''}</PositionCount>
              )}
            </SectionSubtitle>
            
            {loading ? (
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Loading career opportunities...</LoadingText>
              </LoadingContainer>
            ) : positions.length === 0 ? (
              <NoPositionsMessage>
                <NoPositionsIcon>📋</NoPositionsIcon>
                <NoPositionsTitle>No Open Positions</NoPositionsTitle>
                <NoPositionsText>
                  We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented individuals to join our team.
                  Feel free to send your resume to <a href="mailto:careers@preciseanalytics.io">careers@preciseanalytics.io</a> and we&apos;ll keep you in mind for future opportunities.
                </NoPositionsText>
              </NoPositionsMessage>
            ) : (
              <JobListContainer>
                <JobListHeader>
                  <HeaderCell className="title">Position</HeaderCell>
                  <HeaderCell className="department">Department</HeaderCell>
                  <HeaderCell className="location">Location</HeaderCell>
                  <HeaderCell className="type">Type</HeaderCell>
                  <HeaderCell className="salary">Salary</HeaderCell>
                  <HeaderCell className="action">Apply</HeaderCell>
                </JobListHeader>

                {positions.map((position) => (
                  <JobListRow key={position.id}>
                    <JobCell className="title">
                      <JobTitle onClick={() => handleApplyClick(position)}>
                        {position.title}
                      </JobTitle>
                      <JobPreview>{position.description.substring(0, 120)}...</JobPreview>
                    </JobCell>
                    
                    <JobCell className="department">
                      <DepartmentTag>{position.department}</DepartmentTag>
                    </JobCell>
                    
                    <JobCell className="location">
                      <LocationText>{position.location || 'Location TBD'}</LocationText>
                    </JobCell>
                    
                    <JobCell className="type">
                      <TypeBadge>
                        {position.employment_type?.replace('_', ' ').toUpperCase() || 'FULL-TIME'}
                      </TypeBadge>
                    </JobCell>
                    
                    <JobCell className="salary">
                      <SalaryText>
                        {/* FIXED: Display original salary_range or fall back to parsed min/max */}
                        {position.salary_range || 
                         (position.salary_min && position.salary_max 
                           ? `$${position.salary_min.toLocaleString()} - $${position.salary_max.toLocaleString()}`
                           : 'Competitive'
                         )
                        }
                      </SalaryText>
                    </JobCell>
                    
                    <JobCell className="action">
                      <JobActions>
                        <LearnMoreButton onClick={() => handleLearnMore(position)}>
                          Learn More
                        </LearnMoreButton>
                        <CompactApplyButton onClick={() => handleApplyClick(position)}>
                          Apply Now
                        </CompactApplyButton>
                      </JobActions>
                    </JobCell>
                  </JobListRow>
                ))}
              </JobListContainer>
            )}
          </PositionsSection>
        </Container>
      </PageWrapper>

      {/* Job Details Modal - FIXED salary display */}
      <AnimatePresence>
        {showJobModal && selectedPosition && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJobModal(false)}
          >
            <JobModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <JobModalHeader>
                <JobModalTitle onClick={() => handleApplyClick(selectedPosition)}>
                  {selectedPosition.title}
                </JobModalTitle>
                <CloseButton onClick={() => setShowJobModal(false)}>×</CloseButton>
              </JobModalHeader>

              <JobModalBody>
                <JobModalMeta>
                  <JobModalMetaItem>🏢 {selectedPosition.department}</JobModalMetaItem>
                  <JobModalMetaItem>📍 {selectedPosition.location}</JobModalMetaItem>
                  <JobModalMetaItem>💼 {selectedPosition.employment_type?.replace('_', ' ').toUpperCase()}</JobModalMetaItem>
                  {selectedPosition.salary_range && (
                    <JobModalMetaItem>💰 {selectedPosition.salary_range}</JobModalMetaItem>
                  )}
                </JobModalMeta>

                <JobModalSection>
                  <JobModalSectionTitle>Job Description</JobModalSectionTitle>
                  <JobModalText>{selectedPosition.description}</JobModalText>
                </JobModalSection>

                {selectedPosition.requirements && selectedPosition.requirements.length > 0 && (
                  <JobModalSection>
                    <JobModalSectionTitle>Requirements & Qualifications</JobModalSectionTitle>
                    <RequirementsList>
                      {selectedPosition.requirements.map((req, index) => (
                        <RequirementItem key={index}>{req}</RequirementItem>
                      ))}
                    </RequirementsList>
                  </JobModalSection>
                )}

                {selectedPosition.benefits && (
                  <JobModalSection>
                    <JobModalSectionTitle>Benefits</JobModalSectionTitle>
                    <JobModalText>{selectedPosition.benefits}</JobModalText>
                  </JobModalSection>
                )}

                <JobModalActions>
                  <SecondaryButton onClick={() => setShowJobModal(false)}>
                    Keep Browsing
                  </SecondaryButton>
                  <PrimaryButton onClick={() => handleApplyClick(selectedPosition)}>
                    Apply for This Position
                  </PrimaryButton>
                </JobModalActions>
              </JobModalBody>
            </JobModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

// ALL STYLED COMPONENTS - COMPLETE

const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 1rem;
  ${mq('<=tablet', 'font-size: 3.6rem;')}
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(var(--text), 0.8);
`;

const WelcomeSection = styled.section`
  margin: 4rem 0 6rem 0;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.05), rgba(255, 165, 0, 0.02));
  border: 2px solid rgba(255, 125, 0, 0.2);
  border-radius: 2rem;
  padding: 4rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(255, 125, 0, 0.1);
  ${mq('<=tablet', 'padding: 3rem 2rem;')}
`;

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin-bottom: 2rem;
  ${mq('<=tablet', 'font-size: 2.8rem;')}
`;

const WelcomeText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin-bottom: 3rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  
  strong {
    color: rgb(255, 125, 0);
    font-weight: 600;
  }
  
  ${mq('<=tablet', 'font-size: 1.6rem;')}
`;

const WelcomeFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  ${mq('<=tablet', 'grid-template-columns: 1fr; gap: 1.5rem;')}
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(255, 125, 0, 0.15);
    border-color: rgba(255, 125, 0, 0.3);
  }
  
  ${mq('<=tablet', 'flex-direction: column; text-align: center;')}
`;

const FeatureIcon = styled.div`
  font-size: 2.4rem;
  flex-shrink: 0;
`;

const FeatureText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.4;
  
  strong {
    color: rgb(var(--text));
    font-weight: 600;
  }
  
  ${mq('<=tablet', 'font-size: 1.5rem; text-align: center;')}
`;

const ApplicationProcess = styled.div`
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.5rem;
  padding: 3rem;
  border: 1px solid rgba(var(--text), 0.1);
  ${mq('<=tablet', 'padding: 2rem;')}
`;

const ProcessTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  text-align: center;
`;

const WelcomeProcessSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const WelcomeProcessStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 125, 0, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 125, 0, 0.2);
  
  ${mq('<=tablet', 'justify-content: center; text-align: center;')}
`;

const WelcomeStepNumber = styled.div`
  background: rgb(255, 125, 0);
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  flex-shrink: 0;
`;

const WelcomeStepText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  line-height: 1.4;
`;

const PositionsSection = styled.section`
  margin-top: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const SectionSubtitle = styled.div`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PositionCount = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  gap: 2rem;
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 3px solid rgba(255, 125, 0, 0.1);
  border-top: 3px solid rgb(255, 125, 0);
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text), 0.7);
  font-weight: 500;
`;

const NoPositionsMessage = styled.div`
  text-align: center;
  padding: 6rem 2rem;
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 2rem;
  border: 2px dashed rgba(var(--text), 0.2);
`;

const NoPositionsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const NoPositionsTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const NoPositionsText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.6;
  max-width: 50rem;
  margin: 0 auto;

  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const JobListContainer = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(var(--text), 0.1);
`;

const JobListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 1fr 0.8fr;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  padding: 1.5rem 2rem;
  font-weight: 700;
  
  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    display: none;
  `)}
`;

const HeaderCell = styled.div`
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.title { justify-self: start; }
  &.department { justify-self: center; }
  &.location { justify-self: center; }
  &.type { justify-self: center; }
  &.salary { justify-self: center; }
  &.action { justify-self: end; }
`;

const JobListRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.8fr 1fr 0.8fr;
  padding: 2rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 125, 0, 0.03);
    border-left: 4px solid rgb(255, 125, 0);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${mq('<=tablet', `
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 2rem 1.5rem;
    border-left: none !important;
    
    &:hover {
      background: rgba(255, 125, 0, 0.05);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 125, 0, 0.15);
    }
  `)}
`;

const JobCell = styled.div`
  &.title { justify-self: start; }
  &.department { justify-self: center; }
  &.location { justify-self: center; }
  &.type { justify-self: center; }
  &.salary { justify-self: center; }
  &.action { justify-self: end; }
  
  ${mq('<=tablet', `
    justify-self: start !important;
    width: 100%;
  `)}
`;

const JobTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgb(255, 125, 0);
  line-height: 1.3;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: rgb(230, 100, 0);
    text-decoration: underline;
    transform: translateX(4px);
  }
  
  &:hover::after {
    content: '→';
    position: absolute;
    right: -2rem;
    opacity: 0.7;
    font-size: 1.4rem;
    animation: pulse 1s infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }
  
  ${mq('<=tablet', 'font-size: 2rem; margin-bottom: 0.8rem;')}
`;

const JobPreview = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
  margin: 0;
  line-height: 1.4;
  
  ${mq('<=tablet', `
    font-size: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  `)}
`;

const DepartmentTag = styled.span`
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
  white-space: nowrap;
  
  ${mq('<=tablet', `
    font-size: 1.4rem;
    padding: 0.8rem 1.5rem;
  `)}
`;

const LocationText = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '📍';
    margin-right: 0.5rem;
  }
  
  ${mq('<=tablet', `
    justify-content: flex-start;
    font-size: 1.5rem;
  `)}
`;

const TypeBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  
  ${mq('<=tablet', `
    font-size: 1.3rem;
    padding: 0.8rem 1.5rem;
  `)}
`;

const SalaryText = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.9);
  font-weight: 600;
  text-align: center;
  
  ${mq('<=tablet', `
    text-align: left;
    font-size: 1.5rem;
  `)}
`;

const JobActions = styled.div`
  display: flex;
  gap: 1rem;
  
  ${mq('<=tablet', `
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  `)}
`;

const LearnMoreButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: transparent;
  color: rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 125, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.2);
  }
  
  ${mq('<=tablet', `
    width: 100%;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
  `)}
`;

const CompactApplyButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: rgb(255, 125, 0);
  color: white;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  position: relative;
  z-index: 10;

  &:hover {
    background: rgb(230, 100, 0);
    border-color: rgb(230, 100, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${mq('<=tablet', `
    width: 100%;
    padding: 1.2rem 2rem;
    font-size: 1.6rem;
    min-height: 44px;
    margin-top: 1rem;
  `)}
`;

// Modal Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const JobModalContent = styled(motion.div)`
  background: rgba(var(--background), 0.98);
  border-radius: 2rem;
  padding: 0;
  max-width: 80rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--text), 0.1);
  
  ${mq('<=tablet', `
    max-width: 95vw;
    margin: 1rem;
    border-radius: 1.5rem;
  `)}
`;

const JobModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4rem 0 4rem;
  margin-bottom: 2rem;
  
  ${mq('<=tablet', 'padding: 2rem 3rem 0 3rem;')}
`;

const JobModalTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: rgb(230, 100, 0);
    text-decoration: underline;
  }
  
  ${mq('<=tablet', 'font-size: 2.4rem;')}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 3rem;
  color: rgb(var(--text), 0.5);
  cursor: pointer;
  padding: 0;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--text), 0.1);
    color: rgb(var(--text));
  }
`;

const JobModalBody = styled.div`
  padding: 0 4rem 4rem 4rem;
  
  ${mq('<=tablet', 'padding: 0 3rem 3rem 3rem;')}
`;

const JobModalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  ${mq('<=tablet', 'flex-direction: column; gap: 1rem;')}
`;

const JobModalMetaItem = styled.span`
  background: rgba(255, 125, 0, 0.1);
  color: rgb(255, 125, 0);
  padding: 0.8rem 1.5rem;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const JobModalSection = styled.div`
  margin-bottom: 3rem;
`;

const JobModalSectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 125, 0, 0.2);
  padding-bottom: 1rem;
`;

const JobModalText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin: 0;
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RequirementItem = styled.li`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
  
  &:before {
    content: '✓';
    color: rgb(34, 197, 94);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const JobModalActions = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  
  ${mq('<=tablet', 'flex-direction: column;')}
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  background: transparent;
  color: rgb(var(--text), 0.7);
  border: 2px solid rgba(var(--text), 0.3);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--text), 0.1);
    color: rgb(var(--text));
    border-color: rgba(var(--text), 0.5);
  }
`;

const PrimaryButton = styled.button`
  flex: 2;
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 125, 0, 0.3);
  }
`;