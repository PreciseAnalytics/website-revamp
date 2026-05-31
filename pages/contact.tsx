import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';
import Hero from 'views/ContactPage/Hero';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Precise Analytics | Data Engineering & AI | Federal & Commercial</title>
        <meta
          name="description"
          content="Contact Precise Analytics to discuss data engineering, BI, AI/ML solutions, or AI training labor. We respond within 4 business hours."
        />
        <meta property="og:title" content="Contact Precise Analytics | Data Engineering & AI" />
        <meta property="og:description" content="Contact a data engineering and AI delivery firm. Schedule a free consultation today." />
        <meta property="og:type" content="website" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />

        <PullQuoteSection>
          <PullQuote>
            &ldquo;Precise Analytics didn&apos;t just recommend changes — they deployed a working pipeline that reduced our latency by 40%.&rdquo;
          </PullQuote>
          <PullQuoteAttribution>Director of Data Engineering, Federal Health Agency</PullQuoteAttribution>
        </PullQuoteSection>

        <ContactIntro>
          <p>
            Precise Analytics is a data engineering and AI firm serving federal agencies, financial institutions, and AI platform companies. Whether you need to modernize your data infrastructure, build live dashboards, deploy AI/ML, or scale your annotation team — we build it, surface it, and automate it. Reach out to schedule a free consultation. We respond to all inquiries within 4 business hours.
          </p>
        </ContactIntro>

        <QualSection>
          <QualTitle>Tell us what you&apos;re working on</QualTitle>
          <QualGrid>
            <QualField>
              <QualLabel htmlFor="contact-service">I&apos;m interested in...</QualLabel>
              <QualSelect id="contact-service" name="service" defaultValue="">
                <option value="" disabled>Select a service area</option>
                <option value="data-engineering">Data Engineering</option>
                <option value="business-intelligence">Business Intelligence</option>
                <option value="ai-ml">AI &amp; Machine Learning</option>
                <option value="ai-training-labor">AI Training Labor</option>
                <option value="multiple">Multiple Services</option>
                <option value="not-sure">Not Sure Yet</option>
              </QualSelect>
            </QualField>
            <QualField>
              <QualLabel htmlFor="contact-timeline">My timeline is...</QualLabel>
              <QualSelect id="contact-timeline" name="timeline" defaultValue="">
                <option value="" disabled>Select your timeline</option>
                <option value="immediate">Immediate</option>
                <option value="3-6-months">3–6 months</option>
                <option value="6-12-months">6–12 months</option>
                <option value="exploring">Just exploring</option>
              </QualSelect>
            </QualField>
          </QualGrid>
          <QualCheckRow>
            <input type="checkbox" id="contact-gov" name="gov" />
            <QualCheckLabel htmlFor="contact-gov">
              I represent a government agency or government contractor
            </QualCheckLabel>
          </QualCheckRow>
          <TrustNote>Your information is never shared. We respond within 4 business hours.</TrustNote>
        </QualSection>

        <ContactNav>
          <Link href="/schedule-consult">Schedule a Consultation →</Link>
          <Link href="/work">See Our Work</Link>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/sectors">Sectors We Serve</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/careers">Careers</Link>
        </ContactNav>
      </PageWrapper>
    </>
  );
}

const ContactIntro = styled.section`
  max-width: 90rem;
  margin: 0 auto;
  padding: 4rem 2rem 0;
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  text-align: center;
`;

const PullQuoteSection = styled.div`
  max-width: 75rem;
  margin: 4rem auto 0;
  padding: 3rem 4rem;
  border-left: 4px solid rgb(255, 125, 0);
  background: rgba(255, 125, 0, 0.05);
  border-radius: 0 1.2rem 1.2rem 0;
`;

const PullQuote = styled.blockquote`
  font-size: 2rem;
  font-style: italic;
  font-weight: 500;
  line-height: 1.65;
  color: rgb(var(--text));
  margin: 0 0 1rem;
`;

const PullQuoteAttribution = styled.p`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.5);
  font-weight: 600;
`;

const QualSection = styled.div`
  max-width: 75rem;
  margin: 4rem auto 0;
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.4rem;
  padding: 3rem;
`;

const QualTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const QualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  margin-bottom: 1.6rem;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const QualField = styled.div`display: flex; flex-direction: column; gap: 0.6rem;`;

const QualLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--text), 0.7);
`;

const QualSelect = styled.select`
  padding: 1.1rem 1.4rem;
  font-size: 1.5rem;
  border: 1.5px solid rgba(var(--text), 0.2);
  border-radius: 0.8rem;
  background: rgba(var(--background), 0.9);
  color: rgb(var(--text));
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus { outline: none; border-color: rgb(255, 125, 0); }
`;

const QualCheckRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.4rem;

  input[type='checkbox'] {
    width: 1.8rem;
    height: 1.8rem;
    margin-top: 0.2rem;
    accent-color: rgb(255, 125, 0);
    flex-shrink: 0;
  }
`;

const QualCheckLabel = styled.label`
  font-size: 1.5rem;
  color: rgb(var(--text));
  line-height: 1.5;
  cursor: pointer;
`;

const TrustNote = styled.p`
  font-size: 1.3rem;
  color: rgba(var(--text), 0.45);
  text-align: center;
  font-style: italic;
`;

const ContactNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 3rem 2rem 5rem;

  a {
    font-size: 1.6rem;
    color: rgb(var(--accent));
    text-decoration: underline;
  }
`;

const PageWrapper = styled.div`
  min-height: 80vh;
`;
