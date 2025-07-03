import { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const teamMembers = [
  {
    name: 'Norman Tanui',
    title: 'CTO & Founder',
    image: '/PA-logo.png',
    bio: 'Veteran technologist passionate about data, strategy, and delivering analytics that matter.',
    linkedin: 'https://www.linkedin.com/in/norman-tanui/',
  },
  {
    name: 'Krishna Bhatt',
    title: 'Chief Data Scientist',
    image: '/PA-logo.png',
    bio: 'Leading AI and machine learning innovation across federal and commercial sectors.',
    linkedin: 'https://www.linkedin.com/in/krish-d-bhatt/',
  },
  {
    name: 'Vivek Pokhrel',
    title: 'Technical Project Manager',
    image: '/PA-logo.png',
    bio: 'Expert in business intelligence systems, dashboards, and data storytelling.',
    linkedin: 'https://www.linkedin.com/in/vivek-pokharel-66516212/',
  },
  {
    name: 'Prashant Bhatta',
    title: 'Manager, Business Development & Operations',
    image: '/PA-logo.png',
    bio: 'Crafting scalable analytics platforms and user-friendly frontend experiences.',
    linkedin: 'https://www.linkedin.com/in/prashant-bhatta-6b292a98/',
  },
];

export default function TeamPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Our Team`}</title>
        <meta name="description" content="Meet the dedicated professionals driving Precise Analytics forward." />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Meet Our Team</PageTitle>
            <PageSubtitle>Passionate. Experienced. Mission-Driven.</PageSubtitle>
          </motion.div>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <ImageWrapper>
                  <img src={member.image} alt={member.name} />
                </ImageWrapper>
                <Name>{member.name}</Name>
                <Title>{member.title}</Title>
                <Bio>{member.bio}</Bio>
                {member.linkedin && (
                  <LinkedInLink href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <img src="/linkedin-icon.svg" alt="LinkedIn" width="24" height="24" />
                  </LinkedInLink>
                )}
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

const PageWrapper = styled.div`
  padding: 6rem 0;
`;

const PageTitle = styled.h1`
  font-size: 4.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(0, 153, 255), rgb(0, 204, 153));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5rem;
  color: rgb(var(--text), 0.8);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 4rem;
  justify-items: center;
`;

const TeamCard = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  padding: 3rem;
  border-radius: 2rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const ImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  border: 3px solid rgb(0, 153, 255);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Name = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: rgb(var(--text));
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(0, 153, 255);
  margin-bottom: 1rem;
`;

const Bio = styled.p`
  font-size: 1.5rem;
  color: rgb(var(--text), 0.7);
  line-height: 1.5;
`;

const LinkedInLink = styled.a`
  display: inline-block;
  margin-top: 1rem;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;
