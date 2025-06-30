import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';

import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Hero from 'views/SolutionsPage/Hero';
import SolutionsContent from 'views/SolutionsPage/SolutionsContent';
import Cta from 'views/SolutionsPage/Cta';

export default function SolutionsPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Data Analytics Solutions`}</title>
        <meta
          name="description"
          content="Explore our comprehensive suite of data analytics solutions including ETL, custom dashboards, and AI/ML technologies."
        />
        <meta
          name="keywords" 
          content="data analytics solutions, ETL, data integration, dashboards, data visualization, AI, machine learning, predictive analytics"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <SolutionsContent />
        <Cta />
      </PageWrapper>
      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;
