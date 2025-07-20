import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { media } from 'utils/media';
import { mq } from 'utils/media';


export default function CookiesPolicy() {
  return (
    <>
      <Head>
        <title>{`Cookies Policy - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="This Cookies Policy explains how Precise Analytics uses cookies and similar technologies."
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <ContentWrapper>
            <PageTitle>Cookies Policy</PageTitle>
            <LastUpdated>Last updated: July 01, 2025</LastUpdated>

            <Section>
              <SectionTitle>1. Introduction</SectionTitle>
              <SectionContent>
                This Cookies Policy explains how Precise Analytics (“we”, “us”, or “our”) uses cookies and similar tracking technologies when you visit our website at <strong>www.preciseanalytics.io</strong>.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>2. What Are Cookies?</SectionTitle>
              <SectionContent>
                Cookies are small text files placed on your device to enhance your experience, analyze site traffic, and support marketing efforts. They can store information such as login status, preferences, and usage behavior.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>3. Types of Cookies We Use</SectionTitle>
              <SectionContent>
                <ul>
                  <li><strong>Essential Cookies:</strong> Necessary for site functionality, such as page navigation and secure access.</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand visitor interactions through tools like Google Analytics.</li>
                  <li><strong>Functional Cookies:</strong> Remember choices like language or region to personalize your experience.</li>
                  <li><strong>Marketing Cookies:</strong> Track engagement for advertising platforms such as LinkedIn Insight Tag or Meta Pixel.</li>
                </ul>
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>4. How to Control Cookies</SectionTitle>
              <SectionContent>
                On your first visit, our cookie banner allows you to accept or decline non-essential cookies.
                <br /><br />
                You can also manage or delete cookies directly in your browser settings:
                <ul>
                  <li><a href="https://support.google.com/accounts/answer/61416" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                </ul>
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>5. Third-Party Cookies</SectionTitle>
              <SectionContent>
                Some features or services on our site may use cookies from third-party providers. These may include embedded content, analytics, or advertising integrations. We do not control the data collected by these external tools.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>6. Your Rights</SectionTitle>
              <SectionContent>
                Under the GDPR and similar data protection laws, you may:
                <ul>
                  <li>Request access to your personal data</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw your consent to cookie use at any time</li>
                  <li>Submit a complaint to a data protection authority</li>
                </ul>
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>7. Contact Us</SectionTitle>
              <SectionContent>
                For questions about this Cookies Policy or your data rights, please contact us at:
                <br /><br />
                📧 <a href="mailto:contact@preciseanalytics.io">contact@preciseanalytics.io</a><br />
                📞 +1 (804) 396-4148
              </SectionContent>
            </Section>
          </ContentWrapper>
        </Container>
      </PageWrapper>
      
    </>
  );
}

// Styled Components
const PageWrapper = styled.div`
  min-height: 80vh;
  padding: 8rem 0 4rem;
`;

const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;
  text-align: center;

  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;


const LastUpdated = styled.p`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.6);
  text-align: center;
  margin-bottom: 4rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  text-align: center;

  ${mq('<=tablet', `
    font-size: 3.6rem;
  `)}
`;


const SectionContent = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);

  ul {
    padding-left: 2rem;
    list-style-type: disc;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #3B82F6;
    text-decoration: underline;
  }
`;
