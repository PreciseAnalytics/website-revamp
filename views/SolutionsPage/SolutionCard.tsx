import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/media';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  delay?: number;
  accentColor?: string;
}

export default function SolutionCard({
  title,
  description,
  icon,
  features,
  delay = 0,
  accentColor = 'var(--accent)'
}: SolutionCardProps) {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      accentColor={accentColor}
    >
      <CardHeader>
        <IconWrapper accentColor={accentColor}>{icon}</IconWrapper>
        <Title>{title}</Title>
      </CardHeader>
      
      <Description>{description}</Description>
      
      <FeaturesList>
        {features.map((feature, i) => (
          <FeatureItem 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i + delay }}
            viewport={{ once: true }}
          >
            <CheckIcon accentColor={accentColor}>✓</CheckIcon> {feature}
          </FeatureItem>
        ))}
      </FeaturesList>
      
      <CardGlow accentColor={accentColor} />
    </CardWrapper>
  );
}

const CardWrapper = styled(motion.div)<{ accentColor: string }>`
  position: relative;
  background: rgba(var(--cardBackground), 0.7);
  border-radius: 1.5rem;
  padding: 3rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(${(p) => p.accentColor}, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
  height: 100%;
  
  &:hover {
    box-shadow: 0 30px 60px -20px rgba(${(p) => p.accentColor}, 0.25);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const IconWrapper = styled.div<{ accentColor: string }>`
  width: 6rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(${(p) => p.accentColor}, 0.1);
  border-radius: 1.2rem;
  margin-right: 1.5rem;
  color: rgb(${(p) => p.accentColor});
  font-size: 2.8rem;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  
  ${media('<=phone')} {
    font-size: 2.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 3rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled(motion.li)`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  color: rgb(var(--text));
`;

const CheckIcon = styled.span<{ accentColor: string }>`
  color: rgb(${(p) => p.accentColor});
  font-weight: bold;
  margin-right: 1rem;
`;

const CardGlow = styled.div<{ accentColor: string }>`
  position: absolute;
  top: -20%;
  right: -20%;
  width: 15rem;
  height: 15rem;
  background: radial-gradient(
    circle,
    rgba(${(p) => p.accentColor}, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
`;
