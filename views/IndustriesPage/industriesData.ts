export enum IndustryKey {
  HEALTHCARE = 'healthcare',
  MANUFACTURING = 'manufacturing',
  FINTECH = 'fintech',
  RETAIL = 'retail',
}

export interface IndustryType {
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  href: string;
  imageUrl: string;
}

export const industries: IndustryType[] = [
  {
    title: 'Healthcare',
    icon: '🏥',
    description: 'Transform healthcare delivery with data-driven insights that improve patient outcomes and operational efficiency.',
    benefits: [
      'Electronic Health Record (EHR) analytics',
      'Clinical decision support systems',
      'Population health management',
      'Healthcare quality metrics and reporting',
      'Medical research data analysis',
      'Pharmaceutical supply chain optimization'
    ],
    href: '/industries/healthcare',
    imageUrl: '/demo-illustration-1.svg'
  },
  {
    title: 'Manufacturing',
    icon: '🏭',
    description: 'Optimize production processes and supply chain operations through advanced manufacturing analytics.',
    benefits: [
      'Production line optimization',
      'Quality control and defect prediction',
      'Supply chain visibility and analytics',
      'Predictive maintenance solutions',
      'Inventory optimization',
      'Manufacturing KPI dashboards'
    ],
    href: '/industries/manufacturing',
    imageUrl: '/demo-illustration-2.svg'
  },
  {
    title: 'Fintech',
    icon: '💳',
    description: 'Drive financial innovation with sophisticated analytics for risk management, fraud detection, and customer insights.',
    benefits: [
      'Risk assessment and credit scoring',
      'Fraud detection and prevention',
      'Customer segmentation and targeting',
      'Regulatory compliance reporting',
      'Investment portfolio analytics',
      'Real-time transaction monitoring'
    ],
    href: '/industries/fintech',
    imageUrl: '/demo-illustration-3.png'
  },
  {
    title: 'Retail',
    icon: '🛍️',
    description: 'Enhance customer experience and optimize operations with retail-specific data analytics solutions.',
    benefits: [
      'Customer behavior and purchasing patterns',
      'Inventory management and forecasting',
      'Price optimization strategies',
      'Store performance analytics',
      'E-commerce conversion optimization',
      'Marketing campaign effectiveness'
    ],
    href: '/industries/retail',
    imageUrl: '/demo-illustration-4.png'
  }
];