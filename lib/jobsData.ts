export interface Job {
  id: string;
  jobNumber: string;
  title: string;
  department: string;
  departmentLabel: string;
  location: string;
  locationLabel: string;
  employmentType: string;
  employmentTypeLabel: string;
  postedDate: string;
  salaryRange?: string;
  clearanceLevel?: string;
  travelRequired?: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  benefits: string[];
  status: 'open' | 'closed';
}

export const JOBS: Job[] = [
  {
    id: 'senior-data-scientist-001',
    jobNumber: 'PA-2025-001',
    title: 'Senior Data Scientist',
    department: 'data-science',
    departmentLabel: 'Data Science',
    location: 'richmond-va',
    locationLabel: 'Richmond, VA (Hybrid)',
    employmentType: 'full-time',
    employmentTypeLabel: 'Full-Time',
    postedDate: '2025-03-15',
    salaryRange: '$110,000 – $140,000 / year',
    clearanceLevel: 'Public Trust (preferred)',
    travelRequired: 'Up to 10%',
    summary:
      'Lead advanced analytics and machine learning initiatives for government and commercial clients, developing models that turn complex data into actionable intelligence.',
    description:
      'Precise Analytics is seeking a Senior Data Scientist to join our growing team in Richmond, VA. In this role, you will design and deploy machine learning models, statistical analyses, and data pipelines that directly support mission-critical decision-making for federal and commercial clients. You will collaborate closely with data engineers, business analysts, and client stakeholders to translate ambiguous business problems into rigorous analytical solutions.',
    responsibilities: [
      'Design, develop, and deploy supervised and unsupervised machine learning models',
      'Perform exploratory data analysis and feature engineering on large, complex datasets',
      'Translate business requirements into analytical problem statements and measurable outcomes',
      'Communicate model results and insights to both technical and non-technical stakeholders',
      'Maintain and improve existing production ML models and pipelines',
      'Mentor junior data scientists and contribute to team best practices',
      'Collaborate with data engineers to ensure data quality and pipeline reliability',
    ],
    requirements: [
      "Master's or PhD in Data Science, Statistics, Computer Science, Applied Mathematics, or a related field",
      '5+ years of professional experience in data science or machine learning',
      'Proficiency in Python (pandas, scikit-learn, PyTorch or TensorFlow) and SQL',
      'Experience building and deploying ML models in cloud environments (AWS, Azure, or GCP)',
      'Strong understanding of statistical inference, regression, classification, and clustering',
      'Demonstrated ability to communicate analytical findings clearly in written and verbal form',
    ],
    preferredQualifications: [
      'Experience working with federal agencies or government contractors',
      'Familiarity with NLP, computer vision, or time-series forecasting',
      'Active or eligible for Public Trust or higher security clearance',
      'Experience with MLOps tools (MLflow, SageMaker, Vertex AI)',
    ],
    benefits: [
      'Comprehensive health, dental, and vision insurance',
      'Employer-matched 401(k) retirement plan',
      'Annual professional development and certification budget',
      'Flexible hybrid work arrangements',
      'Paid time off and federal holidays',
    ],
    status: 'open',
  },
  {
    id: 'ai-annotation-specialist-001',
    jobNumber: 'PA-2025-002',
    title: 'AI Annotation Specialist',
    department: 'ai-workforce',
    departmentLabel: 'AI Workforce Solutions',
    location: 'remote',
    locationLabel: 'Remote (US)',
    employmentType: 'full-time',
    employmentTypeLabel: 'Full-Time',
    postedDate: '2025-04-01',
    salaryRange: '$45,000 – $65,000 / year',
    clearanceLevel: 'None required',
    travelRequired: 'None',
    summary:
      'Provide high-quality data annotation and AI model evaluation for leading AI training platforms, including text classification, preference ranking, and response quality assessment.',
    description:
      'Precise Analytics is expanding its AI Workforce Solutions division and seeking skilled AI Annotation Specialists to support AI model training for top-tier AI research platforms. You will work on diverse annotation tasks including RLHF (Reinforcement Learning from Human Feedback), preference ranking, instruction following evaluation, and domain-specific content labeling. This role requires strong critical thinking, attention to detail, and domain expertise in one or more subject areas.',
    responsibilities: [
      'Perform data annotation tasks including text classification, ranking, and quality evaluation',
      'Rate AI-generated responses for accuracy, helpfulness, harmlessness, and instruction adherence',
      'Provide written rationales and feedback for model improvement',
      'Complete RLHF preference comparisons across diverse prompt categories',
      'Maintain consistent annotation standards using provided rubrics and guidelines',
      'Participate in calibration sessions to ensure inter-annotator agreement',
      'Flag ambiguous or sensitive content in accordance with content policy guidelines',
    ],
    requirements: [
      "Bachelor's degree in any field, or equivalent professional experience",
      'Excellent reading comprehension and written communication skills in English',
      'Strong attention to detail and ability to follow complex annotation guidelines',
      'Comfortable working independently in a remote environment with minimal supervision',
      'Reliable internet connection and a personal computer meeting minimum specifications',
      'Ability to meet throughput and quality benchmarks on a consistent basis',
    ],
    preferredQualifications: [
      'Domain expertise in STEM, law, medicine, finance, or coding',
      'Prior experience with annotation platforms (Scale AI, Remotasks, Surge HQ, Appen)',
      'Familiarity with large language models (LLMs) and how they are trained',
      'Experience with coding tasks (Python, JavaScript, or SQL preferred)',
      'Multilingual candidates encouraged to apply',
    ],
    benefits: [
      'Fully remote position with flexible scheduling',
      'Health insurance stipend',
      'Performance-based bonuses',
      'Paid training and onboarding',
      'Access to internal upskilling resources and career development pathways',
    ],
    status: 'open',
  },
  {
    id: 'rlhf-specialist-001',
    jobNumber: 'PA-2025-003',
    title: 'RLHF Data Specialist',
    department: 'ai-workforce',
    departmentLabel: 'AI Workforce Solutions',
    location: 'remote',
    locationLabel: 'Remote (US)',
    employmentType: 'contract',
    employmentTypeLabel: 'Contract',
    postedDate: '2025-04-05',
    salaryRange: '$25 – $45 / hour',
    clearanceLevel: 'None required',
    travelRequired: 'None',
    summary:
      'Support reinforcement learning from human feedback (RLHF) pipelines for large language model training by completing ranking, red-teaming, and instruction-following evaluation tasks.',
    description:
      'Precise Analytics is building a specialized team of RLHF Data Specialists to support contracted AI model training engagements. In this contract role, you will work on structured RLHF tasks that directly influence how AI models learn from human feedback. You will complete preference comparisons, write and evaluate prompts, perform red-teaming exercises, and assess model outputs against detailed quality rubrics. Strong candidates will have domain expertise and a track record on AI training platforms.',
    responsibilities: [
      'Complete RLHF preference ranking tasks across text, code, and multimodal content',
      'Write diverse, high-quality prompts spanning creative, factual, and reasoning domains',
      'Evaluate AI responses for correctness, tone, safety, and instruction adherence',
      'Participate in red-teaming exercises to identify model failure modes',
      'Provide detailed written feedback to support fine-tuning and alignment research',
      'Maintain accuracy rates above defined quality thresholds',
      'Communicate task ambiguities or guideline gaps to project leads',
    ],
    requirements: [
      "Bachelor's degree or higher in a relevant field, or demonstrated equivalent expertise",
      'Verified track record on at least one major AI training platform (Scale AI, Outlier, Remotasks, Appen, or Surge HQ)',
      'Strong reasoning and analytical writing skills',
      'Ability to interpret and apply complex annotation guidelines consistently',
      'Demonstrated domain expertise in at least one high-value vertical (STEM, legal, medical, or software engineering)',
      'Self-directed and able to manage time independently across concurrent task types',
    ],
    preferredQualifications: [
      'Graduate-level training in machine learning, linguistics, cognitive science, or a related field',
      'Prior red-teaming or adversarial prompt engineering experience',
      'Familiarity with LLM alignment concepts (RLHF, RLAIF, Constitutional AI)',
      'Proficiency in Python or another programming language for code-related tasks',
    ],
    benefits: [
      'Competitive hourly rate with performance bonuses',
      'Fully remote with flexible hours',
      'Access to Precise Analytics internal training library',
      'Priority consideration for full-time AI Workforce roles',
    ],
    status: 'open',
  },
  {
    id: 'data-engineer-001',
    jobNumber: 'PA-2025-004',
    title: 'Data Engineer',
    department: 'engineering',
    departmentLabel: 'Data Engineering',
    location: 'richmond-va',
    locationLabel: 'Richmond, VA (Hybrid)',
    employmentType: 'full-time',
    employmentTypeLabel: 'Full-Time',
    postedDate: '2025-03-20',
    salaryRange: '$90,000 – $120,000 / year',
    clearanceLevel: 'Public Trust (preferred)',
    travelRequired: 'Up to 10%',
    summary:
      'Build and maintain scalable ETL pipelines and cloud data infrastructure that power analytics solutions for government and commercial clients.',
    description:
      'Precise Analytics is looking for a Data Engineer to design, build, and operate data infrastructure that underpins our client analytics platforms. You will work across the full data lifecycle — ingestion, transformation, storage, and delivery — ensuring that data scientists and analysts have clean, reliable, and well-documented datasets. You will collaborate with cloud architects and business analysts to translate data requirements into production-grade pipelines.',
    responsibilities: [
      'Design and implement ETL/ELT pipelines using modern orchestration tools (Airflow, dbt, Prefect)',
      'Build and maintain cloud data warehouses and data lake architectures on AWS or Azure',
      'Ensure data quality, lineage, and governance standards across all pipelines',
      'Optimize query performance and storage costs in large-scale environments',
      'Collaborate with data scientists to productionize ML feature pipelines',
      'Write and maintain technical documentation for all data assets',
      'Support data onboarding for new client engagements',
    ],
    requirements: [
      "Bachelor's degree in Computer Science, Information Systems, or a related field",
      '3+ years of experience in data engineering or a related role',
      'Proficiency in SQL and Python for data transformation and pipeline development',
      'Hands-on experience with cloud data platforms (AWS Redshift, Azure Synapse, BigQuery, or Snowflake)',
      'Familiarity with containerization and workflow orchestration tools',
      'Strong understanding of data modeling principles (star schema, normalized models)',
    ],
    preferredQualifications: [
      'Experience with Infrastructure as Code (Terraform or CDK)',
      'AWS Certified Data Analytics or equivalent cloud certification',
      'Experience in a federal contracting environment',
      'Knowledge of data governance frameworks and metadata management',
    ],
    benefits: [
      'Comprehensive health, dental, and vision insurance',
      'Employer-matched 401(k)',
      'Certification reimbursement program',
      'Flexible hybrid schedule',
      'Paid time off and federal holidays',
    ],
    status: 'open',
  },
  {
    id: 'business-analyst-001',
    jobNumber: 'PA-2025-005',
    title: 'Business Analyst',
    department: 'consulting',
    departmentLabel: 'Consulting',
    location: 'hybrid',
    locationLabel: 'Richmond, VA (Hybrid)',
    employmentType: 'full-time',
    employmentTypeLabel: 'Full-Time',
    postedDate: '2025-03-01',
    salaryRange: '$70,000 – $95,000 / year',
    clearanceLevel: 'None required',
    travelRequired: 'Up to 20%',
    summary:
      'Bridge the gap between technical teams and client stakeholders by translating complex business challenges into data-driven requirements and actionable recommendations.',
    description:
      'Precise Analytics is seeking a Business Analyst to join our consulting practice. You will serve as the primary liaison between our analytics engineers and government or commercial clients, translating business needs into clear technical requirements and ensuring delivered solutions meet measurable outcomes. You will support project delivery, facilitate requirements workshops, and produce professional-grade documentation and presentations.',
    responsibilities: [
      'Elicit, document, and prioritize business and technical requirements from client stakeholders',
      'Develop process flow diagrams, data dictionaries, and user stories for analytics projects',
      'Coordinate sprint planning and backlog grooming with technical delivery teams',
      'Analyze existing processes and identify opportunities for data-driven improvement',
      'Prepare executive presentations and status reports for client leadership',
      'Support user acceptance testing and change management activities',
      'Track project milestones and flag risks to project managers',
    ],
    requirements: [
      "Bachelor's degree in Business Administration, Economics, Information Systems, or related field",
      '2+ years of experience in business analysis, consulting, or project coordination',
      'Strong analytical and problem-solving skills with a data-driven mindset',
      'Excellent verbal and written communication skills',
      'Proficiency in Microsoft Office Suite and project management tools (Jira, Confluence, or similar)',
      'Experience with data visualization tools (Tableau, Power BI) preferred',
    ],
    preferredQualifications: [
      'CBAP, PMI-PBA, or equivalent business analysis certification',
      'Experience supporting federal agency clients or government contractors',
      'Familiarity with Agile/Scrum delivery methodologies',
      'Exposure to SQL or data querying for requirements validation',
    ],
    benefits: [
      'Competitive salary with performance bonus',
      'Health, dental, and vision coverage',
      '401(k) with employer match',
      'Professional certification reimbursement',
      'Flexible hybrid work model',
    ],
    status: 'open',
  },
];

export function getJobById(id: string): Job | undefined {
  return JOBS.find((j) => j.id === id);
}
