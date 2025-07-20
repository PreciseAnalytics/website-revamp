import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import Separator from 'components/Separator';
import { media } from 'utils/media';
import SolutionCard from './SolutionCard';

// Solution categories with properly escaped strings
const solutionCategories = [
  {
    id: 'etl-integration',
    name: 'ETL & Data Integration',
    description: 'Seamlessly connect your data from multiple sources into a unified, clean, and reliable format. Our ETL solutions streamline data extraction, transformation, and loading processes to power real-time analytics and informed decision-making.',
    icon: '🔄',
    accentColor: '0, 120, 255',
    solutions: [
      {
        title: 'Data Pipeline Automation',
        description: 'Automated data collection and processing from multiple sources with real-time monitoring.',
        icon: '⚙️',
        features: [
          'Automated data extraction from multiple sources',
          'Real-time data transformation and validation',
          'Error handling and data quality monitoring',
          'Scalable cloud-based processing'
        ]
      },
      {
        title: 'Data Warehouse Solutions',
        description: 'Centralized data storage with optimized query performance and scalability.',
        icon: '🏢',
        features: [
          'Modern cloud data warehouse architecture',
          'Structured and unstructured data integration',
          'High-performance analytics processing',
          'Automatic scaling and maintenance'
        ]
      }
    ]
  },
  {
    id: 'custom-dashboards',
    name: 'Custom Dashboards',
    description: 'Transform complex data into intuitive, interactive dashboards tailored to your business needs. From executive overviews to detailed operational metrics, we deliver visualizations that make insights accessible to every stakeholder.',
    icon: '📊',
    accentColor: '0, 200, 83',
    solutions: [
      {
        title: 'Executive Dashboards',
        description: 'High-level strategic insights and KPI monitoring for leadership teams.',
        icon: '👔',
        features: [
          'Real-time business performance metrics',
          'Interactive data exploration tools',
          'Mobile-responsive design',
          'Automated report generation'
        ]
      },
      {
        title: 'Operational Dashboards',
        description: 'Detailed operational metrics and process monitoring for day-to-day management.',
        icon: '⚡',
        features: [
          'Process performance monitoring',
          'Resource utilization tracking',
          'Alert and notification systems',
          'Drill-down capability for detailed analysis'
        ]
      }
    ]
  },
  {
    id: 'ai-ml-solutions',
    name: 'AI & ML Solutions',
    description: `Leverage the power of artificial intelligence and machine learning to forecast trends, detect anomalies, and automate complex tasks. Our models are customized to your data and goals—whether you're improving customer targeting, predicting resource needs, or enhancing decision-making.`,
    icon: '🤖',
    accentColor: '147, 51, 234',
    solutions: [
      {
        title: 'Predictive Analytics',
        description: 'Advanced forecasting models to predict trends and business outcomes.',
        icon: '🔮',
        features: [
          'Time series forecasting',
          'Customer behavior prediction',
          'Demand forecasting',
          'Risk assessment models'
        ]
      },
      {
        title: 'Anomaly Detection',
        description: 'Automated detection of unusual patterns and potential issues in your data.',
        icon: '🔍',
        features: [
          'Real-time anomaly monitoring',
          'Fraud detection systems',
          'Quality control automation',
          'Performance deviation alerts'
        ]
      }
    ]
  },
  {
    id: 'data-strategy',
    name: 'Data Strategy',
    description: `Build a scalable data foundation with our expert guidance on governance, architecture, and analytics maturity. We help you define a clear roadmap to harness your data as a strategic asset—aligning technology, people, and processes.`,
    icon: '🎯',
    accentColor: '255, 125, 0',
    solutions: [
      {
        title: 'Data Governance',
        description: 'Establish comprehensive data governance frameworks and policies.',
        icon: '🛡️',
        features: [
          'Data quality standards and policies',
          'Compliance and regulatory frameworks',
          'Data lineage and cataloging',
          'Access control and security protocols'
        ]
      },
      {
        title: 'Analytics Maturity Assessment',
        description: `Evaluate and improve your organization's analytics capabilities.`,
        icon: '📈',
        features: [
          'Current state analytics assessment',
          'Capability gap analysis',
          'Roadmap development',
          'ROI measurement and tracking'
        ]
      }
    ]
  }
];

export default function SolutionsContent() {
  const [activeCategory, setActiveCategory] = useState(solutionCategories[0].id);
  const activeCategoryData = solutionCategories.find(cat => cat.id === activeCategory);
  
  return (
    <Wrapper>
      <Container>
        <ContentHeader>
          <SectionTitle>Our Analytics Solutions</SectionTitle>
          <HeaderDescription>
            Comprehensive data solutions for every stage of your analytics journey
          </HeaderDescription>
        </ContentHeader>
        
        <CategoryTabs>
          {solutionCategories.map((category) => (
            <CategoryTab 
              key={category.id}
              isActive={activeCategory === category.id}
              accentColor={category.accentColor}
              onClick={() => setActiveCategory(category.id)}
            >
              <TabIcon>{category.icon}</TabIcon>
              <TabName>{category.name}</TabName>
              {activeCategory === category.id && (
                <ActiveIndicator 
                  layoutId="activeTab"
                  style={{ backgroundColor: `rgb(${category.accentColor})` }}
                />
              )}
            </CategoryTab>
          ))}
        </CategoryTabs>
        
        <CategoryDescription>
          <motion.div
            key={activeCategoryData?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryIcon>{activeCategoryData?.icon}</CategoryIcon>
            <CategoryTitle>{activeCategoryData?.name}</CategoryTitle>
            <CategoryText>{activeCategoryData?.description}</CategoryText>
          </motion.div>
        </CategoryDescription>
        
        <SolutionsGrid>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategoryData?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            >
              <SolutionItemsGrid>
                {activeCategoryData?.solutions.map((solution, index) => (
                  <SolutionCard
                    key={solution.title}
                    title={solution.title}
                    description={solution.description}
                    icon={solution.icon}
                    features={solution.features}
                    delay={index * 0.1}
                    accentColor={activeCategoryData.accentColor}
                  />
                ))}
              </SolutionItemsGrid>
            </motion.div>
          </AnimatePresence>
        </SolutionsGrid>
        
        <Separator />
        
        <TechnologySection>
          <SectionTitle>Powered by Leading Technology</SectionTitle>
          <TechDescription>
            We leverage industry-leading technologies and platforms to deliver scalable, 
            future-proof analytics solutions tailored to your business requirements
          </TechDescription>
          
          <TechCategoriesWrapper>
            <TechCategory>
              <TechCategoryTitle>Cloud Platforms</TechCategoryTitle>
              <TechCategoryDescription>
                Enterprise-grade cloud infrastructure with global reach, security, and scalability
              </TechCategoryDescription>
              <TechItemsGrid>
                <TechItem>
                  <TechItemIcon>☁️</TechItemIcon>
                  <TechItemName>AWS</TechItemName>
                  <TechItemDescription>Amazon Web Services for reliable, scalable infrastructure</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>☁️</TechItemIcon>
                  <TechItemName>Microsoft Azure</TechItemName>
                  <TechItemDescription>Integrated cloud services and enterprise solutions</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>☁️</TechItemIcon>
                  <TechItemName>Google Cloud</TechItemName>
                  <TechItemDescription>Powerful infrastructure with advanced AI capabilities</TechItemDescription>
                </TechItem>
              </TechItemsGrid>
            </TechCategory>
            
            <TechCategory>
              <TechCategoryTitle>Data Storage & Processing</TechCategoryTitle>
              <TechCategoryDescription>
                Modern data storage solutions for performance, security and scalability
              </TechCategoryDescription>
              <TechItemsGrid>
                <TechItem>
                  <TechItemIcon>❄️</TechItemIcon>
                  <TechItemName>Snowflake</TechItemName>
                  <TechItemDescription>Cloud data warehouse for all your data and applications</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>💾</TechItemIcon>
                  <TechItemName>MongoDB</TechItemName>
                  <TechItemDescription>Flexible, scalable document database</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>⚡</TechItemIcon>
                  <TechItemName>Apache Spark</TechItemName>
                  <TechItemDescription>High-performance data processing engine</TechItemDescription>
                </TechItem>
              </TechItemsGrid>
            </TechCategory>
            
            <TechCategory>
              <TechCategoryTitle>Visualization & BI</TechCategoryTitle>
              <TechCategoryDescription>
                Leading data visualization tools for interactive dashboards and reports
              </TechCategoryDescription>
              <TechItemsGrid>
                <TechItem>
                  <TechItemIcon>📊</TechItemIcon>
                  <TechItemName>Tableau</TechItemName>
                  <TechItemDescription>Interactive, shareable visualizations</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>📊</TechItemIcon>
                  <TechItemName>Power BI</TechItemName>
                  <TechItemDescription>Microsoft's powerful business intelligence suite</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>📈</TechItemIcon>
                  <TechItemName>Looker</TechItemName>
                  <TechItemDescription>Modern BI platform for data exploration</TechItemDescription>
                </TechItem>
              </TechItemsGrid>
            </TechCategory>
            
            <TechCategory>
              <TechCategoryTitle>AI & Machine Learning</TechCategoryTitle>
              <TechCategoryDescription>
                Cutting-edge AI frameworks for advanced analytics and predictions
              </TechCategoryDescription>
              <TechItemsGrid>
                <TechItem>
                  <TechItemIcon>🧠</TechItemIcon>
                  <TechItemName>TensorFlow</TechItemName>
                  <TechItemDescription>Open-source machine learning platform</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>🧠</TechItemIcon>
                  <TechItemName>PyTorch</TechItemName>
                  <TechItemDescription>Deep learning framework with flexibility</TechItemDescription>
                </TechItem>
                <TechItem>
                  <TechItemIcon>⚛️</TechItemIcon>
                  <TechItemName>IBM Watson</TechItemName>
                  <TechItemDescription>Enterprise AI solutions with industry expertise</TechItemDescription>
                </TechItem>
              </TechItemsGrid>
            </TechCategory>
          </TechCategoriesWrapper>
        </TechnologySection>
      </Container>
    </Wrapper>
  );
}

// Styled components with fixed media queries
const Wrapper = styled.div`
  padding: 8rem 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(var(--background), 0.7),
    rgba(var(--background), 1) 70%
  );
`;

const ContentHeader = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const HeaderDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 70rem;
  margin: 2rem auto 0;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 4rem;

  ${media.tablet(`
    gap: 1rem;
  `)}
`;

const CategoryTab = styled.button<{ isActive: boolean; accentColor: string }>`
  background: ${(p) => p.isActive 
    ? `rgba(${p.accentColor}, 0.1)` 
    : `rgba(var(--cardBackground), 0.5)`};
  border: 1px solid ${(p) => p.isActive 
    ? `rgba(${p.accentColor}, 0.5)` 
    : `rgba(var(--text), 0.1)`};
  color: ${(p) => p.isActive 
    ? `rgb(${p.accentColor})` 
    : `rgb(var(--text))`};
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: ${(p) => p.isActive 
    ? `0 10px 15px -3px rgba(${p.accentColor}, 0.1)` 
    : 'none'};
    
  &:hover {
    background: rgba(${(p) => p.accentColor}, 0.1);
    border-color: rgba(${(p) => p.accentColor}, 0.3);
  }

  ${media.tablet(`
    padding: 0.8rem 1.5rem;
    font-size: 1.5rem;
  `)}

  ${media.phone(`
    width: 100%;
    justify-content: center;
  `)}
`;

const TabIcon = styled.span`
  font-size: 2rem;
  margin-right: 1rem;

  ${media.tablet(`
    font-size: 1.8rem;
  `)}
`;

const TabName = styled.span`
  ${media.tablet(`
    font-size: 1.4rem;
  `)}
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const CategoryDescription = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoryIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 2.6rem;
  `)}
`;

const CategoryText = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 70rem;

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const SolutionsGrid = styled.div`
  margin-bottom: 8rem;
`;

const SolutionItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;

  ${media.desktop(`
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 2.5rem;
  `)}
`;

const TechnologySection = styled.div`
  text-align: center;
  padding-top: 4rem;
`;

const TechDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  max-width: 70rem;
  margin: 2rem auto 5rem;

  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const TechCategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;

const TechCategory = styled.div`
  margin-bottom: 2rem;
`;

const TechCategoryTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(var(--primary));
`;

const TechCategoryDescription = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  margin-bottom: 3rem;
  max-width: 80rem;
`;

const TechItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 3rem;

  ${media.tablet(`
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    gap: 2rem;
  `)}

  ${media.phone(`
    grid-template-columns: 1fr;
  `)}
`;

const TechItem = styled.div`
  background: rgba(var(--cardBackground), 0.5);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.5rem;
  padding: 2.5rem;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-color: rgba(var(--accent), 0.3);
  }
`;

const TechItemIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const TechItemName = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const TechItemDescription = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.6;
`;