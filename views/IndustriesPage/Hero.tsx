import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import OverTitle from 'components/OverTitle';
import { media } from 'utils/media';
import AnimatedBackground from 'components/AnimatedBackground';

interface HighlightCardProps {
  icon: string;
  value: string;
  label: string;
  delay: number;
}

function HighlightCard({ icon, value, label, delay }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <Card>
        <CardIcon aria-hidden="true">{icon}</CardIcon>
        <CardText>
          <CardValue>{value}</CardValue>
          <CardLabel>{label}</CardLabel>
        </CardText>
      </Card>
    </motion.div>
  );
}

export default function IndustriesHero() {
  const highlights = [
    { icon: '🏢', value: '30+', label: 'Enterprise Clients' },
    { icon: '🌐', value: '5+', label: 'Industries Served' },
    { icon: '📊', value: '99.9%', label: 'Data Accuracy' }
  ];

  return (
    <HeroWrapper>
      <AnimatedBackground variant="particles" />
      <ContentWrapper>
        <Container>
          <Content>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <CustomOverTitle>Industries We Serve</CustomOverTitle>
              <Title>
                Transforming <AccentText>Industries</AccentText> Through <br />
                Data-Driven Innovation
              </Title>
              <Description>
                Every industry has unique data challenges. We combine deep industry knowledge with cutting-edge 
                technology to deliver tailored analytics solutions that drive measurable business outcomes.
              </Description>
            </motion.div>
            
            <HighlightCardsWrapper>
              {highlights.map((highlight, index) => (
                <HighlightCard
                  key={highlight.label}
                  icon={highlight.icon}
                  value={highlight.value}
                  label={highlight.label}
                  delay={0.3 + index * 0.2}
                />
              ))}
            </HighlightCardsWrapper>
          </Content>
        </Container>
      </ContentWrapper>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
  position: relative;
  min-height: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 0;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(var(--background-rgb), 0.7), rgba(var(--background-rgb), 1));
  
  ${media('<=tablet')} {
    min-height: 50rem;
    padding: 8rem 0;
  }

  ${media('<=phone')} {
    min-height: 45rem;
    padding: 6rem 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  text-align: center;
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
  color: rgb(var(--accent-rgb));

  ${media('<=tablet')} {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 5.2rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, rgb(var(--text-rgb)) 0%, rgba(var(--primary-rgb), 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  ${media('<=tablet')} {
    font-size: 4rem;
    line-height: 1.3;
  }

  ${media('<=phone')} {
    font-size: 3.2rem;
    margin-bottom: 1.5rem;
  }
`;

const AccentText = styled.span`
  color: rgb(var(--accent-rgb));
  -webkit-text-fill-color: rgb(var(--accent-rgb));
`;

const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  margin: 0 auto 4rem;
  color: rgb(var(--text-rgb));
  opacity: 0.8;
  max-width: 70rem;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
    margin-bottom: 3rem;
    padding: 0 2rem;
  }

  ${media('<=phone')} {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const HighlightCardsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4rem;
  
  ${media('<=tablet')} {
    gap: 2rem;
    margin-top: 3rem;
  }
  
  ${media('<=phone')} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const Card = styled.article`
  background: rgba(var(--cardBackground-rgb), 0.7);
  backdrop-filter: blur(10px);
  border-radius: 1.2rem;
  padding: 2.5rem 2rem;
  width: 20rem;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  box-shadow: 0 10px 30px -15px rgba(var(--accent-rgb), 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px -10px rgba(var(--accent-rgb), 0.3);
  }
  
  ${media('<=tablet')} {
    padding: 2rem;
    width: 18rem;
  }

  ${media('<=phone')} {
    width: 100%;
    max-width: 26rem;
    padding: 1.8rem;
  }
`;

const CardIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }

  ${media('<=tablet')} {
    font-size: 3rem;
  }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardValue = styled.span`
  display: block;
  font-size: 2.6rem;
  font-weight: 700;
  color: rgb(var(--accent-rgb));
  margin-bottom: 0.5rem;
  line-height: 1;

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const CardLabel = styled.span`
  font-size: 1.6rem;
  color: rgb(var(--text-rgb));
  opacity: 0.9;
  line-height: 1.4;

  ${media('<=tablet')} {
    font-size: 1.5rem;
  }
`;