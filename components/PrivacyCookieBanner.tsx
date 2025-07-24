'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CookiePreferences {
  strictlyNecessary: boolean;
  functional: boolean;
  performance: boolean;
  targeting: boolean;
}

const PrivacyCookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [activeSection, setActiveSection] = useState('Your Privacy');
  const [preferences, setPreferences] = useState<CookiePreferences>({
    strictlyNecessary: true,
    functional: false,
    performance: false,
    targeting: false
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    const storedPrefs = localStorage.getItem('cookiePreferences');

    setIsVisible(!storedConsent); // Show immediately on first visit

    if (storedPrefs) {
      setPreferences(JSON.parse(storedPrefs));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      strictlyNecessary: true,
      functional: true,
      performance: true,
      targeting: true
    }));
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      strictlyNecessary: true,
      functional: false,
      performance: false,
      targeting: false
    }));
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
    setIsVisible(false);
  };

  const handlePreferences = () => {
    setShowPreferences(true);
  };

  const handleConfirmChoices = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentTimestamp', new Date().toISOString());
    setShowPreferences(false);
    setIsVisible(false);
  };

  const handleAllowAll = () => {
    const allEnabled = {
      strictlyNecessary: true,
      functional: true,
      performance: true,
      targeting: true
    };
    setPreferences(allEnabled);
    handleAccept();
    setShowPreferences(false);
  };

  const handleRejectAllModal = () => {
    const onlyNecessary = {
      strictlyNecessary: true,
      functional: false,
      performance: false,
      targeting: false
    };
    setPreferences(onlyNecessary);
    handleReject();
    setShowPreferences(false);
  };

  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'strictlyNecessary') return;
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const sidebarSections = [
    { name: 'Your Privacy' },
    { name: 'Strictly Necessary Cookies' },
    { name: 'Functional Cookies' },
    { name: 'Performance Cookies' },
    { name: 'Targeting Cookies' }
  ];

  const getSectionContent = () => {
    switch (activeSection) {
      case 'Your Privacy':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Your Privacy
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>
              When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. 
              This information might be about you, your preferences or your device and is mostly used to make the site work as 
              you expect it to.
            </p>
          </div>
        );
      case 'Strictly Necessary Cookies':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Strictly Necessary Cookies
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>
              These cookies are necessary for the website to function and cannot be switched off in our systems.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Always Active</span>
              <div style={{
                width: '50px',
                height: '26px',
                backgroundColor: '#28a745',
                borderRadius: '26px',
                position: 'relative'
              }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  right: '2px'
                }} />
              </div>
            </div>
          </div>
        );
      case 'Functional Cookies':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Functional Cookies
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>
              These cookies enable the website to provide enhanced functionality and personalisation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Functional Cookies</span>
              <button
                onClick={() => togglePreference('functional')}
                style={{
                  width: '50px',
                  height: '26px',
                  backgroundColor: preferences.functional ? '#28a745' : '#ccc',
                  borderRadius: '26px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: preferences.functional ? '26px' : '2px',
                  transition: 'left 0.2s ease'
                }} />
              </button>
            </div>
          </div>
        );
      case 'Performance Cookies':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Image
                src="/cookie-icon.svg"
                alt="Cookie"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                Performance Cookies
              </h2>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>
              These cookies allow us to measure and improve the performance of our site.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Performance Cookies</span>
              <button
                onClick={() => togglePreference('performance')}
                style={{
                  width: '50px',
                  height: '26px',
                  backgroundColor: preferences.performance ? '#28a745' : '#ccc',
                  borderRadius: '26px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: preferences.performance ? '26px' : '2px',
                  transition: 'left 0.2s ease'
                }} />
              </button>
            </div>
          </div>
        );
      case 'Targeting Cookies':
        return (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
              Targeting Cookies
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>
              These cookies may be set through our site by our advertising partners.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Targeting Cookies</span>
              <button
                onClick={() => togglePreference('targeting')}
                style={{
                  width: '50px',
                  height: '26px',
                  backgroundColor: preferences.targeting ? '#28a745' : '#ccc',
                  borderRadius: '26px',
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: preferences.targeting ? '26px' : '2px',
                  transition: 'left 0.2s ease'
                }} />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 120,
              duration: 0.5
            }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              backgroundColor: '#2c3e50',
              color: 'white',
              padding: '32px',
              zIndex: 9999,
              boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
              borderTop: '4px solid #3498db',
              fontFamily: 'Arial, sans-serif'
            }}
          >
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  margin: '0 0 16px 0',
                  color: '#ffffff'
                }}>
                  Your Privacy
                </h2>
                <p style={{
                  fontSize: '20px',
                  lineHeight: '1.6',
                  margin: 0,
                  color: '#ecf0f1',
                  maxWidth: '600px'
                }}>
                  We use cookies to personalize content and ads, provide social media features and analyse our traffic. 
                  You can control your cookie preferences by clicking on the buttons.
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handlePreferences}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: 'transparent',
                    color: '#3498db',
                    border: '2px solid #3498db',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minWidth: '140px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Preference Center
                </button>
                
                <button
                  onClick={handleReject}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minWidth: '140px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Reject All
                </button>
                
                <button
                  onClick={handleAccept}
                  style={{
                    padding: '16px 24px',
                    backgroundColor: '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    minWidth: '140px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  I&apos;m OK with that
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPreferences && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '85vh',
            overflow: 'auto',
            fontFamily: 'Arial, sans-serif'
          }}>
            <div style={{
              padding: '32px',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Image
                  src="/privacy-icon.svg" 
                  alt="Privacy"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: '0 0 12px 0',
                  color: '#333'
                }}>
                  Cookie Preferences
                </h3>
              </div>
              <p style={{
                fontSize: '18px',
                color: '#666',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Choose which cookies you want to accept.
              </p>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <div style={{
                width: '280px',
                backgroundColor: '#f8f9fa',
                borderRight: '1px solid #e5e5e5',
                padding: '0',
                overflowY: 'auto'
              }}>
                {sidebarSections.map((section) => (
                  <div
                    key={section.name}
                    onClick={() => setActiveSection(section.name)}
                    style={{
                      padding: '15px 20px',
                      borderBottom: '1px solid #e5e5e5',
                      cursor: 'pointer',
                      backgroundColor: activeSection === section.name ? '#e3f2fd' : 'transparent',
                      borderLeft: activeSection === section.name ? '3px solid #0066cc' : '3px solid transparent',
                      fontSize: '14px',
                      color: activeSection === section.name ? '#0066cc' : '#333',
                      fontWeight: activeSection === section.name ? '600' : 'normal'
                    }}
                  >
                    {section.name}
                  </div>
                ))}
              </div>

              <div style={{
                flex: 1,
                padding: '30px',
                overflowY: 'auto'
              }}>
                {getSectionContent()}
              </div>
            </div>

            <div style={{
              padding: '32px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmChoices}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyCookieBanner;
