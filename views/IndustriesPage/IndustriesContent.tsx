import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import IndustryCard from './IndustryCard';
import { media } from 'utils/media';
import { IndustryKey, industries } from './industriesData';

// Lazy load the modal for better performance
const IndustryModal = lazy(() => import('components/IndustryModal'));

// Simple loading fallback
const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  z-index: 9999;
`;

export default function IndustriesContent() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    industry: IndustryKey | null;
  }>({
    isOpen: false,
    industry: null,
  });

  const openModal = (industry: IndustryKey) => {
    setModalState({ isOpen: true, industry });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalState({ isOpen: false, industry: null });
    document.body.style.overflow = '';
  };

  const getIndustryKey = (title: string): IndustryKey => {
    const industryMap: Record<string, IndustryKey> = {
      'Healthcare': IndustryKey.HEALTHCARE,
      'Manufacturing': IndustryKey.MANUFACTURING,
      'Fintech': IndustryKey.FINTECH,
      'Retail': IndustryKey.RETAIL,
    };
    
    return industryMap[title] || IndustryKey.HEALTHCARE;
  };

  return (
    <Wrapper>
      <Container>
        <Title>
          <SectionTitle>Services by Sector</SectionTitle>
          <TitleDescription>
            Tailored Data Solutions for Every Industry
          </TitleDescription>
        </Title>
        
        <SectorIntro>
          Precise Analytics delivers high-impact data consulting and analytics services across a
          range of industries. Whether you're in the public or private sector, our solutions are
          designed to align with your goals, improve decision-making, and deliver measurable
          results.
        </SectorIntro>
        
        <IndustriesGrid>
          {industries.map((industry, i) => (
            <IndustryCard 
              key={industry.title} 
              {...industry} 
              index={i}
              onLearnMore={() => openModal(getIndustryKey(industry.title))}
            />
          ))}
        </IndustriesGrid>
        
        <ApproachSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <SectionTitle>Our Industry Approach</SectionTitle>
            <ApproachDescription>
              We combine deep industry knowledge with cutting-edge technology to create 
              tailored analytics solutions that address your specific challenges.
            </ApproachDescription>
          </motion.div>
          
          <ApproachCards>
            <ApproachCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent-rgb), 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ApproachIcon aria-hidden="true">🔍</ApproachIcon>
              <ApproachTitle>Discovery</ApproachTitle>
              <ApproachItemDescription>
                We immerse ourselves in your industry, understanding its unique challenges and data landscape.
              </ApproachItemDescription>
            </ApproachCard>
            
            <ApproachCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent-rgb), 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ApproachIcon aria-hidden="true">⚙️</ApproachIcon>
              <ApproachTitle>Customization</ApproachTitle>
              <ApproachItemDescription>
                We tailor our analytics solutions to address your industry-specific challenges and opportunities.
              </ApproachItemDescription>
            </ApproachCard>
            
            <ApproachCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent-rgb), 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ApproachIcon aria-hidden="true">📈</ApproachIcon>
              <ApproachTitle>Implementation</ApproachTitle>
              <ApproachItemDescription>
                Our experts deploy and integrate solutions seamlessly into your existing workflows and systems.
              </ApproachItemDescription>
            </ApproachCard>
            
            <ApproachCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent-rgb), 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ApproachIcon aria-hidden="true">🔄</ApproachIcon>
              <ApproachTitle>Optimization</ApproachTitle>
              <ApproachItemDescription>
                We continuously refine and improve solutions based on industry trends and your evolving needs.
              </ApproachItemDescription>
            </ApproachCard>
          </ApproachCards>
        </ApproachSection>
      </Container>
      
      <Suspense fallback={<LoadingFallback />}>
        <IndustryModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          industry={modalState.industry || IndustryKey.HEALTHCARE}
        />
      </Suspense>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 5rem 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--background-rgb), 0.7),
    rgba(var(--background-rgb), 1)
  );
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  ${media.tablet(`
    margin-bottom: 3rem;
  `)}
`;

const TitleDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text-rgb));
  opacity: 0.8;
  max-width: 60rem;
  margin: 1.5rem auto 0;
  line-height: 1.4;

  ${media.tablet(`
    font-size: 1.6rem;
    padding: 0 2rem;
  `)}
`;

const SectorIntro = styled.p`
  text-align: center;
  max-width: 80ch;
  font-size: 1.7rem;
  line-height: 1.6;
  margin: 0 auto 5rem;
  color: rgb(var(--text-rgb), 0.8);

  ${media.tablet(`
    font-size: 1.5rem;
    padding: 0 2rem;
    margin-bottom: 3rem;
  `)}
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;
  margin-bottom: 8rem;
  
  ${media.tablet(`
    gap: 2rem;
    padding: 0 2rem;
    margin-bottom: 5rem;
  `)}
`;

const ApproachSection = styled.section`
  margin-top: 8rem;
  text-align: center;

  ${media.tablet(`
    margin-top: 5rem;
  `)}
`;

const ApproachDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text-rgb));
  opacity: 0.8;
  max-width: 70rem;
  margin: 1.5rem auto 5rem;
  line-height: 1.5;

  ${media.tablet(`
    font-size: 1.6rem;
    padding: 0 2rem;
    margin-bottom: 3rem;
  `)}
`;

const ApproachCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  
  ${media.tablet(`
    padding: 0 2rem;
    gap: 2rem;
  `)}
`;

const ApproachCard = styled(motion.article)`
  background: rgba(var(--cardBackground-rgb), 0.5);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.tablet(`
    min-height: auto;
    padding: 2rem 1.5rem;
  `)}
`;

const ApproachIcon = styled.span`
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-block;
  transition: transform 0.3s ease;

  ${ApproachCard}:hover & {
    transform: scale(1.1);
  }

  ${media.tablet(`
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
  `)}
`;

const ApproachTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(var(--accent-rgb));

  ${media.tablet(`
    font-size: 1.8rem;
    margin-bottom: 1rem;
  `)}
`;

const ApproachItemDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text-rgb));
  opacity: 0.8;

  ${media.tablet(`
    font-size: 1.5rem;
  `)}
`;