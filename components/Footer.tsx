import styled from 'styled-components';
import { media } from 'utils/media';
import Link from 'next/link';
import Container from 'components/Container';
import Image from 'next/image';

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          {/* Company Info */}
          <FooterSection>
            <LogoArea>
              <Logo href="/">
                <LogoImage>
                  <Image
                    src="/logo.png"
                    alt="Precise Analytics"
                    width={180}
                    height={60}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </LogoImage>
              </Logo>
              <Tagline>
                Transforming complex data into actionable insights through cutting-edge analytics,
                advanced analytics, custom dashboards, and AI/ML technologies.
              </Tagline>
            </LogoArea>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>✉</ContactIcon>
                <a href="mailto:contact@preciseanalytics.io">contact@preciseanalytics.io</a>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <a href="tel:+18043964148">+1 (804) 396-4148</a>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          {/* Services - FIXED LINKS */}
          <FooterSection>
            <SectionTitle>Services</SectionTitle>
            <FooterLinks>
              <FooterLink href="/services">All Services</FooterLink>
              <FooterLink href="/services/data-strategy">Data Strategy</FooterLink>
              <FooterLink href="/services/business-intelligence">Business Intelligence</FooterLink>
              <FooterLink href="/services/predictive-analytics">Predictive Analytics</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Industries - FIXED LINKS */}
          <FooterSection>
            <SectionTitle>Industries</SectionTitle>
            <FooterLinks>
              <FooterLink href="/services">View Services</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <SectionTitle>Company</SectionTitle>
            <FooterLinks>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/schedule-consult">Schedule a Consult</FooterLink>
              <FooterLink href="/capabilities-statement">Capabilities Statement</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Legal */}
          <FooterSection>
            <SectionTitle>Legal</SectionTitle>
            <FooterLinks>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
              <FooterLink href="/cookies-policy">Cookies Policy</FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        {/* Social Links */}
        <SocialSection>
          <SocialLinks>
            <SocialLink href="https://twitter.com/preciseanalytics" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <SocialIcon>𝕏</SocialIcon>
            </SocialLink>
            <SocialLink href="https://facebook.com/preciseanalytics" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <SocialIcon>f</SocialIcon>
            </SocialLink>
            <SocialLink href="https://linkedin.com/company/preciseanalytics" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SocialIcon>in</SocialIcon>
            </SocialLink>
          </SocialLinks>
        </SocialSection>

        {/* Bottom Bar */}
        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Precise Analytics LLC. All rights reserved.
          </Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

/* ================= STYLES ================= */

const FooterWrapper = styled.footer`
  background: linear-gradient(
    to bottom,
    rgb(var(--background)),
    rgba(15, 23, 42, 1)
  );
  padding: 8rem 0 3rem;
  border-top: 1px solid rgba(57, 255, 20, 0.15);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(57, 255, 20, 0.5),
      transparent
    );
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 4rem;
  margin-bottom: 6rem;

  ${media?.desktop?.(
    `grid-template-columns: 2fr 1fr 1fr;`
  ) || ''}

  ${media?.tablet?.(
    `
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    `
  ) || ''}

  ${media.phone(
  `
  grid-template-columns: 1fr;
  gap: 3rem;
`
)}
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LogoArea = styled.div`
  margin-bottom: 2rem;
`;

const Logo = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoImage = styled.div`
  position: relative;
  width: auto;
  height: auto;
`;

const Tagline = styled.p`
  font-size: 1.45rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  max-width: 35rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;

  a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #39ff14;
    }
  }
`;

const ContactIcon = styled.span`
  font-size: 1.8rem;
  color: #ff8c2b;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled(Link)`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;

  &:hover {
    color: #39ff14;
    transform: translateX(4px);
  }
`;

const SocialSection = styled.div`
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

const SocialLink = styled.a`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: rgba(57, 255, 20, 0.1);
  border: 2px solid rgba(57, 255, 20, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #39ff14;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #39ff14;
    color: #0b1220;
    border-color: #39ff14;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(57, 255, 20, 0.4);
  }
`;

const SocialIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomBar = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

const Copyright = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.6);
`;