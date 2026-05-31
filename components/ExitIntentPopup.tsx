import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { media } from 'utils/media';

const STORAGE_KEY = 'pa_exit_popup_dismissed';
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isDismissed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    return Date.now() - ts < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

function setDismissed() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isDismissed()) return;

    // Desktop: mouseleave from document
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isDismissed()) {
        setVisible(true);
      }
    };

    // Mobile: scroll up quickly
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY - 80 && currentY > 200 && !isDismissed()) {
        setVisible(true);
      }
      setLastScrollY(currentY);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const dismiss = () => {
    setVisible(false);
    setDismissed();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setDismissed();
      setTimeout(() => setVisible(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <Backdrop
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
          />
          <PopupWrapper
            as={motion.div}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Before you go"
          >
            <CloseButton onClick={dismiss} aria-label="Close">✕</CloseButton>

            {!submitted ? (
              <>
                <PopupEmoji>🔎</PopupEmoji>
                <PopupTitle>Before You Go — Is Your Data Pipeline Production-Ready?</PopupTitle>
                <PopupText>
                  Get our free checklist: <strong>5 Signs Your ETL Pipeline Is Costing You $100K+</strong>
                </PopupText>

                <PopupForm onSubmit={handleSubmit}>
                  <PopupInput
                    type="email"
                    placeholder="Your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <PopupButton type="submit">Send Me the Checklist</PopupButton>
                </PopupForm>

                <NoThanks onClick={dismiss}>No thanks, I don&apos;t need this right now</NoThanks>
              </>
            ) : (
              <ThankYou>
                <ThankYouIcon>✓</ThankYouIcon>
                <ThankYouTitle>You&apos;re all set!</ThankYouTitle>
                <ThankYouText>Check your inbox — your checklist is on its way.</ThankYouText>
              </ThankYou>
            )}
          </PopupWrapper>
        </>
      )}
    </AnimatePresence>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9998;
  backdrop-filter: blur(3px);
`;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 90%;
  max-width: 52rem;
  background: rgb(var(--background));
  border: 1px solid rgba(255, 125, 0, 0.3);
  border-radius: 1.8rem;
  padding: 4rem 3.5rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  text-align: center;

  ${media.tablet(`padding: 3rem 2rem;`)}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.4rem;
  right: 1.6rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: rgba(var(--text), 0.4);
  cursor: pointer;
  padding: 0.4rem;
  line-height: 1;
  transition: color 0.2s;

  &:hover { color: rgba(var(--text), 0.8); }
`;

const PopupEmoji = styled.div`font-size: 4rem; margin-bottom: 1.2rem;`;

const PopupTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
  line-height: 1.25;

  ${media.tablet(`font-size: 2.1rem;`)}
`;

const PopupText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.75);
  margin-bottom: 2.4rem;

  strong { color: rgb(255, 125, 0); }
`;

const PopupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.4rem;
`;

const PopupInput = styled.input`
  padding: 1.4rem 1.8rem;
  font-size: 1.6rem;
  border: 1.5px solid rgba(var(--text), 0.2);
  border-radius: 0.9rem;
  background: rgba(var(--background), 0.9);
  color: rgb(var(--text));
  text-align: center;

  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
  }
`;

const PopupButton = styled.button`
  padding: 1.4rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.7rem;
  font-weight: 700;
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(255, 125, 0, 0.35);
  }
`;

const NoThanks = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  color: rgba(var(--text), 0.4);
  cursor: pointer;
  text-decoration: underline;
`;

const ThankYou = styled.div`padding: 1rem 0;`;

const ThankYouIcon = styled.div`
  font-size: 5rem;
  color: rgb(255, 125, 0);
  margin-bottom: 1rem;
`;

const ThankYouTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;
`;

const ThankYouText = styled.p`
  font-size: 1.6rem;
  color: rgba(var(--text), 0.7);
`;
