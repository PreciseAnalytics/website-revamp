import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

const teamMembers = [
  {
    name: 'Norman Tanui',
    title: 'CTO & Founder',
    bio: 'Technologist with deep expertise in data strategy, federal contracting, and enterprise analytics. Norman founded Precise Analytics to bring production-ready data solutions to government agencies and commercial clients.',
  },
  {
    name: 'Krishna Bhatt',
    title: 'Chief Data Scientist',
    bio: 'Leading AI and machine learning innovation across federal and commercial sectors. Krishna specializes in predictive modeling, NLP, and building ML pipelines that drive measurable business outcomes.',
  },
  {
    name: 'Vivek Pokhrel',
    title: 'Director of BI Solutions',
    bio: 'Expert in business intelligence systems, dashboards, and data storytelling. Vivek transforms complex datasets into clear, actionable Power BI and Tableau dashboards for agency and enterprise clients.',
  },
  {
    name: 'Prashant Bhatta',
    title: 'Full Stack Engineer',
    bio: 'Crafting scalable analytics platforms and user-friendly frontend experiences. Prashant builds the data applications and portals that bring Precise Analytics solutions to end users.',
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
          content="Meet the leadership and technical experts behind Precise Analytics, delivering secure, production-ready data and AI solutions."
        />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <HeroRow>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <PageTitle>Meet Our Team</PageTitle>
              <PageSubtitle>Passionate. Experienced. Results-Driven.</PageSubtitle>
              <TeamIntro>
                Precise Analytics is built by data scientists, engineers, and business intelligence professionals
                who bring deep domain expertise to every engagement. Our team combines federal contracting
                experience with commercial analytics know-how, delivering solutions that are technically rigorous
                and focused on client outcomes. When you work with Precise Analytics, you work directly with
                the people building your solution.
              </TeamIntro>
              <TeamCtaRow>
                <TeamCtaBtn href="/careers">Join Our Team →</TeamCtaBtn>
                <TeamCtaLink href="/schedule-consult">Schedule a Consultation</TeamCtaLink>
              </TeamCtaRow>
            </motion.div>

            <TeamStats>
              {[
                { value: '4+', label: 'Core Team Members' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '12+', label: 'Federal Clients' },
                { value: '98%', label: 'Client Satisfaction' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <StatBlock>
                    <StatVal>{s.value}</StatVal>
                    <StatLbl>{s.label}</StatLbl>
                  </StatBlock>
                </motion.div>
              ))}
            </TeamStats>
          </HeroRow>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard key={index}>
                <PhotoPlaceholder>
                  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <circle cx="60" cy="48" r="28" fill="rgba(0,153,255,0.18)" stroke="rgba(0,153,255,0.45)" strokeWidth="2"/>
                    <ellipse cx="60" cy="130" rx="46" ry="32" fill="rgba(0,153,255,0.12)" stroke="rgba(0,153,255,0.3)" strokeWidth="2"/>
                  </svg>
                  <PhotoLabel>Photo coming soon</PhotoLabel>
                </PhotoPlaceholder>
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

const PageWrapper = styled.div`
  padding: 6rem 0;
`;

const HeroRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 26rem;
  gap: 6rem;
  align-items: center;
  margin-bottom: 6rem;

  ${media.desktop(`grid-template-columns: 1fr 22rem; gap: 4rem;`)}
  ${media.tablet(`grid-template-columns: 1fr; gap: 3rem;`)}
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(0, 153, 255), rgb(0, 204, 153));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.6rem;
  line-height: 1.1;

  ${media.tablet(`font-size: 3.6rem;`)}
`;

const PageSubtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.6rem;
  color: rgba(var(--text), 0.6);
  font-weight: 500;
`;

const TeamIntro = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  margin-bottom: 2.4rem;
`;

const TeamCtaRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const TeamCtaBtn = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(0, 153, 255), rgb(0, 204, 153));
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1.1rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 153, 255, 0.35);
  }
`;

const TeamCtaLink = styled(Link)`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
  padding: 1.1rem 2.4rem;
  border-radius: 0.8rem;
  text-decoration: none;
  border: 1.5px solid rgba(var(--text), 0.18);
  transition: all 0.2s;

  &:hover { border-color: rgb(0, 153, 255); color: rgb(0, 153, 255); }
`;

const TeamStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
`;

const StatBlock = styled.div`
  background: rgba(var(--cardBackground), 0.55);
  border: 1px solid rgba(var(--text), 0.09);
  border-radius: 1.2rem;
  padding: 2rem 1.6rem;
  text-align: center;
`;

const StatVal = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  color: rgb(0, 153, 255);
  line-height: 1;
  margin-bottom: 0.4rem;
`;

const StatLbl = styled.div`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.5);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.8rem;

  ${media.desktop(`grid-template-columns: repeat(3, 1fr);`)}
  ${media.tablet(`grid-template-columns: repeat(2, 1fr); gap: 2rem;`)}
  ${media.phone(`grid-template-columns: 1fr;`)}
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

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 18rem;
  margin: 0 0 2rem;
  border-radius: 1.2rem;
  background: linear-gradient(160deg, rgba(0, 30, 60, 0.85) 0%, rgba(0, 20, 45, 0.95) 100%);
  border: 1px solid rgba(0, 153, 255, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  overflow: hidden;

  svg {
    width: 9rem;
    height: auto;
    opacity: 0.9;
  }
`;

const PhotoLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(0, 153, 255, 0.5);
  letter-spacing: 0.05em;
  text-transform: uppercase;
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
