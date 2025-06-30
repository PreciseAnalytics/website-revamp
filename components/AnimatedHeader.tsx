import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import Button from 'components/Button';
<<<<<<< Updated upstream
import { EnvVars } from 'env';
=======
import AnimatedLogo from 'components/AnimatedLogo';
import { HamburgerIcon } from 'components/HamburgerIcon';
import CloseIcon from 'components/CloseIcon';
>>>>>>> Stashed changes
import { media } from 'utils/media';

export default function ScheduleConsult() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

<<<<<<< Updated upstream
=======
export default function AnimatedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
>>>>>>> Stashed changes
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
<<<<<<< Updated upstream
  }, []);

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
                        <a href={`mailto:${EnvVars.CONTACT_EMAIL}`}>{EnvVars.CONTACT_EMAIL}</a>
                      </ContactValue>
                    </ContactDetails>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>📞</ContactIcon>
                    <ContactDetails>
                      <ContactLabel>Phone</ContactLabel>
                      <ContactValue>
                        <a href="tel:+18043964148">+1 (804) 396-4148</a>
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
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/contact-preciseanalytics/initial-consultation?back=1&month=2025-06"
                  style={{ minWidth: '320px', height: '900px' }}
                  dangerouslySetInnerHTML={{ __html: '' }}
                />
              </CalendlyContainer>
            </CalendlySection>
          </ContentGrid>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

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

  ${media('<=tablet')} {
    font-size: 3.6rem;
=======
  }, [router.events]);

  useScrollPosition(({ currPos }) => {
    if (isClient) {
      setIsScrolled(currPos.y < -20);
    }
  });

  return (
    <HeaderWrapper $isScrolled={isScrolled}>
      <Container>
        <HeaderInner>
          <LeftSection>
            <NextLink href="/">
              <LogoLink>
                <AnimatedLogo size="11rem" style={{ filter: 'drop-shadow(0 0 6px rgba(0,0,0,0.3))' }} />
                <CompanyName>
                  <motion.span
                    className="precise"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    PRECISE
                  </motion.span>
                  <motion.span
                    className="analytics"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    ANALYTICS
                  </motion.span>
                </CompanyName>
              </LogoLink>
            </NextLink>
            <Nav>
              <NavList>
                {LINKS.map((link) => (
                  <NavItem key={link.href}>
                    <NextLink href={link.href}>
                      <NavLink $active={router.pathname === link.href}>
                        {link.label}
                      </NavLink>
                    </NextLink>
                  </NavItem>
                ))}
              </NavList>
            </Nav>
          </LeftSection>
          <RightSection>
            <ButtonContainer>
              <NextLink href="/schedule-consult">
                <Button orange>Schedule a Consultation</Button>
              </NextLink>
            </ButtonContainer>
            <SBALogoContainer>
              <SBALogo
                src="/veteran-owned-certified.png"
                alt="Veteran-Owned Certified Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </SBALogoContainer>
            <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MobileMenuButton>
          </RightSection>
        </HeaderInner>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container>
              <MobileNavList>
                {LINKS.map((link, i) => (
                  <MobileNavItem
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <NextLink href={link.href}>
                      <MobileNavLink $active={router.pathname === link.href}>
                        {link.label}
                      </MobileNavLink>
                    </NextLink>
                  </MobileNavItem>
                ))}
                <MobileNavItem
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: LINKS.length * 0.1 }}
                >
                  <NextLink href="/schedule-consult">
                    <MobileButton accent>Schedule a Consultation</MobileButton>
                  </NextLink>
                </MobileNavItem>
              </MobileNavList>
            </Container>
          </MobileNav>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--z-navbar);
  background: ${(p) =>
    p.$isScrolled ? 'rgba(var(--navbarBackground), 0.8)' : 'rgba(var(--navbarBackground), 0)'};
  backdrop-filter: ${(p) => (p.$isScrolled ? 'blur(10px)' : 'none')};
  box-shadow: ${(p) => (p.$isScrolled ? 'var(--shadow-md)' : 'none')};
  transition: all 0.3s ease-in-out;
  padding: ${(p) => (p.$isScrolled ? '1rem 0' : '2rem 0')};
  border-bottom: ${(p) =>
    p.$isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  gap: 3rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const CompanyName = styled.div`
  font-size: 3.4rem;
  font-weight: 800;
  margin-left: 1.5rem;
  display: flex;
  gap: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1;
  text-decoration: none;

  .precise {
    color: orange;
  }

  .analytics {
    color: green;
  }

  ${media('<=tablet')} {
    font-size: 2.6rem;
>>>>>>> Stashed changes
  }
`;

const PageSubtitle = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  max-width: 80rem;
  margin: 0 auto;
  line-height: 1.6;

  ${media('<=tablet')} {
    font-size: 2rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
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

  ${media('<=tablet')} {
    padding: 2rem;
  }
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
  gap: 2rem;
`;

<<<<<<< Updated upstream
const BottomText = styled.div`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgb(var(--text));
  margin: 1rem 0 2rem;
`;

const ConsultButton = styled(Button)`
  align-self: center;
  background: rgb(255, 125, 0);
  color: white;
  font-weight: 600;
  padding: 1.2rem 3rem;
  font-size: 1.6rem;
  border: none;
  width: 100%;

  &:hover {
    background: rgb(255, 145, 20);
  }

  ${media('<=phone')} {
    width: 100%;
    margin-top: 1rem;
  }
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

  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: rgb(255, 165, 0);
      text-decoration: underline;
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
=======
const NavItem = styled.li`
  position: relative;

  a {
    text-decoration: none;
  }
`;

const NavLink = styled.div<{ $active: boolean }>`
  color: ${(p) => (p.$active ? 'rgb(var(--accent))' : 'rgb(var(--text))')};
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  ${media('<=desktop')} {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: rgb(var(--text));
  cursor: pointer;
  padding: 0;
  width: 3rem;
  height: 3rem;

  ${media('<=desktop')} {
    display: block;
  }
`;

const MobileNav = styled(motion.div)`
  background: rgba(var(--navbarBackground), 0.98);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 2rem 0;
  margin: 0;
`;

const MobileNavItem = styled(motion.li)`
  margin: 1.5rem 0;
`;

const MobileNavLink = styled.div<{ $active: boolean }>`
  font-size: 2rem;
  color: ${(p) => (p.$active ? 'rgb(var(--accent))' : 'rgb(var(--text))')};
  font-weight: 500;
  display: block;
  padding: 0.8rem 0;
  border-left: ${(p) => (p.$active ? '3px solid rgb(var(--accent))' : 'none')};
  padding-left: ${(p) => (p.$active ? '1rem' : '0')};
  cursor: pointer;
`;

const MobileButton = styled(Button)`
  width: 100%;
`;

const SBALogoContainer = styled.div`
  display: flex;
  align-items: center;
  ${media('<=desktop')} {
    display: none;
  }
`;

const SBALogo = styled(motion.img)`
  height: 6rem;
  width: auto;
  max-width: 10rem;
  object-fit: contain;

  ${media('<=tablet')} {
    height: 4rem;
  }
>>>>>>> Stashed changes
`;
