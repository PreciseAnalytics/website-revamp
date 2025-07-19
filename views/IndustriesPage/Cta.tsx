import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { media } from 'utils/media';
import Container from 'components/Container';
import Button from 'components/Button';

interface BadgeProps {
  icon: string;
  text: string;
  delay: number;
}

function BadgeItem({ icon, text, delay }: BadgeProps) {
  return (
    <Badge
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
    >
      <BadgeIcon aria-hidden="true">{icon}</BadgeIcon>
      <BadgeText>{text}</BadgeText>
    </Badge>
  );
}

export default function IndustriesCta() {
  const badges = [
    { icon: '🔒', text: 'Secure & Compliant' },
    { icon: '⚡', text: 'Fast Implementation' },
    { icon: '💯', text: 'Guaranteed Results' }
  ];

  return (
    <CtaWrapper>
      <Container>
        <Card>
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <CtaTitle>Ready to transform your industry with data?</CtaTitle>
              <CtaDescription>
                Our team of industry experts and data scientists are ready to help you unlock the full potential of your data.
              </CtaDescription>
              
              <ButtonGroup>
                <Link href="/schedule-consult" passHref legacyBehavior>
                  <Button as="a" accent>
                    Schedule a Consultation
                  </Button>
                </Link>
              </ButtonGroup>
            </motion.div>
          </ContentWrapper>
          <BackgroundGradient />
        </Card>
        
        <BadgesWrapper>
          {badges.map((badge, index) => (
            <BadgeItem 
              key={badge.text}
              icon={badge.icon}
              text={badge.text}
              delay={index * 0.1}
            />
          ))}
        </BadgesWrapper>
      </Container>
    </CtaWrapper>
  );
}

const CtaWrapper = styled.section`
  padding: 8rem 0;
  position: relative;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--background-rgb), 0.7),
    rgba(var(--background-rgb), 1)
  );

  ${media('<=tablet')} {
    padding: 6rem 0;
  }
`;

const Card = styled.article`
  position: relative;
  padding: 6rem;
  background: rgba(var(--secondBackground-rgb), 0.8);
  border-radius: 2rem;
  overflow: hidden;
  text-align: center;
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 30px 60px -15px rgba(var(--accent-rgb), 0.15);
  
  ${media('<=tablet')} {
    padding: 4rem 2.5rem;
    border-radius: 1.5rem;
  }

  ${media('<=phone')} {
    padding: 3rem 1.8rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const CtaTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, rgb(var(--text-rgb)), rgb(var(--accent-rgb)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;
  
  ${media('<=tablet')} {
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
  }

  ${media('<=phone')} {
    font-size: 2.2rem;
  }
`;

const CtaDescription = styled.p`
  font-size: 1.8rem;
  max-width: 70rem;
  margin: 0 auto 4rem;
  color: rgb(var(--text-rgb));
  opacity: 0.8;
  line-height: 1.6;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }

  ${media('<=phone')} {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  
  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 70% 30%,
    rgba(var(--accent-rgb), 0.1) 0%,
    transparent 70%
  );
  z-index: 1;
  pointer-events: none;
`;

const BadgesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  
  ${media('<=tablet')} {
    gap: 3rem;
    margin-top: 3rem;
  }
  
  ${media('<=phone')} {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin-top: 2.5rem;
  }
`;

const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 1.5rem;
  background: rgba(var(--cardBackground-rgb), 0.6);
  border-radius: 1rem;
  border: 1px solid rgba(var(--accent-rgb), 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(var(--cardBackground-rgb), 0.8);
  }

  ${media('<=phone')} {
    width: 100%;
    max-width: 22rem;
    justify-content: center;
  }
`;

const BadgeIcon = styled.div`
  font-size: 2.4rem;
  transition: transform 0.3s ease;

  ${Badge}:hover & {
    transform: scale(1.1);
  }

  ${media('<=tablet')} {
    font-size: 2.2rem;
  }
`;

const BadgeText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(var(--text-rgb));
  white-space: nowrap;

  ${media('<=tablet')} {
    font-size: 1.5rem;
  }
`;