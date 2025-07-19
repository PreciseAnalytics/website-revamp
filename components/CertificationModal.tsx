import React from 'react';
import styled from 'styled-components';
import useEscClose from 'hooks/useEscKey';
import { media, mq } from 'utils/media';
import Button from './Button';
import CloseIcon from './CloseIcon';
import Container from './Container';
import Overlay from './Overlay';

export interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'VOSB' | 'DSBSD';
}

const modalContent = {
  VOSB: {
    title: 'Veteran-Owned Small Business (VOSB)',
    content: `At Precise Analytics, we specialize in transforming raw data into actionable insights that help government agencies and businesses make smarter, faster decisions. As Veteran-Owned Small Business (VOSB), we bring both technical precision and mission-driven values to every engagement.

• Get expert advice on data analytics, dashboards, and automation
• Explore how our tailored solutions can support your goals  
• No pressure, no obligation—just valuable insight
• Let's talk about your data challenges and how we can help.

Book your free 30-minute consultation now and start building smarter strategies with Precise Analytics.`,
    actionText: 'Schedule Free Consultation',
    actionUrl: '/schedule-consult'
  },
  DSBSD: {
    title: 'Data Strategy & Business Development (DSBSD)',
    content: `Unlock the full potential of your data.

At Precise Analytics, our DSBSD services help organizations connect data strategy with business outcomes. We assess your current data landscape, identify growth opportunities, and design actionable strategies that support smarter decision-making, improved efficiency, and long-term success.

Whether you're modernizing systems, expanding into new markets, or scaling operations—our DSBSD team ensures your data works for you.`,
    actionText: 'Learn More About DSBSD Services',
    actionUrl: '/services'
  }
};

export default function CertificationModal({ isOpen, onClose, type }: CertificationModalProps) {
  useEscClose({ onClose });

  if (!isOpen) return null;

  const content = modalContent[type];

  return (
    <CustomOverlay>
      <Container>
        <ModalCard>
          <CloseIconContainer onClick={onClose}>
            <CloseIcon />
          </CloseIconContainer>
          
          <BadgeContainer>
            <BadgeIcon>{type}</BadgeIcon>
          </BadgeContainer>
          
          <ModalTitle>{content.title}</ModalTitle>
          
          <ModalContent>
            {content.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </ModalContent>
          
          <ActionContainer>
            <Button 
              accent 
              as="a" 
              href={content.actionUrl}
              target={type === 'VOSB' ? '_self' : '_self'}
              rel={type === 'VOSB' ? undefined : undefined}
            >
              {content.actionText}
            </Button>
          </ActionContainer>
        </ModalCard>
      </Container>
    </CustomOverlay>
  );
}

const ModalCard = styled.div`
  background: rgb(var(--modalBackground));
  border-radius: 2rem;
  padding: 4rem;
  max-width: 60rem;
  width: 90%;
  position: relative;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  
  ${mq('<=tablet', `
    padding: 3rem 2rem;
    max-width: 95%;
  `)}
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  
  ${mq('<=tablet', `
    top: 1.5rem;
    right: 1.5rem;
  `)}
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const BadgeIcon = styled.div`
  background: linear-gradient(135deg, rgb(var(--accent)), rgb(var(--primary)));
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 1px;
  box-shadow: var(--shadow-md);
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: rgb(var(--text));
  
  ${mq('<=tablet', 'font-size: 2rem;')}
`;

const ModalContent = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--textSecondary));
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ${mq('<=tablet', 'font-size: 1.4rem;')}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
  color: rgb(var(--textSecondary));
`;