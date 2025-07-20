import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';

import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

// LinkedIn Icon Component
const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

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
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={120}
                    height={120}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </ImageWrapper>
                <Name>{member.name}</Name>
                <Title>{member.title}</Title>
                <Bio>{member.bio}</Bio>
                {member.linkedin && (
                  <LinkedInLink href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon />
                  </LinkedInLink>
                )}
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </PageWrapper>
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
  margin-top: 1.5rem;
  color: #0077b5;
  transition: all 0.3s ease;
  
  &:hover {
    color: #005885;
    transform: scale(1.1);
  }
  
  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;