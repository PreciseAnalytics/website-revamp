import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';

import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Hero from 'views/IndustriesPage/Hero';
import IndustriesContent from 'views/IndustriesPage/IndustriesContent';
import Cta from 'views/IndustriesPage/Cta';

export default function IndustriesPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Industry Solutions`}</title>
        <meta
          name="description"
          content="Precise Analytics delivers tailored data analytics solutions across healthcare, manufacturing, energy, finance, retail, and public sector industries."
        />
        <meta
          name="keywords" 
          content="industry analytics, healthcare analytics, manufacturing data, energy utilities, finance analytics, IoT solutions, industry specific analytics"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <IndustriesContent />
        <Cta />
      </PageWrapper>
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;
