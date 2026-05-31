/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

const questions = [
  {
    id: 1,
    text: 'How does your team currently handle data pipelines?',
    options: [
      { label: 'Mostly manual — people move files, run scripts by hand', score: 0 },
      { label: 'Some automation — a few scheduled jobs or scripts', score: 33 },
      { label: 'Fully automated CI/CD — pipelines deploy and test themselves', score: 100 },
    ],
  },
  {
    id: 2,
    text: 'Where does your data live?',
    options: [
      { label: 'On-premise servers', score: 0 },
      { label: 'Hybrid — some on-prem, some cloud', score: 50 },
      { label: 'Cloud-native — fully in the cloud', score: 100 },
    ],
  },
  {
    id: 3,
    text: 'How does your team make business decisions?',
    options: [
      { label: 'Gut feel and experience', score: 0 },
      { label: 'Static reports and spreadsheets', score: 25 },
      { label: 'Live dashboards and real-time data', score: 75 },
      { label: 'Predictive models and AI-assisted recommendations', score: 100 },
    ],
  },
  {
    id: 4,
    text: 'How long does it take to generate a key business report?',
    options: [
      { label: 'Weeks', score: 0 },
      { label: 'Days', score: 33 },
      { label: 'Hours', score: 66 },
      { label: 'Real-time — it\'s always available', score: 100 },
    ],
  },
  {
    id: 5,
    text: 'Do you have dedicated data engineers on staff?',
    options: [
      { label: 'No dedicated data engineers', score: 0 },
      { label: '1–2 people wearing multiple hats', score: 33 },
      { label: 'A small dedicated team (3–5)', score: 66 },
      { label: 'A large, mature data team', score: 100 },
    ],
  },
  {
    id: 6,
    text: "What's your biggest data pain point right now?",
    options: [
      { label: 'Data quality — we don\'t trust the numbers', score: 10 },
      { label: 'Pipeline reliability — jobs break constantly', score: 20 },
      { label: 'Reporting speed — everything takes too long', score: 40 },
      { label: 'No clear insights — we have data but can\'t use it', score: 30 },
      { label: 'Compliance or security — we need to meet regulatory requirements', score: 50 },
    ],
  },
  {
    id: 7,
    text: 'Are you exploring AI/ML for your operations?',
    options: [
      { label: 'Not yet — haven\'t prioritized it', score: 0 },
      { label: 'Researching — evaluating options', score: 25 },
      { label: 'Pilot phase — running experiments', score: 60 },
      { label: 'In production — AI is powering live decisions', score: 100 },
    ],
  },
  {
    id: 8,
    text: 'What industry are you in?',
    options: [
      { label: 'Government / Federal', score: 50 },
      { label: 'Healthcare / Life Sciences', score: 50 },
      { label: 'Financial Services', score: 50 },
      { label: 'Manufacturing', score: 50 },
      { label: 'Technology', score: 75 },
      { label: 'Other', score: 40 },
    ],
  },
];

function getCategory(score: number): { label: string; description: string; recommendations: string[] } {
  if (score <= 30) {
    return {
      label: 'Data Foundation Stage',
      description: 'Your organization is in the early stages of building a data-driven culture. The opportunity for improvement is significant — and the gains from early-stage infrastructure investment are the largest in the maturity curve.',
      recommendations: [
        'Start with a data audit: map every data source, owner, and consumer in your organization before building anything new.',
        'Prioritize a single high-value pipeline for automation — prove the ROI of investment before scaling.',
        'Establish data governance basics: data ownership, quality standards, and a single source of truth for key metrics.',
      ],
    };
  }
  if (score <= 60) {
    return {
      label: 'Data Growth Stage',
      description: 'You have some data infrastructure in place but are hitting scaling limitations. Your focus should be on automation, integration, and building the reporting layer that turns data into decisions.',
      recommendations: [
        'Automate your highest-volume manual pipeline first — the ROI is immediate and the pattern scales.',
        'Build a BI layer that maps to your actual decision-making workflows, not just your data schema.',
        'Invest in data quality monitoring — at this stage, bad data is more expensive than no data.',
      ],
    };
  }
  if (score <= 80) {
    return {
      label: 'Data Scaling Stage',
      description: 'You have a mature data foundation and are ready to scale your capabilities. The next level of value comes from real-time data, predictive models, and AI-assisted decision-making.',
      recommendations: [
        'Move from batch to streaming for your highest-latency pipelines — real-time data changes what decisions are possible.',
        'Evaluate AI/ML for your highest-value use cases — you have the data quality to support it.',
        'Build toward self-service analytics — reduce the bottleneck between data and decision-makers.',
      ],
    };
  }
  return {
    label: 'Data Leadership Stage',
    description: 'Your organization is operating at a high level of data maturity. The focus at this stage is optimization, AI augmentation, and building competitive moats through data capabilities.',
    recommendations: [
      'Evaluate AI/ML models for prediction and optimization in your core business processes.',
      'Build data products that your customers or partners can consume directly.',
      'Invest in data mesh or federated architecture to scale data capabilities without central bottlenecks.',
    ],
  };
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [reportGated, setReportGated] = useState(true);

  const handleAnswer = (optionScore: number) => {
    const newAnswers = [...answers, optionScore];
    setAnswers(newAnswers);

    if (currentStep + 1 >= questions.length) {
      const avg = Math.round(newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length);
      setScore(avg);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
      setReportGated(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setScore(null);
    setEmail('');
    setEmailSubmitted(false);
    setReportGated(true);
  };

  const category = score !== null ? getCategory(score) : null;

  return (
    <>
      <Head>
        <title>Data Maturity Assessment | Precise Analytics | Free 2-Minute Scorecard</title>
        <meta
          name="description"
          content="Answer 8 questions and get a personalized data maturity score with actionable recommendations. Free, 2 minutes, no commitment."
        />
        <meta property="og:title" content="Data Maturity Assessment | Precise Analytics" />
        <meta property="og:description" content="Where does your data infrastructure stand? 8 questions, 2 minutes, personalized recommendations." />
        <meta property="og:type" content="website" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          {score === null ? (
            <>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <PageHeader>
                  <OverTitle>Data Maturity Assessment</OverTitle>
                  <PageTitle>Where Does Your Data Infrastructure Stand?</PageTitle>
                  <PageSubtitle>
                    Answer 8 questions. Get a personalized score and actionable recommendations in 2 minutes.
                  </PageSubtitle>
                  <ProgressRow>
                    <ProgressText>Question {currentStep + 1} of {questions.length}</ProgressText>
                    <ProgressBar>
                      <ProgressFill style={{ width: `${((currentStep) / questions.length) * 100}%` }} />
                    </ProgressBar>
                  </ProgressRow>
                </PageHeader>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuestionCard>
                    <QuestionText>{questions[currentStep].text}</QuestionText>
                    <OptionsList>
                      {questions[currentStep].options.map((opt, i) => (
                        <OptionButton key={i} onClick={() => handleAnswer(opt.score)}>
                          {opt.label}
                        </OptionButton>
                      ))}
                    </OptionsList>
                  </QuestionCard>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <ResultsWrapper>
                <ResultsHeader>
                  <OverTitle>Your Results</OverTitle>
                  <ScoreDisplay>
                    <ScoreNumber>{score}</ScoreNumber>
                    <ScoreLabel>/ 100</ScoreLabel>
                  </ScoreDisplay>
                  <CategoryLabel>{category!.label}</CategoryLabel>
                  <CategoryDescription>{category!.description}</CategoryDescription>
                </ResultsHeader>

                {reportGated && !emailSubmitted ? (
                  <EmailGate>
                    <GateTitle>Get your full assessment report</GateTitle>
                    <GateText>Enter your email to receive your personalized action plan — including detailed recommendations for each area of your data stack.</GateText>
                    <GateForm onSubmit={handleEmailSubmit}>
                      <GateInput
                        type="email"
                        placeholder="Your work email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <GateButton type="submit">Send My Report</GateButton>
                    </GateForm>
                    <GateNote>No spam. We respond within 4 business hours.</GateNote>
                    <SkipLink onClick={() => setReportGated(false)}>
                      Skip — just show me the recommendations
                    </SkipLink>
                  </EmailGate>
                ) : (
                  <>
                    {emailSubmitted && (
                      <EmailConfirmation>
                        ✓ Report on its way — check your inbox within 4 business hours.
                      </EmailConfirmation>
                    )}
                    <RecommendationsSection>
                      <RecommendationsTitle>Your Top 3 Recommendations</RecommendationsTitle>
                      <RecommendationsList>
                        {category!.recommendations.map((rec, i) => (
                          <RecommendationItem key={i}>
                            <RecNumber>{i + 1}</RecNumber>
                            <RecText>{rec}</RecText>
                          </RecommendationItem>
                        ))}
                      </RecommendationsList>
                    </RecommendationsSection>
                  </>
                )}

                <ResultsCta>
                  <ResultsCtaTitle>Get a detailed action plan for your data stack</ResultsCtaTitle>
                  <ResultsCtaText>Schedule a free 30-minute consultation — we&apos;ll walk through your score and map out your next steps.</ResultsCtaText>
                  <ResultsCtaButton href="/schedule-consult">Schedule a Free Consultation →</ResultsCtaButton>
                  <RestartLink onClick={handleRestart}>Retake the assessment</RestartLink>
                </ResultsCta>
              </ResultsWrapper>
            </motion.div>
          )}
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 4rem 0 8rem;`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 75rem;
  margin: 0 auto 4rem;
`;

const OverTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 1.2rem;
`;

const PageTitle = styled.h1`
  font-size: 4.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.4rem;
  line-height: 1.15;

  ${media.tablet(`font-size: 3.2rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.7);
  margin-bottom: 3rem;

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const ProgressRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProgressText = styled.p`
  font-size: 1.4rem;
  color: rgba(var(--text), 0.5);
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 0.6rem;
  background: rgba(var(--text), 0.12);
  border-radius: 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, rgb(255, 125, 0), rgb(255, 165, 0));
  border-radius: 1rem;
  transition: width 0.3s ease;
`;

const QuestionCard = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.6rem;
  padding: 4rem;

  ${media.tablet(`padding: 2.5rem 2rem;`)}
`;

const QuestionText = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 3rem;
  line-height: 1.35;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const OptionButton = styled.button`
  padding: 1.8rem 2.4rem;
  background: rgba(var(--background), 0.6);
  border: 1.5px solid rgba(var(--text), 0.15);
  border-radius: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: rgb(var(--text));
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgb(255, 125, 0);
    background: rgba(255, 125, 0, 0.06);
    color: rgb(255, 125, 0);
  }
`;

const ResultsWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const ResultsHeader = styled.div`
  text-align: center;
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.6rem;
  margin: 1.6rem 0 0.8rem;
`;

const ScoreNumber = styled.div`
  font-size: 9rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ScoreLabel = styled.span`
  font-size: 3rem;
  font-weight: 600;
  color: rgba(var(--text), 0.4);
`;

const CategoryLabel = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin-bottom: 1.2rem;

  ${media.tablet(`font-size: 2.4rem;`)}
`;

const CategoryDescription = styled.p`
  font-size: 1.7rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.75);
  max-width: 65rem;
  margin: 0 auto;
`;

const EmailGate = styled.div`
  background: rgba(var(--cardBackground), 0.9);
  border: 1px solid rgba(255, 125, 0, 0.25);
  border-radius: 1.4rem;
  padding: 3.5rem;
  text-align: center;
`;

const GateTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;
`;

const GateText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.7);
  margin-bottom: 2.4rem;
`;

const GateForm = styled.form`
  display: flex;
  gap: 1.2rem;
  max-width: 55rem;
  margin: 0 auto;

  ${media.tablet(`flex-direction: column;`)}
`;

const GateInput = styled.input`
  flex: 1;
  padding: 1.3rem 1.8rem;
  font-size: 1.6rem;
  border: 1.5px solid rgba(var(--text), 0.2);
  border-radius: 0.8rem;
  background: rgba(var(--background), 0.9);
  color: rgb(var(--text));

  &:focus {
    outline: none;
    border-color: rgb(255, 125, 0);
  }
`;

const GateButton = styled.button`
  padding: 1.3rem 2.4rem;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255, 125, 0, 0.3);
  }
`;

const GateNote = styled.p`
  font-size: 1.3rem;
  color: rgba(var(--text), 0.45);
  margin-top: 1.2rem;
`;

const SkipLink = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  color: rgba(var(--text), 0.4);
  cursor: pointer;
  margin-top: 0.8rem;
  text-decoration: underline;
  display: block;
  width: 100%;
  text-align: center;
`;

const EmailConfirmation = styled.div`
  background: rgba(var(--cardBackground), 0.8);
  border: 1px solid rgba(255, 125, 0, 0.3);
  border-radius: 1rem;
  padding: 1.6rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-align: center;
`;

const RecommendationsSection = styled.div`
  background: rgba(var(--cardBackground), 0.85);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  padding: 3.5rem;
`;

const RecommendationsTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 2.4rem;
`;

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RecommendationItem = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
`;

const RecNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 900;
  color: rgb(255, 125, 0);
  flex-shrink: 0;
  line-height: 1.2;
`;

const RecText = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
`;

const ResultsCta = styled.div`
  text-align: center;
  padding: 4.5rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.6rem;
`;

const ResultsCtaTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 1rem;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const ResultsCtaText = styled.p`
  font-size: 1.7rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 2.4rem;
`;

const ResultsCtaButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.4rem 3.2rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 1.8rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.35);
  }
`;

const RestartLink = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: rgba(var(--text), 0.45);
  cursor: pointer;
  text-decoration: underline;
  margin: 0 auto;
`;
