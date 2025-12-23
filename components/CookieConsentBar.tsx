import styled from 'styled-components';

type Props = {
  onCustomize: () => void;
  onEssentialOnly: () => void;
  onAcceptAll: () => void;
};

export default function CookieConsentBar({
  onCustomize,
  onEssentialOnly,
  onAcceptAll,
}: Props) {
  return (
    <Bar>
      <Text>
        We use cookies and similar technologies to enhance your experience,
        analyze site performance, and support our services. You can manage your
        preferences at any time.
      </Text>

      <Actions>
        <Secondary onClick={onCustomize}>
          Customize Settings
        </Secondary>

        <Secondary onClick={onEssentialOnly}>
          Essential Only
        </Secondary>

        <Primary onClick={onAcceptAll}>
          Stay Opted-In
        </Primary>
      </Actions>
    </Bar>
  );
}

/* ================= STYLES ================= */

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0f172a; /* darker, more premium */
  color: #ffffff;
  padding: 2.4rem 3.6rem; /* ⬅ TALLER */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  z-index: 4000;
  font-family: 'Aptos', 'Segoe UI', system-ui, sans-serif;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1.6rem; /* ⬅ BIGGER */
  line-height: 1.6;
  max-width: 880px; /* ⬅ WIDER */
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
`;

const Actions = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;

const Primary = styled.button`
  background: #16a34a;
  color: #ffffff;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.5rem; /* ⬅ BIGGER */
  font-weight: 700;
  border-radius: 0.6rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #15803d;
  }
`;

const Secondary = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.45);
  padding: 1.2rem 2.2rem;
  font-size: 1.5rem; /* ⬅ BIGGER */
  font-weight: 600;
  border-radius: 0.6rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;
