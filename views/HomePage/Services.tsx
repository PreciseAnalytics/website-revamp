import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import AnimatedCard from 'components/AnimatedCard';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

// SVG icons for services
const ETLIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 5H8V9H20V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 15H8V19H20V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 12V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SensorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.657 15.657L17.828 17.828" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.657 8.343L17.828 6.172" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.343 15.657L6.172 17.828" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.343 8.343L6.172 6.172" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M9 8H7C6.44772 8 6 8.44772 6 9V11C6 11.5523 6.44772 12 7 12H9C9.55228 12 10 11.5523 10 11V9C10 8.44772 9.55228 8 9 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M9 16H7C6.44772 16 6 16.4477 6 17V17C6 17.5523 6.44772 18 7 18H9C9.55228 18 10 17.5523 10 17V17C10 16.4477 9.55228 16 9 16Z" stroke="currentColor" strokeWidth="2" />
    <path d="M17 8H15C14.4477 8 14 8.44772 14 9V9C14 9.55228 14.4477 10 15 10H17C17.5523 10 18 9.55228 18 9V9C18 8.44772 17.5523 8 17 8Z" stroke="currentColor" strokeWidth="2" />
    <path d="M17 14H15C14.4477 14 14 14.4477 14 15V17C14 17.5523 14.4477 18 15 18H17C17.5523 18 18 17.5523 18 17V15C18 14.4477 17.5523 14 17 14Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AIMLIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 7.5L7.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 7.5L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const services = [
  {
    icon: <ETLIcon />,
    title: 'Data ETL & Integration',
    description: 'Seamlessly extract, transform and load data from multiple sources into unified dashboards ready for analysis.',
    delay: 0.1
  },
  {
    icon: <DashboardIcon />,
    title: 'Interactive Dashboards',
    description: 'Visualize complex data through intuitive, real-time dashboards customized for your specific decision-making needs.',
    delay: 0.2
  },
  {
    icon: <AIMLIcon />,
    title: 'AI/ML Solutions',
    description: 'Deploy advanced algorithms and machine learning models to uncover patterns and predict outcomes from your data.',
    delay: 0.3
  }
];

export default function Services() {
  return (
    <ServicesWrapper>
      <Container>
        <AnimatedReveal>
          <SectionTitle>Our Services</SectionTitle>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.2}>
          <Subtitle>
            Comprehensive data solutions from collection to insight
          </Subtitle>
        </AnimatedReveal>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <AnimatedReveal key={index} direction="up" delay={service.delay}>
              <AnimatedCard 
                icon={service.icon}
                title={service.title}
                glass 
                delay={service.delay + 0.2}
                hoverScale={1.05}
              >
                {service.description}
              </AnimatedCard>
            </AnimatedReveal>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesWrapper>
  );
}

const ServicesWrapper = styled.div`
  background: rgba(var(--background), 0.98);
  padding: 10rem 0;
  position: relative;
  
  ${media('<=tablet')} {
    padding: 8rem 0;
  }
`;

const Subtitle = styled.p`
  font-size: 2rem;
  color: rgba(var(--text), 0.8);
  text-align: center;
  max-width: 60rem;
  margin: 0 auto;
  margin-bottom: 6rem;
  
  ${media('<=tablet')} {
    font-size: 1.8rem;
    margin-bottom: 4rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  
  ${media('<=desktop')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
  }
`;
