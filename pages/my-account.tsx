import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/auth.context';
import { media } from 'utils/media';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';

type Tab = 'profile' | 'email' | 'password';

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function passwordStrength(p: string) {
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

export default function MyAccountPage() {
  const router = useRouter();
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && !user) router.replace('/careers');
  }, [mounted, user, router]);

  // Profile fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Email fields
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showEmailPw, setShowEmailPw] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [emailLoading, setEmailLoading] = useState(false);

  // Password fields
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(newPw), [newPw]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone || '');
      setRecoveryEmail(user.recoveryEmail || '');
    }
  }, [user]);

  if (!mounted || !user) return null;

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user!.email, firstName, lastName, phone, recoveryEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed.');
      updateUser({ firstName: data.firstName, lastName: data.lastName, phone: data.phone, recoveryEmail: data.recoveryEmail });
      setProfileMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err: any) {
      setProfileMsg({ type: 'error', text: err.message });
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleEmailSave(e: React.FormEvent) {
    e.preventDefault();
    setEmailMsg(null);
    setEmailLoading(true);
    try {
      const res = await fetch('/api/auth/update-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail: user!.email, newEmail, password: emailPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Email update failed.');
      setEmailMsg({
        type: 'success',
        text: `A verification link was sent to ${data.newEmail}. Click it to confirm your new address, then sign in again.`,
      });
      setNewEmail('');
      setEmailPassword('');
      setTimeout(() => { logout(); router.push('/careers'); }, 4000);
    } catch (err: any) {
      setEmailMsg({ type: 'error', text: err.message });
    } finally {
      setEmailLoading(false);
    }
  }

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (newPw !== confirmPw) { setPwMsg({ type: 'error', text: 'New passwords do not match.' }); return; }
    if (strength.score < 2) { setPwMsg({ type: 'error', text: 'Please choose a stronger password.' }); return; }
    setPwLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user!.email, currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password change failed.');
      setPwMsg({ type: 'success', text: 'Password changed successfully.' });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err: any) {
      setPwMsg({ type: 'error', text: err.message });
    } finally {
      setPwLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>My Account — Precise Analytics</title>
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <PageHeader>
            <div>
              <PageTitle>My Account</PageTitle>
              <PageSubtitle>Manage your profile, email, and password</PageSubtitle>
            </div>
            <HeaderMeta>
              <UserChip>
                <Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>
                <div>
                  <ChipName>{user.firstName} {user.lastName}</ChipName>
                  <ChipEmail>{user.email}</ChipEmail>
                </div>
              </UserChip>
            </HeaderMeta>
          </PageHeader>

          <Layout>
            <Sidebar>
              {(['profile', 'email', 'password'] as Tab[]).map(tab => (
                <SidebarItem
                  key={tab}
                  $active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'profile' && <TabIcon>👤</TabIcon>}
                  {tab === 'email' && <TabIcon>✉️</TabIcon>}
                  {tab === 'password' && <TabIcon>🔒</TabIcon>}
                  <TabLabel>
                    {tab === 'profile' && 'Personal Info'}
                    {tab === 'email' && 'Email Address'}
                    {tab === 'password' && 'Password'}
                  </TabLabel>
                </SidebarItem>
              ))}
            </Sidebar>

            <Panel
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* ── Personal Info ── */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileSave}>
                  <SectionTitle>Personal Information</SectionTitle>
                  <SectionSubtitle>This information is used to pre-fill job applications and consultation forms.</SectionSubtitle>

                  {profileMsg && <FeedbackBox $type={profileMsg.type}>{profileMsg.text}</FeedbackBox>}

                  <FieldRow>
                    <Field>
                      <Label>First Name</Label>
                      <Input value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </Field>
                    <Field>
                      <Label>Last Name</Label>
                      <Input value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </Field>
                  </FieldRow>

                  <Field>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      placeholder="(804) 555-0100"
                      onChange={e => setPhone(formatPhone(e.target.value))}
                      onKeyDown={e => {
                        const allowed = ['Backspace','Delete','Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
                        if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) e.preventDefault();
                      }}
                    />
                  </Field>

                  <Field>
                    <Label>Recovery / Alternate Email</Label>
                    <Input
                      type="email"
                      value={recoveryEmail}
                      onChange={e => setRecoveryEmail(e.target.value)}
                      placeholder="backup@example.com (optional)"
                    />
                    <FieldHint>Used for account recovery and password resets if your primary email is unavailable.</FieldHint>
                  </Field>

                  <Field>
                    <Label>Primary Email</Label>
                    <Input value={user.email} disabled />
                    <FieldHint>To change your primary email address, use the Email Address tab.</FieldHint>
                  </Field>

                  <SaveBtn type="submit" disabled={profileLoading}>
                    {profileLoading ? 'Saving…' : 'Save Changes'}
                  </SaveBtn>
                </form>
              )}

              {/* ── Email Address ── */}
              {activeTab === 'email' && (
                <form onSubmit={handleEmailSave}>
                  <SectionTitle>Email Address</SectionTitle>
                  <SectionSubtitle>
                    Changing your email will send a verification link to your new address. You will be signed out and must verify before signing back in.
                  </SectionSubtitle>

                  {emailMsg && <FeedbackBox $type={emailMsg.type}>{emailMsg.text}</FeedbackBox>}

                  <Field>
                    <Label>Current Email</Label>
                    <Input value={user.email} disabled />
                  </Field>

                  <Field>
                    <Label>New Email Address</Label>
                    <Input
                      type="email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      placeholder="new@example.com"
                      required
                    />
                  </Field>

                  <Field>
                    <Label>Confirm Password</Label>
                    <PasswordWrap>
                      <Input
                        type={showEmailPw ? 'text' : 'password'}
                        value={emailPassword}
                        onChange={e => setEmailPassword(e.target.value)}
                        placeholder="Your current password"
                        required
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn type="button" onClick={() => setShowEmailPw(p => !p)} tabIndex={-1}>
                        <EyeIcon open={showEmailPw} />
                      </EyeBtn>
                    </PasswordWrap>
                  </Field>

                  <SaveBtn type="submit" disabled={emailLoading}>
                    {emailLoading ? 'Updating…' : 'Update Email'}
                  </SaveBtn>
                </form>
              )}

              {/* ── Password ── */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordSave}>
                  <SectionTitle>Change Password</SectionTitle>
                  <SectionSubtitle>Choose a strong password with at least 8 characters, including uppercase letters, numbers, and symbols.</SectionSubtitle>

                  {pwMsg && <FeedbackBox $type={pwMsg.type}>{pwMsg.text}</FeedbackBox>}

                  <Field>
                    <Label>Current Password</Label>
                    <PasswordWrap>
                      <Input
                        type={showCurrent ? 'text' : 'password'}
                        value={currentPw}
                        onChange={e => setCurrentPw(e.target.value)}
                        placeholder="Your current password"
                        required
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn type="button" onClick={() => setShowCurrent(p => !p)} tabIndex={-1}>
                        <EyeIcon open={showCurrent} />
                      </EyeBtn>
                    </PasswordWrap>
                  </Field>

                  <Field>
                    <Label>New Password</Label>
                    <PasswordWrap>
                      <Input
                        type={showNew ? 'text' : 'password'}
                        value={newPw}
                        onChange={e => setNewPw(e.target.value)}
                        placeholder="Min. 8 characters"
                        required
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn type="button" onClick={() => setShowNew(p => !p)} tabIndex={-1}>
                        <EyeIcon open={showNew} />
                      </EyeBtn>
                    </PasswordWrap>
                    {newPw && (
                      <>
                        <StrengthBar>
                          {[1,2,3,4].map(i => (
                            <StrengthSeg key={i} $active={strength.score >= i} $color={strength.color} />
                          ))}
                        </StrengthBar>
                        <StrengthLabel $color={strength.color}>
                          {strength.label}{strength.score < 2 ? ' — add uppercase, numbers, or symbols' : ' — password strength acceptable'}
                        </StrengthLabel>
                      </>
                    )}
                  </Field>

                  <Field>
                    <Label>Confirm New Password</Label>
                    <PasswordWrap>
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPw}
                        onChange={e => setConfirmPw(e.target.value)}
                        placeholder="Repeat new password"
                        required
                        style={{ paddingRight: '4rem' }}
                      />
                      <EyeBtn type="button" onClick={() => setShowConfirm(p => !p)} tabIndex={-1}>
                        <EyeIcon open={showConfirm} />
                      </EyeBtn>
                    </PasswordWrap>
                    {confirmPw && newPw === confirmPw && (
                      <MatchMsg $match>Passwords match.</MatchMsg>
                    )}
                    {confirmPw && newPw !== confirmPw && (
                      <MatchMsg $match={false}>Passwords do not match.</MatchMsg>
                    )}
                  </Field>

                  <SaveBtn type="submit" disabled={pwLoading}>
                    {pwLoading ? 'Changing…' : 'Change Password'}
                  </SaveBtn>
                </form>
              )}
            </Panel>
          </Layout>
        </Container>
        <AccountNav>
          <Link href="/careers">Browse Open Positions</Link>
          <Link href="/solutions">Our Solutions</Link>
          <Link href="/schedule-consult">Schedule a Consultation</Link>
          <Link href="/about-us">About Us</Link>
        </AccountNav>
      </PageWrapper>
    </>
  );
}

// ── Styled components ─────────────────────────────────────────────────────────

const AccountNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 3rem 2rem;

  a {
    font-size: 1.5rem;
    color: rgb(var(--accent));
    text-decoration: underline;
  }
`;

const PageWrapper = styled.div`
  padding: 4rem 0 6rem;
  ${media.tablet(`padding: 2.5rem 0 4rem;`)}
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(var(--text), 0.55);
`;

const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
`;

const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: rgba(var(--text), 0.05);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1rem;
  padding: 1rem 1.6rem;
`;

const Avatar = styled.div`
  width: 4rem; height: 4rem;
  border-radius: 50%;
  background: rgb(255, 125, 0);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  text-transform: uppercase;
  flex-shrink: 0;
`;

const ChipName = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: rgb(var(--text));
`;

const ChipEmail = styled.p`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.5);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  gap: 3rem;
  align-items: start;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const Sidebar = styled.nav`
  background: rgba(var(--text), 0.03);
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1rem;
  overflow: hidden;
`;

const SidebarItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.4rem 1.8rem;
  background: ${p => p.$active ? 'rgba(255,125,0,0.08)' : 'transparent'};
  border: none;
  border-left: 3px solid ${p => p.$active ? 'rgb(255,125,0)' : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s;
  &:hover:not([disabled]) {
    background: rgba(255,125,0,0.05);
  }
`;

const TabIcon = styled.span`font-size: 1.6rem;`;

const TabLabel = styled.span`
  font-size: 1.45rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const Panel = styled(motion.div)`
  background: rgb(var(--cardBackground));
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 1rem;
  padding: 3rem 3.5rem;
  ${media.tablet(`padding: 2rem 1.8rem;`)}
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.55);
  margin-bottom: 2.5rem;
`;

const FeedbackBox = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem 1.4rem;
  border-radius: 0.7rem;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  ${p => p.$type === 'success'
    ? 'background:#dcfce7;border:2px solid #86efac;color:#166534;'
    : 'background:#fee2e2;border:2px solid #f87171;color:#991b1b;'}
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgb(var(--text));
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  font-size: 1.5rem;
  border: 1.5px solid rgba(var(--text), 0.18);
  border-radius: 0.7rem;
  background: rgb(var(--inputBackground, 255,255,255));
  color: rgb(var(--text));
  width: 100%;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: rgb(255,125,0); }
  &:disabled { opacity: 0.55; cursor: not-allowed; background: rgba(var(--text), 0.04); }
`;

const FieldHint = styled.p`
  font-size: 1.2rem;
  color: rgba(var(--text), 0.45);
  margin-top: 0.2rem;
`;

const PasswordWrap = styled.div`position: relative; display: flex; align-items: center;`;
const EyeBtn = styled.button`
  position: absolute; right: 0.8rem;
  background: rgba(0,0,0,0.06); border: none; cursor: pointer;
  color: #444; display: flex; align-items: center;
  padding: 0.4rem; border-radius: 0.4rem;
  &:hover { color: #111; background: rgba(0,0,0,0.1); }
`;

const StrengthBar = styled.div`display: flex; gap: 0.4rem; margin-top: 0.6rem;`;
const StrengthSeg = styled.div<{ $active: boolean; $color: string }>`
  flex: 1; height: 0.4rem; border-radius: 0.2rem;
  background: ${p => p.$active ? p.$color : '#e2e8f0'};
  transition: background 0.3s;
`;
const StrengthLabel = styled.p<{ $color: string }>`
  font-size: 1.2rem;
  color: ${p => p.$color};
  margin-top: 0.3rem;
`;

const MatchMsg = styled.p<{ $match: boolean }>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: ${p => p.$match ? '#38a169' : '#e53e3e'};
`;

const SaveBtn = styled.button`
  padding: 1.1rem 2.8rem;
  font-size: 1.55rem;
  font-weight: 700;
  background: rgb(255, 125, 0);
  color: #fff;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  &:hover:not(:disabled) { background: rgb(230, 100, 0); }
  &:disabled { opacity: 0.45; cursor: not-allowed; }
`;
