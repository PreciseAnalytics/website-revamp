import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface IndustryCardProps {
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
  index: number;
  onLearnMore: () => void;
}

export default function IndustryCard({
  title,
  icon,
  description,
  imageUrl,
  index,
  onLearnMore
}: IndustryCardProps) {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Icon>{icon}</Icon>
      <ImageWrapper>
        <Image src={imageUrl} alt={title} width={120} height={120} />
      </ImageWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <LearnMoreButton onClick={onLearnMore}>Learn More</LearnMoreButton>
    </Card>
  );
}

const Card = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(var(--primary), 0.2);
  border-radius: 1.5rem;
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(var(--accent), 0.15);
  }
`;

const Icon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
`;

const ImageWrapper = styled.div`
  margin: 1rem auto;
  display: flex;
  justify-content: center;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin: 1.5rem 0 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  margin-bottom: 2rem;
`;

const LearnMoreButton = styled.button`
  background: rgb(var(--accent));
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgb(var(--accentDark));
  }
`;
