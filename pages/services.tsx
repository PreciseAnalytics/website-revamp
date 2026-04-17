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
          content="Data strategy, business intelligence, predictive analytics, visualization, and data warehousing for government and commercial clients."
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
