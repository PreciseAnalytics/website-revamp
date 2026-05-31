import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { EnvVars } from 'env';
import AnimatedHeader from 'components/AnimatedHeader';
import { media } from 'utils/media';

import Hero from 'views/AboutUsPage/Hero';
import WhyChooseUs from 'views/AboutUsPage/WhyChooseUs';

const certifications = [
  { name: 'NIST Cybersecurity Framework', image: '/certifications/nist.svg' },
  { name: 'HIPAA', image: '/certifications/hipaa.svg' },
  { name: 'ITAR/EAR', image: '/certifications/itar.svg' },
  { name: 'ISO/IEC 27001', image: '/certifications/iso-27001.svg' },
  { name: 'SOC 2 Type II', image: '/certifications/soc2.svg' },
  { name: 'CMMI', image: '/CMMI_LOGO.png' },
  { name: 'FedRAMP', image: '/fedramp-logo-vert.svg' },
  { name: 'SBA', image: '/sba-logo.png' },
];

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>{`About Precise Analytics | Data Engineering & AI`}</title>
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
        <CertSection>
          <CertHeading>Certifications &amp; Compliance Frameworks</CertHeading>
          <CertGrid>
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <CertImg
                  src={cert.image}
                  alt={cert.name}
                  width={110}
                  height={70}
                  style={{ width: 'auto', height: '6.5rem', maxWidth: '11rem', objectFit: 'contain' }}
                />
                <CertLabel>{cert.name}</CertLabel>
              </CertCard>
            ))}
          </CertGrid>
        </CertSection>

        <AboutIntro>
          <p>
            Precise Analytics is a full-service data engineering and AI firm serving federal agencies, healthcare
            organizations, financial institutions, and commercial enterprises. We hold an active GSA Schedule and
            maintain clearance-ready staff with hands-on experience across NIST, HIPAA, FedRAMP, and CMMI
            compliance frameworks.
          </p>
        </AboutIntro>
        <RelatedLinks>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/sectors">Sectors We Serve</Link>
          <Link href="/capabilities-statement">Certifications</Link>
          <Link href="/schedule-consult">Schedule a Consultation</Link>
          <Link href="/careers">Careers</Link>
        </RelatedLinks>
      </PageWrapper>
      
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
`;

const CertSection = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  padding: 5rem 2rem 2rem;
  text-align: center;
`;

const CertHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(var(--text), 0.55);
  margin-bottom: 3.5rem;
`;

const CertGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  align-items: center;
  justify-content: center;
`;

const CertCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 12rem;
`;

const CertImg = styled(Image)`
  object-fit: contain;
  border-radius: 0.6rem;
  background: white;
  padding: 0.6rem 0.8rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const CertLabel = styled.span`
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(var(--text), 0.7);
  text-align: center;
  line-height: 1.4;
`;

const AboutIntro = styled.section`
  max-width: 90rem;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  text-align: center;
`;

const RelatedLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 4rem 2rem 6rem;

  a {
    font-size: 1.6rem;
    color: rgb(var(--accent));
    text-decoration: underline;
  }
`;
