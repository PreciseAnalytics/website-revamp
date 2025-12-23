import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/media';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  analyticalNeeds: string;
  projectType: string;
  budget: string;
  timeline: string;
};

type FileWithPreview = {
  file: File;
  id: string;
  name: string;
  size: number;
};

export default function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    analyticalNeeds: '',
    projectType: '',
    budget: '',
    timeline: '',
  });

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_TOTAL_SIZE = 25 * 1024 * 1024;

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'phone') {
      processedValue = formatPhoneNumber(value);
      if (processedValue.length === 14) {
        if (!validatePhone(processedValue)) {
          setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
        } else {
          setErrors(prev => ({ ...prev, phone: '' }));
        }
      }
    }
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: FileWithPreview[] = [];
    const fileErrors: string[] = [];
    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name} exceeds 10MB limit`);
      } else {
        validFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
        });
      }
    }
    const currentTotalSize = files.reduce((acc, f) => acc + f.size, 0);
    const newTotalSize = validFiles.reduce((acc, f) => acc + f.size, currentTotalSize);
    if (newTotalSize > MAX_TOTAL_SIZE) {
      setErrors(prev => ({ ...prev, files: 'Total file size exceeds 25MB limit' }));
      return;
    }
    if (fileErrors.length > 0) {
      setErrors(prev => ({ ...prev, files: fileErrors.join(', ') }));
    } else {
      setErrors(prev => ({ ...prev, files: '' }));
    }
    setFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number format';
    if (!formData.analyticalNeeds.trim()) newErrors.analyticalNeeds = 'Analytical needs description is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const fullMessage = `
CONSULTATION REQUEST - ANALYTICAL NEEDS:
${formData.analyticalNeeds}

PROJECT DETAILS:
- Project Type: ${formData.projectType || 'Not specified'}
- Budget Range: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}

${files.length > 0 ? `ATTACHED FILES: ${files.map(f => f.name).join(', ')}
(Note: Files attached separately)
` : ''}
---
This is a consultation request submitted from the Schedule Consult page.
        `.trim();
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
            jobTitle: formData.jobTitle.trim(),
            projectType: formData.projectType || 'Consultation Request',
            budget: formData.budget,
            timeline: formData.timeline,
            message: fullMessage,
          })
        });
        const result = await response.json();
        if (result.success) {
          setSubmitSuccess(true);
          setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '', analyticalNeeds: '', projectType: '', budget: '', timeline: '' });
          setFiles([]);
          setErrors({});
          setTimeout(() => {
            if (successMessageRef.current) {
              successMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              successMessageRef.current.focus();
            }
          }, 100);
        } else {
          if (result.errors && Array.isArray(result.errors)) {
            const apiErrors: { [key: string]: string } = {};
            result.errors.forEach((error: string) => {
              if (error.includes('First name')) apiErrors.firstName = error;
              else if (error.includes('Last name')) apiErrors.lastName = error;
              else if (error.includes('Email')) apiErrors.email = error;
              else if (error.includes('Phone')) apiErrors.phone = error;
              else if (error.includes('Message')) apiErrors.analyticalNeeds = error;
            });
            setErrors(apiErrors);
          } else {
            setErrors({ general: result.message || 'Failed to send message. Please try again.' });
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      }
    }
    setIsSubmitting(false);
  };

  const totalFileSize = files.reduce((acc, f) => acc + f.size, 0);
  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.analyticalNeeds;

  if (submitSuccess) {
    return (
      <SuccessContainer ref={formContainerRef}>
        <SuccessCard ref={successMessageRef} as={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} tabIndex={-1} role="status" aria-live="polite">
          <LogoSection>
            <Logo>
              <LogoText>PRECISE</LogoText>
              <LogoSubtext>ANALYTICS</LogoSubtext>
            </Logo>
          </LogoSection>
          
          <SuccessIconLarge>✓</SuccessIconLarge>
          
          <SuccessHeading>Request Received</SuccessHeading>
          
          <ConfirmationMessage>
            Thank you for reaching out to Precise Analytics. We have received your consultation request and will review your information carefully.
          </ConfirmationMessage>
          
          <ResponseTime>
            <strong>Expected Response Time:</strong> Within 24-48 hours
          </ResponseTime>
          
          <Divider />
          
          <ContactSection>
            <ContactHeading>Need Immediate Assistance?</ContactHeading>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactLink href="mailto:contact@preciseanalytics.io">contact@preciseanalytics.io</ContactLink>
              </ContactItem>
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <ContactLink href="tel:+18042230404">(804) 223-0404</ContactLink>
              </ContactItem>
            </ContactInfo>
            <ContactNote>
              If you Don&apos;t hear from us within 48 hours, please feel free to reach out using the contact information above.
            </ContactNote>
          </ContactSection>
          
          <ActionButton onClick={() => setSubmitSuccess(false)}>Submit Another Request</ActionButton>
        </SuccessCard>
      </SuccessContainer>
    );
  }

  return (
    <FormContainer ref={formContainerRef} as={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <FormTitle>Send Us Your Project Details</FormTitle>
      <FormSubtitle>Share your analytical needs and requirements. We&apos;ll respond within 24 hours.</FormSubtitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Personal Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>First Name *</FormLabel>
              <FormInput type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" $hasError={!!errors.firstName} />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name *</FormLabel>
              <FormInput type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" $hasError={!!errors.lastName} />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Contact Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Email *</FormLabel>
              <FormInput type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" $hasError={!!errors.email} />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone *</FormLabel>
              <FormInput type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" maxLength={14} $hasError={!!errors.phone} />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Company</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Company</FormLabel>
              <FormInput type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Corp" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Job Title</FormLabel>
              <FormInput type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Data Manager" />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Project Details</SectionTitle>
          <FormRow>
            <FormGroup>
              <FormLabel>Project Type</FormLabel>
              <FormSelect name="projectType" value={formData.projectType} onChange={handleInputChange}>
                <option value="">Select type</option>
                <option value="data-analytics">Data Analytics</option>
                <option value="software-development">Software Dev</option>
                <option value="ai-ml">AI/ML</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Budget</FormLabel>
              <FormSelect name="budget" value={formData.budget} onChange={handleInputChange}>
                <option value="">Select range</option>
                <option value="under-25k">Under $25k</option>
                <option value="25k-50k">$25k-$50k</option>
                <option value="50k-100k">$50k-$100k</option>
                <option value="100k-250k">$100k-$250k</option>
                <option value="over-250k">Over $250k</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormGroup>
            <FormLabel>Timeline</FormLabel>
            <FormSelect name="timeline" value={formData.timeline} onChange={handleInputChange}>
              <option value="">Select timeline</option>
              <option value="asap">ASAP</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="planning">Planning</option>
            </FormSelect>
          </FormGroup>
        </FormSection>
        <FormSection>
          <SectionTitle>Analytical Needs</SectionTitle>
          <FormGroup>
            <FormLabel>Describe Your Needs *</FormLabel>
            <FormTextarea name="analyticalNeeds" value={formData.analyticalNeeds} onChange={handleInputChange} placeholder="Tell us about your data challenges, goals, and what you're hoping to achieve..." rows={5} $hasError={!!errors.analyticalNeeds} />
            {errors.analyticalNeeds && <ErrorMessage>{errors.analyticalNeeds}</ErrorMessage>}
          </FormGroup>
        </FormSection>
        <FileUploadSection>
          <FileLabel>Attachments <FileLimit>(10MB per file, 25MB total)</FileLimit></FileLabel>
          <FileUploadArea>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />
            <UploadButton type="button" onClick={() => fileInputRef.current?.click()}>
              <UploadIcon>📎</UploadIcon> Add Files
            </UploadButton>
            <FileTypesNote>All file types accepted</FileTypesNote>
          </FileUploadArea>
          {files.length > 0 && (
            <FileList>
              <FileListHeader>
                <span>Files ({files.length})</span>
                <span>{formatFileSize(totalFileSize)}</span>
              </FileListHeader>
              {files.map((f) => (
                <FileItem key={f.id}>
                  <FileInfo>
                    <FileName>📄 {f.name}</FileName>
                    <FileSize>{formatFileSize(f.size)}</FileSize>
                  </FileInfo>
                  <RemoveButton type="button" onClick={() => removeFile(f.id)}>✕</RemoveButton>
                </FileItem>
              ))}
            </FileList>
          )}
          {errors.files && <ErrorMessage>{errors.files}</ErrorMessage>}
        </FileUploadSection>
        {errors.general && <GeneralErrorMessage>{errors.general}</GeneralErrorMessage>}
        <SubmitButton type="submit" disabled={!isFormValid || isSubmitting}>{isSubmitting ? <><Spinner />Sending...</> : 'Send Request'}</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}

const FormContainer = styled.div`max-width:80rem;margin:0 auto;padding:3rem;background:rgba(var(--cardBackground),0.95);border-radius:2rem;border:2px solid rgba(255,125,0,0.2);box-shadow:0 12px 40px rgba(255,125,0,0.1);backdrop-filter:blur(20px);@media(max-width:768px){padding:2rem;margin:0 1rem}`;
const FormTitle = styled.h2`font-size:2.8rem;font-weight:700;text-align:center;margin-bottom:0.8rem;background:linear-gradient(135deg,rgb(255,125,0),rgb(255,165,0));-webkit-background-clip:text;-webkit-text-fill-color:transparent;@media(max-width:768px){font-size:2.4rem}`;
const FormSubtitle = styled.p`font-size:1.5rem;color:rgb(var(--text));text-align:center;margin-bottom:2.5rem;opacity:0.8`;
const StyledForm = styled.form`display:flex;flex-direction:column;gap:2.5rem`;
const FormSection = styled.div`display:flex;flex-direction:column;gap:1.5rem`;
const SectionTitle = styled.h3`font-size:1.6rem;font-weight:600;color:rgb(255,125,0);margin-bottom:0.5rem;padding-bottom:0.5rem;border-bottom:2px solid rgba(255,125,0,0.2)`;
const FormRow = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;@media(max-width:768px){grid-template-columns:1fr;gap:1.2rem}`;
const FormGroup = styled.div`display:flex;flex-direction:column;gap:0.6rem`;
const FormLabel = styled.label`font-size:1.3rem;font-weight:600;color:rgb(var(--text))`;
const FormInput = styled.input<{$hasError?:boolean}>`padding:1rem 1.4rem;border:2px solid ${p=>p.$hasError?'rgb(220,38,38)':'rgba(255,125,0,0.2)'};border-radius:0.8rem;font-size:1.4rem;background:rgba(var(--cardBackground),0.8);color:rgb(var(--text));transition:all 0.3s;&:focus{outline:none;border-color:rgb(255,125,0);box-shadow:0 0 0 3px rgba(255,125,0,0.1)}&::placeholder{color:rgba(var(--text),0.5)}`;
const FormSelect = styled.select`padding:1rem 1.4rem;border:2px solid rgba(255,125,0,0.2);border-radius:0.8rem;font-size:1.4rem;background:rgba(var(--cardBackground),0.8);color:rgb(var(--text));transition:all 0.3s;&:focus{outline:none;border-color:rgb(255,125,0);box-shadow:0 0 0 3px rgba(255,125,0,0.1)}`;
const FormTextarea = styled.textarea<{$hasError?:boolean}>`padding:1rem 1.4rem;border:2px solid ${p=>p.$hasError?'rgb(220,38,38)':'rgba(255,125,0,0.2)'};border-radius:0.8rem;font-size:1.4rem;background:rgba(var(--cardBackground),0.8);color:rgb(var(--text));transition:all 0.3s;resize:vertical;font-family:inherit;min-height:120px;&:focus{outline:none;border-color:rgb(255,125,0);box-shadow:0 0 0 3px rgba(255,125,0,0.1)}&::placeholder{color:rgba(var(--text),0.5)}`;
const ErrorMessage = styled.span`color:rgb(220,38,38);font-size:1.2rem;font-weight:500`;
const GeneralErrorMessage = styled.div`background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.3);color:rgb(220,38,38);padding:1.2rem;border-radius:0.8rem;font-size:1.3rem;font-weight:500;text-align:center`;
const SubmitButton = styled.button`background:linear-gradient(135deg,rgb(255,125,0),rgb(255,165,0));color:white;border:none;padding:1.4rem 2.5rem;border-radius:1rem;font-size:1.5rem;font-weight:700;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;justify-content:center;gap:1rem;&:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,125,0,0.3)}&:disabled{opacity:0.7;cursor:not-allowed}`;
const Spinner = styled.div`width:1.8rem;height:1.8rem;border:2px solid rgba(255,255,255,0.3);border-radius:50%;border-top-color:white;animation:spin 1s ease-in-out infinite;@keyframes spin{to{transform:rotate(360deg)}}`;
const FileUploadSection = styled.div`display:flex;flex-direction:column;gap:1.2rem;padding:1.8rem;background:rgba(var(--secondBackground),0.3);border-radius:1.2rem;border:2px dashed rgba(var(--text),0.2)`;
const FileLabel = styled.label`font-size:1.4rem;font-weight:600;color:rgb(var(--text));display:flex;align-items:center;gap:0.5rem`;
const FileLimit = styled.span`font-size:1.2rem;font-weight:400;color:rgba(var(--text),0.6)`;
const FileUploadArea = styled.div`display:flex;flex-direction:column;align-items:center;gap:1rem`;
const UploadButton = styled.button`padding:1.2rem 2.4rem;font-size:1.4rem;font-weight:600;background:linear-gradient(135deg,rgb(255,125,0),rgb(255,165,0));color:white;border:none;border-radius:0.8rem;cursor:pointer;display:flex;align-items:center;gap:0.8rem;transition:all 0.3s;&:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,125,0,0.3)}`;
const UploadIcon = styled.span`font-size:1.6rem`;
const FileTypesNote = styled.p`font-size:1.2rem;color:rgba(var(--text),0.6);text-align:center;margin:0`;
const FileList = styled.div`display:flex;flex-direction:column;gap:0.8rem;margin-top:1rem`;
const FileListHeader = styled.div`display:flex;justify-content:space-between;font-size:1.3rem;font-weight:600;color:rgb(var(--text));padding-bottom:0.8rem;border-bottom:1px solid rgba(var(--text),0.2)`;
const FileItem = styled.div`display:flex;justify-content:space-between;align-items:center;padding:1rem 1.2rem;background:rgba(var(--cardBackground),0.5);border-radius:0.6rem;border:1px solid rgba(var(--text),0.1)`;
const FileInfo = styled.div`display:flex;flex-direction:column;gap:0.3rem;flex:1;min-width:0`;
const FileName = styled.span`font-size:1.3rem;color:rgb(var(--text));font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`;
const FileSize = styled.span`font-size:1.2rem;color:rgba(var(--text),0.6)`;
const RemoveButton = styled.button`padding:0.4rem 0.8rem;font-size:1.6rem;color:#ff4444;background:transparent;border:none;cursor:pointer;transition:all 0.2s;border-radius:0.4rem;&:hover{background:rgba(255,68,68,0.1)}`;

const SuccessContainer = styled.div`max-width:80rem;margin:0 auto`;
const SuccessCard = styled.div`background:rgba(var(--cardBackground),0.98);border-radius:2rem;padding:4rem 3rem;border:2px solid rgba(255,125,0,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.3);text-align:center;@media(max-width:768px){padding:3rem 2rem}`;
const LogoSection = styled.div`display:flex;justify-content:center;margin-bottom:2.5rem`;
const Logo = styled.div`display:flex;flex-direction:column;align-items:center`;
const LogoText = styled.div`font-size:2.8rem;font-weight:800;background:linear-gradient(135deg,rgb(255,125,0),rgb(255,165,0));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:0.1em;@media(max-width:768px){font-size:2.4rem}`;
const LogoSubtext = styled.div`font-size:1.4rem;font-weight:600;color:rgb(var(--text));letter-spacing:0.3em;margin-top:0.2rem;@media(max-width:768px){font-size:1.2rem}`;
const SuccessIconLarge = styled.div`font-size:5.5rem;color:rgb(34,197,94);margin-bottom:2rem;animation:scaleIn 0.6s ease-out;@keyframes scaleIn{0%{opacity:0;transform:scale(0)}60%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}@media(max-width:768px){font-size:4.5rem}`;
const SuccessHeading = styled.h2`font-size:3rem;font-weight:700;color:rgb(var(--text));margin-bottom:1.5rem;@media(max-width:768px){font-size:2.4rem}`;
const ConfirmationMessage = styled.p`font-size:1.6rem;color:rgb(var(--text));line-height:1.7;margin-bottom:2rem;opacity:0.9;max-width:60rem;margin-left:auto;margin-right:auto;@media(max-width:768px){font-size:1.5rem}`;
const ResponseTime = styled.div`font-size:1.5rem;color:rgb(var(--text));padding:1.5rem 2rem;background:rgba(255,125,0,0.1);border-radius:1rem;margin-bottom:2.5rem;strong{color:rgb(255,125,0)}@media(max-width:768px){font-size:1.4rem;padding:1.2rem 1.5rem}`;
const Divider = styled.div`height:1px;background:rgba(var(--text),0.2);margin:2.5rem 0`;
const ContactSection = styled.div`margin-bottom:2.5rem`;
const ContactHeading = styled.h3`font-size:1.8rem;font-weight:600;color:rgb(var(--text));margin-bottom:1.5rem;@media(max-width:768px){font-size:1.6rem}`;
const ContactInfo = styled.div`display:flex;flex-direction:column;gap:1.2rem;margin-bottom:1.5rem`;
const ContactItem = styled.div`display:flex;align-items:center;justify-content:center;gap:1rem;font-size:1.5rem;@media(max-width:768px){font-size:1.4rem}`;
const ContactIcon = styled.span`font-size:2rem`;
const ContactLink = styled.a`color:rgb(255,125,0);font-weight:600;text-decoration:none;transition:all 0.3s;&:hover{color:rgb(255,165,0);text-decoration:underline}`;
const ContactNote = styled.p`font-size:1.3rem;color:rgba(var(--text),0.7);line-height:1.6;max-width:50rem;margin:0 auto;@media(max-width:768px){font-size:1.2rem}`;
const ActionButton = styled.button`background:linear-gradient(135deg,rgb(255,125,0),rgb(255,165,0));color:white;border:none;padding:1.4rem 2.8rem;border-radius:1rem;font-size:1.5rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(255,125,0,0.3);&:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(255,125,0,0.4)}@media(max-width:768px){padding:1.2rem 2.4rem;font-size:1.4rem}`;