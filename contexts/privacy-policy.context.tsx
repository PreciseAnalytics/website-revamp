import React, { createContext, useState, useContext } from 'react';

type PrivacyPolicyContextType = {
  isPrivacyPolicyOpen: boolean;
  openPrivacyPolicy: () => void;
  closePrivacyPolicy: () => void;
};

const PrivacyPolicyContext = createContext<PrivacyPolicyContextType>({
  isPrivacyPolicyOpen: false,
  openPrivacyPolicy: () => {},
  closePrivacyPolicy: () => {},
});

export const PrivacyPolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  const openPrivacyPolicy = () => setIsPrivacyPolicyOpen(true);
  const closePrivacyPolicy = () => setIsPrivacyPolicyOpen(false);

  return (
    <PrivacyPolicyContext.Provider
      value={{
        isPrivacyPolicyOpen,
        openPrivacyPolicy,
        closePrivacyPolicy,
      }}
    >
      {children}
    </PrivacyPolicyContext.Provider>
  );
};

export const usePrivacyPolicyContext = () => useContext(PrivacyPolicyContext);
