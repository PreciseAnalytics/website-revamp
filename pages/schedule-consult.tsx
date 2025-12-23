import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import AnimatedHeader from 'components/AnimatedHeader';

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

// Did You Know facts about data analytics
const analyticsFactsDatabase = [
  {
    id: 1,
    title: "Data-Driven Decision Making",
    fact: "Organizations that use data-driven decision making are 23 times more likely to acquire customers and 19 times more likely to be profitable.",
    source: "McKinsey Global Institute",
    icon: "📊",
  },
  {
    id: 2,
    title: "Real-Time Analytics Impact",
    fact: "Companies using real-time analytics experience up to 5x faster decision-making and 3x improvement in operational efficiency.",
    source: "Forbes Analytics Council",
    icon: "⚡",
  },
  {
    id: 3,
    title: "Predictive Analytics ROI",
    fact: "Businesses implementing predictive analytics see an average ROI of $13.01 for every dollar spent on analytics technology.",
    source: "Nucleus Research",
    icon: "🎯",
  },
  {
    id: 4,
    title: "Dashboard Adoption",
    fact: "Organizations with executive dashboards make decisions 5 times faster than those relying on traditional reporting methods.",
    source: "Aberdeen Group",
    icon: "📈",
  },
  {
    id: 5,
    title: "Data Quality Impact",
    fact: "Poor data quality costs organizations an average of $12.9 million annually, making data governance critical for success.",
    source: "Gartner Research",
    icon: "✅",
  },
  {
    id: 6,
    title: "AI & Machine Learning",
    fact: "Companies using AI-powered analytics report 80% improvement in lead conversion and 50% reduction in customer churn.",
    source: "Salesforce Research",
    icon: "🤖",
  },
  {
    id: 7,
    title: "Self-Service Analytics",
    fact: "Self-service BI tools increase user adoption by 60% and reduce IT workload by 35%, accelerating time-to-insight.",
    source: "IDC Analytics Survey",
    icon: "🔍",
  },
  {
    id: 8,
    title: "Cloud Analytics Growth",
    fact: "70% of enterprises have moved analytics to the cloud, citing 40% cost reduction and 3x faster deployment times.",
    source: "Deloitte Cloud Survey",
    icon: "☁️",
  },
];

// Did You Know Card Component
function DidYouKnowCard() {
  const [currentFact, setCurrentFact] = useState(analyticsFactsDatabase[0]);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    // Rotate facts every 8 seconds
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % analyticsFactsDatabase.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentFact(analyticsFactsDatabase[factIndex]);
  }, [factIndex]);

  const handleNext = () => {
    setFactIndex((prev) => (prev + 1) % analyticsFactsDatabase.length);
  };

  const handlePrevious = () => {
    setFactIndex((prev) => (prev - 1 + analyticsFactsDatabase.length) % analyticsFactsDatabase.length);
  };

  return (
    <DidYouKnowContainer
      as={motion.div}
      key={currentFact.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DidYouKnowHeader>
        <DidYouKnowIcon>{currentFact.icon}</DidYouKnowIcon>
        <DidYouKnowTitle>Did You Know?</DidYouKnowTitle>
      </DidYouKnowHeader>

      <FactTitle>{currentFact.title}</FactTitle>
      <FactText>{currentFact.fact}</FactText>
      <FactSource>— {currentFact.source}</FactSource>

      <NavigationDots>
        {analyticsFactsDatabase.map((_, index) => (
          <Dot
            key={index}
            $active={index === factIndex}
            onClick={() => setFactIndex(index)}
          />
        ))}
      </NavigationDots>

      <NavigationButtons>
        <NavButton onClick={handlePrevious}>← Previous</NavButton>
        <NavButton onClick={handleNext}>Next →</NavButton>
      </NavigationButtons>
    </DidYouKnowContainer>
  );
}

// Scroll Assist Component - Only Scroll Up
function ScrollAssist() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setShowScrollTop(scrolled > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {showScrollTop && (
        <ScrollButton
          as={motion.button}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </ScrollButton>
      )}
    </AnimatePresence>
  );
}

export default function ScheduleConsult() {
  const router = useRouter();

  const goBackToServices = () => {
    router.push('/services');
  };

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

      {/* BACK TO SERVICES BUTTON */}
      <BackButtonWrapper
        as={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container>
          <BackButton onClick={goBackToServices}>
            <BackIcon>←</BackIcon>
            <BackText>Back to Services</BackText>
          </BackButton>
        </Container>
      </BackButtonWrapper>

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
                    <ContactIcon>📧</ContactIcon>
                    <ContactDetails>
                      <ContactLabel>Alternate Email</ContactLabel>
                      <ContactValue>
                        <span 
                          onClick={() => window.location.href = 'mailto:preciseanalyticsllc@gmail.com'}
                        >
                          preciseanalyticsllc@gmail.com
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

                  <p>
                    At Precise Analytics, our DSBD services help organizations connect data
                    strategy with business outcomes. We assess your current data landscape,
                    identify growth opportunities, and design actionable strategies that
                    support smarter decision-making, improved efficiency, and long-term
                    success.
                  </p>

                  <p>
                    Whether you&apos;re modernizing systems, expanding into new markets, or
                    scaling operations—our DSBD team ensures your data works for you.
                  </p>
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
              
              {/* DID YOU KNOW CARD - Under Calendly */}
              <DidYouKnowWrapper
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <DidYouKnowCard />
              </DidYouKnowWrapper>
            </CalendlySection>
          </ContentGrid>
        </Container>
      </PageWrapper>

      {/* SCROLL ASSIST BUTTON */}
      <ScrollAssist />
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

const DSBDList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DSBDListItem = styled.li`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text));
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "▸";
    position: absolute;
    left: 0;
    color: rgb(255, 125, 0);
    font-weight: bold;
    font-size: 1.8rem;
  }

  strong {
    color: rgb(255, 125, 0);
    font-weight: 600;
    display: block;
    margin-bottom: 0.3rem;
  }
`;

const DSBDFooterNote = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 1rem;
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text));

  strong {
    color: rgb(255, 125, 0);
    display: block;
    margin-bottom: 0.5rem;
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
  flex-direction: column;
  gap: 3rem;
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

// Did You Know Wrapper - Under Calendly
const DidYouKnowWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
`;

// Did You Know Card Styles
const DidYouKnowContainer = styled.div`
  background: linear-gradient(135deg, rgba(var(--cardBackground), 0.95), rgba(var(--cardBackground), 0.85));
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow: 0 12px 40px rgba(57, 255, 20, 0.1);
  border: 2px solid rgba(57, 255, 20, 0.2);

  ${media.tablet(`
    padding: 2rem;
  `)}
`;

const DidYouKnowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const DidYouKnowIcon = styled.div`
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(57, 255, 20, 0.3));
`;

const DidYouKnowTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #39ff14, #2dd10d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const FactTitle = styled.h4`
  font-size: 2rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  margin-bottom: 1.5rem;
  line-height: 1.4;
`;

const FactText = styled.p`
  font-size: 1.7rem;
  line-height: 1.8;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const FactSource = styled.p`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.7);
  font-style: italic;
  margin-bottom: 2.5rem;
`;

const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#39ff14' : 'rgba(var(--text), 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: ${props => props.$active ? '#39ff14' : 'rgba(var(--text), 0.5)'};
    transform: scale(1.2);
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const NavButton = styled.button`
  padding: 1rem 2rem;
  background: rgba(57, 255, 20, 0.1);
  border: 2px solid rgba(57, 255, 20, 0.3);
  border-radius: 0.8rem;
  color: #39ff14;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(57, 255, 20, 0.2);
    border-color: #39ff14;
    transform: translateY(-2px);
  }
`;

const HelpfulTip = styled.div`
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const TipIcon = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(255, 125, 0, 0.3));
`;

const TipText = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgb(var(--text));
  margin: 0;

  strong {
    color: rgb(255, 125, 0);
    display: block;
    margin-bottom: 0.5rem;
  }
`;

// Back Button Styles
const BackButtonWrapper = styled.div`
  padding: 2rem 0 1rem;
  background: rgb(var(--background));
  position: sticky;
  top: 8rem;
  z-index: 50;
  
  ${media.tablet(`
    position: relative;
    top: 0;
    padding: 1.5rem 0 0.5rem;
  `)}
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2.4rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05));
  border: 2px solid rgba(255, 125, 0, 0.3);
  border-radius: 1rem;
  color: rgb(255, 125, 0);
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(255, 125, 0, 0.2), rgba(255, 165, 0, 0.1));
    border-color: rgb(255, 125, 0);
    transform: translateX(-5px);
  }

  ${media.tablet(`
    padding: 1rem 2rem;
    font-size: 1.4rem;
  `)}
`;

const BackIcon = styled.span`
  font-size: 2rem;
  transition: transform 0.3s ease;

  ${BackButton}:hover & {
    transform: translateX(-3px);
  }
`;

const BackText = styled.span``;

// Scroll Button Style
const ScrollButton = styled.button`
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 2.4rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(255, 125, 0, 0.4);
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 0 6px 25px rgba(255, 125, 0, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  ${media.tablet(`
    right: 1.5rem;
    bottom: 2rem;
    width: 4.5rem;
    height: 4.5rem;
    font-size: 2rem;
  `)}
`;