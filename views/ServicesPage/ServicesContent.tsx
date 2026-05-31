import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Container from 'components/Container';
import { media } from 'utils/media';

/* ─────────────── Types & Data ─────────────── */

type Category = 'all' | 'foundation' | 'intelligence' | 'ai';

const CATS: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'foundation', label: 'Data Foundation' },
  { id: 'intelligence', label: 'Business Intelligence' },
  { id: 'ai', label: 'AI & Automation' },
];

const CAT_LABEL: Record<Exclude<Category, 'all'>, string> = {
  foundation: 'Data Foundation',
  intelligence: 'Business Intelligence',
  ai: 'AI & Automation',
};

const CAT_COLORS: Record<Exclude<Category, 'all'>, { iconBg: string; color: string }> = {
  foundation: { iconBg: 'rgba(57,255,20,0.13)', color: '#39ff14' },
  intelligence: { iconBg: 'rgba(255,140,43,0.13)', color: '#ff8c2b' },
  ai: { iconBg: 'rgba(57,255,20,0.09)', color: '#39ff14' },
};

type Service = {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, 'all'>;
  outcomes: [string, string, string];
};

const SERVICES: Service[] = [
  { id: 'data-strategy',         title: 'Data Strategy & Consulting',        description: 'Define a clear enterprise data strategy that aligns governance, architecture, and execution so analytics delivers measurable outcomes.',                                             category: 'foundation',    outcomes: ['Aligned data governance',      'Clear analytics roadmap',         'Accelerated time to value'        ] },
  { id: 'data-warehousing',      title: 'Data Warehousing & Integration',    description: 'Unify fragmented systems into a scalable analytics foundation with reliable pipelines, clean models, and cloud-ready architecture.',                                               category: 'foundation',    outcomes: ['Unified data repository',      'Scalable, reliable pipelines',    'Cloud-ready architecture'         ] },
  { id: 'data-quality',          title: 'Data Quality Management',           description: 'Improve trust in reporting through continuous validation, monitoring, and remediation workflows that prevent downstream surprises.',                                                 category: 'foundation',    outcomes: ['Trusted reporting outputs',    'Early issue detection',           'Data integrity controls'          ] },
  { id: 'governance-risk',       title: 'Data Governance, Risk & Compliance', description: 'Make analytics and AI secure and compliant with governance frameworks, access controls, auditability, and policy controls.',                                                      category: 'foundation',    outcomes: ['Compliance confidence',        'Controlled data access',          'Full audit trails'                ] },
  { id: 'business-intelligence', title: 'Business Intelligence & Reporting', description: 'Build trusted executive dashboards and a consistent KPI layer so leaders can make decisions from one version of the truth.',                                                      category: 'intelligence',  outcomes: ['One source of truth',          'Faster executive decisions',      'Self-service analytics'           ] },
  { id: 'predictive-analytics',  title: 'Predictive Analytics',              description: 'Forecast demand, identify risk early, and deploy interpretable models that drive real operational decisions — not notebook demos.',                                                  category: 'intelligence',  outcomes: ['Anticipate outcomes early',    'Interpretable model outputs',     'Reduced operational risk'         ] },
  { id: 'data-visualization',    title: 'Data Visualization',                description: 'Turn complex systems into intuitive, decision-centric dashboard experiences built for clarity, adoption, and action.',                                                              category: 'intelligence',  outcomes: ['Clarity at a glance',          'Higher dashboard adoption',       'Decisions in seconds'             ] },
  { id: 'real-time-analytics',   title: 'Real-Time & Streaming Analytics',   description: 'Enable real-time awareness and response with event-driven pipelines, low-latency metrics, alerting, and operational dashboards.',                                                  category: 'intelligence',  outcomes: ['Instant event awareness',      'Real-time alerting',              'Proactive operations management'  ] },
  { id: 'agentic-ai',            title: 'Advanced Analytics & Agentic AI',   description: 'Design governed agent-based AI systems that monitor signals, reason over context, and support actions with human oversight.',                                                      category: 'ai',            outcomes: ['Governed AI agents',           'Human-in-the-loop design',        'Explainable AI reasoning'         ] },
  { id: 'decision-intelligence', title: 'Decision Intelligence & Automation', description: 'Embed analytics into workflows using scenario modeling, recommendations, and controlled automation that stays auditable.',                                                         category: 'ai',            outcomes: ['Analytics at the point of decision', 'Automated routine tasks', 'Full decision audit trail'        ] },
  { id: 'custom-solutions',      title: 'Custom Analytics Solutions',        description: "When off-the-shelf tools don't fit, we build secure, scalable analytics apps tailored to business-critical workflows.",                                                             category: 'ai',            outcomes: ['Purpose-built tools',          'Secure, compliant deployments',   'Production-grade performance'     ] },
  { id: 'training-support',      title: 'Training & Enablement',             description: 'Upskill teams with role-based training and adoption playbooks so analytics is used consistently, correctly, and confidently.',                                                     category: 'ai',            outcomes: ['Faster tool adoption',         'Sustainable team capabilities',   'Reduced consultant dependency'    ] },
];

/* ─────────────── Icons ─────────────── */

const icons: Record<string, JSX.Element> = {
  'data-strategy':         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  'data-warehousing':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>,
  'data-quality':          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  'governance-risk':       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  'business-intelligence': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="2 20 22 20"/></svg>,
  'predictive-analytics':  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  'data-visualization':    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  'real-time-analytics':   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  'agentic-ai':            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="12" r="2.5"/><line x1="12" y1="7" x2="12" y2="9.5"/><line x1="10" y1="13.5" x2="6.5" y2="17.2"/><line x1="14" y1="13.5" x2="17.5" y2="17.2"/></svg>,
  'decision-intelligence': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  'custom-solutions':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M4.22 4.22l2.12 2.12m11.32 11.32 2.12 2.12M2 12h3m14 0h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
  'training-support':      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
};

/* ─────────────── Component ─────────────── */

export default function ServicesContent() {
  const [activeCat, setActiveCat] = useState<Category>('all');
  const [activeId, setActiveId] = useState<string>('data-strategy');

  const filtered = activeCat === 'all' ? SERVICES : SERVICES.filter((s) => s.category === activeCat);

  const activeService = SERVICES.find((s) => s.id === activeId) ?? filtered[0];
  const colors = CAT_COLORS[activeService.category];

  const handleCatChange = (cat: Category) => {
    setActiveCat(cat);
    const first = cat === 'all' ? SERVICES[0] : SERVICES.find((s) => s.category === cat);
    if (first) setActiveId(first.id);
  };

  return (
    <Wrapper id="services-grid">
      <Container>

        <TopRow>
          <TopLeft>
            <Eyebrow>What We Do</Eyebrow>
            <TopHeading>12 ways we help you win with data.</TopHeading>
          </TopLeft>
          <FilterPills>
            {CATS.map((c) => (
              <Pill key={c.id} $active={activeCat === c.id} onClick={() => handleCatChange(c.id)}>
                {c.label}
              </Pill>
            ))}
          </FilterPills>
        </TopRow>

        {/* ── Desktop split panel ── */}
        <SplitPanel>
          <ListCol>
            {filtered.map((svc) => (
              <ListItem
                key={svc.id}
                $active={activeId === svc.id}
                $color={CAT_COLORS[svc.category].color}
                onMouseEnter={() => setActiveId(svc.id)}
                onClick={() => setActiveId(svc.id)}
              >
                <ListIcon $bg={CAT_COLORS[svc.category].iconBg} $color={CAT_COLORS[svc.category].color}>
                  {icons[svc.id]}
                </ListIcon>
                <ListTitle>{svc.title}</ListTitle>
                <Chevron $active={activeId === svc.id}>›</Chevron>
              </ListItem>
            ))}
          </ListCol>

          <PreviewCol>
            <AnimatePresence mode="wait">
              <PreviewCard
                key={activeService.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.18 }}
              >
                <PreviewTop>
                  <PreviewIcon $bg={colors.iconBg} $color={colors.color}>
                    {icons[activeService.id]}
                  </PreviewIcon>
                  <PreviewCat $color={colors.color}>{CAT_LABEL[activeService.category]}</PreviewCat>
                </PreviewTop>

                <PreviewTitle>{activeService.title}</PreviewTitle>
                <PreviewDesc>{activeService.description}</PreviewDesc>

                <OutcomeList>
                  {activeService.outcomes.map((o) => (
                    <OutcomeRow key={o}>
                      <OutcomeTick $color={colors.color}>✓</OutcomeTick>
                      <OutcomeText>{o}</OutcomeText>
                    </OutcomeRow>
                  ))}
                </OutcomeList>

                <PreviewActions>
                  <ExploreBtn href={`/services/${activeService.id}`} target="_blank" rel="noopener noreferrer">
                    Explore Service →
                  </ExploreBtn>
                  <ConsultBtn href="/schedule-consult" target="_blank" rel="noopener noreferrer">
                    Schedule a Consult
                  </ConsultBtn>
                </PreviewActions>
              </PreviewCard>
            </AnimatePresence>
          </PreviewCol>
        </SplitPanel>

        {/* ── Mobile compact grid ── */}
        <MobileGrid>
          {filtered.map((svc, i) => {
            const c = CAT_COLORS[svc.category];
            return (
              <MobileCard
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <MobileIcon $bg={c.iconBg} $color={c.color}>{icons[svc.id]}</MobileIcon>
                <MobileTitle>{svc.title}</MobileTitle>
                <MobileDesc>{svc.description}</MobileDesc>
                <MobileLink href={`/services/${svc.id}`} target="_blank" rel="noopener noreferrer">
                  Explore →
                </MobileLink>
              </MobileCard>
            );
          })}
        </MobileGrid>

      </Container>
    </Wrapper>
  );
}

/* ─────────────── Styles ─────────────── */

const Wrapper = styled.section`
  padding: 10rem 0 12rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 5rem;
  flex-wrap: wrap;

  ${media.tablet(`flex-direction: column; align-items: flex-start;`)}
`;

const TopLeft = styled.div``;

const Eyebrow = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ff8c2b;
  margin-bottom: 0.8rem;
`;

const TopHeading = styled.h2`
  font-size: 3.4rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin: 0;
  line-height: 1.15;

  ${media.tablet(`font-size: 2.6rem;`)}
`;

const FilterPills = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Pill = styled.button<{ $active: boolean }>`
  padding: 0.8rem 1.8rem;
  border-radius: 10rem;
  border: 1.5px solid ${(p) => (p.$active ? 'rgba(57,255,20,0.55)' : 'rgba(var(--text),0.12)')};
  background: ${(p) => (p.$active ? 'rgba(57,255,20,0.1)' : 'transparent')};
  color: ${(p) => (p.$active ? '#39ff14' : 'rgba(var(--text),0.65)')};
  font-size: 1.35rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    border-color: rgba(var(--text), 0.3);
    color: rgb(var(--text));
  }
`;

/* ── Split panel (desktop only) ── */
const SplitPanel = styled.div`
  display: grid;
  grid-template-columns: 36rem 1fr;
  gap: 3rem;
  align-items: start;

  ${media.desktop(`grid-template-columns: 32rem 1fr;`)}
  ${media.tablet(`display: none;`)}
`;

const ListCol = styled.div`
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  overflow: hidden;
  background: rgba(var(--cardBackground), 0.5);
`;

const ListItem = styled.div<{ $active: boolean; $color: string }>`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 1.4rem 1.8rem;
  cursor: pointer;
  border-left: 3px solid ${(p) => (p.$active ? p.$color : 'transparent')};
  background: ${(p) => (p.$active ? 'rgba(var(--cardBackground), 0.9)' : 'transparent')};
  transition: all 0.15s;

  & + & {
    border-top: 1px solid rgba(var(--text), 0.07);
  }

  &:hover {
    background: rgba(var(--cardBackground), 0.7);
  }
`;

const ListIcon = styled.div<{ $bg: string; $color: string }>`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 0.7rem;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 1.7rem;
    height: 1.7rem;
    color: ${(p) => p.$color};
  }
`;

const ListTitle = styled.span`
  font-size: 1.45rem;
  font-weight: 600;
  color: rgb(var(--text));
  flex: 1;
  line-height: 1.35;
`;

const Chevron = styled.span<{ $active: boolean }>`
  font-size: 1.8rem;
  color: ${(p) => (p.$active ? '#39ff14' : 'rgba(var(--text), 0.3)')};
  line-height: 1;
  transition: color 0.15s;
`;

const PreviewCol = styled.div``;

const PreviewCard = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.6);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.6rem;
  padding: 4rem;
  position: sticky;
  top: 10rem;
`;

const PreviewTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-bottom: 2.4rem;
`;

const PreviewIcon = styled.div<{ $bg: string; $color: string }>`
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 1.2rem;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.6rem;
    height: 2.6rem;
    color: ${(p) => p.$color};
  }
`;

const PreviewCat = styled.span<{ $color: string }>`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${(p) => p.$color};
  background: ${(p) => `${p.$color}18`};
  padding: 0.4rem 1rem;
  border-radius: 10rem;
`;

const PreviewTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin: 0 0 1.2rem;
  line-height: 1.2;
`;

const PreviewDesc = styled.p`
  font-size: 1.65rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.72);
  margin: 0 0 2.8rem;
`;

const OutcomeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(var(--text), 0.08);
  padding-top: 2.4rem;
`;

const OutcomeRow = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const OutcomeTick = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(p) => `${p.$color}18`};
  color: ${(p) => p.$color};
  font-size: 1rem;
  font-weight: 900;
  flex-shrink: 0;
`;

const OutcomeText = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(var(--text), 0.85);
`;

const PreviewActions = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ExploreBtn = styled(Link)`
  flex: 1;
  text-align: center;
  background: #39ff14;
  color: #000;
  font-size: 1.45rem;
  font-weight: 700;
  padding: 1.1rem 1.8rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover { opacity: 0.85; }
`;

const ConsultBtn = styled(Link)`
  flex: 1;
  text-align: center;
  background: #ff8c2b;
  color: #fff;
  font-size: 1.45rem;
  font-weight: 700;
  padding: 1.1rem 1.8rem;
  border-radius: 0.8rem;
  text-decoration: none;
  transition: background 0.2s;

  &:hover { background: #e67a1e; }
`;

/* ── Mobile compact grid (tablet and below) ── */
const MobileGrid = styled.div`
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;

  ${media.tablet(`display: grid;`)}
  ${media.phone(`grid-template-columns: 1fr;`)}
`;

const MobileCard = styled(motion.article)`
  background: rgba(var(--cardBackground), 0.6);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileIcon = styled.div<{ $bg: string; $color: string }>`
  width: 4rem;
  height: 4rem;
  border-radius: 0.9rem;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: ${(p) => p.$color};
  }
`;

const MobileTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0 0 0.8rem;
  line-height: 1.3;
`;

const MobileDesc = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.65);
  flex: 1;
  margin: 0 0 1.8rem;
`;

const MobileLink = styled(Link)`
  font-size: 1.35rem;
  font-weight: 700;
  color: #39ff14;
  text-decoration: none;

  &:hover { opacity: 0.8; }
`;
