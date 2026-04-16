import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  FacebookIcon, 
  LinkedinIcon
} from 'react-share';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Container from 'components/Container';
import AnimatedLogo from 'components/AnimatedLogo';
import { media } from 'utils/media';
import { EnvVars } from 'env';
import { usePrivacyPolicyContext } from 'contexts/privacy-policy.context';



// Footer navigation structure with clickable category headers
const footerNavigation = {
  solutions: {
    title: 'Solutions',
    href: '/solutions',
    links: [
      { name: 'ETL & Data Integration', href: '/solutions' },
      { name: 'Custom Dashboards', href: '/solutions' },
      { name: 'AI & ML Solutions', href: '/solutions' },
      { name: 'Data Strategy', href: '/solutions' },
    ]
  },
  sectors: {
    title: 'Sectors',
    href: '/sectors',
    links: [
      { name: 'All Sectors', href: '/sectors' },
      { name: 'Healthcare', href: '/sectors/healthcare' },
      { name: 'Manufacturing', href: '/sectors/manufacturing' },
      { name: 'Finance', href: '/sectors/finance' },
      { name: 'Retail', href: '/sectors/retail' },
    ]
  },
  company: {
    title: 'Company',
    href: '/about-us',
    links: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Our Team', href: '/about-us/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Schedule a Consult', href: '/schedule-consult' },
      { name: 'Capabilities Statement', href: '/capabilities-statement' },
    ]
  },
  legal: {
    title: 'Legal',
    href: null,
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookies Policy', href: '/cookies-policy' },
    ]
  }
};

// Updated certification badges
const certifications = [
  { name: 'NIST Cybersecurity Framework', image: '/certifications/nist.svg', href: '/certifications' },
  { name: 'HIPAA', image: '/certifications/hipaa.svg', href: '/certifications' },
  { name: 'ITAR/EAR', image: '/certifications/itar.svg', href: '/certifications' },
  { name: 'ISO/IEC 27001', image: '/certifications/iso-27001.svg', href: '/certifications' },
  { name: 'SOC 2 Type II', image: '/certifications/soc2.svg', href: '/certifications' },
  { name: 'CMMI', image: '/CMMI_LOGO.png', href: '/certifications' },
  { name: 'FedRAMP', image: '/fedramp-logo-vert.svg', href: '/certifications' },
  { name: 'Small Business', image: '/sba-logo.png', href: '/certifications' },
  { name: 'SWAM Certified', image: '/SWAM_LOGO.jpg', href: '/certifications' },
];

export default function AnimatedFooter() {
  const router = useRouter();
  const { openPrivacyPolicy } = usePrivacyPolicyContext();
  const [hoveredSocialIcon, setHoveredSocialIcon] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Navigation handlers using router.push
  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleCertificationClick = (href: string) => {
    router.push(href);
  };

  return (
    <FooterWrapper
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <GradientTop />
      
      <FooterPane>
        <FooterContent>
          <CompanySection>
            <LogoSection>
              <LogoContainer onClick={() => handleNavigation('/')}>
                <FooterLogo src="/PA-logo.png" alt="Precise Analytics" />
              </LogoContainer>
            </LogoSection>
            
            <CompanyDescription>
              Transforming complex data into actionable insights through cutting-edge analytics,
              custom dashboards, and AI/ML technologies.
            </CompanyDescription>
          </CompanySection>
          
          <NavSection>
            {Object.entries(footerNavigation).map(([category, categoryData], categoryIndex) => (
              <NavColumn key={category}>
                {categoryData.href ? (
                  <CategoryTitleLink
                    onClick={() => handleNavigation(categoryData.href!)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * categoryIndex }}
                  >
                    {categoryData.title}
                    <CategoryTitleUnderline
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CategoryTitleLink>
                ) : (
                  <CategoryTitle
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * categoryIndex }}
                  >
                    {categoryData.title}
                  </CategoryTitle>
                )}
                <NavLinks>
                  {categoryData.links.map((link, linkIndex) => (
                    <NavLinkItem
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * linkIndex + 0.2 * categoryIndex }}
                    >
                      <NavLinkText onClick={() => handleNavigation(link.href)}>
                        {link.name}
                        <NavLinkUnderline
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </NavLinkText>
                    </NavLinkItem>
                  ))}
                </NavLinks>
              </NavColumn>
            ))}

            {/* Contact Column */}
            <NavColumn>
              <CategoryTitle
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Contact
              </CategoryTitle>
              <NavLinks>
                <NavLinkItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}>
                  <ContactLinkItem href={`mailto:${EnvVars.CONTACT_EMAIL}`}>
                    📧 {EnvVars.CONTACT_EMAIL}
                  </ContactLinkItem>
                </NavLinkItem>
                <NavLinkItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.15 }}>
                  <ContactLinkItem href={`tel:${EnvVars.PHONE.replace(/\s+/g, '')}`}>
                    📞 {EnvVars.PHONE}
                  </ContactLinkItem>
                </NavLinkItem>
                <NavLinkItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.2 }}>
                  <ContactLinkItem href="https://www.linkedin.com/company/precise-analytics-llc/" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon size={20} round={true} style={{ verticalAlign: 'middle', marginRight: '0.6rem' }} />
                    LinkedIn
                  </ContactLinkItem>
                </NavLinkItem>
                <NavLinkItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.25 }}>
                  <ContactLinkItem href="https://www.facebook.com/PreciseAnalyticsLLC/" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon size={20} round={true} style={{ verticalAlign: 'middle', marginRight: '0.6rem' }} />
                    Facebook
                  </ContactLinkItem>
                </NavLinkItem>
                <NavLinkItem initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 }}>
                  <ContactLinkItem href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
                    <GithubIcon aria-hidden="true" />
                    GitHub
                  </ContactLinkItem>
                </NavLinkItem>
              </NavLinks>
            </NavColumn>
          </NavSection>
        </FooterContent>

        {/* Certifications — same pane, compact strip */}
        <CertStrip>
          <CertStripLabel>Certifications &amp; Partnerships</CertStripLabel>
          <CertLogoRow>
            {certifications.map((cert, index) => (
              <CertLogo
                key={cert.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.08 }}
                onClick={() => handleCertificationClick(cert.href)}
                title={cert.name}
              >
                <CertificationImage src={cert.image} alt={cert.name} />
                <CertName>{cert.name}</CertName>
              </CertLogo>
            ))}
          </CertLogoRow>
        </CertStrip>

      </FooterPane>

      <Container>
        <BottomBar>
          <Copyright>
            &copy; {new Date().getFullYear()} {EnvVars.SITE_NAME} | 
            <BottomLink onClick={() => handleNavigation('/privacy-policy')}>
              Privacy Policy
            </BottomLink> | 
            <BottomLink onClick={() => handleNavigation('/cookies-policy')}>
              Cookies Policy
            </BottomLink>
          </Copyright>
        </BottomBar>
      </Container>

    
      {showBackToTop && (
        <BackToTopButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowIcon viewBox="0 0 24 24">
            <path d="M12 5l7 7-1.4 1.4L13 8.8V19h-2V8.8L6.4 13.4 5 12l7-7z" />
          </ArrowIcon>
        </BackToTopButton>
      )}
    </FooterWrapper>
  );
}

// Footer Styled Components
const FooterWrapper = styled(motion.footer)`
  position: relative;
  background: linear-gradient(180deg, rgba(var(--navbarBackground), 0.9) 0%, rgb(var(--secondBackground)) 100%);
  padding: 8rem 0 4rem;
  color: rgb(var(--text));
  overflow: hidden;
  border-top: 1px solid rgba(var(--accent), 0.1);
  margin-top: 10rem;
`;

const GradientTop = styled.div`
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(90deg, rgba(var(--primary), 0.8), rgba(var(--accent), 0.8));
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4rem;
  align-items: flex-start;

  ${media.desktop(`
    flex-wrap: wrap;
    gap: 3rem;
  `)}
`;

const FooterPane = styled.div`
  max-width: 160rem;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${media.desktop(`padding: 4rem 3rem 3rem;`)}
  ${media.tablet(`padding: 3rem 2rem 2rem;`)}
`;

const CompanySection = styled.div`
  flex: 0 0 22rem;
  min-width: 0;

  ${media.desktop(`
    flex: 0 0 100%;
  `)}
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 1.5rem;
  min-width: 0;

  ${media.tablet(`
    flex-wrap: wrap;
    flex-direction: column;
  `)}
`;

const LogoSection = styled.div`
  margin-bottom: 2rem;
`;

const FooterLogo = styled.img`
  height: auto;
  width: 15rem;
  object-fit: contain;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

const CompanyName = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-left: 1.5rem;
  display: flex;
  gap: 0.5rem;
  color: rgb(var(--text));
  transition: color 0.3s ease;

  ${LogoContainer}:hover & {
    color: rgb(var(--accent));
  }

  ${media.tablet(`
    font-size: 2rem;
  `)}
`;

const AccentText = styled.span`
  color: rgb(var(--accent));
`;

const CompanyDescription = styled.p`
  font-size: 1.6rem;
  margin-bottom: 2.5rem;
  max-width: 42rem;
  opacity: 0.85;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  margin-bottom: 2.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    background: rgba(var(--accent), 0.1);
    color: rgb(var(--accent));
    font-size: 1.8rem;
  }

  a {
    color: rgb(var(--text));
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: rgb(var(--accent));
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
`;

const SocialIconWrapper = styled(motion.div)`
  position: relative;
`;

const SocialIconLink = styled.a`
  display: flex;
  text-decoration: none;
  
  svg {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
`;

const SocialIconHoverEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: rgb(var(--accent));
  z-index: -1;
`;

const NavColumn = styled.div`
  flex: 1;
  min-width: 0;

  ${media.tablet(`
    flex: unset;
    margin-bottom: 2rem;
  `)}
`;

const CategoryTitle = styled(motion.h4)`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(var(--accent), 0.3);
  padding-bottom: 0.5rem;
  display: inline-block;
`;

const CategoryTitleLink = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(var(--accent), 0.3);
  padding-bottom: 0.5rem;
  display: inline-block;
  color: rgb(var(--text));
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: rgb(var(--accent));
  }
`;

const CategoryTitleUnderline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: rgb(var(--accent));
  transform-origin: left;
`;

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavLinkItem = styled(motion.li)`
  margin-bottom: 1rem;
`;

const NavLinkText = styled.div`
  color: rgb(var(--text));
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  cursor: pointer;
  
  &:hover {
    color: rgb(var(--accent));
  }
`;

const NavLinkUnderline = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: rgb(var(--accent));
  transform-origin: left;
`;

const CertStrip = styled.div`
  border-top: 1px solid rgba(var(--text), 0.1);
  padding-top: 3rem;
`;

const CertStripLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(var(--text), 0.4);
  margin-bottom: 2rem;
`;

const CertLogoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
`;

const CertLogo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  width: 10rem;
`;

const CertificationImage = styled.img`
  height: 5.5rem;
  width: auto;
  max-width: 9rem;
  object-fit: contain;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background: white;
  padding: 0.4rem 0.6rem;
`;

const CertName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(var(--text), 0.6);
  text-align: center;
  line-height: 1.3;
  transition: color 0.2s ease;

  ${CertLogo}:hover & {
    color: rgb(var(--accent));
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  font-size: 1.4rem;
  
  ${media.tablet(`
    flex-direction: column;
    gap: 1.5rem;
  `)}
`;

const Copyright = styled.div`
  opacity: 0.8;
`;

const BottomLink = styled.span`
  color: rgb(var(--text));
  opacity: 0.8;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-left: 8px;
  
  &:hover {
    color: rgb(var(--accent));
    opacity: 1;
  }
`;

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: rgba(var(--accent), 0.15);
  border: 2px solid rgba(var(--accent), 0.3);
  color: rgb(var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(var(--accent), 0.15);
  
  &:hover {
    background: rgba(var(--accent), 0.2);
  }
  
  ${media.tablet(`
    right: 2rem;
    bottom: 2rem;
    width: 4.5rem;
    height: 4.5rem;
  `)}
`;

const ArrowIcon = styled.svg`
  width: 2.4rem;
  height: 2.4rem;
  fill: currentColor;
`;

const ContactLinkItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  color: rgb(var(--text));
  font-size: 1.35rem;
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-word;
  overflow-wrap: anywhere;
  line-height: 1.4;

  &:hover {
    color: rgb(var(--accent));
  }
`;

const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ marginRight: '0.6rem', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);