import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Cta from 'views/HomePage/Cta';
import WhyChooseUs from 'views/HomePage/WhyChooseUs';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';

export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Your Data, Our Insights`}</title>
        <meta
          name="description"
          content="Precise Analytics transforms complex data into actionable insights through industry-leading analytics, custom dashboards, and AI/ML technologies."
        />
        <meta
          name="keywords" 
          content="data analytics, ETL, dashboards, AI/ML, machine learning, data insights"
        />
      </Head>
      <AnimatedHeader />
      <HomepageWrapper>
        <Hero />
        <Partners />
        <WhyChooseUs />
        <Cta />
        {/* <Testimonials /> */}
        {/* <ScrollableBlogPosts posts={posts} /> */}
      </HomepageWrapper>
      <AnimatedFooter />
    </>
  );
}

const HomepageWrapper = styled.div`
  & > :last-child {
    margin-bottom: 10rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
