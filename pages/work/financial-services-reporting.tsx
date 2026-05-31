import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function FinancialServicesReporting() {
  return (
    <>
      <Head>
        <title>Financial Services Reporting Automation | Precise Analytics | BI Solutions</title>
        <meta
          name="description"
          content="Precise Analytics delivered a 3x faster regulatory reporting cycle for a financial services client using Power BI automation. 15 days to 5 days."
        />
        <meta property="og:title" content="Financial Services Reporting Automation | Precise Analytics" />
        <meta property="og:description" content="3x faster reporting. 15 days to 5 days. Live Power BI dashboards replacing manual spreadsheet workflows." />
        <meta property="og:type" content="article" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <BackNav>
            <BackLink href="/work">← All Case Studies</BackLink>
          </BackNav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <CaseHeader>
              <CategoryBadge>Financial Services</CategoryBadge>
              <CaseTitle>Financial Services Automated Reporting Platform</CaseTitle>
              <CaseSubtitle>
                Replaced manual spreadsheet workflows with a live Power BI dashboard suite — cutting monthly close reporting from 15 days to 5 days.
              </CaseSubtitle>
              <MetricsRow>
                <MetricBox>
                  <MetricValue>3×</MetricValue>
                  <MetricDesc>Faster regulatory reporting cycle</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>15→5</MetricValue>
                  <MetricDesc>Days to monthly close reporting</MetricDesc>
                </MetricBox>
                <MetricBox>
                  <MetricValue>100%</MetricValue>
                  <MetricDesc>Manual workflows eliminated</MetricDesc>
                </MetricBox>
              </MetricsRow>
            </CaseHeader>
          </motion.div>

          <ContentGrid>
            <MainContent>
              <Section>
                <SectionLabel>The Challenge</SectionLabel>
                <SectionTitle>Manual Spreadsheets. 15-Day Close Cycles. Regulatory Pressure.</SectionTitle>
                <SectionText>
                  A financial services client was running their entire monthly close and regulatory reporting process through a patchwork of Excel spreadsheets, manual data pulls, and email handoffs between teams. Every month-end cycle took 15 days to produce final reports — putting the firm dangerously close to regulatory filing deadlines.
                </SectionText>
                <SectionText>
                  The process was fragile. Data errors were common. Reconciliation took days. When regulators asked for ad hoc reports, the team had no efficient way to respond. Leadership had invested in data systems, but the reporting layer remained entirely manual.
                </SectionText>
                <SectionText>
                  They needed a production-deployed reporting solution — not another dashboard prototype that nobody would use.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Approach</SectionLabel>
                <SectionTitle>Automated Reporting Platform with Live Power BI Dashboards</SectionTitle>
                <SectionText>
                  Precise Analytics designed and deployed an automated reporting platform built around Power BI, connected directly to the client&apos;s existing data sources. The key principle: replace every manual step with an automated, auditable process.
                </SectionText>
                <SectionText>
                  We mapped each manual workflow to a Power BI data model, built automated refresh schedules, and created role-based dashboards for finance, compliance, and executive teams. Every report that had previously required manual assembly was replaced with a live, self-refreshing view.
                </SectionText>
                <SectionText>
                  User adoption was a primary concern — so we ran working sessions with the finance and compliance teams during development to ensure dashboards matched their actual workflows, not just the technical requirements.
                </SectionText>
              </Section>

              <Section>
                <SectionLabel>The Results</SectionLabel>
                <SectionTitle>15 Days to 5 Days. Every Month.</SectionTitle>
                <SectionText>
                  The new platform reduced the monthly close reporting cycle from <strong>15 days to 5 days</strong> — a 3× improvement in reporting speed. Regulatory reports that previously required a week of manual work are now generated with a single dashboard refresh.
                </SectionText>
                <SectionText>
                  Ad hoc regulatory requests that previously took days are now answered in hours. The compliance team has real-time visibility into the metrics they&apos;re accountable for, and finance leadership accesses live P&amp;L and risk dashboards daily instead of monthly.
                </SectionText>
                <SectionText>
                  The platform has been in continuous production for over a year with zero rollbacks.
                </SectionText>
              </Section>

              <TechStackSection>
                <SectionLabel>Tech Stack</SectionLabel>
                <TagsRow>
                  {['Power BI', 'Business Intelligence', 'Workflow Automation', 'Data Modeling', 'Regulatory Reporting', 'Financial Analytics'].map((tag) => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </TagsRow>
              </TechStackSection>
            </MainContent>

            <Sidebar>
              <PullQuote>
                <QuoteIcon>&ldquo;</QuoteIcon>
                <QuoteText>What our client said</QuoteText>
                <QuoteAttribution>
                  <strong>VP of Finance Operations</strong><br />
                  Financial Services Client<br />
                  <QuoteNote>(Full testimonial coming soon — client approval in progress.)</QuoteNote>
                </QuoteAttribution>
              </PullQuote>

              <SidebarCtaCard>
                <SidebarCtaTitle>Need faster reporting?</SidebarCtaTitle>
                <SidebarCtaText>
                  Schedule a free consultation to discuss your reporting automation project.
                </SidebarCtaText>
                <SidebarCtaButton href="/schedule-consult?case=financial-reporting">
                  Schedule a Consultation →
                </SidebarCtaButton>
              </SidebarCtaCard>

              <RelatedLinks>
                <RelatedTitle>Related Work</RelatedTitle>
                <RelatedLink href="/work/federal-healthcare-pipeline">Federal Healthcare Pipeline →</RelatedLink>
                <RelatedLink href="/work/ai-training-at-scale">AI Training at Scale →</RelatedLink>
              </RelatedLinks>
            </Sidebar>
          </ContentGrid>

          <BottomCta>
            <BottomCtaTitle>Need faster reporting for your organization?</BottomCtaTitle>
            <BottomCtaLink href="/schedule-consult?case=financial-reporting">
              Schedule a consultation →
            </BottomCtaLink>
          </BottomCta>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 3rem 0 8rem;`;
const BackNav = styled.div`margin-bottom: 3rem;`;
const BackLink = styled(Link)`font-size: 1.5rem; font-weight: 600; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; }`;
const CaseHeader = styled.div`max-width: 90rem; margin-bottom: 6rem;`;
const CategoryBadge = styled.span`font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgb(255, 125, 0); display: block; margin-bottom: 1.2rem;`;
const CaseTitle = styled.h1`font-size: 4.8rem; font-weight: 800; color: rgb(var(--text)); line-height: 1.15; margin-bottom: 1.6rem; ${media.tablet(`font-size: 3.2rem;`)}`;
const CaseSubtitle = styled.p`font-size: 2rem; line-height: 1.6; color: rgba(var(--text), 0.7); max-width: 75rem; margin-bottom: 3rem; ${media.tablet(`font-size: 1.7rem;`)}`;
const MetricsRow = styled.div`display: flex; gap: 3rem; flex-wrap: wrap;`;
const MetricBox = styled.div`display: flex; flex-direction: column; gap: 0.4rem;`;
const MetricValue = styled.div`font-size: 4.4rem; font-weight: 900; line-height: 1; background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;`;
const MetricDesc = styled.div`font-size: 1.4rem; font-weight: 500; color: rgba(var(--text), 0.65); max-width: 18rem;`;
const ContentGrid = styled.div`display: grid; grid-template-columns: 1fr 34rem; gap: 5rem; align-items: start; ${media.desktop(`grid-template-columns: 1fr;`)}`;
const MainContent = styled.div`display: flex; flex-direction: column; gap: 4rem;`;
const Section = styled.div``;
const SectionLabel = styled.p`font-size: 1.2rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgb(255, 125, 0); margin-bottom: 0.8rem;`;
const SectionTitle = styled.h2`font-size: 2.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.6rem; line-height: 1.3; ${media.tablet(`font-size: 2.2rem;`)}`;
const SectionText = styled.p`font-size: 1.7rem; line-height: 1.75; color: rgba(var(--text), 0.8); margin-bottom: 1.4rem; strong { color: rgb(var(--text)); }`;
const TechStackSection = styled.div``;
const TagsRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1rem;`;
const TechTag = styled.span`font-size: 1.3rem; font-weight: 600; padding: 0.5rem 1.2rem; border-radius: 0.5rem; background: rgba(255, 125, 0, 0.1); color: rgb(255, 125, 0); border: 1px solid rgba(255, 125, 0, 0.25);`;
const Sidebar = styled.div`display: flex; flex-direction: column; gap: 2.4rem; position: sticky; top: 10rem; ${media.desktop(`position: static;`)}`;
const PullQuote = styled.div`background: rgba(var(--cardBackground), 0.9); border-left: 4px solid rgb(255, 125, 0); border-radius: 0 1rem 1rem 0; padding: 2.4rem;`;
const QuoteIcon = styled.div`font-size: 5rem; line-height: 1; color: rgb(255, 125, 0); margin-bottom: 0.8rem;`;
const QuoteText = styled.p`font-size: 1.8rem; font-style: italic; line-height: 1.65; color: rgba(var(--text), 0.8); margin-bottom: 1.4rem;`;
const QuoteAttribution = styled.div`font-size: 1.4rem; color: rgba(var(--text), 0.65); line-height: 1.5;`;
const QuoteNote = styled.span`font-size: 1.2rem; color: rgba(var(--text), 0.4); font-style: italic;`;
const SidebarCtaCard = styled.div`background: linear-gradient(135deg, rgba(255, 125, 0, 0.1), rgba(255, 165, 0, 0.05)); border: 1px solid rgba(255, 125, 0, 0.25); border-radius: 1.2rem; padding: 2.4rem;`;
const SidebarCtaTitle = styled.h3`font-size: 1.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 0.8rem;`;
const SidebarCtaText = styled.p`font-size: 1.5rem; color: rgba(var(--text), 0.7); margin-bottom: 1.6rem; line-height: 1.5;`;
const SidebarCtaButton = styled(Link)`display: inline-block; background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0)); color: white; font-size: 1.5rem; font-weight: 700; padding: 1.1rem 2rem; border-radius: 0.7rem; text-decoration: none; transition: all 0.2s ease; &:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(255, 125, 0, 0.3); }`;
const RelatedLinks = styled.div`display: flex; flex-direction: column; gap: 0.8rem;`;
const RelatedTitle = styled.p`font-size: 1.3rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(var(--text), 0.45); margin-bottom: 0.4rem;`;
const RelatedLink = styled(Link)`font-size: 1.5rem; font-weight: 600; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; }`;
const BottomCta = styled.div`margin-top: 6rem; padding: 4rem; background: rgba(var(--cardBackground), 0.8); border-radius: 1.4rem; border: 1px solid rgba(var(--text), 0.1); text-align: center;`;
const BottomCtaTitle = styled.h3`font-size: 2.8rem; font-weight: 700; color: rgb(var(--text)); margin-bottom: 1.4rem; ${media.tablet(`font-size: 2.2rem;`)}`;
const BottomCtaLink = styled(Link)`font-size: 1.8rem; font-weight: 700; color: rgb(255, 125, 0); text-decoration: none; &:hover { text-decoration: underline; color: rgb(255, 165, 0); }`;
