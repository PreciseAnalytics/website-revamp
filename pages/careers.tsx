import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import AnimatedFooter from 'components/AnimatedFooter';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media, mq } from 'utils/media';

const jobs = [
  {
    title: 'Data Analyst',
    location: 'Remote | Full-Time',
    description: 'Analyze complex datasets to generate actionable insights for government and commercial clients.',
    requirements: [
      '2+ years experience in data analytics or BI',
      'Proficient in SQL, Excel, and data visualization tools (Tableau, Power BI)',
      'Strong communication skills',
    ],
  },
  {
    title: 'BI Developer',
    location: 'VA/DC Metro | Hybrid',
    description: 'Develop business intelligence dashboards and reports to support client decision-making.',
    requirements: [
      '3+ years experience in BI development',
      'Experience with Tableau, Power BI, or Looker',
      'Familiarity with relational databases and ETL processes',
    ],
  },
  {
    title: 'Federal Proposal Writer',
    location: 'Remote | Part-Time',
    description: 'Support federal bid development by drafting technical proposals, capability statements, and responses to RFPs.',
    requirements: [
      'Experience writing for government proposals (preferably GSA/SAM/FedBizOpps)',
      'Excellent written communication',
      'Understanding of SDVOSB/small business compliance a plus',
    ],
  },
  {
    title: 'Data Engineer',
    location: 'Remote | Full-Time',
    description: 'Design and maintain scalable data pipelines and infrastructure for analytics workloads.',
    requirements: [
      'Experience with Python, Spark, or similar',
      'Familiarity with cloud platforms (AWS, Azure)',
      'Strong SQL and database optimization skills',
    ],
  },
  {
    title: 'Client Success Manager',
    location: 'Remote | Full-Time',
    description: 'Support long-term success of government and commercial clients by managing project delivery and outcomes.',
    requirements: [
      'Strong communication and project management skills',
      'Experience in analytics or SaaS services',
      'Ability to coordinate with technical teams and clients',
    ],
  },
  {
    title: 'Visualization Specialist',
    location: 'Remote | Contract',
    description: 'Create visually compelling dashboards, infographics, and reports that simplify complex data.',
    requirements: [
      'Advanced knowledge of Power BI or Tableau',
      'Design-first thinking and attention to detail',
      'Experience working with analysts and decision-makers',
    ],
  },
];

export default function CareersPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    message: '',
    resume: null as File | null,
    coverLetter: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => setIsClient(true), []);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);

    // Simulate async upload
    setTimeout(() => {
      console.log('Submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess('Your application has been submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        message: '',
        resume: null,
        coverLetter: null,
      });
    }, 2000);
  };

  const handleApplyClick = (jobTitle: string) => {
    setFormData({ ...formData, position: jobTitle });
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>{`${EnvVars.SITE_NAME} - Careers`}</title>
        <meta name="description" content="Join the Precise Analytics team and help drive data transformation in mission-driven sectors." />
      </Head>

      <AnimatedHeader />

      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageTitle>Join Our Team</PageTitle>
            <PageSubtitle>Empowering missions through data—together.</PageSubtitle>
          </motion.div>

          {/* Open Positions Section */}
          <PositionsSection>
            <SectionTitle>Open Positions</SectionTitle>
            <SectionSubtitle>Explore opportunities to grow your career with us</SectionSubtitle>
            
            <JobCardsGrid>
              {jobs.map((job, index) => (
                <JobCard key={index}>
                  <JobCardHeader>
                    <JobTitle>{job.title}</JobTitle>
                    <JobLocation>{job.location}</JobLocation>
                  </JobCardHeader>
                  
                  <JobDescription>{job.description}</JobDescription>
                  
                  <RequirementsSection>
                    <RequirementsTitle>Key Requirements:</RequirementsTitle>
                    <RequirementsList>
                      {job.requirements.map((req, i) => (
                        <RequirementItem key={i}>{req}</RequirementItem>
                      ))}
                    </RequirementsList>
                  </RequirementsSection>

                  <ApplyButton onClick={() => handleApplyClick(job.title)}>
                    Apply Now
                  </ApplyButton>
                </JobCard>
              ))}
            </JobCardsGrid>
          </PositionsSection>

          {/* Application Form Section */}
          <ApplicationSection id="application-form">
            <FormWrapper>
              <FormTitle>Apply Now</FormTitle>
              <FormSubtitle>Ready to make an impact? Submit your application below.</FormSubtitle>
              
              {submitSuccess && (
                <StatusMessage>{submitSuccess}</StatusMessage>
              )}
              
              <Form onSubmit={handleSubmit}>
                <FormGrid>
                  <div>
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </FormGrid>

                <div>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="position">Position of Interest *</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a position...</option>
                    {jobs.map((job, index) => (
                      <option key={index} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>

                <FileUploadGrid>
                  <FileUploadWrapper>
                    <label htmlFor="resume">Resume/CV *</label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      required
                    />
                  </FileUploadWrapper>
                  
                  <FileUploadWrapper>
                    <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                    <input
                      type="file"
                      id="coverLetter"
                      name="coverLetter"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                    />
                  </FileUploadWrapper>
                </FileUploadGrid>

                <div>
                  <label htmlFor="message">Why are you interested in this role?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interest in this position and what you'd bring to our team..."
                  />
                </div>

                <SubmitBtn type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </SubmitBtn>
              </Form>
            </FormWrapper>
          </ApplicationSection>
        </Container>
      </PageWrapper>

      <AnimatedFooter />
    </>
  );
}

// === Styled Components ===
const PageWrapper = styled.div`
  padding: 4rem 0;
`;

const PageTitle = styled.h1`
  font-size: 4.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 1rem;

  ${mq('<=tablet', 'font-size: 3.6rem;')}
`;

const PageSubtitle = styled.p`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 6rem;
  color: rgb(var(--text), 0.8);
`;

// Application Form Styles
const ApplicationSection = styled.section`
  margin-bottom: 8rem;
`;

const FormWrapper = styled.div`
  background: rgba(var(--cardBackground), 0.95);
  padding: 4rem;
  border-radius: 2rem;
  box-shadow: var(--shadow-lg);
  max-width: 80rem;
  margin: 0 auto;

  ${mq('<=tablet', `
    padding: 3rem 2rem;
  `)}
`;

const FormTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const FormSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 3rem;
  color: rgb(var(--text), 0.7);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const FileUploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type='text'],
  input[type='email'],
  input[type='file'],
  select,
  textarea {
    padding: 1.5rem;
    font-size: 1.6rem;
    border: 2px solid rgba(var(--text), 0.2);
    border-radius: 1rem;
    background: rgba(var(--background), 0.9);
    color: rgb(var(--text));
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: rgb(255, 125, 0);
    }
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
    color: rgb(var(--text), 0.8);
    margin-bottom: 0.5rem;
    display: block;
  }
`;

const SubmitBtn = styled.button`
  margin-top: 1rem;
  padding: 1.8rem;
  font-size: 1.8rem;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.p`
  font-size: 1.6rem;
  text-align: center;
  padding: 1rem;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 0.8rem;
  color: green;
  margin-bottom: 2rem;
`;

// Positions Section Styles
const PositionsSection = styled.section`
  margin-top: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const SectionSubtitle = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
  color: rgb(var(--text), 0.7);
`;

const JobCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  gap: 3rem;

  ${mq('<=tablet', 'grid-template-columns: 1fr;')}
`;

const JobCard = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border-radius: 1.6rem;
  padding: 3rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const JobCardHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(var(--text), 0.1);
`;

const JobTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: rgb(255, 125, 0);
`;

const JobLocation = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 125, 0, 0.1);
  border-radius: 2rem;
  color: rgb(255, 125, 0);
`;

const JobDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgb(var(--text), 0.8);
`;

const RequirementsSection = styled.div`
  margin-top: 2rem;
`;

const RequirementsTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgb(var(--text));
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RequirementItem = styled.li`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  padding-left: 2rem;
  position: relative;
  color: rgb(var(--text), 0.8);

  &:before {
    content: '•';
    color: rgb(255, 125, 0);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ApplyButton = styled.button`
  margin-top: 2rem;
  padding: 1.2rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border: 2px solid rgb(255, 125, 0);
  background: transparent;
  color: rgb(255, 125, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(255, 125, 0);
    color: white;
    transform: translateY(-2px);
  }
`;