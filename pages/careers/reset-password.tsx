import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

function validatePassword(p: string) {
  return p.length >= 8;
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();

  const token = useMemo(() => {
    return typeof router.query.token === 'string' ? router.query.token : '';
  }, [router.query.token]);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordsMatch = confirm === '' || password === confirm;
  const passwordValid = password === '' || validatePassword(password);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Missing reset token. Please use the link from your email.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password,
          newPassword: password,
          confirmPassword: confirm,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Password reset failed.');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password — Precise Analytics Careers</title>
        <meta name="robots" content="noindex" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <Card>
            {!success ? (
              <>
                <Title>Set a New Password</Title>
                <Hint>
                  Choose a new password for your Careers account. If you don’t have a reset email,
                  request one from the Careers sign-in screen.
                </Hint>

                {error && <ErrBox>{error}</ErrBox>}

                <form onSubmit={handleSubmit} autoComplete="on">
                  <Field>
                    <Label htmlFor="pw">New Password</Label>
                    <PasswordWrap>
                      <Input
                        id="pw"
                        name="new-password"
                        type={showPw ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        required
                        $invalid={!passwordValid}
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn type="button" onClick={() => setShowPw((p) => !p)} tabIndex={-1}>
                        <EyeIcon open={showPw} />
                      </EyeBtn>
                    </PasswordWrap>
                    {!passwordValid && (
                      <ValidationMsg $error>Password must be at least 8 characters.</ValidationMsg>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor="pw2">Confirm Password</Label>
                    <PasswordWrap>
                      <Input
                        id="pw2"
                        name="confirm-password"
                        type={showConfirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Re-enter your password"
                        required
                        $invalid={!passwordsMatch}
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn
                        type="button"
                        onClick={() => setShowConfirm((p) => !p)}
                        tabIndex={-1}
                      >
                        <EyeIcon open={showConfirm} />
                      </EyeBtn>
                    </PasswordWrap>
                    {!passwordsMatch && (
                      <ValidationMsg $error>Passwords do not match.</ValidationMsg>
                    )}
                  </Field>

                  <Actions>
                    <PrimaryBtn type="submit" disabled={loading}>
                      {loading ? 'Updating password…' : 'Update Password'}
                    </PrimaryBtn>
                    <SecondaryLink href="/careers">Back to Careers</SecondaryLink>
                  </Actions>
                </form>
              </>
            ) : (
              <>
                <SuccessIcon>✓</SuccessIcon>
                <Title>Password Updated</Title>
                <Hint>Your password has been updated. You can now sign in and apply to open roles.</Hint>
                <PrimaryLink href="/careers">Go to Careers</PrimaryLink>
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
  max-width: 56rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 1.4rem;
  padding: 3.2rem 3.2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  ${media.tablet(`padding: 2.4rem 2rem;`)}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 1rem;
`;

const Hint = styled.p`
  font-size: 1.5rem;
  line-height: 1.65;
  color: rgba(17, 17, 17, 0.65);
  margin-bottom: 2.2rem;
`;

const ErrBox = styled.div`
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 1rem 1.4rem;
  border-radius: 0.7rem;
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.6rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
`;

const Input = styled.input<{ $invalid?: boolean }>`
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  border: 1.5px solid ${(p) => (p.$invalid ? '#fc8181' : '#ddd')};
  border-radius: 0.7rem;
  background: #fff;
  color: #111;
  width: 100%;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: ${(p) => (p.$invalid ? '#e53e3e' : 'rgb(255,125,0)')};
  }
`;

const PasswordWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const EyeBtn = styled.button`
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  display: flex;
  align-items: center;
  padding: 0;
  &:hover {
    color: #333;
  }
`;

const ValidationMsg = styled.p<{ $error?: boolean }>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: ${(p) => (p.$error ? '#e53e3e' : '#666')};
`;

const Actions = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  padding: 1.1rem 2.2rem;
  font-size: 1.5rem;
  font-weight: 800;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  &:hover:not(:disabled) {
    background: rgb(230, 100, 0);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const SecondaryLink = styled(Link)`
  font-size: 1.4rem;
  color: rgba(17, 17, 17, 0.6);
  text-decoration: none;
  &:hover {
    color: rgb(255, 125, 0);
    text-decoration: underline;
  }
`;

const SuccessIcon = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.12);
  color: rgb(22, 163, 74);
  font-size: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.6rem;
`;

const PrimaryLink = styled(Link)`
  display: inline-block;
  padding: 1.1rem 2.6rem;
  background: rgb(255, 125, 0);
  color: #fff;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: rgb(230, 100, 0);
  }
`;
