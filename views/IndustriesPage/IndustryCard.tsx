import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/media';
import Image from 'next/image';

interface IndustryCardProps {
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  href: string;
  imageUrl: string;
  index: number;
  onLearnMore: () => void;
}

export default function IndustryCard({
  title,
  icon,
  description,
  benefits,
  href,
  imageUrl,
  index,
  onLearnMore,
}: IndustryCardProps) {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <CardImageWrapper>
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <ImageOverlay />
      </CardImageWrapper>
      <CardContent>
        <IconWrapper>
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
        </IconWrapper>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <BenefitsList>
          {benefits.slice(0, 3).map((benefit, i) => (
            <BenefitItem 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <BenefitIcon>✓</BenefitIcon>
              {benefit}
            </BenefitItem>
          ))}
          {benefits.length > 3 && (
            <MoreBenefitsText>+{benefits.length - 3} more benefits</MoreBenefitsText>
          )}
        </BenefitsList>
        <ButtonContainer>
          <LearnMoreButton
            onClick={(e) => {
              e.preventDefault();
              onLearnMore();
            }}
            aria-label={`Learn more about ${title}`}
          >
            Learn More
          </LearnMoreButton>
        </ButtonContainer>
      </CardContent>
    </CardWrapper>
  );
}

const CardWrapper = styled(motion.article)`
  background: rgba(var(--cardBackground-rgb), 0.7);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(var(--primary-rgb), 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  &:hover {
    box-shadow: 0 30px 60px rgba(var(--accent-rgb), 0.15);
    border-color: rgba(var(--accent-rgb), 0.3);
  }

  ${media('<=tablet')} {
    border-radius: 1rem;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 20rem;
  overflow: hidden;

  ${media('<=tablet')} {
    height: 16rem;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
  z-index: 1;
`;

const CardContent = styled.div`
  padding: 2.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${media('<=tablet')} {
    padding: 1.8rem;
  }
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--accent-rgb), 0.1);
  border-radius: 1rem;
  color: rgb(var(--accent-rgb));

  ${media('<=tablet')} {
    font-size: 3rem;
    height: 4.5rem;
    width: 4.5rem;
    margin-bottom: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, rgb(var(--text-rgb)) 0%, rgba(var(--primary-rgb), 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;

  ${media('<=tablet')} {
    font-size: 2rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text-rgb));
  opacity: 0.8;
  flex-grow: 1;

  ${media('<=tablet')} {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;

  ${media('<=tablet')} {
    margin-bottom: 2rem;
  }
`;

const BenefitItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: rgb(var(--text-rgb));
  line-height: 1.4;

  ${media('<=tablet')} {
    font-size: 1.4rem;
  }
`;

const BenefitIcon = styled.span`
  color: rgb(var(--accent-rgb));
  margin-right: 1rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.2rem;
`;

const MoreBenefitsText = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  color: rgb(var(--accent-rgb));
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
`;

const LearnMoreButton = styled.button`
  border: none;
  background: rgb(var(--accent-rgb));
  color: white;
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: rgba(var(--accent-rgb), 0.8);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(var(--accent-rgb), 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }

  ${media('<=tablet')} {
    padding: 1rem 2rem;
  }
`;