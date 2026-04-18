import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Image from 'next/image';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const teamMembers = [
  {
    name: 'Norman Tanui',
    title: 'CTO & Founder',
    image: '/PA-logo.png',
    bio: 'Veteran technologist passionate about data, strategy, and delivering analytics that matter.',
  },
  {
    name: 'Krishna Bhatt',
    title: 'Chief Data Scientist',
    image: '/PA-logo.png',
    bio: 'Leading AI and machine learning innovation across federal and commercial sectors.',
  },
  {
    name: 'Vivek Pokhrel',
    title: 'Director of BI Solutions',
    image: '/PA-logo.png',
    bio: 'Expert in business intelligence systems, dashboards, and data storytelling.',
  },
  {
    name: 'Prashant Bhatta',
    title: 'Full Stack Engineer',
    image: '/PA-logo.png',
    bio: 'Crafting scalable analytics platforms and user-friendly frontend experiences.',
  },
];

export default function OurTeamPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      <Head>
        <title>{`Meet Our Team | ${EnvVars.SITE_NAME}`}</title>
        <meta
          name="description"
          content="Meet the leadership and technical experts behind Precise Analytics, delivering secure, mission-focused data and AI solutions."
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Meet Our Team</PageTitle>
            <PageSubtitle>Passionate. Experienced. Mission-Driven.</PageSubtitle>
            <TeamIntro>
              Precise Analytics is built by veterans, data scientists, engineers, and business intelligence
              professionals who bring deep domain expertise to every engagement. Our team combines federal
              contracting experience with commercial analytics know-how, delivering solutions that are
              technically rigorous and mission-focused. As a Service-Disabled Veteran-Owned Small Business
              (SDVOSB), we hold ourselves to the same standards of discipline and accountability that define
              military service. We hire people who take data seriously, communicate clearly, and care about
              outcomes — not just outputs. When you work with Precise Analytics, you work directly with the
              people building your solution.
            </TeamIntro>
          </motion.div>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <ImageWrapper>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </ImageWrapper>
                <Name>{member.name}</Name>
                <Title>{member.title}</Title>
                <Bio>{member.bio}</Bio>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
        <TeamNav>
          <Link href="/about-us">About Us</Link>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/careers">Join Our Team</Link>
          <Link href="/schedule-consult">Schedule a Consultation</Link>
        </TeamNav>
      </PageWrapper>
    </>
  );
}

const TeamNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 3rem 2rem 5rem;

  a {
    font-size: 1.6rem;
    color: rgb(var(--accent));
    text-decoration: underline;
  }
`;

const TeamIntro = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  max-width: 80rem;
  margin: 2rem auto 5rem;
  text-align: center;
`;

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

const PageSubtitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 5rem;
  color: rgb(var(--text), 0.8);
  font-weight: 500;
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
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgb(0, 153, 255);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
