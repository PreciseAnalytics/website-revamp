import styled from 'styled-components';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PrivacyPreferenceCenter({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Panel>
        <Header>
          <Title>Privacy Preference Center</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <Content>
          <Description>
            When you visit our website, we may store or retrieve information on
            your browser, mostly in the form of cookies. You can control how
            non-essential cookies are used below.
          </Description>

          <PreferenceRow>
            <LabelStrong>Strictly Necessary Cookies</LabelStrong>
            <Status>Always Active</Status>
          </PreferenceRow>

          <ToggleRow>
            <Label>Performance Cookies</Label>
            <input type="checkbox" />
          </ToggleRow>

          <ToggleRow>
            <Label>Functional Cookies</Label>
            <input type="checkbox" />
          </ToggleRow>

          <ToggleRow>
            <Label>Targeting Cookies</Label>
            <input type="checkbox" />
          </ToggleRow>
        </Content>

        <Footer>
          <ConfirmButton onClick={onClose}>
            Confirm My Choices
          </ConfirmButton>
        </Footer>
      </Panel>
    </Overlay>
  );
}

/* ================= STYLES ================= */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 9999; /* ABOVE HEADER */
`;

const Panel = styled.div`
  position: fixed;
  left: 0;
  top: 120px; /* ⬅ clears logo + nav */
  width: 560px; /* ⬅ WIDER */
  height: calc(100% - 120px);
  background: #ffffff;
  padding: 3rem;
  font-family: 'Aptos', 'Segoe UI', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h3`
  font-size: 2.6rem; /* ⬅ BIGGER */
  font-weight: 700;
  color: #0f172a;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.8rem;
  cursor: pointer;
  color: #0f172a;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
`;

const Description = styled.p`
  font-size: 1.8rem; /* ⬅ BIGGER */
  line-height: 1.7;
  color: #334155;
`;

const PreferenceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.9rem;
  padding: 1rem 0;
`;

const ToggleRow = styled(PreferenceRow)`
  cursor: pointer;
  border-radius: 8px;
  padding: 1.2rem;

  &:hover {
    background: #f8fafc;
  }

  input {
    width: 22px;
    height: 22px;
    cursor: pointer;
    accent-color: #16a34a;
  }
`;

const Label = styled.span`
  color: #0f172a;
  font-weight: 500;
`;

const LabelStrong = styled.span`
  font-weight: 600;
  color: #0f172a;
`;

const Status = styled.span`
  color: #16a34a;
  font-weight: 700;
`;

const Footer = styled.div`
  padding-top: 2.4rem;
  border-top: 1px solid #e5e7eb;
`;

const ConfirmButton = styled.button`
  width: 100%;
  background: #16a34a;
  color: #ffffff;
  border: none;
  padding: 1.6rem;
  font-size: 1.9rem; /* ⬅ BIGGER */
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #15803d;
  }
`;
