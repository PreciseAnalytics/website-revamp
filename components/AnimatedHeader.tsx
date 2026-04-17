import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { EnvVars } from 'env';
import { media } from 'utils/media';
import Button from 'components/Button';
import Container from 'components/Container';
import AnimatedLogo from 'components/AnimatedLogo';
import { HamburgerIcon } from './HamburgerIcon';
import CloseIcon from 'components/CloseIcon';

const LINKS = [
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Capabilities Statement', href: '/capabilities-statement' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'AI Workforce Solutions', href: '/ai-training', badge: 'NEW' },
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
  padding: ${(p) => (p.$isScrolled ? '0.4rem 0' : '0.65rem 0')};
  border-bottom: ${(p) => (p.$isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none')};
`;

const HeaderPane = styled(Container)`
  max-width: 140rem;
  padding: 0 3rem;

  ${media.desktop(`
    padding: 0 3rem;
  `)}

  ${media.tablet(`
    padding: 0 2rem;
  `)}
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  min-width: 0;

  ${media.desktop(`
    gap: 1.5rem;
  `)}
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
  flex-shrink: 0;

  ${media.desktop(`
    gap: 1.2rem;
  `)}
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


const Nav = styled.nav`
  flex: 1;
  ${media.tablet(`
    display: none;
  `)}
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 0.8rem;
  gap: 0.8rem;

  ${media.desktop(`
    gap: 1.2rem;
  `)}
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
  white-space: nowrap;

  &:hover {
    color: rgb(var(--accent));
  }

  ${media.desktop(`
    font-size: 1.45rem;
  `)}
`;

const NavLinkHighlight = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #111;
  font-weight: 800;
  font-size: 1.6rem;
  padding: 0.4rem 1rem;
  border-radius: 0.6rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);

  &:hover {
    background: #f5f5f5;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  ${media.desktop(`
    font-size: 1.45rem;
    padding: 0.35rem 0.8rem;
  `)}
`;

const NavBadge = styled.span`
  background: #ff8c2b;
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 0.15rem 0.5rem;
  border-radius: 0.4rem;
  text-transform: uppercase;
  line-height: 1.4;
`;

const MobileNavLinkHighlight = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: #111;
  font-weight: 800;
  font-size: 1.8rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.6rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
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

  ${media.desktop(`
    padding: 1rem 1.8rem;
    font-size: 1.45rem;
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

const AuthBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LoginBtn = styled.button`
  padding: 0.7rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  background: transparent;
  color: rgb(var(--text));
  border: 1.5px solid rgba(var(--text), 0.25);
  border-radius: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
  &:hover { border-color: rgba(var(--text), 0.6); }
`;

const RegisterBtn = styled.button`
  padding: 0.7rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  &:hover { background: rgb(230, 100, 0); }
`;

const UserMenuWrapper = styled.div`
  position: relative;
`;

const UserMenuBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: rgba(var(--text), 0.06);
  border: 1.5px solid rgba(var(--text), 0.15);
  border-radius: 2rem;
  padding: 0.5rem 1.2rem 0.5rem 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: rgba(var(--text), 0.1); }
`;

const UserAvatar = styled.span`
  width: 3rem; height: 3rem;
  border-radius: 50%;
  background: rgb(255, 125, 0);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const UserName = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const UserChevron = styled.span`
  font-size: 1rem;
  color: rgba(var(--text), 0.5);
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.8rem);
  right: 0;
  background: rgb(var(--cardBackground));
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  min-width: 20rem;
  overflow: hidden;
  z-index: 9999;
`;

const UserDropdownName = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  padding: 1.4rem 1.6rem 0.2rem;
`;

const UserDropdownEmail = styled.p`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.5);
  padding: 0 1.6rem 1.2rem;
`;

const UserDropdownDivider = styled.div`
  height: 1px;
  background: rgba(var(--text), 0.08);
  margin: 0;
`;

const UserDropdownItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 1.1rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: rgb(var(--text));
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: rgba(var(--text), 0.06); }
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
  const { isScrolled } = useScrollTrigger(20);

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
        <HeaderPane>
          <HeaderContent>
            <HeaderInner>
              <LeftSection>
                <LogoContainer onClick={handleLogoClick} aria-label="Precise Analytics Homepage">
                  <AnimatedLogo size="8.5rem" />
                </LogoContainer>
                <Nav>
                  <NavList>
                    {LINKS.map(link => (
                      <NavItem key={link.href}>
                        {link.badge ? (
                          <NavLinkHighlight
                            $active={router.pathname === link.href}
                            onClick={() => handleNavClick(link.href)}
                          >
                            {link.label}
                            <NavBadge>{link.badge}</NavBadge>
                          </NavLinkHighlight>
                        ) : (
                          <NavLinkText
                            $active={router.pathname === link.href}
                            onClick={() => handleNavClick(link.href)}
                          >
                            {link.label}
                          </NavLinkText>
                        )}
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

                <MobileMenuButton onClick={toggleMobileMenu}>
                  <MenuIconWrapper>
                    {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                  </MenuIconWrapper>
                </MobileMenuButton>
              </RightSection>
            </HeaderInner>

          </HeaderContent>
        </HeaderPane>
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
                      transition={{ duration: 0.3, delay: (i + 1) * 0.1 }}
                    >
                      {link.badge ? (
                        <MobileNavLinkHighlight
                          $active={router.pathname === link.href}
                          onClick={() => handleNavClick(link.href)}
                        >
                          {link.label}
                          <NavBadge>{link.badge}</NavBadge>
                        </MobileNavLinkHighlight>
                      ) : (
                        <MobileNavLinkText
                          $active={router.pathname === link.href}
                          onClick={() => handleNavClick(link.href)}
                        >
                          {link.label}
                        </MobileNavLinkText>
                      )}
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
