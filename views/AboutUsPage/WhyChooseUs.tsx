import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

export default function WhyChooseUs() {
  return (
    <Wrapper>
      <Container>
        <Content>
          <SectionTitle>Why Choose Precise Analytics?</SectionTitle>
          <Subtitle>Mission-Driven. Data-Focused. Results-Oriented.</Subtitle>
          
          <Description>
            At Precise Analytics, we combine deep technical expertise with a commitment to delivering
            measurable outcomes. As a Veteran-Owned Small Business (VOSB), we bring discipline,
            precision, and a sense of mission to every project.
          </Description>
          
          <FeaturesTitle>What Sets Us Apart:</FeaturesTitle>
          <FeaturesGrid>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureIcon>✓</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Expertise You Can Trust</FeatureTitle>
                <FeatureDescription>
                  Proven experience in data analytics, dashboard development, automation, and decision
                  support systems.
                </FeatureDescription>
              </FeatureContent>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureIcon>✓</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Tailored Solutions</FeatureTitle>
                <FeatureDescription>
                  We don't do one-size-fits-all. Every engagement is built around your unique data
                  challenges and business goals.
                </FeatureDescription>
              </FeatureContent>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureIcon>✓</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Federal & Commercial Ready</FeatureTitle>
                <FeatureDescription>
                  From federal contracts to private sector growth, our team understands compliance,
                  security, and results.
                </FeatureDescription>
              </FeatureContent>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureIcon>✓</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>End-to-End Support</FeatureTitle>
                <FeatureDescription>
                  From strategy to implementation—we guide you through every phase of your data journey.
                </FeatureDescription>
              </FeatureContent>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FeatureIcon>✓</FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Veteran-Owned Values</FeatureTitle>
                <FeatureDescription>
                  Integrity, accountability, and mission-focus are at the heart of everything we do.
                </FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          </FeaturesGrid>
          
          <ClosingStatement>
            Your data has a story. We help you tell it—with clarity, insight, and impact.
          </ClosingStatement>
        </Content>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 10rem 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--background), 1) 0%,
    rgba(var(--background), 0.8) 100%
  );
`;

const Content = styled.div`
  text-align: center;
`;

const Subtitle = styled.h3`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(255, 125, 0);
  margin: 2rem 0;

  ${media.tablet(`
    font-size: 2.4rem;
  `)}
`;

const Description = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  color: rgb(var(--text));
  max-width: 80rem;
  margin: 0 auto 5rem;

  ${media.tablet(`
    font-size: 1.8rem;
    max-width: 100%;
  `)}
`;

const FeaturesTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 4rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 4rem;
  max-width: 120rem;
  margin: 0 auto;

  ${media.desktop(`
    grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
  `)}

  ${media.tablet(`
    grid-template-columns: 1fr;
    max-width: 55rem;
  `)}
`;

const FeatureCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  text-align: left;
  background: rgba(var(--cardBackground), 0.5);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.4rem;
  color: rgb(255, 125, 0);
  margin-right: 2rem;
  flex-shrink: 0;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.h5`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text), 0.8);
`;

const ClosingStatement = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
  font-style: italic;
  color: rgb(var(--text));
  margin-top: 6rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
`;