import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import Button from 'components/Button';
import { EnvVars } from 'env';
import { media } from 'utils/media';

// Define the component first
function CalendlyWidgetComponent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/contact-preciseanalytics/initial-consultation?back=1&month=2025-06"
      style={{ minWidth: '320px', height: '900px' }}
    />
  );
}

// Then create the dynamic import
const CalendlyWidget = dynamic(() => Promise.resolve(CalendlyWidgetComponent), {
  ssr: false,
});

export default function ScheduleConsult() {
  return (
    <>
      <Head>
        <title>{`Schedule a Consultation - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Schedule a free consultation with Precise Analytics to discover how data can drive your mission forward."
        />
        <meta
          name="keywords"
          content="consultation, data analytics consultation, business meeting, Precise Analytics, free consultation"
        />
      </Head>
      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <HeaderSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageTitle>Schedule Your Free Consultation</PageTitle>
            <PageSubtitle>
              Discover How Data Can Drive Your Mission Forward
            </PageSubtitle>
          </HeaderSection>

          <ContentGrid>
            <ConsultationInfo
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InfoCard>
                <AboutSection>
                  <p>
                    At Precise Analytics, we specialize in transforming raw data into actionable insights that help government agencies and businesses make smarter, faster decisions. As a Service-Disabled Veteran-Owned Small Business (SDVOSB), we bring both technical precision and mission-driven values to every engagement.
                  </p>
                </AboutSection>

                <ExpectationsList>
                  <ExpectationItem>
                    <ExpectationIcon>✓</ExpectationIcon>
                    <ExpectationText>Get expert advice on data analytics, dashboards, and automation</ExpectationText>
                  </ExpectationItem>
                  <ExpectationItem>
                    <ExpectationIcon>✓</ExpectationIcon>
                    <ExpectationText>Explore how our tailored solutions can support your goals</ExpectationText>
                  </ExpectationItem>
                  <ExpectationItem>
                    <ExpectationIcon>✓</ExpectationIcon>
                    <ExpectationText>No pressure, no obligation—just valuable insight</ExpectationText>
                  </ExpectationItem>
                </ExpectationsList>

                <BottomText>
                  Let&apos;s talk about your data challenges and how we can help. Book your free 30-minute consultation now and start building smarter strategies with Precise Analytics.
                </BottomText>
              </InfoCard>

              <ContactCard>
                <CardTitle>Contact Information</CardTitle>
                <ContactList>
                  <ContactItem>
                    <ContactIcon>📧</ContactIcon>
                    <ContactDetails>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue>
                        <span 
                          onClick={() => window.location.href = `mailto:${EnvVars.CONTACT_EMAIL}`}
                        >
                          {EnvVars.CONTACT_EMAIL}
                        </span>
                      </ContactValue>
                    </ContactDetails>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>📞</ContactIcon>
                    <ContactDetails>
                      <ContactLabel>Phone</ContactLabel>
                      <ContactValue>
                        <span 
                          onClick={() => window.location.href = "tel:+18043964148"}
                        >
                          +1 (804) 396-4148
                        </span>
                      </ContactValue>
                    </ContactDetails>
                  </ContactItem>
                </ContactList>
              </ContactCard>

              <DSBDCard>
                <CardTitle>Data Strategy & Business Development (DSBD)</CardTitle>
                <DSBDContent>
                  <strong>Unlock the full potential of your data.</strong>
                  <p>At Precise Analytics, our DSBD services help organizations connect data strategy with business outcomes. We assess your current data landscape, identify growth opportunities, and design actionable strategies that support smarter decision-making, improved efficiency, and long-term success.</p>
                  <p>Whether you&apos;re modernizing systems, expanding into new markets, or scaling operations—our DSBD team ensures your data works for you.</p>
                </DSBDContent>
              </DSBDCard>
            </ConsultationInfo>

            <CalendlySection
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CalendlyContainer>
                <CalendlyWidget />
              </CalendlyContainer>
            </CalendlySection>
          </ContentGrid>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// Styles
const PageWrapper = styled.div`
  min-height: 80vh;
  padding: 8rem 0 4rem;
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const PageSubtitle = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  max-width: 80rem;
  margin: 0 auto;
  line-height: 1.6;

  ${media.tablet(`
    font-size: 2rem;
  `)}
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;

  ${media.desktop(`
    grid-template-columns: 1fr;
    gap: 4rem;
  `)}
`;

const ConsultationInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const InfoCard = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const AboutSection = styled.div`
  p {
    font-size: 1.6rem;
    line-height: 1.7;
    color: rgb(var(--text));
    margin-bottom: 1rem;
  }
`;

const ExpectationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const ExpectationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const ExpectationIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
  color: rgb(255, 125, 0);
`;

const ExpectationText = styled.p`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.9);
  line-height: 1.6;
  margin: 0;
`;

const BottomText = styled.div`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgb(var(--text));
  margin: 1rem 0 2rem;
`;

const ContactCard = styled(InfoCard)``;

const DSBDCard = styled(InfoCard)`
  background: linear-gradient(120deg, rgba(var(--cardBackground), 0.9), rgba(var(--cardBackground), 0.7));
  border: 1px solid rgba(255, 125, 0, 0.3);
`;

const DSBDContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  strong {
    font-size: 1.8rem;
    color: rgb(255, 125, 0);
    font-weight: 600;
  }

  p {
    font-size: 1.6rem;
    line-height: 1.7;
    color: rgb(var(--text));
    margin: 0;
  }
`;

const CardTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ContactIcon = styled.div`
  font-size: 2.4rem;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactLabel = styled.span`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.6);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ContactValue = styled.div`
  font-size: 1.6rem;
  color: rgb(var(--text));

  span {
    color: rgb(255, 125, 0);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: rgb(255, 165, 0);
    }
  }
`;

const CalendlySection = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const CalendlyContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
`;