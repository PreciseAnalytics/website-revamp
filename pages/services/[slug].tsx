import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { EnvVars } from 'env';
import { media } from 'utils/media';

interface ServiceData {
  title: string;
  description: string;
  image: string;
  overview: string;
  keyBenefits: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  useCases: string[];
  whyChooseUs: string[];
}

const SERVICES: Record<string, ServiceData> = {
  'data-strategy': {
    title: 'Data Strategy & Consulting',
    image: '/images/services/data-strategy.jpg',
    description: 'Data Strategy & Consulting focuses on aligning data capabilities with real organizational objectives.',
    overview: `In today's data-driven landscape, organizations that fail to develop a coherent data strategy risk falling behind competitors who leverage information as a strategic asset. Precise Analytics works with leadership and technical stakeholders to assess current data maturity, define governance and operating models, and design practical roadmaps that translate strategy into execution.

Our engagements emphasize clarity around priorities, ownership, and outcomes, ensuring data initiatives are grounded in measurable business value rather than disconnected experimentation. We help organizations move beyond ad-hoc analytics projects toward a sustainable, enterprise-wide approach to data management and utilization.

By aligning analytics investments with mission goals and operational realities, organizations gain a clear path from strategy to execution while managing risk and complexity effectively. Our consultants bring decades of combined experience across government, healthcare, financial services, and manufacturing sectors.`,
    keyBenefits: [
      'Establish a unified data vision aligned with organizational goals',
      'Reduce redundant analytics initiatives and technology sprawl',
      'Accelerate time-to-value for data investments',
      'Build internal capabilities for sustainable data excellence',
      'Create governance frameworks that enable innovation while managing risk',
      'Develop executive-level data literacy and sponsorship'
    ],
    capabilities: [
      {
        title: 'Data Maturity Assessment',
        description: 'Comprehensive evaluation of your current data capabilities across people, process, and technology dimensions using industry-standard frameworks.'
      },
      {
        title: 'Governance Framework Design',
        description: 'Development of data governance structures including roles, responsibilities, policies, and procedures tailored to your organizational context.'
      },
      {
        title: 'Technology Roadmap Planning',
        description: 'Strategic technology planning that aligns tool selection with business requirements, existing investments, and future scalability needs.'
      },
      {
        title: 'Operating Model Development',
        description: 'Design of data operating models that define how analytics teams, business units, and IT collaborate to deliver value.'
      }
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Stakeholder interviews, current state assessment, and business priority mapping to understand your unique context.' },
      { step: '02', title: 'Analysis', description: 'Gap analysis, opportunity identification, and benchmarking against industry best practices and peer organizations.' },
      { step: '03', title: 'Strategy Design', description: 'Development of strategic recommendations, governance frameworks, and prioritized initiative roadmaps.' },
      { step: '04', title: 'Implementation Planning', description: 'Detailed execution plans with resource requirements, timelines, and success metrics for each initiative.' }
    ],
    useCases: [
      'Federal agencies modernizing legacy data systems under mandates like the Federal Data Strategy',
      'Healthcare organizations building enterprise analytics capabilities for value-based care',
      'Financial institutions developing AI governance frameworks for regulatory compliance',
      'Manufacturing companies creating data foundations for Industry 4.0 initiatives'
    ],
    whyChooseUs: [
      'Deep expertise in government and regulated industry data requirements',
      'Practical, implementation-focused recommendations rather than theoretical frameworks',
      'Proven methodologies refined across dozens of enterprise engagements',
      'Ability to bridge technical and business stakeholder perspectives'
    ]
  },

  'business-intelligence': {
    title: 'Business Intelligence & Reporting',
    image: '/images/services/business-intelligence.jpg',
    description: 'Business Intelligence & Reporting delivers trusted, decision-ready insights across the organization.',
    overview: `Effective business intelligence transforms raw data into actionable insights that drive better decisions at every level of your organization. Precise Analytics designs executive and operational dashboards that establish a consistent metrics layer and serve as a single source of truth for decision-makers.

We focus on usability, performance, and adoption so reporting systems integrate naturally into daily workflows rather than existing as static or underutilized reports. Our approach combines technical excellence with deep understanding of how people actually consume and act on information.

This methodology enables faster decision cycles, reduced ambiguity, and greater confidence in the data that leaders rely on to guide strategy and operations. We don't just build dashboards—we create decision support systems that become indispensable to your operations.`,
    keyBenefits: [
      'Establish a single source of truth for organizational metrics',
      'Reduce time spent searching for and reconciling data',
      'Enable self-service analytics for business users',
      'Improve decision speed and confidence across all levels',
      'Eliminate conflicting reports and metric definitions',
      'Scale reporting capabilities without proportional headcount increases'
    ],
    capabilities: [
      {
        title: 'Executive Dashboard Design',
        description: 'Strategic dashboards that surface the metrics executives need to monitor organizational health and make high-stakes decisions.'
      },
      {
        title: 'Operational Reporting',
        description: 'Detailed operational reports and dashboards that help front-line managers monitor performance and identify issues in real-time.'
      },
      {
        title: 'Self-Service Analytics',
        description: 'Governed self-service environments that empower business users to explore data independently while maintaining data quality standards.'
      },
      {
        title: 'KPI Framework Development',
        description: 'Design of comprehensive KPI hierarchies that align metrics from strategic objectives down to operational activities.'
      }
    ],
    process: [
      { step: '01', title: 'Requirements Gathering', description: 'Deep-dive sessions with stakeholders to understand decision-making processes and information needs.' },
      { step: '02', title: 'Data Assessment', description: 'Evaluation of available data sources, quality, and gaps relative to reporting requirements.' },
      { step: '03', title: 'Design & Prototyping', description: 'Iterative dashboard design with stakeholder feedback to ensure usability and relevance.' },
      { step: '04', title: 'Implementation & Training', description: 'Technical implementation, user training, and adoption support to ensure sustained value.' }
    ],
    useCases: [
      'C-suite executives needing real-time visibility into organizational performance',
      'Operations teams monitoring production, logistics, or service delivery metrics',
      'Finance departments consolidating reporting across business units',
      'HR teams tracking workforce analytics and talent metrics'
    ],
    whyChooseUs: [
      'Expertise across leading BI platforms including Power BI, Tableau, and Looker',
      'Focus on adoption and change management, not just technical delivery',
      'Experience with complex, multi-source data environments',
      'Design methodology grounded in cognitive science and user experience research'
    ]
  },

  'predictive-analytics': {
    title: 'Predictive Analytics',
    image: '/images/services/predictive-analytics.jpg',
    description: 'Predictive Analytics enables organizations to anticipate outcomes rather than react to them.',
    overview: `The ability to anticipate future outcomes—whether demand fluctuations, equipment failures, customer behavior, or market shifts—provides organizations with a decisive competitive advantage. Precise Analytics develops forecasting and predictive models that surface emerging trends, risks, and opportunities across operational and strategic domains.

Our models are designed for interpretability and operational deployment, ensuring outputs can be understood, trusted, and acted upon by business leaders. We reject the "black box" approach in favor of models that explain their reasoning and build user confidence.

By embedding predictive insights directly into workflows, organizations can make proactive decisions that improve resilience, efficiency, and long-term performance. We focus on models that drive action, not just impressive accuracy metrics on test datasets.`,
    keyBenefits: [
      'Anticipate demand to optimize inventory and resource allocation',
      'Identify at-risk customers before they churn',
      'Predict equipment failures to enable preventive maintenance',
      'Forecast financial outcomes with greater accuracy',
      'Detect fraud and anomalies before they cause significant damage',
      'Optimize pricing and promotion strategies based on predicted response'
    ],
    capabilities: [
      {
        title: 'Demand Forecasting',
        description: 'Statistical and machine learning models that predict demand across products, services, channels, and time horizons.'
      },
      {
        title: 'Risk Prediction',
        description: 'Models that identify and score risks including credit risk, fraud risk, operational risk, and compliance risk.'
      },
      {
        title: 'Customer Analytics',
        description: 'Predictive models for customer lifetime value, churn probability, next-best-action, and segmentation.'
      },
      {
        title: 'Predictive Maintenance',
        description: 'IoT and sensor-based models that predict equipment failures and optimize maintenance scheduling.'
      }
    ],
    process: [
      { step: '01', title: 'Problem Framing', description: 'Clear definition of the prediction target, success criteria, and how predictions will be used in decisions.' },
      { step: '02', title: 'Data Preparation', description: 'Feature engineering, data quality assessment, and preparation of training and validation datasets.' },
      { step: '03', title: 'Model Development', description: 'Iterative model development with emphasis on interpretability, robustness, and operational feasibility.' },
      { step: '04', title: 'Deployment & Monitoring', description: 'Production deployment with monitoring for model drift, performance degradation, and continuous improvement.' }
    ],
    useCases: [
      'Retailers forecasting demand across thousands of SKUs and locations',
      'Healthcare organizations predicting patient readmission risk',
      'Financial institutions scoring credit applications and detecting fraud',
      'Utilities forecasting energy demand and optimizing grid operations'
    ],
    whyChooseUs: [
      'Focus on interpretable models that business users can understand and trust',
      'Experience deploying models in production at enterprise scale',
      'Strong emphasis on model governance and monitoring',
      'Ability to translate complex statistical concepts for non-technical stakeholders'
    ]
  },

  'data-visualization': {
    title: 'Data Visualization',
    image: '/images/services/data-visualization.jpg',
    description: 'Data Visualization transforms complex data into intuitive, decision-focused narratives.',
    overview: `In an age of information overload, the ability to communicate data effectively is as important as the analysis itself. Precise Analytics designs visual experiences that prioritize clarity, context, and action, helping users quickly understand what matters most.

We apply principles of visual hierarchy, storytelling, and user experience to ensure dashboards communicate insight rather than overwhelm audiences. Our designs are grounded in cognitive science research on how humans perceive and process visual information.

The result is higher adoption, stronger engagement, and visual tools that become integral to daily decision-making across the organization. We create visualizations that don't just display data—they tell stories and drive action.`,
    keyBenefits: [
      'Communicate complex information clearly to diverse audiences',
      'Increase dashboard adoption and user engagement',
      'Reduce time required to understand and act on data',
      'Enable faster identification of trends, outliers, and opportunities',
      'Build data literacy across the organization',
      'Create compelling data stories for stakeholder presentations'
    ],
    capabilities: [
      {
        title: 'Dashboard Design',
        description: 'User-centered dashboard design that balances information density with clarity and usability.'
      },
      {
        title: 'Data Storytelling',
        description: 'Narrative-driven visualizations that guide viewers through complex analyses and support decision-making.'
      },
      {
        title: 'Interactive Exploration',
        description: 'Drill-down capabilities, filters, and interactive elements that enable users to explore data independently.'
      },
      {
        title: 'Visualization Standards',
        description: 'Development of organizational visualization standards and style guides for consistent, professional outputs.'
      }
    ],
    process: [
      { step: '01', title: 'Audience Analysis', description: 'Understanding who will use the visualizations, their data literacy, and decision-making context.' },
      { step: '02', title: 'Information Architecture', description: 'Structuring information hierarchy to surface the most important insights first.' },
      { step: '03', title: 'Visual Design', description: 'Applying visualization best practices, color theory, and cognitive principles to design mockups.' },
      { step: '04', title: 'Iteration & Refinement', description: 'User testing and iterative refinement to optimize for comprehension and engagement.' }
    ],
    useCases: [
      'Executive teams needing clear visibility into organizational performance',
      'Analysts presenting findings to non-technical stakeholders',
      'Operations centers monitoring real-time metrics',
      'Public-facing data portals and transparency initiatives'
    ],
    whyChooseUs: [
      'Design approach grounded in cognitive science and UX research',
      'Experience across diverse industries and use cases',
      'Ability to balance aesthetic appeal with functional effectiveness',
      'Focus on adoption and sustained engagement, not just initial delivery'
    ]
  },

  'data-warehousing': {
    title: 'Data Warehousing & Integration',
    image: '/images/services/data-warehousing.jpg',
    description: 'Data Warehousing & Integration provides the foundation for scalable analytics.',
    overview: `A robust data infrastructure is the foundation upon which all analytics capabilities are built. Precise Analytics designs and implements modern, cloud-ready data platforms that unify fragmented systems into a cohesive analytics architecture.

We emphasize reliable pipelines, clean data models, and performance optimization to support both current needs and future growth. Our solutions leverage modern data stack technologies while maintaining pragmatic approaches to migration and integration.

This foundation enables organizations to scale analytics capabilities confidently without introducing unnecessary complexity or technical debt. We build platforms designed for evolution, not just current requirements.`,
    keyBenefits: [
      'Unify data from disparate sources into a single, trusted repository',
      'Reduce data preparation time for analysts and data scientists',
      'Enable historical analysis and trend identification',
      'Support both operational and analytical workloads',
      'Scale data infrastructure with organizational growth',
      'Reduce total cost of ownership through modern cloud architectures'
    ],
    capabilities: [
      {
        title: 'Cloud Data Platform Design',
        description: 'Architecture and implementation of modern cloud data platforms on AWS, Azure, GCP, or hybrid environments.'
      },
      {
        title: 'ETL/ELT Pipeline Development',
        description: 'Design and implementation of data integration pipelines that extract, transform, and load data reliably and efficiently.'
      },
      {
        title: 'Data Modeling',
        description: 'Dimensional modeling, data vault, and other methodologies to structure data for analytical queries and reporting.'
      },
      {
        title: 'Migration Services',
        description: 'Migration from legacy data warehouses and on-premises systems to modern cloud platforms.'
      }
    ],
    process: [
      { step: '01', title: 'Architecture Assessment', description: 'Evaluation of current data architecture, pain points, and requirements for the target state.' },
      { step: '02', title: 'Platform Design', description: 'Design of target architecture including technology selection, data models, and integration patterns.' },
      { step: '03', title: 'Implementation', description: 'Iterative build-out of data platform components with continuous testing and validation.' },
      { step: '04', title: 'Optimization', description: 'Performance tuning, cost optimization, and operational handoff with documentation and training.' }
    ],
    useCases: [
      'Organizations migrating from on-premises data warehouses to cloud platforms',
      'Companies consolidating data from multiple acquired businesses',
      'Enterprises modernizing legacy ETL processes',
      'Organizations building data platforms for advanced analytics and AI'
    ],
    whyChooseUs: [
      'Deep expertise across major cloud platforms and data technologies',
      'Focus on total cost of ownership, not just initial implementation',
      'Experience with complex, high-volume data environments',
      'Strong emphasis on operational sustainability and knowledge transfer'
    ]
  },

  'data-quality': {
    title: 'Data Quality Management',
    image: '/images/services/data-quality.jpg',
    description: 'Data Quality Management ensures analytics outputs can be trusted.',
    overview: `Poor data quality is the silent killer of analytics initiatives. When leaders can't trust the numbers, they make decisions based on intuition or simply ignore data altogether. Precise Analytics implements continuous validation, monitoring, and remediation frameworks that identify data issues early in the pipeline.

We embed quality controls into governance and operational processes so issues are addressed systematically rather than reactively. Our approach treats data quality as an ongoing discipline, not a one-time project.

This methodology protects decision integrity and builds long-term confidence in the organization's data ecosystem. We help organizations move from firefighting data issues to proactively maintaining data as a trusted asset.`,
    keyBenefits: [
      'Build confidence in analytics outputs across the organization',
      'Reduce time spent investigating and correcting data issues',
      'Prevent bad data from reaching decision-makers',
      'Enable regulatory compliance through data integrity controls',
      'Reduce operational costs from data-driven errors',
      'Establish accountability for data quality across the organization'
    ],
    capabilities: [
      {
        title: 'Data Quality Assessment',
        description: 'Comprehensive profiling and assessment of data quality across dimensions including accuracy, completeness, timeliness, and consistency.'
      },
      {
        title: 'Automated Monitoring',
        description: 'Implementation of automated data quality monitoring with alerting for anomalies and rule violations.'
      },
      {
        title: 'Remediation Workflows',
        description: 'Design of workflows and processes for investigating, resolving, and preventing data quality issues.'
      },
      {
        title: 'Data Quality Governance',
        description: 'Establishment of data quality roles, responsibilities, metrics, and continuous improvement processes.'
      }
    ],
    process: [
      { step: '01', title: 'Quality Profiling', description: 'Automated and manual profiling to understand current data quality levels and patterns.' },
      { step: '02', title: 'Rule Definition', description: 'Collaborative definition of data quality rules based on business requirements and domain expertise.' },
      { step: '03', title: 'Monitoring Implementation', description: 'Technical implementation of quality monitoring, alerting, and reporting capabilities.' },
      { step: '04', title: 'Process Integration', description: 'Integration of data quality into operational processes with clear ownership and escalation paths.' }
    ],
    useCases: [
      'Organizations experiencing trust issues with existing reports and dashboards',
      'Companies preparing for regulatory audits or compliance requirements',
      'Enterprises consolidating data from multiple sources',
      'Organizations implementing self-service analytics'
    ],
    whyChooseUs: [
      'Pragmatic approach focused on high-impact quality issues',
      'Experience implementing quality frameworks at enterprise scale',
      'Understanding of both technical and organizational aspects of data quality',
      'Focus on sustainable processes, not just tools'
    ]
  },

  'custom-solutions': {
    title: 'Custom Analytics Solutions',
    image: '/images/services/custom-solutions.jpg',
    description: 'Custom Analytics Solutions address mission-critical needs that off-the-shelf tools cannot support.',
    overview: `Sometimes standard analytics tools simply cannot address specialized business requirements, unique data structures, or stringent security and compliance needs. Precise Analytics designs and builds secure, scalable analytics applications tailored to specific workflows, users, and regulatory environments.

Our solutions integrate seamlessly with existing systems, ensuring insights are delivered where and when they are needed most. We build applications that users actually want to use, combining powerful analytics with intuitive interfaces.

By focusing on real operational requirements, custom solutions provide targeted value without unnecessary features or complexity. We deliver purpose-built tools that solve specific problems exceptionally well.`,
    keyBenefits: [
      'Address unique requirements that commercial tools cannot meet',
      'Maintain full control over security and compliance',
      'Integrate analytics directly into existing workflows',
      'Avoid licensing costs for unused features',
      'Adapt and evolve solutions as requirements change',
      'Create competitive advantage through proprietary analytics capabilities'
    ],
    capabilities: [
      {
        title: 'Custom Application Development',
        description: 'Full-stack development of analytics applications with modern technologies and best practices.'
      },
      {
        title: 'Embedded Analytics',
        description: 'Integration of analytics capabilities directly into existing operational systems and workflows.'
      },
      {
        title: 'Specialized Algorithms',
        description: 'Development of custom algorithms and models for unique analytical requirements.'
      },
      {
        title: 'Secure Deployments',
        description: 'Implementation in secure, compliant environments including FedRAMP, HIPAA, and classified systems.'
      }
    ],
    process: [
      { step: '01', title: 'Requirements Definition', description: 'Detailed requirements gathering including functional, technical, security, and compliance needs.' },
      { step: '02', title: 'Architecture Design', description: 'Solution architecture design with technology selection and integration planning.' },
      { step: '03', title: 'Agile Development', description: 'Iterative development with regular stakeholder demos and feedback incorporation.' },
      { step: '04', title: 'Deployment & Support', description: 'Production deployment, training, documentation, and ongoing support and enhancement.' }
    ],
    useCases: [
      'Government agencies with unique mission requirements and security constraints',
      'Healthcare organizations needing HIPAA-compliant analytics portals',
      'Financial institutions with proprietary risk models',
      'Manufacturing companies with specialized production analytics needs'
    ],
    whyChooseUs: [
      'Deep experience in government and regulated industry requirements',
      'Full-stack development capabilities from infrastructure to UI',
      'Security-first approach to application development',
      'Long-term partnership approach with ongoing support and enhancement'
    ]
  },

  'training-support': {
    title: 'Training & Enablement',
    image: '/images/services/training-support.jpg',
    description: 'Training & Enablement ensures analytics investments translate into sustained value.',
    overview: `The most sophisticated analytics infrastructure delivers no value if people don't know how to use it effectively. Precise Analytics provides role-based training and practical guidance tailored to the needs of executives, analysts, and operational teams.

We focus on real use cases and applied learning rather than abstract theory, enabling teams to build confidence quickly. Our training programs are designed for adult learners who need to apply new skills immediately.

This approach strengthens internal capability, increases adoption, and reduces long-term reliance on external support. We measure success not by training completion rates, but by demonstrated capability improvement and sustained usage.`,
    keyBenefits: [
      'Accelerate adoption of new analytics tools and capabilities',
      'Build sustainable internal analytics competencies',
      'Reduce ongoing dependence on external consultants',
      'Improve data literacy across the organization',
      'Ensure investments in analytics tools deliver full value',
      'Create analytics champions who drive adoption in their teams'
    ],
    capabilities: [
      {
        title: 'Executive Data Literacy',
        description: 'Programs for executives and senior leaders on interpreting analytics, asking good questions, and data-driven decision-making.'
      },
      {
        title: 'Technical Training',
        description: 'Hands-on training for analysts and technical staff on specific tools, techniques, and best practices.'
      },
      {
        title: 'Adoption Support',
        description: 'Change management and adoption programs that help organizations successfully transition to new analytics capabilities.'
      },
      {
        title: 'Documentation & Resources',
        description: 'Development of training materials, documentation, and self-service resources for ongoing learning.'
      }
    ],
    process: [
      { step: '01', title: 'Needs Assessment', description: 'Evaluation of current skill levels, learning objectives, and organizational context.' },
      { step: '02', title: 'Program Design', description: 'Design of customized training programs aligned with specific tools, roles, and use cases.' },
      { step: '03', title: 'Delivery', description: 'Training delivery through workshops, hands-on labs, coaching, and online resources.' },
      { step: '04', title: 'Reinforcement', description: 'Follow-up coaching, office hours, and resources to reinforce learning and support application.' }
    ],
    useCases: [
      'Organizations implementing new BI platforms',
      'Teams adopting advanced analytics or AI capabilities',
      'Executives seeking to improve data-driven decision-making',
      'Organizations building centers of excellence for analytics'
    ],
    whyChooseUs: [
      'Instructors with real-world analytics experience, not just training backgrounds',
      'Focus on applied learning and immediate skill application',
      'Customization to your specific tools, data, and use cases',
      'Comprehensive approach including change management and adoption support'
    ]
  },

  'agentic-ai': {
    title: 'Advanced Analytics & Agentic AI',
    image: '/images/services/agentic-ai.jpg',
    description: 'Advanced Analytics & Agentic AI augments human decision-making through governed intelligence.',
    overview: `The emergence of large language models and agentic AI systems creates unprecedented opportunities to augment human decision-making with intelligent automation. Precise Analytics designs agent-based systems that monitor signals, reason over context, and support informed action with transparency.

We emphasize human-in-the-loop design, auditability, and explainability to ensure AI systems remain aligned with organizational values. Our approach recognizes that AI should amplify human judgment, not replace accountability.

This enables responsible adoption of advanced analytics and AI while maintaining trust, control, and compliance. We help organizations harness AI's potential while managing its risks appropriately.`,
    keyBenefits: [
      'Automate routine analytical tasks to free up human capacity',
      'Surface insights and recommendations at the point of decision',
      'Monitor complex environments for emerging patterns and anomalies',
      'Enable natural language interaction with data and systems',
      'Maintain auditability and explainability for regulated environments',
      'Build AI capabilities that align with organizational values'
    ],
    capabilities: [
      {
        title: 'LLM Integration',
        description: 'Integration of large language models for natural language queries, document analysis, and content generation.'
      },
      {
        title: 'Agent Design',
        description: 'Design of autonomous agents that monitor, reason, and take action within defined boundaries and governance frameworks.'
      },
      {
        title: 'RAG Systems',
        description: 'Retrieval-augmented generation systems that ground AI responses in organizational knowledge and data.'
      },
      {
        title: 'AI Governance',
        description: 'Frameworks for responsible AI including bias monitoring, explainability, and human oversight.'
      }
    ],
    process: [
      { step: '01', title: 'Use Case Identification', description: 'Identification of high-value AI use cases with clear success criteria and risk assessment.' },
      { step: '02', title: 'Architecture Design', description: 'Design of AI architecture including model selection, integration patterns, and governance controls.' },
      { step: '03', title: 'Development & Testing', description: 'Iterative development with rigorous testing for accuracy, safety, and alignment.' },
      { step: '04', title: 'Deployment & Monitoring', description: 'Production deployment with continuous monitoring for performance, safety, and drift.' }
    ],
    useCases: [
      'Organizations seeking to automate routine analytical workflows',
      'Teams needing natural language interfaces to complex data',
      'Operations centers requiring intelligent monitoring and alerting',
      'Knowledge workers needing AI assistance with research and analysis'
    ],
    whyChooseUs: [
      'Deep expertise in both traditional ML and modern LLM technologies',
      'Strong focus on responsible AI and governance',
      'Experience deploying AI in regulated environments',
      'Practical approach focused on business value, not technology for its own sake'
    ]
  },

  'decision-intelligence': {
    title: 'Decision Intelligence & Automation',
    image: '/images/services/decision-intelligence.jpg',
    description: 'Decision Intelligence & Automation embeds analytics directly into operational workflows.',
    overview: `The ultimate goal of analytics is better decisions. Decision Intelligence bridges the gap between insight and action by embedding analytics directly into the workflows where decisions are made. Precise Analytics combines scenario modeling, recommendations, and controlled automation to support complex decisions.

We design systems that balance speed with oversight, ensuring automation enhances decision-making rather than replacing accountability. Our solutions recognize that the best decisions often combine algorithmic recommendations with human judgment.

This approach allows organizations to move from insight to action efficiently while maintaining transparency and control. We create systems that make the right decision easier and the wrong decision harder.`,
    keyBenefits: [
      'Embed analytics at the point of decision-making',
      'Reduce decision latency for time-sensitive operations',
      'Improve decision consistency across the organization',
      'Enable scenario planning and what-if analysis',
      'Maintain human oversight while automating routine decisions',
      'Create audit trails for decision accountability'
    ],
    capabilities: [
      {
        title: 'Scenario Modeling',
        description: 'Interactive tools for exploring decision alternatives and their likely outcomes under different assumptions.'
      },
      {
        title: 'Recommendation Engines',
        description: 'Systems that surface contextual recommendations to decision-makers based on data and defined criteria.'
      },
      {
        title: 'Workflow Automation',
        description: 'Automation of routine decisions within defined parameters with escalation for exceptions.'
      },
      {
        title: 'Decision Tracking',
        description: 'Systems for tracking decisions, outcomes, and learning to continuously improve decision quality.'
      }
    ],
    process: [
      { step: '01', title: 'Decision Mapping', description: 'Identification and mapping of key decisions including inputs, criteria, and current processes.' },
      { step: '02', title: 'Solution Design', description: 'Design of decision support solutions balancing automation with appropriate human oversight.' },
      { step: '03', title: 'Implementation', description: 'Technical implementation integrated with existing workflows and systems.' },
      { step: '04', title: 'Optimization', description: 'Continuous monitoring and optimization based on decision outcomes and user feedback.' }
    ],
    useCases: [
      'Operations teams making real-time resource allocation decisions',
      'Pricing teams optimizing offers based on market conditions',
      'Risk teams requiring rapid assessment and escalation',
      'Supply chain teams balancing cost, service, and risk tradeoffs'
    ],
    whyChooseUs: [
      'Focus on decision quality, not just analytical sophistication',
      'Experience designing systems that balance automation with oversight',
      'Understanding of organizational dynamics and change management',
      'Practical approach grounded in behavioral economics and decision science'
    ]
  },

  'real-time-analytics': {
    title: 'Real-Time & Streaming Analytics',
    image: '/images/services/real-time-analytics.jpg',
    description: 'Real-Time & Streaming Analytics enables immediate awareness and response.',
    overview: `In many operational contexts, insight that arrives an hour late might as well not arrive at all. Real-time analytics provides the immediate awareness necessary to respond to events as they happen. Precise Analytics builds event-driven pipelines and low-latency dashboards that surface critical signals as they occur.

These systems support monitoring, alerting, and rapid response in environments where timing is critical. We design solutions that filter noise from signal, ensuring operators receive actionable alerts rather than overwhelming volumes of data.

Real-time analytics empowers organizations to act decisively and mitigate risk before issues escalate. We help organizations move from reactive firefighting to proactive operations management.`,
    keyBenefits: [
      'Detect and respond to events as they happen',
      'Monitor operational health in real-time',
      'Enable immediate alerting for critical conditions',
      'Support rapid decision-making with current data',
      'Reduce mean time to detection and resolution',
      'Create operational dashboards that reflect current state'
    ],
    capabilities: [
      {
        title: 'Stream Processing',
        description: 'Design and implementation of streaming data pipelines using technologies like Kafka, Spark Streaming, and Flink.'
      },
      {
        title: 'Real-Time Dashboards',
        description: 'Low-latency dashboards that update in real-time to reflect current operational state.'
      },
      {
        title: 'Alerting Systems',
        description: 'Intelligent alerting systems that detect anomalies and route notifications to appropriate responders.'
      },
      {
        title: 'Event-Driven Architecture',
        description: 'Design of event-driven architectures that enable real-time analytics across distributed systems.'
      }
    ],
    process: [
      { step: '01', title: 'Latency Requirements', description: 'Definition of latency requirements and identification of critical real-time use cases.' },
      { step: '02', title: 'Architecture Design', description: 'Design of streaming architecture balancing latency, throughput, and cost requirements.' },
      { step: '03', title: 'Implementation', description: 'Build-out of streaming pipelines, dashboards, and alerting systems.' },
      { step: '04', title: 'Operations', description: 'Operational handoff with monitoring, alerting, and procedures for the streaming infrastructure itself.' }
    ],
    useCases: [
      'Operations centers monitoring infrastructure and service health',
      'Security teams detecting and responding to threats',
      'Logistics operations tracking shipments and deliveries',
      'Manufacturing monitoring production lines and equipment'
    ],
    whyChooseUs: [
      'Deep expertise in streaming technologies and architectures',
      'Experience with high-volume, mission-critical environments',
      'Focus on operational sustainability, not just initial implementation',
      'Understanding of the organizational aspects of real-time operations'
    ]
  },

  'governance-risk': {
    title: 'Data Governance, Risk & Compliance',
    image: '/images/services/governance-risk.jpg',
    description: 'Data Governance, Risk & Compliance ensures analytics and AI systems operate securely and responsibly.',
    overview: `As organizations become more dependent on data and AI, the risks of mismanagement grow proportionally. Privacy regulations, security threats, bias concerns, and operational risks all require systematic governance approaches. Precise Analytics designs governance frameworks that establish ownership, access controls, lineage, and auditability across data assets.

We embed compliance considerations directly into analytics architecture rather than treating them as an afterthought. Our approach recognizes that good governance enables innovation by creating the trust and transparency necessary to move forward confidently.

This enables organizations to innovate confidently while meeting security, privacy, and regulatory obligations. We help organizations see governance not as a constraint, but as a competitive advantage.`,
    keyBenefits: [
      'Ensure compliance with privacy regulations like GDPR, CCPA, and HIPAA',
      'Protect sensitive data through appropriate access controls',
      'Enable auditability for regulatory and internal requirements',
      'Manage AI risks including bias, safety, and accountability',
      'Build trust with customers and stakeholders through responsible data practices',
      'Reduce risk of data breaches and their associated costs'
    ],
    capabilities: [
      {
        title: 'Governance Framework Design',
        description: 'Design of comprehensive data governance frameworks including policies, procedures, roles, and responsibilities.'
      },
      {
        title: 'Privacy Compliance',
        description: 'Implementation of privacy controls and processes for compliance with regulations like GDPR, CCPA, and HIPAA.'
      },
      {
        title: 'Data Lineage & Cataloging',
        description: 'Implementation of data cataloging and lineage tracking for transparency and auditability.'
      },
      {
        title: 'AI Governance',
        description: 'Frameworks for responsible AI including bias monitoring, explainability, and accountability structures.'
      }
    ],
    process: [
      { step: '01', title: 'Risk Assessment', description: 'Assessment of data and AI risks including privacy, security, bias, and operational risks.' },
      { step: '02', title: 'Framework Design', description: 'Design of governance frameworks tailored to organizational context and regulatory requirements.' },
      { step: '03', title: 'Implementation', description: 'Implementation of governance tools, processes, and organizational structures.' },
      { step: '04', title: 'Continuous Improvement', description: 'Ongoing monitoring, auditing, and improvement of governance effectiveness.' }
    ],
    useCases: [
      'Organizations subject to privacy regulations like GDPR or HIPAA',
      'Financial institutions with regulatory reporting requirements',
      'Government agencies with data classification and handling requirements',
      'Organizations deploying AI systems that require governance frameworks'
    ],
    whyChooseUs: [
      'Deep expertise in regulatory requirements across industries',
      'Practical approach that balances compliance with operational efficiency',
      'Experience implementing governance in complex, enterprise environments',
      'Understanding of both technical and organizational aspects of governance'
    ]
  }
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== 'string' || !SERVICES[slug]) {
    return (
      <>
        <Head>
          <title>Service Not Found | {EnvVars.SITE_NAME}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <AnimatedHeader />
        <Container style={{ padding: '10rem 0', textAlign: 'center' }}>
          <h1>Service Not Found</h1>
          <p>The service you are looking for does not exist.</p>
          <Link href="/services">Back to Services</Link>
        </Container>
      </>
    );
  }

  const service = SERVICES[slug];

  return (
    <>
      <Head>
        <title>{`${service.title} | ${EnvVars.SITE_NAME}`}</title>
        <meta name="description" content={service.description} />
        <link
          rel="canonical"
          href={`https://preciseanalytics.io/services/${slug}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <AnimatedHeader />

      {/* Back Navigation */}
      <TopNav>
        <Container>
          <BackNavigation
            href="/services"
          >
            <BackIcon>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
            </BackIcon>
            <BackText>
              <BackLabel>Back to</BackLabel>
              <BackDestination>All Services</BackDestination>
            </BackText>
          </BackNavigation>
        </Container>
      </TopNav>

      {/* Hero Section */}
      <Hero style={{ backgroundImage: `url(${service.image})` }}>
        <Overlay />
        <HeroContent>
          <HeroInner>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
          </HeroInner>
        </HeroContent>
      </Hero>

      {/* Overview Section */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionLabel>Overview</SectionLabel>
            <SectionHeading>What We Deliver</SectionHeading>
          </SectionHeader>
          <OverviewText>
            {service.overview.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </OverviewText>
        </Container>
      </Section>

      {/* Key Benefits Section */}
      <Section $alternate>
        <Container>
          <SectionHeader>
            <SectionLabel>Benefits</SectionLabel>
            <SectionHeading>Key Benefits</SectionHeading>
          </SectionHeader>
          <BenefitsGrid>
            {service.keyBenefits.map((benefit, index) => (
              <BenefitCard key={index}>
                <BenefitIcon>✓</BenefitIcon>
                <BenefitText>{benefit}</BenefitText>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </Section>

      {/* Capabilities Section */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionLabel>Capabilities</SectionLabel>
            <SectionHeading>Our Capabilities</SectionHeading>
          </SectionHeader>
          <CapabilitiesGrid>
            {service.capabilities.map((capability, index) => (
              <CapabilityCard key={index}>
                <CapabilityNumber>{String(index + 1).padStart(2, '0')}</CapabilityNumber>
                <CapabilityTitle>{capability.title}</CapabilityTitle>
                <CapabilityDescription>{capability.description}</CapabilityDescription>
              </CapabilityCard>
            ))}
          </CapabilitiesGrid>
        </Container>
      </Section>

      {/* Process Section */}
      <Section $alternate>
        <Container>
          <SectionHeader>
            <SectionLabel>Process</SectionLabel>
            <SectionHeading>Our Approach</SectionHeading>
          </SectionHeader>
          <ProcessSteps>
            {service.process.map((step, index) => (
              <ProcessStep key={index}>
                <ProcessNumber>{step.step}</ProcessNumber>
                <ProcessContent>
                  <ProcessTitle>{step.title}</ProcessTitle>
                  <ProcessDescription>{step.description}</ProcessDescription>
                </ProcessContent>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </Container>
      </Section>

      {/* Use Cases Section */}
      <Section>
        <Container>
          <SectionHeader>
            <SectionLabel>Applications</SectionLabel>
            <SectionHeading>Common Use Cases</SectionHeading>
          </SectionHeader>
          <UseCasesList>
            {service.useCases.map((useCase, index) => (
              <UseCaseItem key={index}>
                <UseCaseBullet>→</UseCaseBullet>
                <UseCaseText>{useCase}</UseCaseText>
              </UseCaseItem>
            ))}
          </UseCasesList>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section $alternate>
        <Container>
          <SectionHeader>
            <SectionLabel>Why Precise Analytics</SectionLabel>
            <SectionHeading>Why Choose Us</SectionHeading>
          </SectionHeader>
          <WhyChooseGrid>
            {service.whyChooseUs.map((reason, index) => (
              <WhyChooseCard key={index}>
                <WhyChooseIcon>★</WhyChooseIcon>
                <WhyChooseText>{reason}</WhyChooseText>
              </WhyChooseCard>
            ))}
          </WhyChooseGrid>
        </Container>
      </Section>

      {/* CTA Section */}
      <CtaSection>
        <Container>
          <CtaContent>
            <CtaTitle>Ready to Get Started?</CtaTitle>
            <CtaDescription>
              Let&apos;s discuss how {service.title.toLowerCase()} can transform your organization&apos;s data capabilities.
            </CtaDescription>
            <CtaActions>
              <CtaButtonPrimary href={`/schedule-consult?service=${slug}`}>
                Schedule a Consultation
              </CtaButtonPrimary>
              <CtaButtonSecondary href="/services">
                Back to Services
              </CtaButtonSecondary>
            </CtaActions>
          </CtaContent>
        </Container>
      </CtaSection>
    </>
  );
}

/* ================= STYLES ================= */

const TopNav = styled.div`
  background: rgb(var(--background));
  padding: 2rem 0 1rem;
  border-bottom: 1px solid rgba(var(--text), 0.1);
`;

const BackNavigation = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.8rem 3rem;
  background: rgba(255, 165, 0, 0.1);
  border: 2px solid rgba(255, 165, 0, 0.3);
  border-radius: 1.6rem;
  color: rgb(255, 140, 0);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  backdrop-filter: blur(10px);
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.2);

  &:hover {
    background: rgba(255, 165, 0, 0.15);
    border-color: rgba(255, 165, 0, 0.5);
    box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
    transform: translateX(-8px) translateY(-2px);
  }

  ${media.phone(`
    padding: 1.4rem 2rem;
    font-size: 1rem;
  `)}
`;

const BackIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 1rem;
  background: rgba(255, 165, 0, 0.2);
  transition: all 0.3s ease;
  
  svg {
    width: 2.2rem;
    height: 2.2rem;
    transition: transform 0.3s ease;
  }

  ${BackNavigation}:hover & {
    background: rgba(255, 165, 0, 0.3);
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const BackText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const BackLabel = styled.span`
  font-size: 1.4rem;
  opacity: 0.8;
  line-height: 1;
  font-weight: 500;
`;

const BackDestination = styled.span`
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;

  ${media.phone(`
    font-size: 1.6rem;
  `)}
`;

const Hero = styled.section`
  position: relative;
  min-height: 60vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.85)
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroInner = styled.div`
  max-width: 90rem;
  padding: 0 3rem;
  color: white;

  h1 {
    font-size: 4.5rem;
    margin-bottom: 2rem;
    color: #39ff14;
    font-weight: 800;
  }

  p {
    font-size: 2rem;
    line-height: 1.7;
    max-width: 72rem;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.9);
  }

  ${media.tablet(`
    h1 { font-size: 3.2rem; }
    p { font-size: 1.8rem; }
  `)}
`;

const Section = styled.section<{ $alternate?: boolean }>`
  padding: 8rem 0;
  background: ${props => props.$alternate ? 'rgba(var(--cardBackground), 0.5)' : 'transparent'};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionLabel = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff8c2b;
  margin-bottom: 1rem;
`;

const SectionHeading = styled.h2`
  font-size: 3.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin: 0;

  ${media.tablet(`font-size: 2.8rem;`)}
`;

const OverviewText = styled.div`
  max-width: 90rem;
  margin: 0 auto;

  p {
    font-size: 1.8rem;
    line-height: 1.9;
    color: rgba(var(--text), 0.85);
    margin-bottom: 2.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 100rem;
  margin: 0 auto;

  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const BenefitCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const BenefitIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: #39ff14;
  color: #000;
  border-radius: 50%;
  font-weight: 700;
  flex-shrink: 0;
`;

const BenefitText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.9);
  margin: 0;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 100rem;
  margin: 0 auto;

  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const CapabilityCard = styled.div`
  padding: 3rem;
  background: rgba(var(--cardBackground), 0.6);
  border-radius: 1.5rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const CapabilityNumber = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff8c2b;
  display: block;
  margin-bottom: 1rem;
`;

const CapabilityTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #39ff14;
  margin: 0 0 1.5rem 0;
`;

const CapabilityDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.85);
  margin: 0;
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 80rem;
  margin: 0 auto;
`;

const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;

  ${media.phone(`
    flex-direction: column;
    gap: 1.5rem;
  `)}
`;

const ProcessNumber = styled.span`
  font-size: 4rem;
  font-weight: 800;
  color: rgba(57, 255, 20, 0.3);
  line-height: 1;
  flex-shrink: 0;
  width: 8rem;
`;

const ProcessContent = styled.div`
  flex: 1;
`;

const ProcessTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0 0 1rem 0;
`;

const ProcessDescription = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  margin: 0;
`;

const UseCasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 80rem;
  margin: 0 auto;
`;

const UseCaseItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const UseCaseBullet = styled.span`
  color: #ff8c2b;
  font-size: 2rem;
  font-weight: 700;
  flex-shrink: 0;
`;

const UseCaseText = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.85);
  margin: 0;
`;

const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 100rem;
  margin: 0 auto;

  ${media.tablet(`grid-template-columns: 1fr;`)}
`;

const WhyChooseCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: rgba(var(--cardBackground), 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(var(--text), 0.1);
`;

const WhyChooseIcon = styled.span`
  color: #ff8c2b;
  font-size: 2rem;
  flex-shrink: 0;
`;

const WhyChooseText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(var(--text), 0.9);
  margin: 0;
`;

const CtaSection = styled.section`
  padding: 10rem 0;
  background: linear-gradient(135deg, rgba(57, 255, 20, 0.1), rgba(255, 140, 43, 0.1));
`;

const CtaContent = styled.div`
  text-align: center;
  max-width: 70rem;
  margin: 0 auto;
`;

const CtaTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 800;
  color: rgb(var(--text));
  margin: 0 0 2rem 0;

  ${media.tablet(`font-size: 2.8rem;`)}
`;

const CtaDescription = styled.p`
  font-size: 1.8rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.8);
  margin: 0 0 4rem 0;
`;

const CtaActions = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CtaButtonPrimary = styled(Link)`
  display: inline-block;
  background: #39ff14;
  color: #000;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1.6rem 3.5rem;
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #2dd10d;
    transform: translateY(-2px);
  }
`;

const CtaButtonSecondary = styled(Link)`
  display: inline-block;
  background: #ff8c2b;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  padding: 1.6rem 3.5rem;
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #ff7a00;
    transform: translateY(-2px);
  }
`;