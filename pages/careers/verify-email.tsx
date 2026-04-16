import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';

type Status = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const token = router.query.token as string;
    if (!token) return;

    fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setStatus('success');
        } else {
          setMessage(data.error || 'Verification failed.');
          setStatus('error');
        }
      })
      .catch(() => {
        setMessage('Something went wrong. Please try again.');
        setStatus('error');
      });
  }, [router.query.token]);

  return (
    <>
      <Head>
        <title>Verify Email — Precise Analytics Careers</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <Card>
            {status === 'loading' && (
              <>
                <Icon>⏳</Icon>
                <Title>Verifying your email…</Title>
              </>
            )}
            {status === 'success' && (
              <>
                <SuccessIcon>✓</SuccessIcon>
                <Title>Email Verified!</Title>
                <Body>
                  Welcome to Precise Analytics Careers{name ? `, ${name}` : ''}. Your account is now active.
                  You can sign in and apply to any open position.
                </Body>
                <ActionLink href="/careers">Browse Open Positions →</ActionLink>
              </>
            )}
            {status === 'error' && (
              <>
                <ErrorIcon>✕</ErrorIcon>
                <Title>Verification Failed</Title>
                <Body>{message}</Body>
                <ActionLink href="/careers">Back to Careers</ActionLink>
              </>
            )}
          </Card>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
`;

const Card = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
  padding: 4rem 3rem;
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  background: rgba(var(--cardBackground), 0.95);
`;

const Icon = styled.div`font-size: 4rem; margin-bottom: 1.5rem;`;

const SuccessIcon = styled.div`
  width: 6rem; height: 6rem; border-radius: 50%;
  background: rgba(34, 197, 94, 0.12);
  color: rgb(22, 163, 74);
  font-size: 2.6rem;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
`;

const ErrorIcon = styled.div`
  width: 6rem; height: 6rem; border-radius: 50%;
  background: rgba(239, 68, 68, 0.12);
  color: rgb(185, 28, 28);
  font-size: 2.6rem;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;
`;

const Body = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.75);
  margin-bottom: 2.5rem;
`;

const ActionLink = styled(Link)`
  display: inline-block;
  padding: 1.1rem 2.6rem;
  background: rgb(255, 125, 0);
  color: #fff;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
  &:hover { background: rgb(230, 100, 0); }
`;
