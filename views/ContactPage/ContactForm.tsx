import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Container from 'components/Container';
import Button from 'components/Button';
import Input from 'components/Input';
import { media } from 'utils/media'; // Ensure this exports an object like { desktop: ..., tablet: ... }
import { EnvVars } from 'env';

// Define interfaces for type safety
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  message: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
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
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  // File size limit (e.g., 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setSubmitResult({
          success: false,
          message: 'File size exceeds 5MB limit.',
        });
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setSubmitResult({
          success: false,
          message: 'Only PDF, JPEG, or PNG files are allowed.',
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

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
          message: "Your message has been sent! We'll get back to you shortly.",
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
          fileInputRef.current.value = ''; // Reset file input
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
                  <Label htmlFor="firstName">First Name</Label>
                  <StyledInput
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="lastName">Last Name</Label>
                  <StyledInput
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </InputContainer>
              </FormRow>

              <FormRow>
                <InputContainer>
                  <Label htmlFor="email">Email Address</Label>
                  <StyledInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <StyledInput
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </InputContainer>
              </FormRow>

              <InputContainer>
                <Label htmlFor="company">Company Name</Label>
                <StyledInput
                  id="company"
                  name="company"
                  placeholder="Company Name"
                  value={formState.company}
                  onChange={handleInputChange}
                />
              </InputContainer>

              <MessageContainer>
                <Label htmlFor="message">Message</Label>
                <MessageInput
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                />
              </MessageContainer>

              <FileUploadContainer>
                <FileUploadLabel htmlFor="file-upload">
                  Upload A Document (Optional)
                </FileUploadLabel>
                <FileUploadInput
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
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
              <InfoTitle>Email Us</InfoTitle>
              <a href={`mailto:${EnvVars.CONTACT_EMAIL}`} style={{ textDecoration: 'none' }}>
                <ContactLink as="span">{EnvVars.CONTACT_EMAIL}</ContactLink>
              </a>
            </InfoSection>

            <InfoSection>
              <InfoTitle>Call Us</InfoTitle>
              <a href={`tel:${EnvVars.PHONE.replace(/\s+/g, '')}`} style={{ textDecoration: 'none' }}>
                <ContactLink as="span">{EnvVars.PHONE}</ContactLink>
              </a>
            </InfoSection>


            <InfoSection>
              <InfoTitle>Follow Us</InfoTitle>
              <SocialLinks>
                <SocialLink href="https://www.facebook.com/PreciseAnalytics.io/" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5.07 3.66 9.26 8.44 10.04v-7.09h-2.54v-2.95h2.54v-2.24c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.45 2.95h-2.33v7.09c4.78-.78 8.44-4.97 8.44-10.04 0-5.53-4.5-10.02-10-10.02z"/>
                    </svg>
                  </IconWrapper>
                  Facebook
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/company/precise-analytics-llc" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </IconWrapper>
                  LinkedIn
                </SocialLink>
                <SocialLink href="https://github.com/preciseanalytics" target="_blank" rel="noopener noreferrer">
                  <IconWrapper>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 .373-12 6.917 0 5.302 3.438 9.8 8.207 11.387.604.089.834-.258.834-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576 4.77-1.587 8.205-6.085 8.205-11.387 0-6.544-5.373-6.917-12-6.917z"/>
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

// --- Styled Components ---

const Wrapper = styled.div`
  padding: 10rem 0;
  background: radial-gradient(circle at 50% 0%, rgba(var(--background), 0.8), rgba(var(--background), 1) 70%);
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 6rem;

  ${media.desktop} {
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

  ${media.tablet} {
    padding: 3rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: rgb(var(--text));
`;

const FormDescription = styled.p`
  font-size: 1.8rem;
  color: rgb(var(--text));
  opacity: 0.8;
  margin-bottom: 3rem;
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

  ${media.tablet} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  color: rgb(var(--text));
  margin-bottom: 0.5rem;
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
    outline: none;
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
  cursor: pointer;
`;

const FileUploadInput = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1.2rem 0;
  color: rgb(var(--text));
`;

const SelectedFile = styled.div`
  margin-top: 1rem;
  font-size: 1.4rem;
  color: rgb(255, 125, 0);
`;

const SubmitButton = styled.div`
  margin-top: 2rem;

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultMessage = styled.div<{ success: boolean }>`
  padding: 1.5rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  background: ${(p) => (p.success ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 60, 60, 0.1)')};
  color: ${(p) => (p.success ? 'rgb(0, 200, 83)' : 'rgb(255, 60, 60)')};
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: center;

  ${media.desktop} {
    gap: 3rem;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
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