import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { media } from 'utils/media';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>{`Terms of Service - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Read the Terms of Service for Precise Analytics, including service scope, confidentiality, liability limits, and contact information."
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <ContentWrapper>
            <PageTitle>Terms of Service</PageTitle>
            <LastUpdated>Last updated: June 26, 2025</LastUpdated>
            <TermsSectionsHeading>Terms of Service Sections</TermsSectionsHeading>
            
            <Section>
              <SectionTitle>1. Acceptance of Terms</SectionTitle>
              <SectionContent>
                By accessing and using Precise Analytics services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services. Your continued use of our website or engagement of our services constitutes acceptance of any updated terms.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>2. Services</SectionTitle>
              <SectionContent>
                Precise Analytics provides data analytics consulting services, business intelligence solutions, AI and machine learning implementations, data engineering, ETL pipeline development, and related professional services for federal agencies, state and local governments, and commercial enterprises. The specific scope, deliverables, timelines, and pricing for each client engagement will be detailed in separate statements of work or service agreements executed between the parties.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>3. Intellectual Property</SectionTitle>
              <SectionContent>
                All content, methodologies, frameworks, and proprietary tools developed by Precise Analytics remain the intellectual property of Precise Analytics unless explicitly transferred in a written agreement. Client data and client-specific deliverables are owned by the client as specified in the applicable service agreement. You may not reproduce, distribute, or create derivative works from our proprietary content without prior written consent.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>4. Confidentiality</SectionTitle>
              <SectionContent>
                We maintain strict confidentiality of all client data, business information, and proprietary materials. All data handling procedures comply with applicable privacy laws, federal regulations, HIPAA requirements where applicable, and industry best practices including NIST Cybersecurity Framework standards. Precise Analytics employees and contractors are bound by confidentiality obligations that survive the termination of any engagement.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>5. Limitation of Liability</SectionTitle>
              <SectionContent>
                Precise Analytics shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services, including but not limited to loss of revenue, loss of data, or business interruption, even if we have been advised of the possibility of such damages. Our total liability for any claim arising under these terms shall not exceed the total fees paid by you in the three months preceding the claim.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>6. Governing Law</SectionTitle>
              <SectionContent>
                These terms shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Fairfax County, Virginia.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>7. Contact Information</SectionTitle>
              <SectionContent>
                If you have any questions about these Terms of Service, please contact Precise Analytics through our website contact form at preciseanalytics.io/contact, or by email at contact@preciseanalytics.io. We will respond to all inquiries within one business day.
              </SectionContent>
            </Section>
          </ContentWrapper>
        </Container>
      </PageWrapper>
      
    </>
  );
}

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

const TermsSectionsHeading = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const SectionContent = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
`;
