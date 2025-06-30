import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { media } from 'utils/media';
import Container from 'components/Container';
import Button from 'components/Button';

export default function IndustriesCta() {
  return (
    <CtaWrapper>
      <Container>
        <Card>
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
              <Link href="/schedule-consult">
                <Button accent>Schedule a Consultation</Button>
              </Link>
            </ButtonGroup>
          </motion.div>
          
          <BackgroundGradient />
        </Card>
        
        <BadgesWrapper>
          <Badge
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <BadgeIcon>🔒</BadgeIcon>
            <BadgeText>Secure & Compliant</BadgeText>
          </Badge>
          
          <Badge
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <BadgeIcon>⚡</BadgeIcon>
            <BadgeText>Fast Implementation</BadgeText>
          </Badge>
          
          <Badge
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <BadgeIcon>💯</BadgeIcon>
            <BadgeText>Guaranteed Results</BadgeText>
          </Badge>
        </BadgesWrapper>
      </Container>
    </CtaWrapper>
  );
}

const CtaWrapper = styled.div`
  padding: 8rem 0;
  position: relative;
`;

const Card = styled.div`
  position: relative;
  padding: 6rem;
  background: rgba(var(--secondBackground), 0.8);
  border-radius: 2rem;
  overflow: hidden;
  text-align: center;
  border: 1px solid rgba(var(--accent), 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 30px 60px -15px rgba(var(--accent), 0.15);
  
  ${media('<=tablet')} {
    padding: 4rem 3rem;
  }
`;

const CtaTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, rgb(var(--text)), rgb(var(--accent)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
  
  ${media('<=tablet')} {
    font-size: 2.8rem;
  }
`;

const CtaDescription = styled.p`
  font-size: 1.8rem;
  max-width: 70rem;
  margin: 0 auto 4rem;
  position: relative;
  z-index: 1;
  color: rgb(var(--text));
  opacity: 0.8;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  position: relative;
  z-index: 1;
  
  ${media('<=tablet')} {
    flex-direction: column;
    align-items: center;
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
    rgba(var(--accent), 0.1) 0%,
    transparent 70%
  );
  z-index: 0;
`;

const BadgesWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 4rem;
  
  ${media('<=tablet')} {
    gap: 2.5rem;
  }
  
  ${media('<=phone')} {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BadgeIcon = styled.div`
  font-size: 2.4rem;
`;

const BadgeText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(var(--text));
`;
