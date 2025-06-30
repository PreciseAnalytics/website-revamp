import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import IndustryModal from 'components/IndustryModal';
import IndustryCard from './IndustryCard';
import { media } from 'utils/media';

const industries = [
  {
    title: 'Healthcare',
    icon: '🏥',
    description: 'Transform healthcare delivery with data-driven insights that improve patient outcomes and operational efficiency.',
    benefits: [
      'Electronic Health Record (EHR) analytics',
      'Clinical decision support systems',
      'Population health management',
      'Healthcare quality metrics and reporting',
      'Medical research data analysis',
      'Pharmaceutical supply chain optimization'
    ],
    href: '/industries/healthcare',
    imageUrl: '/demo-illustration-1.svg'
  },
  {
    title: 'Manufacturing',
    icon: '🏭',
    description: 'Optimize production processes and supply chain operations through advanced manufacturing analytics.',
    benefits: [
      'Production line optimization',
      'Quality control and defect prediction',
      'Supply chain visibility and analytics',
      'Predictive maintenance solutions',
      'Inventory optimization',
      'Manufacturing KPI dashboards'
    ],
    href: '/industries/manufacturing',
    imageUrl: '/demo-illustration-2.svg'
  },
  {
    title: 'Fintech',
    icon: '💳',
    description: 'Drive financial innovation with sophisticated analytics for risk management, fraud detection, and customer insights.',
    benefits: [
      'Risk assessment and credit scoring',
      'Fraud detection and prevention',
      'Customer segmentation and targeting',
      'Regulatory compliance reporting',
      'Investment portfolio analytics',
      'Real-time transaction monitoring'
    ],
    href: '/industries/fintech',
    imageUrl: '/demo-illustration-3.png'
  },
  {
    title: 'Retail',
    icon: '🛍️',
    description: 'Enhance customer experience and optimize operations with retail-specific data analytics solutions.',
    benefits: [
      'Customer behavior and purchasing patterns',
      'Inventory management and forecasting',
      'Price optimization strategies',
      'Store performance analytics',
      'E-commerce conversion optimization',
      'Marketing campaign effectiveness'
    ],
    href: '/industries/retail',
    imageUrl: '/demo-illustration-4.png'
  }
];

export default function IndustriesContent() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    industry: 'healthcare' | 'manufacturing' | 'fintech' | 'retail' | null;
  }>({
    isOpen: false,
    industry: null
  });

  const openModal = (industry: 'healthcare' | 'manufacturing' | 'fintech' | 'retail') => {
    setModalState({ isOpen: true, industry });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, industry: null });
  };

  const getIndustryKey = (title: string): 'healthcare' | 'manufacturing' | 'fintech' | 'retail' => {
    switch (title) {
      case 'Healthcare':
        return 'healthcare';
      case 'Manufacturing':
        return 'manufacturing';
      case 'Fintech':
        return 'fintech';
      case 'Retail':
        return 'retail';
      default:
        return 'healthcare';
    }
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
            viewport={{ once: true }}
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
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent), 0.2)' }}
            >
              <ApproachIcon>🔍</ApproachIcon>
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
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent), 0.2)' }}
            >
              <ApproachIcon>⚙️</ApproachIcon>
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
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent), 0.2)' }}
            >
              <ApproachIcon>📈</ApproachIcon>
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
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(var(--accent), 0.2)' }}
            >
              <ApproachIcon>🔄</ApproachIcon>
              <ApproachTitle>Optimization</ApproachTitle>
              <ApproachItemDescription>
                We continuously refine and improve solutions based on industry trends and your evolving needs.
              </ApproachItemDescription>
            </ApproachCard>
          </ApproachCards>
        </ApproachSection>
      </Container>
      
      {/* Industry Modal */}
      <IndustryModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        industry={modalState.industry || 'healthcare'}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--background), 0.7),
    rgba(var(--background), 1)
  );
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const TitleDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 60rem;
  margin: 1.5rem auto 0;
`;

const SectorIntro = styled.p`
  text-align: center;
  max-width: 80ch;
  font-size: 1.7rem;
  line-height: 1.6;
  margin: 0 auto 5rem;
  color: rgb(var(--text), 0.8);
`;

const IndustriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 8rem;
  
  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const ApproachSection = styled.div`
  margin-top: 8rem;
  text-align: center;
`;

const ApproachDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 70rem;
  margin: 1.5rem auto 5rem;
`;

const ApproachCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  
  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;

const ApproachCard = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.5);
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(var(--primary), 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
`;

const ApproachIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const ApproachTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(var(--accent));
`;

const ApproachItemDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
`;
