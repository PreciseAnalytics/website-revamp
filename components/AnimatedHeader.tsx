import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { media } from 'utils/media';
import Button from 'components/Button';
import Container from 'components/Container';
import { HamburgerIcon } from './HamburgerIcon';
import CloseIcon from 'components/CloseIcon';

const LINKS = [
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Capabilities Statement', href: '/capabilities-statement' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

const HeaderWrapper = styled.header<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: var(--z-navbar);
  background: ${(p) => p.$isScrolled ? 'rgba(var(--navbarBackground), 0.8)' : 'rgba(var(--navbarBackground), 0)'};
  backdrop-filter: ${(p) => (p.$isScrolled ? 'blur(10px)' : 'none')};
  box-shadow: ${(p) => (p.$isScrolled ? 'var(--shadow-md)' : 'none')};
  transition: all 0.3s ease-in-out;
  padding: ${(p) => (p.$isScrolled ? '1rem 0' : '2rem 0')};
  border-bottom: ${(p) => (p.$isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none')};
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0 0.5rem;

  ${media.tablet(`
    display: none;
  `)}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  gap: 0;

  &:hover {
    transform: scale(1.02);
  }
`;

const CompanyLogo = styled(motion.img)`
  height: auto;
  width: 320px;
  object-fit: contain;

  ${media.tablet(`
    width: 200px;
  `)}
`;

const Nav = styled.nav`
  ${media.tablet(`
    display: none;
  `)}
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLinkText = styled.span<{ $active: boolean }>`
  color: ${(p) => (p.$active ? 'rgb(var(--accent))' : 'rgb(var(--text))')};
  font-weight: 600;
  font-size: 1.6rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: rgb(var(--accent));
  }
`;

// NEW: Phone Number Link Styled Component
const PhoneLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgb(255, 125, 0); /* Neon orange */
  font-weight: 700;
  font-size: 2rem;
  text-decoration: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  background: rgba(255, 125, 0, 0.1);
  border: 2px solid rgba(255, 125, 0, 0.3);
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 125, 0, 0.2);
    border-color: rgb(255, 125, 0);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.4);
  }

  svg {
    width: 2.25rem;
    height: 2.25rem;
    fill: currentColor;
  }
`;

const ButtonContainer = styled.div`
  ${media.tablet(`
    display: none;
  `)}
`;

const ScheduleButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 0.8rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 125, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CertificationLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  ${media.tablet(`
    display: none;
  `)}
`;

const CertificationLink = styled.a`
  display: inline-block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SBACertLogo = styled.img`
  height: 85px;
  object-fit: contain;

  ${media.tablet(`
    height: 36px;
  `)}
`;

const SWAMCertLogo = styled.img`
  height: 85px;
  object-fit: contain;
  background-color: white;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  ${media.tablet(`
    height: 50px;
  `)}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: rgba(var(--accent), 0.08);
  border: 2px solid rgba(var(--accent), 0.2);
  border-radius: 1.2rem;
  color: rgb(var(--text));
  cursor: pointer;
  padding: 1.2rem;
  width: 6rem;
  height: 6rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  ${media.tablet(`
    display: flex;
    align-items: center;
    justify-content: center;
  `)}
`;

const MenuIconWrapper = styled.div`
  svg, 
  > * {
    width: 2.8rem !important;
    height: 2.8rem !important;
    transform: scale(1.4);
  }
`;

const MobileNav = styled(motion.div)`
  background: rgba(var(--navbarBackground), 0.98);
  backdrop-filter: blur(10px);
`;

const MobileNavList = styled.ul`
  list-style: none;
  padding: 2rem 0;
  margin: 0;
`;

const MobileNavItem = styled(motion.li)`
  margin: 1.5rem 0;
`;

const MobileNavLinkText = styled.span<{ $active: boolean }>`
  font-size: 2rem;
  color: ${(p) => (p.$active ? 'rgb(var(--accent))' : 'rgb(var(--text))')};
  font-weight: 500;
  display: block;
  padding: 0.8rem 0;
  cursor: pointer;

  &:hover {
    color: rgb(var(--accent));
  }
`;

// NEW: Mobile Phone Link Styled Component
const MobilePhoneLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem 2.4rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 0.8rem;
  background: rgba(255, 125, 0, 0.15);
  border: 2px solid rgba(255, 125, 0, 0.4);
  color: rgb(255, 125, 0); /* Neon orange */
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: rgba(255, 125, 0, 0.25);
    border-color: rgb(255, 125, 0);
    box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: currentColor;
  }
`;

const MobileScheduleButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 0.8rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  box-shadow: 0 4px 12px rgba(255, 125, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 125, 0, 0.4);
  }
`;

function useScrollTrigger(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > threshold;
      if ((shouldBeScrolled !== isScrolled) || Math.abs(scrollY - lastScrollY.current) > 10) {
        setIsScrolled(shouldBeScrolled);
        lastScrollY.current = scrollY;
      }
      ticking.current = false;
    };
    
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };
    
    setIsScrolled(window.scrollY > threshold);
    lastScrollY.current = window.scrollY;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, isClient, isScrolled]);

  return { isScrolled, isClient };
}

export default function AnimatedHeader() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, isClient } = useScrollTrigger(20);

  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);

  const toggleMobileMenu = () => setIsMenuOpen(prev => !prev);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleScheduleClick = () => {
    router.push('/schedule-consult');
  };

  return (
    <>
      <HeaderWrapper $isScrolled={isScrolled}>
        <Container>
          <HeaderContent>
            <HeaderInner>
              <LeftSection>
                <LogoContainer onClick={handleLogoClick} aria-label="Precise Analytics Homepage">
                  <CompanyLogo src="/PA-logo.png" alt="Precise Analytics" />
                </LogoContainer>
                <Nav>
                  <NavList>
                    {LINKS.map(link => (
                      <NavItem key={link.href}>
                        <NavLinkText 
                          $active={router.pathname === link.href}
                          onClick={() => handleNavClick(link.href)}
                        >
                          {link.label}
                        </NavLinkText>
                      </NavItem>
                    ))}
                  </NavList>
                </Nav>
              </LeftSection>

              <RightSection>
                <ButtonContainer>
                  <ScheduleButtonContainer onClick={handleScheduleClick}>
                    Schedule a Consultation
                  </ScheduleButtonContainer>
                </ButtonContainer>

                {isClient && (
                  <CertificationLogos>
                    <CertificationLink
                      href="https://search.certifications.sba.gov/profile/ZRCYVLWCXL57/9YR68?page=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View SBA Certification"
                    >
                      <SBACertLogo src="/Veteran-Owned-Certified.png" alt="Veteran-Owned Certified" />
                    </CertificationLink>
                    <CertificationLink
                      href="https://directory.sbsd.virginia.gov/#/directory"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View SWaM Certification"
                    >
                      <SWAMCertLogo src="/SWAM_LOGO.jpg" alt="SWaM Certified" />
                    </CertificationLink>
                  </CertificationLogos>
                )}

                <MobileMenuButton onClick={toggleMobileMenu}>
                  <MenuIconWrapper>
                    {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                  </MenuIconWrapper>
                </MobileMenuButton>
              </RightSection>
            </HeaderInner>

            <CenterSection>
              {/* Phone Number Centered on Its Own Line */}
              <PhoneLink href="tel:+18043964148" aria-label="Call Precise Analytics">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                (804) 396-4148
              </PhoneLink>
            </CenterSection>
          </HeaderContent>
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
                  {/* NEW: Phone Number at Top of Mobile Menu */}
                  <MobileNavItem
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0 }}
                  >
                    <MobilePhoneLink href="tel:+18043964148" aria-label="Call Precise Analytics">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                      Call: (804) 396-4148
                    </MobilePhoneLink>
                  </MobileNavItem>

                  {LINKS.map((link, i) => (
                    <MobileNavItem
                      key={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (i + 1) * 0.1 }}
                    >
                      <MobileNavLinkText 
                        $active={router.pathname === link.href}
                        onClick={() => handleNavClick(link.href)}
                      >
                        {link.label}
                      </MobileNavLinkText>
                    </MobileNavItem>
                  ))}
                  <MobileNavItem
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (LINKS.length + 1) * 0.1 }}
                  >
                    <MobileScheduleButtonContainer onClick={handleScheduleClick}>
                      Schedule a Consultation
                    </MobileScheduleButtonContainer>
                  </MobileNavItem>
                </MobileNavList>
              </Container>
            </MobileNav>
          )}
        </AnimatePresence>
      </HeaderWrapper>
    </>
  );
}