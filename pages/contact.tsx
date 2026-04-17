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
