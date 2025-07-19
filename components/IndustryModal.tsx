import React from 'react';
import styled from 'styled-components';
import useEscClose from 'hooks/useEscKey';
import { mq } from 'utils/media';
import Button from './Button';
import CloseIcon from './CloseIcon';
import Container from './Container';

export interface IndustryModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry: 'healthcare' | 'manufacturing' | 'fintech' | 'retail';
}

const industryContent = {
  healthcare: {
    title: 'Healthcare',
    content: `Transform healthcare delivery with data-driven insights that improve patient outcomes and operational efficiency. We deliver secure, scalable data solutions that help healthcare organizations unify and visualize their data for evidence-based decision-making.`,
    benefits: [
      'Electronic Health Record (EHR) analytics',
      'Clinical decision support systems',
      'Population health management',
      'Healthcare quality metrics and reporting',
      'Medical research data analysis',
      'Pharmaceutical supply chain optimization'
    ]
  },
  manufacturing: {
    title: 'Manufacturing',
    content: `Optimize production processes and supply chain operations through advanced manufacturing analytics. Our solutions help manufacturers reduce costs, improve quality, and increase operational efficiency through data-driven insights.`,
    benefits: [
      'Production line optimization',
      'Quality control and defect prediction',
      'Supply chain visibility and analytics',
      'Predictive maintenance solutions',
      'Inventory optimization',
      'Manufacturing KPI dashboards'
    ]
  },
  fintech: {
    title: 'Fintech',
    content: `Drive financial innovation with sophisticated analytics for risk management, fraud detection, and customer insights. Our solutions help fintech companies make better decisions, reduce risk, and improve customer experience through advanced data analytics.`,
    benefits: [
      'Risk assessment and credit scoring',
      'Fraud detection and prevention',
      'Customer segmentation and targeting',
      'Regulatory compliance reporting',
      'Investment portfolio analytics',
      'Real-time transaction monitoring'
    ]
  },
  retail: {
    title: 'Retail',
    content: `Enhance customer experience and optimize operations with retail-specific data analytics solutions. Our platforms help retailers understand customer behavior, optimize inventory, and drive sales through data-driven insights.`,
    benefits: [
      'Customer behavior and purchasing patterns',
      'Inventory management and forecasting',
      'Price optimization strategies',
      'Store performance analytics',
      'E-commerce conversion optimization',
      'Marketing campaign effectiveness'
    ]
  }
};

export default function IndustryModal({ isOpen, onClose, industry }: IndustryModalProps) {
  useEscClose({ onClose });

  if (!isOpen) return null;

  const content = industryContent[industry];

  return (
    <CustomOverlay>
      <Container>
        <ModalCard>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <CloseIcon />
          </CloseButton>

          <ModalTitle>{content.title}</ModalTitle>

          <ModalContent>
            <p>{content.content}</p>

            <BenefitsSection>
              <BenefitsTitle>Key Benefits:</BenefitsTitle>
              <BenefitsList>
                {content.benefits.map((benefit, index) => (
                  <BenefitItem key={index}>
                    <BenefitIcon>•</BenefitIcon>
                    <span>{benefit}</span>
                  </BenefitItem>
                ))}
              </BenefitsList>
            </BenefitsSection>
          </ModalContent>

          <ActionContainer>
            <Button accent as="a" href="/contact">
              Get Started Today
            </Button>
          </ActionContainer>
        </ModalCard>
      </Container>
    </CustomOverlay>
  );
}

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

const ModalCard = styled.div`
  background: rgb(var(--modalBackground));
  border-radius: 2rem;
  padding: 4rem;
  max-width: 70rem;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);

  ${mq('<=tablet', `
    padding: 3rem 2rem;
    max-width: 95%;
  `)}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: rgb(var(--text));
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  ${mq('<=tablet', `
    top: 1.5rem;
    right: 1.5rem;
  `)}
`;

const ModalTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: rgb(var(--text));

  ${mq('<=tablet', `
    font-size: 2.4rem;
    margin-bottom: 2rem;
  `)}
`;

const ModalContent = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--textSecondary));
  margin-bottom: 3rem;

  p {
    margin-bottom: 2rem;
  }

  ${mq('<=tablet', `
    font-size: 1.4rem;
    margin-bottom: 2rem;
  `)}
`;

const BenefitsSection = styled.div`
  margin-top: 2rem;

  ${mq('<=tablet', `
    margin-top: 1.5rem;
  `)}
`;

const BenefitsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;

  ${mq('<=tablet', `
    font-size: 1.6rem;
    margin-bottom: 1rem;
  `)}
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  line-height: 1.5;

  ${mq('<=tablet', `
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  `)}
`;

const BenefitIcon = styled.span`
  color: rgb(var(--accent));
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 0.2rem;

  ${mq('<=tablet', `
    font-size: 1.6rem;
    margin-right: 0.8rem;
  `)}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;

  ${mq('<=tablet', `
    margin-top: 1rem;
  `)}
`;