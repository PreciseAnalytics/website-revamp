import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import NextLink from 'next/link';
import { EnvVars } from 'env';
import { media } from 'utils/media';
import Button from 'components/Button';
import Container from 'components/Container';
import { HamburgerIcon } from 'components/HamburgerIcon';
import CloseIcon from 'components/CloseIcon';

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

// FIXED: Stable scroll hook that prevents infinite loops
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

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > threshold;
      
      // Only update if scroll direction changed significantly OR crossed threshold
      if (
        (shouldBeScrolled !== isScrolled) ||
        (Math.abs(scrollY - lastScrollY.current) > 10)
      ) {
        setIsScrolled(shouldBeScrolled);
        lastScrollY.current = scrollY;
      }
      
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    // Set initial state once
    const initialScrolled = window.scrollY > threshold;
    setIsScrolled(initialScrolled);
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, isClient]); // Removed isScrolled from dependencies

  return { isScrolled, isClient };
}

export default function AnimatedHeader() {
  const router = useRouter();
  
  // State variables - REMOVED modal states since we're using direct links now
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the FIXED scroll hook
  const { isScrolled, isClient } = useScrollTrigger(20);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // FIXED: Stable mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Server-side render version
  if (!isClient) {
    return (
      <HeaderWrapper $isScrolled={false}>
        <Container>
          <HeaderInner>
            <LeftSection>
              <NextLink href="/" legacyBehavior passHref>
                <LogoLink>
                  <CompanyLogo
                    src="/PA-logo.png"
                    alt="Precise Analytics"
                  />
                </LogoLink>
              </NextLink>
              <Nav>
                <NavList>
                  {LINKS.map((link) => (
                    <NavItem key={link.href}>
                      <NextLink href={link.href} legacyBehavior passHref>
                        <NavLink $active={false}>
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
                <NextLink href="/schedule-consult" legacyBehavior passHref>
                  <Button orange>Schedule a Consultation</Button>
                </NextLink>
              </ButtonContainer>
              <CertificationLogos>
                <CertificationLink 
                  href="https://dsbs.sba.gov/search/dsp_profile.cfm?SAM_UEI=ZRCYVLWCXL57"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View SBA VOSB Certification"
                >
                  <SBACertLogo
                    src="/Veteran-Owned-Certified.png"
                    alt="Veteran-Owned Certified"
                  />
                </CertificationLink>
                <CertificationLink 
                  href="https://directory.sbsd.virginia.gov/#/directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View SWaM Certification Directory"
                >
                  <SWAMCertLogo src="/SWAM_LOGO.jpg" alt="SWaM Certified" />
                </CertificationLink>
              </CertificationLogos>
              <MobileMenuButton onClick={toggleMobileMenu}>
                <HamburgerIcon />
              </MobileMenuButton>
            </RightSection>
          </HeaderInner>
        </Container>
      </HeaderWrapper>
    );
  }

  return (
    <>
      <HeaderWrapper $isScrolled={isScrolled}>
        <Container>
          <HeaderInner>
            <LeftSection>
              <NextLink href="/" legacyBehavior passHref>
                <LogoLink>
                  <CompanyLogo
                    src="/PA-logo.png"
                    alt="Precise Analytics"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </LogoLink>
              </NextLink>
              <Nav>
                <NavList>
                  {LINKS.map((link) => (
                    <NavItem key={link.href}>
                      <NextLink href={link.href} legacyBehavior passHref>
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
                <NextLink href="/schedule-consult" legacyBehavior passHref>
                  <Button orange>Schedule a Consultation</Button>
                </NextLink>
              </ButtonContainer>
              <CertificationLogos>
                {/* FIXED: Changed from buttons to direct links */}
                <CertificationLink 
                  href="https://dsbs.sba.gov/search/dsp_profile.cfm?SAM_UEI=ZRCYVLWCXL57"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View SBA VOSB Certification"
                >
                  <SBACertLogo
                    src="/Veteran-Owned-Certified.png"
                    alt="Veteran-Owned Certified"
                  />
                </CertificationLink>
                <CertificationLink 
                  href="https://directory.sbsd.virginia.gov/#/directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View SWaM Certification Directory"
                >
                  <SWAMCertLogo src="/SWAM_LOGO.jpg" alt="SWaM Certified" />
                </CertificationLink>
              </CertificationLogos>
              <MobileMenuButton onClick={toggleMobileMenu}>
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
                      <NextLink href={link.href} legacyBehavior passHref>
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
                    <NextLink href="/schedule-consult" legacyBehavior passHref>
                      <MobileButton accent>Schedule a Consultation</MobileButton>
                    </NextLink>
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

// Styled Components
const CertificationLink = styled.a`
  display: inline-block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid rgb(var(--accent));
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const LINKS = [
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: auto;
  gap: 1rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  gap: 0;

  &:hover {
    transform: scale(1.02);
  }
`;

const CompanyLogo = styled(motion.img)`
  height: auto;
  width: 200px;
  object-fit: contain;
  ${media.tablet} {
    width: 160px;
  }
`;

const CertificationLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  ${media.desktop} {
    display: none;
  }
`;

const SBACertLogo = styled.img`
  height: 85px;
  object-fit: contain;

  ${media.tablet} {
    height: 36px;
  }
`;

const SWAMCertLogo = styled.img`
  height: 85px;
  object-fit: contain;
  background-color: white;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    height: 50px;
  }
`;

const Nav = styled.nav`
  ${media.desktop} {
    display: none;
  }
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

  a {
    text-decoration: none;
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
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

const ButtonContainer = styled.div`
  ${media.desktop} {
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

  ${media.desktop} {
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

const MobileNavLink = styled.a<{ $active: boolean }>`
  font-size: 2rem;
  color: ${(p) => (p.$active ? 'rgb(var(--accent))' : 'rgb(var(--text))')};
  font-weight: 500;
  display: block;
  padding: 0.8rem 0;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: rgb(var(--accent));
  }
`;

const MobileButton = styled(Button)`
  width: 100%;
`;