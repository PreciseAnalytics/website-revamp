import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';

import Hero from 'views/ServicesPage/Hero';
import ServicesContent from '../views/ServicesPage/ServicesContent';
import Cta from '../views/ServicesPage/Cta';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Data Analytics Services`}</title>
        <meta
          name="description"
          content="Transform data into actionable insights with Precise Analytics. Data strategy consulting, business intelligence, predictive analytics, data visualization, warehousing, quality management, custom solutions, and training services."
        />
        <meta
          name="keywords" 
          content="data analytics services, business intelligence, predictive analytics, data visualization, data warehousing, data quality management, custom analytics solutions, data strategy consulting"
        />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Hero />
        <ServicesContent />
        <Cta />
      </PageWrapper>
      
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;
