import Head from 'next/head';
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
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  min-height: 80vh;
`;
