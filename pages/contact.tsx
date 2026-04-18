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
        <title>{`${EnvVars.SITE_NAME} - Contact Us`}</title>
        <meta
          name="description"
          content="Contact Precise Analytics to discuss data analytics, AI/ML solutions, or AI workforce services. Schedule a free consultation or send a message."
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <ContactIntro>
          <p>
            Precise Analytics is a veteran-owned data analytics firm headquartered in Virginia, serving federal agencies,
            state and local governments, and commercial enterprises. Whether you need to modernize your data infrastructure,
            build custom dashboards, implement AI and machine learning solutions, or explore our AI workforce services,
            our team is ready to help. Reach out to schedule a free consultation, get a capabilities briefing, or ask
            about our VOSB and SWaM certified service offerings. We respond to all inquiries within one business day.
          </p>
        </ContactIntro>
        <ContactNav>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/sectors">Sectors We Serve</Link>
          <Link href="/schedule-consult">Schedule a Consultation</Link>
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
