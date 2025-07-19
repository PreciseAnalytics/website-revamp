import { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>{`Privacy Policy - ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Privacy Policy for Precise Analytics - Learn how we collect, use, and protect your personal information."
        />
      </Head>
      <AnimatedHeader />
      
      <PageWrapper>
        <Container>
          <HeaderSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageTitle>Privacy Policy</PageTitle>
            <PageSubtitle>
              Effective Date: June 25, 2025
            </PageSubtitle>
          </HeaderSection>

          <ContentSection
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PrivacyContent>
              <IntroText>
                Precise Analytics (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, store, and protect your personal 
                data when you visit our website, interact with us, or use our services.
              </IntroText>

              <Section>
                <SectionTitle>1. Information We Collect</SectionTitle>
                <SectionContent>
                  <SubSection>
                    <SubSectionTitle>Personal Information</SubSectionTitle>
                    <p>We may collect the following personal information:</p>
                    <ul>
                      <li>Contact information (name, email address, phone number)</li>
                      <li>Company or organization details</li>
                      <li>Professional information relevant to our services</li>
                      <li>Communication preferences</li>
                    </ul>
                  </SubSection>

                  <SubSection>
                    <SubSectionTitle>Technical Information</SubSectionTitle>
                    <p>We automatically collect certain technical information:</p>
                    <ul>
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Operating system information</li>
                      <li>Website usage data and analytics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </SubSection>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>2. How We Use Your Information</SectionTitle>
                <SectionContent>
                  <p>We use collected information for the following purposes:</p>
                  <ul>
                    <li><strong>Service Delivery:</strong> To provide and improve our data analytics services</li>
                    <li><strong>Communication:</strong> To respond to inquiries and provide customer support</li>
                    <li><strong>Marketing:</strong> To send relevant information about our services (with consent)</li>
                    <li><strong>Analytics:</strong> To understand website usage and improve user experience</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>3. Information Sharing and Disclosure</SectionTitle>
                <SectionContent>
                  <p>We do not sell, trade, or rent your personal information. We may share information in the following circumstances:</p>
                  <ul>
                    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in our operations</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                    <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>4. Data Security</SectionTitle>
                <SectionContent>
                  <p>We implement appropriate security measures to protect your information:</p>
                  <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Access controls and authentication measures</li>
                    <li>Regular security assessments and updates</li>
                    <li>Compliance with industry standards (NIST, SOC 2, etc.)</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>5. Cookies and Tracking Technologies</SectionTitle>
                <SectionContent>
                  <p>We use cookies and similar technologies to:</p>
                  <ul>
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Improve our services and user experience</li>
                  </ul>
                  <p>You can manage cookie preferences through our cookie banner or your browser settings.</p>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>6. Your Rights</SectionTitle>
                <SectionContent>
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul>
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                    <li><strong>Objection:</strong> Object to certain processing activities</li>
                    <li><strong>Restriction:</strong> Request restriction of processing</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>7. Data Retention</SectionTitle>
                <SectionContent>
                  <p>We retain personal information only as long as necessary for the purposes outlined in this policy, unless:</p>
                  <ul>
                    <li>A longer retention period is required by law</li>
                    <li>It is necessary for legal claims or compliance</li>
                    <li>You have consented to longer retention</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>8. International Data Transfers</SectionTitle>
                <SectionContent>
                  <p>If we transfer your data internationally, we ensure appropriate safeguards are in place, including:</p>
                  <ul>
                    <li>Adequacy decisions by relevant authorities</li>
                    <li>Standard contractual clauses</li>
                    <li>Certification schemes and codes of conduct</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>9. Children&apos;s Privacy</SectionTitle>
                <SectionContent>
                  <p>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
                <SectionContent>
                  <p>We may update this Privacy Policy from time to time. When we make changes, we will:</p>
                  <ul>
                    <li>Update the &quot;Effective Date&quot; at the top of this policy</li>
                    <li>Notify you of significant changes via email or website notice</li>
                    <li>Provide the previous version for comparison if requested</li>
                  </ul>
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>11. Contact Information</SectionTitle>
                <SectionContent>
                  <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
                  <ContactInfo>
                    <ContactItem>
                      <strong>Email:</strong> <a href={`mailto:${EnvVars.CONTACT_EMAIL}`}>{EnvVars.CONTACT_EMAIL}</a>
                    </ContactItem>
                    <ContactItem>
                      <strong>Phone:</strong> <a href={`tel:${EnvVars.PHONE.replace(/\s+/g, '')}`}>{EnvVars.PHONE}</a>
                    </ContactItem>
                    {/*/*<ContactItem>
                      <strong>Address:</strong> Precise Analytics<br />
                      [Your Business Address]<br />
                      [City, State, ZIP Code]
                    </ContactItem>  */}
                  </ContactInfo>
                </SectionContent>
              </Section>

              <LastUpdated>
                <p><em>This Privacy Policy was last updated on June 25, 2025.</em></p>
              </LastUpdated>
            </PrivacyContent>
          </ContentSection>
        </Container>
      </PageWrapper>
      
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  min-height: 80vh;
  padding: 4rem 0;
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgb(var(--accent)), rgb(var(--secondary)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  ${media.tablet(`
    font-size: 3.6rem;
  `)}
`;

const PageSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
  
  ${media.tablet(`
    font-size: 1.6rem;
  `)}
`;

const ContentSection = styled(motion.div)`
  max-width: 100rem;
  margin: 0 auto;
`;

const PrivacyContent = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(var(--accent), 0.2);
  
  ${media.tablet(`
    padding: 3rem 2rem;
  `)}
`;

const IntroText = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text), 0.9);
  line-height: 1.7;
  margin-bottom: 4rem;
  padding: 2rem;
  background: rgba(var(--accent), 0.05);
  border-radius: 1rem;
  border-left: 4px solid rgb(var(--accent));
`;

const Section = styled.section`
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(var(--accent), 0.3);
`;

const SectionContent = styled.div`
  font-size: 1.6rem;
  color: rgb(var(--text), 0.8);
  line-height: 1.6;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul {
    margin: 1.5rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.8rem;
      line-height: 1.6;
    }
  }
  
  strong {
    color: rgb(var(--text));
    font-weight: 600;
  }
`;

const SubSection = styled.div`
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SubSectionTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  color: rgb(var(--text));
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  background: rgba(var(--secondBackground), 0.5);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  a {
    color: rgb(var(--accent));
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LastUpdated = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  text-align: center;
  
  p {
    color: rgb(var(--text), 0.6);
    font-size: 1.4rem;
  }
`;