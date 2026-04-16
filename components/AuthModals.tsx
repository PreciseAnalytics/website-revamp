import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { css } from 'styled-components';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';

type Mode = 'login' | 'register';

interface Props {
  mode: Mode;
  onClose: () => void;
  onSwitch: (m: Mode) => void;
}

// ── Validation helpers ────────────────────────────────────────────────────────
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function validatePhone(v: string) {
  return v === '' || /^\(\d{3}\) \d{3}-\d{4}$/.test(v);
}

interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
}

function passwordStrength(p: string): StrengthResult {
  let score = 0;
  if (p.length >= 8) score++;
  if (p.length >= 12) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const capped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: 'Too short', color: '#e53e3e' },
    1: { label: 'Weak', color: '#e53e3e' },
    2: { label: 'Fair', color: '#dd6b20' },
    3: { label: 'Good', color: '#d69e2e' },
    4: { label: 'Strong', color: '#38a169' },
  };
  return { score: capped, ...map[capped] };
}

// ── Eye icon ──────────────────────────────────────────────────────────────────
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AuthModal({ mode, onClose, onSwitch }: Props) {
  const { login } = useAuth();

  // login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);

  // register
  const [regFirst, setRegFirst] = useState('');
  const [regLast, setRegLast] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [regDone, setRegDone] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(regPassword), [regPassword]);
  const passwordsMatch = regConfirm === '' || regPassword === regConfirm;
  const emailValid = regEmail === '' || validateEmail(regEmail);
  const phoneValid = validatePhone(regPhone);

  function touch(field: string) {
    setTouched(t => ({ ...t, [field]: true }));
  }

  function canSubmitRegister() {
    return (
      regFirst.trim() &&
      regLast.trim() &&
      validateEmail(regEmail) &&
      phoneValid &&
      strength.score >= 2 &&
      regPassword === regConfirm
    );
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed.');
      login({ firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone });
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!validateEmail(regEmail)) { setError('Please enter a valid email address.'); return; }
    if (!phoneValid) { setError('Phone must be in format (804) 555-0100.'); return; }
    if (strength.score < 2) { setError('Please choose a stronger password.'); return; }
    if (regPassword !== regConfirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: regFirst.trim(),
          lastName: regLast.trim(),
          email: regEmail.trim(),
          phone: regPhone.trim(),
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed.');
      setRegDone(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Overlay
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <Header>
          <Title>
            {mode === 'login' ? 'Sign In' : regDone ? 'Check Your Email' : 'Create Account'}
          </Title>
          <Close onClick={onClose}>&times;</Close>
        </Header>

        {/* ── Login ── */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} autoComplete="on">
            {error && <ErrBox>{error}</ErrBox>}
            <Field>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="login-password">Password</Label>
              <PasswordWrap>
                <Input
                  id="login-password"
                  name="password"
                  type={showLoginPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  style={{ paddingRight: '4rem' }}
                />
                <EyeBtn type="button" onClick={() => setShowLoginPw(p => !p)} tabIndex={-1}>
                  <EyeIcon open={showLoginPw} />
                </EyeBtn>
              </PasswordWrap>
            </Field>
            <Actions>
              <PrimaryBtn type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign In'}
              </PrimaryBtn>
            </Actions>
            <FooterLink type="button" onClick={() => { setError(''); onSwitch('register'); }}>
              No account? Create one here
            </FooterLink>
          </form>
        )}

        {/* ── Register ── */}
        {mode === 'register' && !regDone && (
          <form onSubmit={handleRegister} autoComplete="on">
            {error && <ErrBox>{error}</ErrBox>}

            <Row>
              <Field>
                <Label htmlFor="reg-first">First Name <Req>*</Req></Label>
                <Input
                  id="reg-first"
                  name="given-name"
                  type="text"
                  autoComplete="given-name"
                  value={regFirst}
                  onChange={e => setRegFirst(e.target.value)}
                  placeholder="Jane"
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="reg-last">Last Name <Req>*</Req></Label>
                <Input
                  id="reg-last"
                  name="family-name"
                  type="text"
                  autoComplete="family-name"
                  value={regLast}
                  onChange={e => setRegLast(e.target.value)}
                  placeholder="Smith"
                  required
                />
              </Field>
            </Row>

            <Field>
              <Label htmlFor="reg-email">Email Address <Req>*</Req></Label>
              <Input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                onBlur={() => touch('email')}
                placeholder="you@example.com"
                $invalid={touched.email && !emailValid}
                required
              />
              {touched.email && !emailValid && (
                <ValidationMsg $error>Enter a valid email address.</ValidationMsg>
              )}
            </Field>

            <Field>
              <Label htmlFor="reg-phone">Phone Number</Label>
              <Input
                id="reg-phone"
                name="tel"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                value={regPhone}
                onChange={e => setRegPhone(formatPhone(e.target.value))}
                onKeyDown={e => {
                  const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
                  if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                onBlur={() => touch('phone')}
                placeholder="(804) 555-0100"
                $invalid={touched.phone && !phoneValid}
              />
              {touched.phone && !phoneValid && (
                <ValidationMsg $error>Use format: (804) 555-0100</ValidationMsg>
              )}
            </Field>

            <Field>
              <Label htmlFor="reg-password">Password <Req>*</Req></Label>
              <PasswordWrap>
                <Input
                  id="reg-password"
                  name="new-password"
                  type={showRegPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  onBlur={() => touch('password')}
                  placeholder="Min. 8 characters"
                  required
                  style={{ paddingRight: '4rem' }}
                />
                <EyeBtn type="button" onClick={() => setShowRegPw(p => !p)} tabIndex={-1}>
                  <EyeIcon open={showRegPw} />
                </EyeBtn>
              </PasswordWrap>
              {regPassword && (
                <>
                  <StrengthBar>
                    {[1, 2, 3, 4].map(i => (
                      <StrengthSegment key={i} $active={strength.score >= i} $color={strength.color} />
                    ))}
                  </StrengthBar>
                  <StrengthLabel $color={strength.color}>
                    {strength.label} — {strength.score < 2 ? 'add uppercase, numbers, or symbols' : 'password strength acceptable'}
                  </StrengthLabel>
                </>
              )}
              {touched.password && !regPassword && (
                <ValidationMsg $error>Password is required.</ValidationMsg>
              )}
            </Field>

            <Field>
              <Label htmlFor="reg-confirm">Confirm Password <Req>*</Req></Label>
              <PasswordWrap>
                <Input
                  id="reg-confirm"
                  name="confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={regConfirm}
                  onChange={e => setRegConfirm(e.target.value)}
                  onBlur={() => touch('confirm')}
                  placeholder="Repeat password"
                  required
                  $invalid={touched.confirm && !passwordsMatch}
                  style={{ paddingRight: '4rem' }}
                />
                <EyeBtn type="button" onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                  <EyeIcon open={showConfirm} />
                </EyeBtn>
              </PasswordWrap>
              {touched.confirm && regConfirm && !passwordsMatch && (
                <ValidationMsg $error>Passwords do not match.</ValidationMsg>
              )}
              {touched.confirm && regConfirm && passwordsMatch && regConfirm.length > 0 && (
                <ValidationMsg $success>Passwords match.</ValidationMsg>
              )}
            </Field>

            <Actions>
              <PrimaryBtn type="submit" disabled={loading || !canSubmitRegister()}>
                {loading ? 'Creating account…' : 'Create Account'}
              </PrimaryBtn>
            </Actions>
            <FooterLink type="button" onClick={() => { setError(''); onSwitch('login'); }}>
              Already have an account? Sign in
            </FooterLink>
          </form>
        )}

        {/* ── Success ── */}
        {mode === 'register' && regDone && (
          <SuccessBox>
            <SuccessIcon>✓</SuccessIcon>
            <SuccessTitle>Account Created!</SuccessTitle>
            <SuccessText>
              We sent a verification link to <strong>{regEmail}</strong>.
              Click it to activate your account, then sign in to apply.
            </SuccessText>
            <PrimaryBtn onClick={onClose}>Close</PrimaryBtn>
          </SuccessBox>
        )}
      </Box>
    </Overlay>
  );
}

// ── Styled components ─────────────────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  z-index: 99999; padding: 2rem;
`;

const Box = styled(motion.div)`
  background: #fff; color: #111;
  border-radius: 1.4rem;
  padding: 3.5rem 4rem;
  max-width: 54rem; width: 100%;
  max-height: 92vh; overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  ${media.tablet(`padding: 2.5rem 2rem;`)}
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 2.2rem;
`;
const Title = styled.h2`font-size: 2.2rem; font-weight: 700; color: #111;`;
const Close = styled.button`
  background: none; border: none; font-size: 2.8rem;
  cursor: pointer; color: #888; line-height: 1;
  &:hover { color: #111; }
`;

const ErrBox = styled.div`
  background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c;
  padding: 1rem 1.4rem; border-radius: 0.7rem;
  font-size: 1.4rem; margin-bottom: 1.5rem;
`;

const Field = styled.div`
  display: flex; flex-direction: column; gap: 0.5rem;
  margin-bottom: 1.6rem; flex: 1;
`;
const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;
const Label = styled.label`font-size: 1.4rem; font-weight: 600; color: #222;`;
const Req = styled.span`color: #e53e3e;`;

const Input = styled.input<{ $invalid?: boolean }>`
  padding: 1rem 1.2rem; font-size: 1.5rem;
  border: 1.5px solid ${p => p.$invalid ? '#fc8181' : '#ddd'};
  border-radius: 0.7rem;
  background: #fff; color: #111;
  width: 100%;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: ${p => p.$invalid ? '#e53e3e' : 'rgb(255,125,0)'};
  }
`;

const PasswordWrap = styled.div`position: relative; display: flex; align-items: center;`;
const EyeBtn = styled.button`
  position: absolute; right: 1rem;
  background: none; border: none; cursor: pointer;
  color: #888; display: flex; align-items: center;
  padding: 0;
  &:hover { color: #333; }
`;

const ValidationMsg = styled.p<{ $error?: boolean; $success?: boolean }>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: ${p => p.$error ? '#e53e3e' : p.$success ? '#38a169' : '#666'};
`;

const StrengthBar = styled.div`
  display: flex; gap: 0.4rem; margin-top: 0.6rem;
`;
const StrengthSegment = styled.div<{ $active: boolean; $color: string }>`
  flex: 1; height: 0.4rem; border-radius: 0.2rem;
  background: ${p => p.$active ? p.$color : '#e2e8f0'};
  transition: background 0.3s;
`;
const StrengthLabel = styled.p<{ $color: string }>`
  font-size: 1.2rem;
  color: ${p => p.$color};
  margin-top: 0.3rem;
`;

const Actions = styled.div`margin-top: 0.8rem;`;
const PrimaryBtn = styled.button`
  width: 100%; padding: 1.2rem 2rem; font-size: 1.6rem; font-weight: 700;
  background: rgb(255,125,0); color: #fff; border: none; border-radius: 0.8rem;
  cursor: pointer; transition: background 0.2s, opacity 0.2s;
  &:hover:not(:disabled) { background: rgb(230,100,0); }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;
const FooterLink = styled.button`
  display: block; width: 100%; margin-top: 1.4rem;
  font-size: 1.4rem; color: rgb(255,125,0); background: none; border: none;
  cursor: pointer; text-align: center;
  &:hover { text-decoration: underline; }
`;

const SuccessBox = styled.div`
  text-align: center; padding: 1rem 0;
  display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
`;
const SuccessIcon = styled.div`
  width: 5.5rem; height: 5.5rem; border-radius: 50%;
  background: rgba(34,197,94,0.12); color: rgb(22,163,74);
  font-size: 2.4rem; display: flex; align-items: center; justify-content: center;
`;
const SuccessTitle = styled.h3`font-size: 2rem; font-weight: 700; color: #111;`;
const SuccessText = styled.p`font-size: 1.5rem; line-height: 1.65; color: #444; max-width: 38rem;`;
