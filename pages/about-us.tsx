import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Hero from 'views/AboutUsPage/Hero';
import WhyChooseUs from 'views/AboutUsPage/WhyChooseUs';

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - About Us`}</title>
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
        {/* Add more components for Mission, Team, Culture, etc. */}
      </PageWrapper>
      
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;
