import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Hero from 'views/AboutUsPage/Hero';
import WhyChooseUs from 'views/AboutUsPage/WhyChooseUs';

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>{`About Precise Analytics | Veteran-Owned Data Firm`}</title>
        <meta
          name="description"
          content="Learn about Precise Analytics, our mission, values, team, and our commitment to transforming data into strategic insights for businesses."
        />
        <meta
          name="keywords" 
          content="about precise analytics, data analytics company, data insights team, analytics experts, data solutions provider"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <WhyChooseUs />
        <AboutIntro>
          <p>
            Founded by a U.S. Army veteran, Precise Analytics has grown from a small consulting practice into a
            full-service data and AI firm serving federal agencies, healthcare organizations, financial institutions,
            and commercial enterprises. We are certified as a Service-Disabled Veteran-Owned Small Business (SDVOSB)
            and a Virginia Small, Women-owned, and Minority-owned Business (SWaM). Our team holds active security
            clearances and brings hands-on experience across NIST, HIPAA, FedRAMP, and CMMI compliance frameworks.
          </p>
        </AboutIntro>
        <RelatedLinks>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/sectors">Sectors We Serve</Link>
          <Link href="/capabilities-statement">Certifications</Link>
          <Link href="/schedule-consult">Schedule a Consultation</Link>
          <Link href="/careers">Careers</Link>
        </RelatedLinks>
      </PageWrapper>
      
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;

const AboutIntro = styled.section`
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  text-align: center;
`;

const RelatedLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 4rem 2rem 6rem;

  a {
    font-size: 1.6rem;
    color: rgb(var(--accent));
    text-decoration: underline;
  }
`;
