import styled from 'styled-components';
import { media } from 'utils/media';
import Link from 'next/link';
import Container from 'components/Container';
import Image from 'next/image';
import AnimatedLogo from 'components/AnimatedLogo';

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          {/* Company Info */}
          <FooterSection>
            <LogoArea>
              <Logo href="/">
                <span className="sr-only">Home</span>
                <AnimatedLogo size="8rem" />
              </Logo>
              <Tagline>
                End-to-end data engineering, BI, and AI delivery for government and commercial clients — from raw pipeline to production.
              </Tagline>
              <CertBadges>
                <CertBadge>
                  <Image
                    src="/Veteran-Owned-Certified.png"
                    alt="VOSB Certified"
                    width={70}
                    height={46}
                    style={{ objectFit: 'contain' }}
                  />
                </CertBadge>
                <CertBadge>
                  <Image
                    src="/SWAM_LOGO.jpg"
                    alt="SWaM Certified"
                    width={70}
                    height={46}
                    style={{ objectFit: 'contain' }}
                  />
                </CertBadge>
              </CertBadges>
              <CertText>GSA Schedule Holder &nbsp;·&nbsp; NAICS Compliance</CertText>
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

          {/* Services */}
          <FooterSection>
            <SectionTitle>Services</SectionTitle>
            <FooterLinks>
              <FooterLink href="/services">All Services</FooterLink>
              <FooterLink href="/services/data-strategy">Data Strategy</FooterLink>
              <FooterLink href="/services/business-intelligence">Business Intelligence</FooterLink>
              <FooterLink href="/services/predictive-analytics">Predictive Analytics</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Work & Insights */}
          <FooterSection>
            <SectionTitle>Work</SectionTitle>
            <FooterLinks>
              <FooterLink href="/work/federal-healthcare-pipeline">Federal Healthcare Pipeline</FooterLink>
              <FooterLink href="/work/financial-services-reporting">Financial Services Reporting</FooterLink>
              <FooterLink href="/work/ai-training-at-scale">AI Training at Scale</FooterLink>
              <FooterLink href="/insights">Insights Blog</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <SectionTitle>Company</SectionTitle>
            <FooterLinks>
              <FooterLink href="/about-us">About Us</FooterLink>
              <FooterLink href="/team">Our Team</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/schedule-consult">Schedule a Consult</FooterLink>
              <FooterLink href="/capabilities-statement">Capabilities Statement</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/assessment">Data Maturity Assessment</FooterLink>
              <FooterLink href="/compare">How We Compare →</FooterLink>
            </FooterLinks>
          </FooterSection>

          {/* Legal */}
          <FooterSection>
            <SectionTitle>Legal</SectionTitle>
            <FooterLinks>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
              <FooterLink href="/cookies-policy">Cookies Policy</FooterLink>

              {/* ✅ Cookie Preferences */}
              <CookiePreferencesButton
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event('open-cookie-preferences'));
                }}
              >
                Cookie Preferences
              </CookiePreferencesButton>
            </FooterLinks>
          </FooterSection>
        </FooterContent>

        {/* Social Links */}
        <SocialSection>
          <SocialLinks>
            <SocialLink href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
              <SocialIcon>𝕏</SocialIcon>
            </SocialLink>
            <SocialLink href="https://facebook.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
              <SocialIcon>f</SocialIcon>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/precise-analytics-llc/" target="_blank" rel="noopener noreferrer">
              <SocialIcon>in</SocialIcon>
            </SocialLink>
          </SocialLinks>
        </SocialSection>

        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} Precise Analytics. Veteran-Owned Small Business. &nbsp;·&nbsp; GSA Schedule Holder &nbsp;·&nbsp; NAICS Compliant &nbsp;·&nbsp; Security Clearance Ready
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
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 4rem;
  margin-bottom: 6rem;

  ${media.desktop(`grid-template-columns: 2fr 1fr 1fr;`)}
  ${media.tablet(`
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  `)}
  ${media.phone(`
    grid-template-columns: 1fr;
    gap: 3rem;
  `)}
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
`;

const LogoImage = styled.div``;

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
  text-transform: uppercase;
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

  &:hover {
    color: #39ff14;
    transform: translateX(4px);
  }
`;

const CookiePreferencesButton = styled.button`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.75);
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;

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
`;

const SocialIcon = styled.span``;

const BottomBar = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

const Copyright = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CertBadges = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-top: 1.8rem;
  flex-wrap: wrap;
`;

const CertBadge = styled.div`
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
`;

const CertText = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.8rem;
  letter-spacing: 0.03em;
`;
