import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Hero from 'views/ContactPage/Hero';
import ContactForm from 'views/ContactPage/ContactForm';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Contact Us`}</title>
        <meta
          name="description"
          content="Contact Precise Analytics for data analytics, ETL, custom dashboards, and AI/ML solutions. Get in touch with our experts today."
        />
        <meta
          name="keywords" 
          content="contact precise analytics, data analytics consulting, data solutions, analytics experts, get a quote"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <ContactForm />
      </PageWrapper>
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;
