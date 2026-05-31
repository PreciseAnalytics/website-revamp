import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

const rows = [
  {
    label: 'Time to Deploy',
    pa: 'Weeks, not months',
    big4: 'Months to years',
    boutique: 'Varies widely',
    inhouse: '6–12 months to hire',
  },
  {
    label: 'VOSB Certified',
    pa: 'Yes ✓',
    big4: 'No ✗',
    boutique: 'Sometimes',
    inhouse: 'N/A',
  },
  {
    label: 'Security Clearance Ready',
    pa: 'Yes ✓',
    big4: 'Limited',
    boutique: 'Rarely',
    inhouse: 'Depends on hire',
  },
  {
    label: 'Production Guarantee',
    pa: 'Yes ✓',
    big4: 'No',
    boutique: 'Rarely',
    inhouse: 'N/A',
  },
  {
    label: 'Pricing Model',
    pa: 'Fixed-scope with deployment milestones',
    big4: 'Time & materials, open-ended',
    boutique: 'Mixed',
    inhouse: 'Salary + benefits + training',
  },
  {
    label: 'AI Training Labor',
    pa: 'Yes ✓',
    big4: 'No',
    boutique: 'No',
    inhouse: 'No',
  },
  {
    label: 'Federal Contracting Experience',
    pa: 'Deep — HIPAA, FISMA compliant',
    big4: 'Yes, large teams only',
    boutique: 'Rarely',
    inhouse: 'N/A',
  },
];

export default function ComparePage() {
  return (
    <>
      <Head>
        <title>How We Compare | Precise Analytics vs Big 4 vs Boutique vs In-House</title>
        <meta
          name="description"
          content="An honest comparison of Precise Analytics against Big 4 consultancies, boutique analytics firms, and building in-house. VOSB certified, veteran-led, production focused."
        />
        <meta property="og:title" content="How We Compare | Precise Analytics" />
        <meta property="og:description" content="Precise Analytics vs Big 4 vs boutique vs in-house — an honest breakdown for data engineering buyers." />
        <meta property="og:type" content="website" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageHeader>
              <OverTitle>How We Compare</OverTitle>
              <PageTitle>Precise Analytics vs. The Alternatives</PageTitle>
              <PageSubtitle>
                An honest comparison for buyers evaluating data engineering and AI partners. No spin — just the differences that matter.
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          <TableWrapper>
            <CompareTable>
              <thead>
                <tr>
                  <Th className="label-col"></Th>
                  <Th className="pa-col">Precise Analytics</Th>
                  <Th>Big 4 Consultancies</Th>
                  <Th>Boutique Analytics Firms</Th>
                  <Th>In-House Team</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label}>
                    <RowLabel>{row.label}</RowLabel>
                    <PaCell>{row.pa}</PaCell>
                    <Td>{row.big4}</Td>
                    <Td>{row.boutique}</Td>
                    <Td>{row.inhouse}</Td>
                  </tr>
                ))}
              </tbody>
            </CompareTable>
          </TableWrapper>

          <Disclaimer>
            This comparison reflects our honest assessment of market alternatives based on our experience in the space. Big 4 firms offer scale and brand recognition that may be the right choice for very large enterprises with open-ended budgets. Boutique firms often have deep vertical expertise in specific niches. In-house teams build internal capability that compounds over time. The right choice depends on your timeline, budget, compliance requirements, and strategic direction.
          </Disclaimer>

          <CtaSection>
            <CtaTitle>See the difference yourself.</CtaTitle>
            <CtaSubtitle>Schedule a free consultation — no commitment, no sales pitch. Just a conversation about what you need.</CtaSubtitle>
            <CtaButton href="/schedule-consult">Schedule a Consultation →</CtaButton>
          </CtaSection>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 4rem 0 8rem;`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 5rem;
`;

const OverTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 1.2rem;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.6rem;

  ${media.tablet(`font-size: 3.2rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.7);

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 3rem;
  border-radius: 1.2rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(var(--cardBackground), 0.85);
  min-width: 80rem;

  thead tr {
    background: rgba(var(--text), 0.04);
  }
`;

const Th = styled.th`
  padding: 1.8rem 2rem;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--text));
  border-bottom: 1px solid rgba(var(--text), 0.1);

  &.pa-col {
    background: rgba(255, 125, 0, 0.08);
    color: rgb(255, 125, 0);
    border-left: 3px solid rgb(255, 125, 0);
  }

  &.label-col {
    width: 22rem;
  }
`;

const RowLabel = styled.td`
  padding: 1.6rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(var(--text), 0.75);
  border-bottom: 1px solid rgba(var(--text), 0.07);
  border-right: 1px solid rgba(var(--text), 0.07);
`;

const PaCell = styled.td`
  padding: 1.6rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--text));
  border-bottom: 1px solid rgba(var(--text), 0.07);
  background: rgba(255, 125, 0, 0.05);
  border-left: 3px solid rgb(255, 125, 0);
`;

const Td = styled.td`
  padding: 1.6rem 2rem;
  font-size: 1.5rem;
  color: rgba(var(--text), 0.7);
  border-bottom: 1px solid rgba(var(--text), 0.07);
  border-right: 1px solid rgba(var(--text), 0.07);
`;

const Disclaimer = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.5);
  max-width: 85rem;
  margin: 0 auto 5rem;
  text-align: center;
  font-style: italic;
`;

const CtaSection = styled.div`
  text-align: center;
  padding: 5rem 3rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.6rem;
`;

const CtaTitle = styled.h2`
  font-size: 3.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;

  ${media.tablet(`font-size: 2.6rem;`)}
`;

const CtaSubtitle = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 2.8rem;
  max-width: 65rem;
  margin-left: auto;
  margin-right: auto;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.4rem 3.2rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.35);
  }
`;
