import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Container from 'components/Container';
import { media } from 'utils/media';

export default function ContactHero() {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // form state
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', projectType: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', company: '', projectType: '', message: '' });
    } catch {}
    setSubmitting(false);
  }

  return (
    <HeroWrapper>
      <Container>
        <TwoCol>

          {/* ── Left: info + CTA ── */}
          <LeftCol
            as={motion.div}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>Get In Touch</Badge>
            <Heading>Let&apos;s Work <Accent>Together</Accent></Heading>
            <Lead>
              Schedule a free 30-minute consultation using the calendar, or send us a message
              and we&apos;ll respond within 24 hours.
            </Lead>

            <InfoList>
              <InfoItem>
                <InfoIcon>✉</InfoIcon>
                <InfoText>
                  <a href="mailto:contact@preciseanalytics.io">contact@preciseanalytics.io</a>
                </InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>📍</InfoIcon>
                <InfoText>Richmond, VA · Remote-Friendly</InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>⏱</InfoIcon>
                <InfoText>Response within 24 hours</InfoText>
              </InfoItem>
            </InfoList>

            <SocialRow>
              <SocialLink href="https://www.linkedin.com/company/103138904" target="_blank" rel="noopener noreferrer">
                <SocialIcon viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></SocialIcon>
                LinkedIn
              </SocialLink>
              <SocialLink href="https://www.facebook.com/PreciseAnalytics.io" target="_blank" rel="noopener noreferrer">
                <SocialIcon viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></SocialIcon>
                Facebook
              </SocialLink>
              <SocialLink href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
                <SocialIcon viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></SocialIcon>
                GitHub
              </SocialLink>
            </SocialRow>

            <MessageBtn onClick={() => { setShowModal(true); setSubmitted(false); }}>
              Send Us a Message
            </MessageBtn>

            <CertRow>
              <CertLink href="https://search.certifications.sba.gov/profile/ZRCYVLWCXL57/9YR68?page=1" target="_blank" rel="noopener noreferrer">
                <CertImg src="/sba-logo.png" alt="SBA Certified" />
              </CertLink>
              <CertLink href="https://directory.sbsd.virginia.gov/#/executiveExport" target="_blank" rel="noopener noreferrer">
                <CertImg src="/SWAM_LOGO.jpg" alt="SWAM Certified" />
              </CertLink>
            </CertRow>
          </LeftCol>

          {/* ── Right: Calendly ── */}
          <RightCol
            as={motion.div}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <CalendlyLabel>Book a Free Consultation</CalendlyLabel>
            {isClient && (
              <CalendlyWrap>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/contact-preciseanalytics/initial-consultation?back=1&month=2025-06"
                  style={{ minWidth: '320px', height: '700px' }}
                />
              </CalendlyWrap>
            )}
          </RightCol>

        </TwoCol>
      </Container>

      {/* ── Contact Form Modal ── */}
      <AnimatePresence>
        {showModal && (
          <Overlay
            onClick={() => setShowModal(false)}
          >
            <ModalBox
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>Send a Message</ModalTitle>
                <ModalClose onClick={() => setShowModal(false)}>&times;</ModalClose>
              </ModalHeader>

              {submitted ? (
                <SuccessBox>
                  <SuccessCheck>&#10003;</SuccessCheck>
                  <SuccessTitle>Message Sent!</SuccessTitle>
                  <SuccessText>
                    Thanks! We&apos;ll get back to you within 24 hours at <strong>{form.email || 'your email'}</strong>.
                  </SuccessText>
                  <ModalCloseBtn onClick={() => setShowModal(false)}>Close</ModalCloseBtn>
                </SuccessBox>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <FieldRow>
                    <Field>
                      <FieldLabel>First Name *</FieldLabel>
                      <FieldInput $err={!!errors.firstName} value={form.firstName} onChange={e => setForm(p => ({...p, firstName: e.target.value}))} placeholder="Jane" />
                      {errors.firstName && <Err>{errors.firstName}</Err>}
                    </Field>
                    <Field>
                      <FieldLabel>Last Name *</FieldLabel>
                      <FieldInput $err={!!errors.lastName} value={form.lastName} onChange={e => setForm(p => ({...p, lastName: e.target.value}))} placeholder="Smith" />
                      {errors.lastName && <Err>{errors.lastName}</Err>}
                    </Field>
                  </FieldRow>

                  <FieldRow>
                    <Field>
                      <FieldLabel>Email Address *</FieldLabel>
                      <FieldInput type="email" $err={!!errors.email} value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="you@company.com" />
                      {errors.email && <Err>{errors.email}</Err>}
                    </Field>
                    <Field>
                      <FieldLabel>Phone (optional)</FieldLabel>
                      <FieldInput type="tel" $err={false} value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="(555) 123-4567" />
                    </Field>
                  </FieldRow>

                  <FieldRow>
                    <Field>
                      <FieldLabel>Company / Organization</FieldLabel>
                      <FieldInput $err={false} value={form.company} onChange={e => setForm(p => ({...p, company: e.target.value}))} placeholder="Your company" />
                    </Field>
                    <Field>
                      <FieldLabel>Project Type</FieldLabel>
                      <FieldSelect value={form.projectType} onChange={e => setForm(p => ({...p, projectType: e.target.value}))}>
                        <option value="">Select…</option>
                        <option value="data-analytics">Data Analytics &amp; BI</option>
                        <option value="ai-ml">AI / ML Solutions</option>
                        <option value="ai-training">AI Workforce / Training</option>
                        <option value="data-engineering">Data Engineering</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </FieldSelect>
                    </Field>
                  </FieldRow>

                  <Field>
                    <FieldLabel>Message *</FieldLabel>
                    <FieldTextarea $err={!!errors.message} rows={5} value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} placeholder="Tell us about your project, goals, or questions…" />
                    {errors.message && <Err>{errors.message}</Err>}
                  </Field>

                  <ModalActions>
                    <CancelBtn type="button" onClick={() => setShowModal(false)}>Cancel</CancelBtn>
                    <SendBtn type="submit" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send Message'}
                    </SendBtn>
                  </ModalActions>
                </form>
              )}
            </ModalBox>
          </Overlay>
        )}
      </AnimatePresence>
    </HeroWrapper>
  );
}

// ─── Styled Components ────────────────────────────────────────────────────────

const HeroWrapper = styled.div`
  padding: 4rem 0 6rem;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 5rem;
  align-items: start;

  ${media.desktop(`
    grid-template-columns: 1fr 1.4fr;
    gap: 3rem;
  `)}

  ${media.tablet(`
    grid-template-columns: 1fr;
    gap: 4rem;
  `)}
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1rem;
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  background: rgba(255, 125, 0, 0.1);
  padding: 0.5rem 1.2rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 125, 0, 0.2);
  width: fit-content;
`;

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.15;
  color: rgb(var(--text));

  ${media.desktop(`font-size: 3.4rem;`)}
  ${media.tablet(`font-size: 3rem;`)}
`;

const Accent = styled.span`
  color: rgb(255, 125, 0);
`;

const Lead = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.75);
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-top: 1px solid rgba(var(--text), 0.1);
  border-bottom: 1px solid rgba(var(--text), 0.1);
  padding: 1.6rem 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.5rem;
  color: rgba(var(--text), 0.8);

  a {
    color: rgb(255, 125, 0);
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

const InfoIcon = styled.span`
  font-size: 1.6rem;
  flex-shrink: 0;
  width: 2rem;
  text-align: center;
`;

const InfoText = styled.span``;

const SocialRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--text), 0.7);
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border: 1px solid rgba(var(--text), 0.15);
  border-radius: 0.6rem;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(255, 125, 0);
    border-color: rgb(255, 125, 0);
  }
`;

const SocialIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const MessageBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.3rem 2.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: rgb(230, 100, 0);
    transform: translateY(-2px);
  }
`;

const CertRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 0.5rem;
`;

const CertLink = styled.a`
  display: block;
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
`;

const CertImg = styled.img`
  height: 5rem;
  width: auto;
  object-fit: contain;
  background: white;
  padding: 0.4rem;
  border-radius: 0.4rem;
`;

const RightCol = styled.div``;

const CalendlyLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--text), 0.5);
  margin-bottom: 1.2rem;
`;

const CalendlyWrap = styled.div`
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.2rem;
  overflow: hidden;
  background: rgba(var(--cardBackground), 0.6);
`;

// ── Modal ─────────────────────────────────────────────────────────────────────

const Overlay = styled(motion.div).attrs(() => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}))`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
`;

const ModalBox = styled(motion.div).attrs(() => ({
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.18 },
}))`
  background: #fff;
  color: #111;
  border-radius: 1.4rem;
  padding: 3.5rem 4rem;
  max-width: 68rem;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);

  ${media.tablet(`padding: 2.5rem 2rem;`)}
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: #111;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  color: #888;
  &:hover { color: #111; }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  margin-bottom: 1.8rem;

  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0;
`;

const FieldLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: #222;
`;

const FieldInput = styled.input<{ $err: boolean }>`
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  border: 1.5px solid ${p => p.$err ? '#ef4444' : '#ddd'};
  border-radius: 0.7rem;
  background: #fff;
  color: #111;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: rgb(255, 125, 0); }
`;

const FieldSelect = styled.select`
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  border: 1.5px solid #ddd;
  border-radius: 0.7rem;
  background: #fff;
  color: #111;
  &:focus { outline: none; border-color: rgb(255, 125, 0); }
`;

const FieldTextarea = styled.textarea<{ $err: boolean }>`
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  border: 1.5px solid ${p => p.$err ? '#ef4444' : '#ddd'};
  border-radius: 0.7rem;
  background: #fff;
  color: #111;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 1.8rem;
  &:focus { outline: none; border-color: rgb(255, 125, 0); }
`;

const Err = styled.span`font-size: 1.2rem; color: #ef4444;`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const CancelBtn = styled.button`
  padding: 1.1rem 2.2rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: transparent;
  color: #555;
  border: 1.5px solid #ddd;
  border-radius: 0.8rem;
  cursor: pointer;
  &:hover { border-color: #999; }
`;

const SendBtn = styled.button`
  padding: 1.1rem 2.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  &:hover:not(:disabled) { background: rgb(230, 100, 0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const SuccessCheck = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.12);
  color: rgb(22, 163, 74);
  font-size: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessTitle = styled.h3`font-size: 2.2rem; font-weight: 700; color: #111;`;
const SuccessText = styled.p`font-size: 1.5rem; line-height: 1.6; color: #444; max-width: 38rem;`;
const ModalCloseBtn = styled.button`
  padding: 1rem 2.8rem; font-size: 1.5rem; font-weight: 700;
  background: rgb(255, 125, 0); color: #fff; border: none; border-radius: 0.8rem;
  cursor: pointer; margin-top: 0.5rem;
  &:hover { background: rgb(230, 100, 0); }
`;
