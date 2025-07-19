import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>{`Terms of Service - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Terms of Service for Precise Analytics data consulting services."
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <ContentWrapper>
            <PageTitle>Terms of Service</PageTitle>
            <LastUpdated>Last updated: June 26, 2025</LastUpdated>
            
            <Section>
              <SectionTitle>1. Acceptance of Terms</SectionTitle>
              <SectionContent>
                By accessing and using Precise Analytics services, you accept and agree to be bound by the terms and provision of this agreement.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>2. Services</SectionTitle>
              <SectionContent>
                Precise Analytics provides data analytics consulting services, business intelligence solutions, and related professional services. The specific terms of each engagement will be detailed in separate service agreements.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>3. Confidentiality</SectionTitle>
              <SectionContent>
                We maintain strict confidentiality of all client data and information. All data handling procedures comply with applicable privacy laws and industry best practices.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>4. Limitation of Liability</SectionTitle>
              <SectionContent>
                Precise Analytics shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>5. Contact Information</SectionTitle>
              <SectionContent>
                If you have any questions about these Terms of Service, please contact us through our website contact form.
              </SectionContent>
            </Section>
          </ContentWrapper>
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

const SectionContent = styled.div`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.8);
`;
