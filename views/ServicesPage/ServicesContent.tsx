import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import AnimatedReveal from 'components/AnimatedReveal';
import { media } from 'utils/media';

const servicesData = [
  {
    id: 'data-strategy',
    title: 'Data Strategy and Consulting',
    description: 'Our expert consultants work closely with your team to develop a robust data strategy aligned with your business objectives. From data collection and integration to governance and security, we guide you in making informed decisions that drive business success.',
    icon: '📋',  // Updated to clipboard icon
    color: '0, 120, 255', // Blue
    services: [
      'Data collection and integration strategy',
      'Data governance framework development',
      'Security and compliance planning',
      'Business objective alignment',
      'Strategic decision guidance',
      'Data architecture design'
    ]
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence and Reporting',
    description: 'Unlock the full potential of your data with our Business Intelligence (BI) and reporting solutions. We create intuitive dashboards and reports that provide real-time insights, enabling you to monitor key metrics, identify trends, and make data-driven decisions.',
    icon: '📊',
    color: '0, 200, 83', // Green
    services: [
      'Real-time dashboard creation',
      'Interactive reporting solutions',
      'Key performance indicator (KPI) monitoring',
      'Trend analysis and visualization',
      'Executive summary reports',
      'Automated reporting systems'
    ]
  },
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description: 'Stay ahead of the competition by leveraging the power of predictive analytics. Our advanced modeling techniques and machine learning algorithms help you forecast future trends, identify opportunities, and mitigate risks, giving you a strategic advantage in the market.',
    icon: '🔮',
    color: '147, 51, 234', // Purple
    services: [
      'Future trend forecasting',
      'Machine learning model development',
      'Risk assessment and mitigation',
      'Opportunity identification',
      'Advanced statistical modeling',
      'Predictive model deployment'
    ]
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization',
    description: 'Make complex data easily understandable with our data visualization services. We use cutting-edge tools to create visually compelling representations of your data, allowing stakeholders to grasp insights quickly and make decisions with confidence.',
    icon: '📈',
    color: '255, 125, 0', // Orange
    services: [
      'Interactive data visualizations',
      'Custom chart and graph creation',
      'Infographic design',
      'Stakeholder presentation materials',
      'Visual storytelling with data',
      'Multi-platform visualization deployment'
    ]
  },

  {
    id: 'data-warehousing',
    title: 'Data Warehousing and Integration',
    description: 'Optimize your data infrastructure with our data warehousing and integration services. We design and implement scalable solutions that ensure seamless data flow across your organization, enhancing collaboration and efficiency.',
    icon: '🗄️',  // Updated to filing cabinet icon
    color: '34, 197, 94', // Emerald
    services: [
      'Scalable data warehouse design',
      'Cross-platform data integration',
      'ETL process optimization',
      'Data pipeline automation',
      'Cloud migration strategies',
      'Performance tuning and optimization'
    ]
  },
  // ... rest of the services ...

  {
    id: 'data-quality',
    title: 'Data Quality Management',
    description: 'Maintain the integrity of your data with our data quality management services. We implement processes and tools to cleanse, validate, and standardize your data, ensuring accuracy and reliability for all your analytics endeavors.',
    icon: '✅',
    color: '16, 185, 129', // Teal
    services: [
      'Data cleansing and validation',
      'Standardization processes',
      'Quality metrics and monitoring',
      'Data profiling and assessment',
      'Anomaly detection systems',
      'Continuous improvement processes'
    ]
  },
  {
    id: 'custom-solutions',
    title: 'Custom Analytics Solutions',
    description: 'Every business is unique, and so are its data needs. Our team specializes in creating custom analytics solutions tailored to your specific requirements. Whether it\'s developing bespoke algorithms or building custom applications, we have the expertise to deliver solutions that align with your vision.',
    icon: '⚙️',
    color: '236, 72, 153', // Pink
    services: [
      'Bespoke algorithm development',
      'Custom application building',
      'Tailored analytics frameworks',
      'Industry-specific solutions',
      'API development and integration',
      'Specialized tool development'
    ]
  },
  {
    id: 'training-support',
    title: 'Training and Support',
    description: 'Empower your team with the knowledge and skills needed to harness the full potential of data analytics. We offer training programs and ongoing support to ensure your staff is proficient in using analytics tools and interpreting data effectively.',
    icon: '🎓',
    color: '99, 102, 241', // Indigo
    services: [
      'Comprehensive training programs',
      'Tool-specific skill development',
      'Data interpretation workshops',
      'Ongoing technical support',
      'Best practices guidance',
      'Knowledge transfer sessions'
    ]
  }
];

export default function ServicesContent() {
  return (
    <ServicesWrapper>
      <Container>
        <AnimatedReveal>
          <SectionTitle>Our Data Analytics Services</SectionTitle>
        </AnimatedReveal>
        
        <AnimatedReveal direction="up" delay={0.2}>
          <SectionDescription>
            Welcome to Precise Analytics where we transform data into actionable insights, empowering your business to make informed decisions. 
            Our Data Analytics Consultancy services are designed to meet the diverse needs of modern enterprises, helping you harness the power of data for strategic growth and operational excellence.
          </SectionDescription>
        </AnimatedReveal>
        
        <ServicesGrid>
          {servicesData.map((sector, index) => (
            <ServiceCard
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `0 15px 30px rgba(${sector.color}, 0.2)`
              }}
            >
              <ServiceHeader>
                <ServiceIcon>{sector.icon}</ServiceIcon>
                <ServiceTitle>{sector.title}</ServiceTitle>
              </ServiceHeader>
              
              <ServiceDescription>{sector.description}</ServiceDescription>
              
              <ServicesList>
                {sector.services.map((service, serviceIndex) => (
                  <ServiceItem
                    key={serviceIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + serviceIndex * 0.05 }}
                  >
                    <ServiceBullet style={{ color: `rgb(${sector.color})` }}>•</ServiceBullet>
                    {service}
                  </ServiceItem>
                ))}
              </ServicesList>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesWrapper>
  );
}

const ServicesWrapper = styled.section`
  padding: 10rem 0;
  background: rgba(var(--background), 0.5);
  
  ${media.tablet`
    padding: 8rem 0;
  `}
`;

const SectionDescription = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 6rem;
  
  ${media.tablet`
    font-size: 1.8rem;
    margin-bottom: 4rem;
  `}
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 120rem;
  margin: 0 auto;
  
  ${media.tablet`
    gap: 3rem;
  `}
`;

const ServiceCard = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 4rem;
  border: 1px solid rgba(var(--text), 0.1);
  transition: all 0.3s ease;
  
  ${media.tablet`
    padding: 3rem;
  `}
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
`;

const ServiceIcon = styled.div`
  font-size: 4rem;
  
  ${media.tablet`
    font-size: 3rem;
  `}
`;

const ServiceTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0;
  
  ${media.tablet`
    font-size: 2.4rem;
  `}
`;

const ServiceDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
  margin-bottom: 3rem;
  
  ${media.tablet`
    font-size: 1.6rem;
    margin-bottom: 2rem;
  `}
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));
  margin-bottom: 1rem;
  gap: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ServiceBullet = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.2rem;
`;