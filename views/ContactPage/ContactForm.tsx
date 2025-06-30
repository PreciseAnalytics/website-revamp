import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import Input from 'components/Input';
import { media } from 'utils/media';
import { EnvVars } from 'env';

export default function ContactForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const formData = new FormData();
      
      // Append form fields
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Append file if selected
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: 'Your message has been sent! We&apos;ll get back to you shortly.',
        });
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ContentWrapper>
          <FormContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FormTitle>Contact Us</FormTitle>
            <FormDescription>
              Fill out the form below and our team will get back to you within 24 hours.
            </FormDescription>
            
            <StyledForm onSubmit={handleSubmit}>
              <FormRow>
                <InputContainer>
                  <StyledInput 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </InputContainer>
                <InputContainer>
                  <StyledInput 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </InputContainer>
              </FormRow>
              
              <FormRow>
                <InputContainer>
                  <StyledInput 
                    name="email" 
                    type="email" 
                    placeholder="Email Address" 
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                  />
                </InputContainer>
                
                <InputContainer>
                  <StyledInput 
                    name="phone" 
                    type="tel" 
                    placeholder="Phone Number (Optional)" 
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </InputContainer>
              </FormRow>
              
              <InputContainer>
                <StyledInput 
                  name="company" 
                  placeholder="Company Name" 
                  value={formState.company}
                  onChange={handleInputChange}
                />
              </InputContainer>
              
              <MessageContainer>
                <MessageInput 
                  name="message" 
                  placeholder="How can we help you?" 
                  rows={5}
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                />
              </MessageContainer>

              <FileUploadContainer>
                <FileUploadLabel htmlFor="file-upload">
                  Upload Document (Optional)
                </FileUploadLabel>
                <FileUploadInput
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <SelectedFile>
                    Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </SelectedFile>
                )}
              </FileUploadContainer>
              
              {submitResult && (
                <ResultMessage success={submitResult.success}>
                  {submitResult.message}
                </ResultMessage>
              )}
              
              <SubmitButton>
                <Button orange disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Contact Us Today'}
                </Button>
              </SubmitButton>
            </StyledForm>
          </FormContainer>
          
          <InfoContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoSection>
              <InfoTitle>Visit Us</InfoTitle>
              <AddressBlock>
                <AddressLine>Precise Analytics HQ</AddressLine>
                <AddressLine>123 Data Drive</AddressLine>
                <AddressLine>San Francisco, CA 94105</AddressLine>
              </AddressBlock>
            </InfoSection>
            
            <InfoSection>
              <InfoTitle>Email Us</InfoTitle>
              <ContactLink href={`mailto:${EnvVars.CONTACT_EMAIL}`}>
                {EnvVars.CONTACT_EMAIL}
              </ContactLink>
            </InfoSection>
            
            <InfoSection>
              <InfoTitle>Call Us</InfoTitle>
              <ContactLink href={`tel:${EnvVars.PHONE.replace(/\s+/g, '')}`}>
                {EnvVars.PHONE}
              </ContactLink>
            </InfoSection>
            
            <InfoSection>
              <InfoTitle>Follow Us</InfoTitle>
              <SocialLinks>
                <SocialLink href="https://www.facebook.com/PreciseAnalytics.io/" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </IconWrapper>
                  Facebook
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/precise-analytics-llc" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </IconWrapper>
                  LinkedIn
                </SocialLink>
                <SocialLink href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </IconWrapper>
                  GitHub
                </SocialLink>
              </SocialLinks>
            </InfoSection>
          </InfoContainer>
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10rem 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(var(--background), 0.8),
    rgba(var(--background), 1) 70%
  );
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 6rem;
  
  ${media('<=desktop')} {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(var(--cardBackground), 0.7);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(var(--primary), 0.1);
  
  ${media('<=tablet')} {
    padding: 3rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
  
  ${media('<=tablet')} {
    font-size: 2.8rem;
  }
`;

const FormDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 3rem;
  
  ${media('<=tablet')} {
    font-size: 1.6rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  ${media('<=tablet')} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  background: rgba(var(--inputBackground), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
  backdrop-filter: blur(5px);
  font-size: 1.6rem;
  padding: 1.2rem 1.5rem;
  border-radius: 0.8rem;
  
  &:focus {
    border-color: rgb(var(--accent));
  }
`;

const MessageContainer = styled.div`
  width: 100%;
`;

const MessageInput = styled.textarea`
  width: 100%;
  background: rgba(var(--inputBackground), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
  backdrop-filter: blur(5px);
  font-size: 1.6rem;
  padding: 1.2rem 1.5rem;
  border-radius: 0.8rem;
  font-family: var(--font);
  resize: vertical;
  min-height: 15rem;
  color: rgb(var(--text));
  
  &:focus {
    border-color: rgb(var(--accent));
    outline: none;
  }
`;

const FileUploadContainer = styled.div`
  width: 100%;
`;

const FileUploadLabel = styled.label`
  display: block;
  font-size: 1.6rem;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const FileUploadInput = styled.input`
  width: 100%;
  background: rgba(var(--inputBackground), 0.7);
  border: 1px solid rgba(var(--text), 0.1);
  backdrop-filter: blur(5px);
  font-size: 1.6rem;
  padding: 1.2rem 1.5rem;
  border-radius: 0.8rem;
  color: rgb(var(--text));
  
  &::-webkit-file-upload-button {
    background: rgb(255, 125, 0);
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    font-family: var(--font);
    margin-right: 1rem;
    cursor: pointer;
  }
`;

const SelectedFile = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
`;

const SubmitButton = styled.div`
  margin-top: 2rem;
`;

const ResultMessage = styled.div<{ success: boolean }>`
  padding: 1.5rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  background: ${(p) =>
    p.success ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  color: ${(p) => (p.success ? 'rgb(0, 200, 83)' : 'rgb(255, 60, 60)')};
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: center;
  
  ${media('<=desktop')} {
    gap: 3rem;
  }
`;

const InfoSection = styled.div``;

const InfoTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 3rem;
    height: 2px;
    background-color: rgb(var(--accent));
  }
`;

const AddressBlock = styled.div`
  font-size: 1.6rem;
  color: rgb(var(--text));
  opacity: 0.8;
  line-height: 1.6;
`;

const AddressLine = styled.div``;

const ContactLink = styled.a`
  font-size: 1.6rem;
  color: rgb(var(--accent));
  text-decoration: none;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: rgb(var(--accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const SocialLink = styled.a`
  font-size: 1.6rem;
  color: rgb(var(--text));
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  &:hover {
    color: rgb(var(--accent));
    opacity: 1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  
  svg {
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
  }
`;
