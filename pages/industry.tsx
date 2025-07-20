import { useRouter } from 'next/router';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';

const industryData = {
  healthcare: {
    title: 'Healthcare Analytics Solutions',
    description: 'Transform healthcare delivery with data-driven insights...',
    features: [
      'Electronic Health Record (EHR) analytics',
      'Clinical decision support systems',
      'Population health management'
    ]
  },
  manufacturing: {
    title: 'Manufacturing Analytics',
    description: 'Optimize production processes and supply chain operations...',
    features: [
      'Production line optimization',
      'Quality control analytics',
      'Supply chain visibility'
    ]
  },
  fintech: {
    title: 'Financial Technology Solutions',
    description: 'Drive financial innovation with sophisticated analytics...',
    features: [
      'Risk assessment models',
      'Fraud detection systems',
      'Customer segmentation'
    ]
  },
  retail: {
    title: 'Retail Analytics Solutions',
    description: 'Enhance customer experience and optimize operations...',
    features: [
      'Customer behavior analysis',
      'Inventory forecasting',
      'Price optimization'
    ]
  }
};

export default function IndustryPage() {
  const router = useRouter();
  const { industry } = router.query;

  if (!industry || typeof industry !== 'string' || !industryData[industry as keyof typeof industryData]) {
    return (
      <Container>
        <h1>Industry not found</h1>
      </Container>
    );
  }

  const data = industryData[industry as keyof typeof industryData];

  return (
    <Wrapper>
      <Container>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
        <FeaturesSection>
          <Subtitle>Key Solutions</Subtitle>
          <FeaturesList>
            {data.features.map((feature, idx) => (
              <FeatureItem key={idx}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </FeaturesSection>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 6rem 0;
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 2rem;
  ${media.tablet(`
    font-size: 2.8rem;
  `)}
`;

const Description = styled.p`
  font-size: 1.8rem;
  margin-bottom: 4rem;
  color: rgba(var(--text), 0.8);
`;

const FeaturesSection = styled.div`
  margin-top: 5rem;
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: rgb(var(--primary));
`;

const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
`;

const FeatureItem = styled.li`
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--primary), 0.1);
  font-size: 1.6rem;
`;