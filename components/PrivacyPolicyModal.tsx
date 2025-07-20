import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import CloseIcon from './CloseIcon';
import Overlay from './Overlay';
import media from 'utils/media';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay onClick={onClose} />
          <ModalContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <ModalHeader>
              <ModalTitle>Privacy Policy for Precise Analytics</ModalTitle>
              <CloseButton onClick={onClose}>
                <CloseIcon style={{ width: 24, height: 24 }} />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <p><strong>Effective Date: 06/25/2025</strong></p>
              <p>Precise Analytics (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, store, and protect your personal data when you visit
              our website, interact with us, or use our services.</p>
              
              <SectionTitle>1. What Information We Collect</SectionTitle>
              <p>We may collect and process the following data:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number (via contact forms or
                Calendly)</li>
                <li><strong>Scheduling Details:</strong> Appointment preferences, meeting notes (via Calendly)</li>
                <li><strong>Website Usage Data:</strong> IP address, browser type, pages visited, time on site (via
                cookies and analytics tools)</li>
                <li><strong>Technical Data:</strong> Device type, OS, and browser settings</li>
              </ul>
              
              <SectionTitle>2. How We Use Your Information</SectionTitle>
              <p>We use your personal data for the following purposes:</p>
              <ul>
                <li>To respond to inquiries submitted through our contact forms</li>
                <li>To schedule and manage consultations via Calendly</li>
                <li>To improve website functionality and user experience</li>
                <li>To analyze site traffic and user behavior using tools like Google Analytics</li>
                <li>To comply with legal and regulatory obligations</li>
              </ul>
              
              <SectionTitle>3. Cookies and Tracking Technologies</SectionTitle>
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Understand how users interact with our website</li>
                <li>Improve content and services</li>
                <li>Remember your preferences</li>
              </ul>
              <p>Upon visiting the site, you will be asked to accept or reject non-essential cookies via our
              cookie consent banner.</p>
              
              <SectionTitle>4. Legal Basis for Processing</SectionTitle>
              <p>We process your personal data under the following GDPR bases:</p>
              <ul>
                <li>Consent (for forms, Calendly, cookies)</li>
                <li>Contractual necessity (when engaging services)</li>
                <li>Legitimate interest (site analytics and basic communication)</li>
              </ul>
              
              <SectionTitle>5. Data Sharing</SectionTitle>
              <p>We do not sell or rent your personal data. We may share limited data with:</p>
              <ul>
                <li>Calendly (for scheduling)</li>
                <li>Google Analytics (for traffic insights)</li>
                <li>Hosting and security providers (for site operations)</li>
              </ul>
              <p>Each third-party service complies with applicable data protection regulations.</p>
              
              <SectionTitle>6. Data Retention</SectionTitle>
              <p>We retain your data only as long as necessary to fulfill the purposes outlined above, or as
              required by law.</p>
              
              <SectionTitle>7. Your Rights (EU/EEA Residents)</SectionTitle>
              <p>Under GDPR, you have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent at any time</li>
                <li>Object to data processing</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
              <p>To exercise your rights, contact us at:</p>
              <p><a href="mailto:privacy@preciseanalytics.io">privacy@preciseanalytics.io</a></p>
              
              <SectionTitle>8. How We Protect Your Data</SectionTitle>
              <p>We implement strong technical and organizational safeguards to protect your data from
              unauthorized access, loss, or disclosure.</p>
              
              <SectionTitle>9. Updates to This Policy</SectionTitle>
              <p>We may update this Privacy Policy periodically. Updates will be posted on this page with a
              new effective date.</p>
              
              <SectionTitle>Questions?</SectionTitle>
              <p>Email us at <a href="mailto:privacy@preciseanalytics.io">privacy@preciseanalytics.io</a></p>
            </ModalContent>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContainer>
        </>
      )}
    </AnimatePresence>
  );
}

const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  background: rgba(var(--cardBackground), 0.98);
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--primary), 0.1);
`;

const ModalHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(var(--text), 0.1);
  position: sticky;
  top: 0;
  background: rgba(var(--cardBackground), 0.95);
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0;

  ${media.tablet(`
    font-size: 2.2rem;
  `)}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: rgb(var(--text));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: rgb(var(--primary));
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgb(var(--text));

  p {
    margin-bottom: 1.6rem;
  }

  ul {
    padding-left: 2.5rem;
    margin-bottom: 2rem;

    li {
      margin-bottom: 0.8rem;
    }
  }

  a {
    color: rgb(var(--primary));
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${media.tablet(`
    font-size: 1.5rem;
    padding: 1.5rem;
  `)}
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2.5rem 0 1.5rem;
  color: rgb(var(--text));

  ${media.tablet(`
    font-size: 2.2rem;
  `)}
`;

const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(var(--text), 0.1);
  background: rgba(var(--cardBackground), 0.95);
  position: sticky;
  bottom: 0;
`;
