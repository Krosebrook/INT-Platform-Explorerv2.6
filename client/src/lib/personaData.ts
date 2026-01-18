export type PersonaSection = 'Front of House' | 'Back of House';
export type PersonaCategory = 
  | 'Primary Decision Makers'
  | 'Operational Decision Makers'
  | 'Influencers & Specialists'
  | 'Industry-Specific'
  | 'Company Size Segments'
  | 'Executive Leadership'
  | 'Information Security Team'
  | 'Technology/IT Services Team'
  | 'Website Design & Development Team'
  | 'Branding & Identity Team'
  | 'Content Creation & Strategy Team'
  | 'Managed Marketing Services Team'
  | 'Operations/Consulting Team'
  | 'Client Services & Success'
  | 'Sales & Business Development'
  | 'Finance & Accounting'
  | 'Human Resources'
  | 'Administration & Office Operations'
  | 'Specialized/Emerging Roles';

export type TechProficiency = 'Novice' | 'Medium' | 'Expert' | 'Strategic';
export type BudgetTier = 'Low' | 'Medium' | 'High' | 'Ultimate';

export interface Persona {
  id: number;
  section: PersonaSection;
  category: PersonaCategory;
  title: string;
  ageRange: string;
  experience: string;
  education: string;
  location: string;
  companySize: string;
  industry: string;
  primaryGoals: string[];
  keyPainPoints: string[];
  techProficiency: TechProficiency;
  decisionAuthority: string;
  budgetRange: string;
  budgetTier: BudgetTier;
  successMetrics: string[];
  communicationPreferences: string[];
  aiToolRecommendations: {
    primary: string;
    secondary: string;
    useCases: string[];
  };
  relationshipMap: {
    reportsTo?: string;
    directReports?: string[];
    collaborators?: string[];
  };
}

export interface ClaudeRecommendation {
  modelId: string;
  modelName: string;
  rationale: string;
  estimatedROI: string;
  implementationApproach: string;
  securityConsiderations: string[];
}

export const FRONT_OF_HOUSE_PERSONAS: Persona[] = [
  {
    id: 1,
    section: 'Front of House',
    category: 'Primary Decision Makers',
    title: 'C-Suite Executive (CEO/COO/CFO)',
    ageRange: '45-65 years',
    experience: '20+ years business leadership',
    education: 'MBA or equivalent',
    location: 'Major metro Midwest',
    companySize: '50-500 employees',
    industry: 'Diverse industries',
    primaryGoals: ['Drive transformation', 'Maximize ROI', 'Ensure compliance', 'Build scalable ops', 'Strategic partnerships'],
    keyPainPoints: ['Vendor proliferation', 'ROI measurement', 'Cybersecurity threats', 'Finding trusted partners', 'Innovation/stability balance'],
    techProficiency: 'Medium',
    decisionAuthority: 'Ultimate - Signs $50K+',
    budgetRange: '$100K-$2M+ annually',
    budgetTier: 'Ultimate',
    successMetrics: ['EBITDA improvement', 'Cost reduction %', 'Time-to-market', 'Customer retention', 'Employee productivity'],
    communicationPreferences: ['Executive briefings', 'Board presentations', 'Strategic dashboards'],
    aiToolRecommendations: {
      primary: 'Microsoft Copilot',
      secondary: 'Claude Team',
      useCases: ['Executive briefings', 'Board report generation', 'Risk analysis', 'Strategic planning']
    },
    relationshipMap: {
      reportsTo: 'Board of Directors',
      directReports: ['CTO', 'CFO', 'CMO', 'CISO', 'COO'],
      collaborators: ['External advisors', 'Key clients']
    }
  },
  {
    id: 2,
    section: 'Front of House',
    category: 'Primary Decision Makers',
    title: 'Chief Information Security Officer (CISO)',
    ageRange: '35-55 years',
    experience: '10-20 yrs cybersecurity',
    education: 'BS CS + CISSP/CISM/CISA',
    location: 'Distributed/Remote',
    companySize: '100-1000+ employees',
    industry: 'Regulated industries',
    primaryGoals: ['SOC 2/ISO 27001 compliance', 'Minimize cyber risk', 'Security culture', 'Zero-trust architecture', 'Demonstrate ROI'],
    keyPainPoints: ['Limited budget/headcount', 'Evolving threats', 'Audit prep time (6-8 wks)', 'Employee awareness gaps', 'Vendor assessments'],
    techProficiency: 'Expert',
    decisionAuthority: 'High - Direct $25K-$100K',
    budgetRange: '$50K-$500K annually',
    budgetTier: 'High',
    successMetrics: ['Zero breaches', 'Audit success rate', 'MTTD/MTTR', 'Training completion', 'Vulnerability remediation time'],
    communicationPreferences: ['Technical documentation', 'Risk dashboards', 'Compliance reports'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'ChatGPT Team',
      useCases: ['Security policy generation', 'Compliance checklist creation', 'Incident response playbooks', 'Risk assessment documentation']
    },
    relationshipMap: {
      reportsTo: 'CEO/CTO',
      directReports: ['Security Analysts', 'Compliance Specialists'],
      collaborators: ['IT Director', 'Legal', 'External auditors']
    }
  },
  {
    id: 3,
    section: 'Front of House',
    category: 'Primary Decision Makers',
    title: 'Chief Technology Officer (CTO)',
    ageRange: '35-50 years',
    experience: '12-20 yrs technology',
    education: 'BS/MS Computer Science',
    location: 'Major metro or remote',
    companySize: '50-500 employees',
    industry: 'SaaS/tech/digital-first',
    primaryGoals: ['Scalable infrastructure', 'Digital transformation', 'Optimize spend', 'Attract talent', 'Modern practices'],
    keyPainPoints: ['Technical debt', 'Competing priorities', 'Finding engineers (180K+)', 'Legacy modernization', 'Cloud costs'],
    techProficiency: 'Expert',
    decisionAuthority: 'High - Stack/cloud/tools $50K-$500K',
    budgetRange: '$200K-$2M+ infrastructure',
    budgetTier: 'Ultimate',
    successMetrics: ['System uptime', 'Deployment frequency', 'Developer velocity', 'Tech debt reduction', 'Cost per transaction'],
    communicationPreferences: ['Architecture diagrams', 'Technical specs', 'Sprint reviews'],
    aiToolRecommendations: {
      primary: 'Claude Opus',
      secondary: 'GitHub Copilot',
      useCases: ['Architecture design', 'Code review', 'Technical documentation', 'Security analysis']
    },
    relationshipMap: {
      reportsTo: 'CEO',
      directReports: ['Engineering leads', 'DevOps', 'IT Director'],
      collaborators: ['Product', 'CISO', 'Vendors']
    }
  },
  {
    id: 4,
    section: 'Front of House',
    category: 'Primary Decision Makers',
    title: 'Chief Marketing Officer (CMO)',
    ageRange: '35-55 years',
    experience: '10-20 yrs marketing',
    education: 'BA Marketing + MBA pref',
    location: 'Major metro or remote',
    companySize: '50-500 employees',
    industry: 'B2B services/SaaS',
    primaryGoals: ['Generate qualified leads at target CAC', 'Build brand awareness', 'Data-driven marketing', 'Optimize funnel', 'Demonstrate ROI'],
    keyPainPoints: ['Proving marketing ROI', 'Limited budget', 'Content bottlenecks', 'MarTech complexity', 'Sales alignment'],
    techProficiency: 'Medium',
    decisionAuthority: 'High - Direct $25K-$250K',
    budgetRange: '$100K-$1M+ marketing',
    budgetTier: 'High',
    successMetrics: ['MQL/SQL volume', 'CAC', 'Pipeline contribution', 'Brand awareness', 'Conversion rates'],
    communicationPreferences: ['Marketing dashboards', 'Campaign reports', 'Creative reviews'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Jasper',
      useCases: ['Content strategy', 'Campaign planning', 'Competitive analysis', 'Brand messaging']
    },
    relationshipMap: {
      reportsTo: 'CEO',
      directReports: ['Marketing Director', 'Content Team', 'Demand Gen'],
      collaborators: ['Sales', 'Product', 'Customer Success']
    }
  },
  {
    id: 5,
    section: 'Front of House',
    category: 'Primary Decision Makers',
    title: 'Chief Financial Officer (CFO)',
    ageRange: '40-60 years',
    experience: '15-25 yrs finance CPA/CMA',
    education: 'BA Accounting + MBA/CPA',
    location: 'Major metro or remote',
    companySize: '50-500 employees',
    industry: 'All industries',
    primaryGoals: ['Accurate financial reporting', 'Optimize cash flow', 'Cost reduction', 'Strategic guidance', 'Financial automation'],
    keyPainPoints: ['Manual processes', 'Lack of real-time visibility', 'Tech spend visibility', 'Audit burden', 'Budget variance explanation'],
    techProficiency: 'Medium',
    decisionAuthority: 'Ultimate - Approves all spending',
    budgetRange: '$500K-$5M+ operational',
    budgetTier: 'Ultimate',
    successMetrics: ['Forecast accuracy', 'DSO', 'Working capital', 'Cost per invoice', 'Audit findings'],
    communicationPreferences: ['Financial dashboards', 'Board presentations', 'Variance reports'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Microsoft Copilot',
      useCases: ['Financial analysis', 'Forecasting', 'Board reporting', 'Cost optimization']
    },
    relationshipMap: {
      reportsTo: 'CEO/Board',
      directReports: ['Controller', 'FP&A', 'Treasury'],
      collaborators: ['All department heads', 'External auditors']
    }
  },
  {
    id: 6,
    section: 'Front of House',
    category: 'Operational Decision Makers',
    title: 'IT Director/Manager',
    ageRange: '35-50 years',
    experience: '10-15 yrs IT 3-5 mgmt',
    education: 'BS IT + CompTIA/MS/Cisco',
    location: 'On-site or hybrid',
    companySize: '50-300 employees',
    industry: 'All industries',
    primaryGoals: ['Reliable IT operations', 'Responsive support', 'Cybersecurity best practices', 'Optimize IT budget', 'Technology upgrades'],
    keyPainPoints: ['Limited IT team/budget', 'Projects vs. support balance', 'Legacy systems', 'Shadow IT', 'Vendor management'],
    techProficiency: 'Expert',
    decisionAuthority: 'Medium-High - Direct $10K-$50K',
    budgetRange: '$50K-$500K annually',
    budgetTier: 'Medium',
    successMetrics: ['Ticket resolution time', 'System uptime', 'User satisfaction', 'Security incidents', 'Budget adherence'],
    communicationPreferences: ['Technical reports', 'Ticket dashboards', 'Vendor meetings'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Enterprise',
      useCases: ['IT documentation', 'Troubleshooting', 'Vendor evaluation', 'Policy creation']
    },
    relationshipMap: {
      reportsTo: 'CTO/COO',
      directReports: ['Help desk', 'Sys admins', 'Network engineers'],
      collaborators: ['All departments', 'Vendors']
    }
  },
  {
    id: 7,
    section: 'Front of House',
    category: 'Operational Decision Makers',
    title: 'Marketing Director/Manager',
    ageRange: '30-45 years',
    experience: '7-12 yrs marketing 2-4 mgmt',
    education: 'BA Marketing some MBA',
    location: 'Office or hybrid',
    companySize: '50-200 employees',
    industry: 'B2B services',
    primaryGoals: ['Execute marketing strategy', 'Generate quality leads', 'Manage budget', 'Build team', 'Website traffic/conversions'],
    keyPainPoints: ['Limited budget', 'Small team bandwidth', 'Proving ROI', 'Content creation constraints', 'Agency management'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $5K-$25K',
    budgetRange: '$50K-$300K annually',
    budgetTier: 'Medium',
    successMetrics: ['Lead volume', 'Website traffic', 'Conversion rates', 'Campaign performance', 'Budget efficiency'],
    communicationPreferences: ['Campaign dashboards', 'Creative reviews', 'Team standups'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Jasper',
      useCases: ['Content creation', 'Campaign briefs', 'Analytics interpretation', 'Social media']
    },
    relationshipMap: {
      reportsTo: 'CMO/VP Marketing',
      directReports: ['Marketing specialists', 'Content writers'],
      collaborators: ['Sales', 'Design', 'Agencies']
    }
  },
  {
    id: 8,
    section: 'Front of House',
    category: 'Operational Decision Makers',
    title: 'Operations Director/Manager',
    ageRange: '35-50 years',
    experience: '10-15 yrs ops 3-5 mgmt',
    education: 'BA Business/Ops + MBA/Six Sigma',
    location: 'Office or hybrid',
    companySize: '50-300 employees',
    industry: 'Mfg/prof services/logistics',
    primaryGoals: ['Optimize processes', 'Improve efficiency/reduce costs', 'Process automation', 'Quality control', 'Vendor management'],
    keyPainPoints: ['Manual processes', 'Lack of documentation', 'Change resistance', 'Budget constraints', 'Disconnected systems'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $10K-$50K',
    budgetRange: '$50K-$250K annually',
    budgetTier: 'Medium',
    successMetrics: ['Process efficiency', 'Cost savings', 'Quality metrics', 'Vendor performance', 'Automation rate'],
    communicationPreferences: ['Process documentation', 'KPI dashboards', 'Vendor reviews'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Microsoft Copilot',
      useCases: ['Process documentation', 'Workflow optimization', 'Vendor evaluation', 'SOP creation']
    },
    relationshipMap: {
      reportsTo: 'COO',
      directReports: ['Process managers', 'QA team'],
      collaborators: ['All departments', 'Vendors']
    }
  },
  {
    id: 9,
    section: 'Front of House',
    category: 'Operational Decision Makers',
    title: 'HR Director/Manager',
    ageRange: '35-50 years',
    experience: '8-15 yrs HR 3-5 leadership',
    education: 'BA HR + SHRM-CP/PHR',
    location: 'Office or hybrid',
    companySize: '50-300 employees',
    industry: 'All industries',
    primaryGoals: ['Attract/retain talent', 'HR compliance', 'Employee engagement', 'Optimize benefits', 'HR systems', 'Succession planning'],
    keyPainPoints: ['Competitive talent market', 'Limited HR budget', 'Compliance complexity', 'Manual HR processes', 'Benefits costs'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $10K-$50K influences benefits',
    budgetRange: '$100K-$500K HR operations',
    budgetTier: 'Medium',
    successMetrics: ['Time-to-hire', 'Employee retention', 'Engagement scores', 'Compliance rate', 'Benefits satisfaction'],
    communicationPreferences: ['HR dashboards', 'Policy documents', 'Employee surveys'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Team',
      useCases: ['Job descriptions', 'Policy drafting', 'Training content', 'Performance reviews']
    },
    relationshipMap: {
      reportsTo: 'CEO/COO',
      directReports: ['Recruiters', 'HR coordinators'],
      collaborators: ['All managers', 'Legal', 'Finance']
    }
  },
  {
    id: 10,
    section: 'Front of House',
    category: 'Operational Decision Makers',
    title: 'Compliance Officer/Manager',
    ageRange: '35-50 years',
    experience: '8-15 yrs compliance/audit/risk',
    education: 'BA Business/Accounting + CIA/CISA/CPA',
    location: 'Office or hybrid',
    companySize: '100-500+ regulated industries',
    industry: 'Healthcare/finance/insurance',
    primaryGoals: ['Maintain compliance (SOC 2/HIPAA/SOX)', 'Pass audits zero findings', 'Implement compliance systems', 'Policy updates', 'Risk mitigation'],
    keyPainPoints: ['Regulatory changes', 'Manual tracking', 'Audit prep stress (6-8 wks)', 'Cross-functional coordination', 'Limited budget'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $10K-$50K compliance tools',
    budgetRange: '$50K-$200K compliance tools',
    budgetTier: 'Medium',
    successMetrics: ['Audit findings', 'Compliance rate', 'Policy completion', 'Training completion', 'Risk score'],
    communicationPreferences: ['Compliance reports', 'Audit findings', 'Policy documentation'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'ChatGPT Enterprise',
      useCases: ['Policy generation', 'Audit preparation', 'Risk assessment', 'Training materials']
    },
    relationshipMap: {
      reportsTo: 'CFO/General Counsel',
      directReports: ['Compliance analysts'],
      collaborators: ['IT', 'HR', 'External auditors']
    }
  },
  {
    id: 11,
    section: 'Front of House',
    category: 'Influencers & Specialists',
    title: 'Security Analyst',
    ageRange: '25-40 years',
    experience: '3-8 yrs security',
    education: 'BS CS/Cybersecurity + Security+/CEH',
    location: 'Remote or hybrid',
    companySize: '50-500 employees',
    industry: 'All regulated industries',
    primaryGoals: ['Threat detection', 'Vulnerability management', 'Incident response', 'Security monitoring', 'Awareness training'],
    keyPainPoints: ['Alert fatigue', 'Tool sprawl', 'Limited resources', 'False positives', 'Documentation burden'],
    techProficiency: 'Expert',
    decisionAuthority: 'Low - Recommends $5K-$20K',
    budgetRange: '$10K-$50K tools',
    budgetTier: 'Low',
    successMetrics: ['Threats detected', 'Response time', 'Vulnerabilities remediated', 'Training completion', 'Incidents prevented'],
    communicationPreferences: ['Technical reports', 'SIEM dashboards', 'Incident tickets'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Threat analysis', 'Incident documentation', 'Security reports', 'Training content']
    },
    relationshipMap: {
      reportsTo: 'CISO/IT Director',
      collaborators: ['IT team', 'DevOps', 'Vendors']
    }
  },
  {
    id: 12,
    section: 'Front of House',
    category: 'Influencers & Specialists',
    title: 'Network Administrator',
    ageRange: '25-45 years',
    experience: '5-12 yrs IT infrastructure',
    education: 'BS IT + CCNA/CompTIA Network+',
    location: 'On-site or hybrid',
    companySize: '50-300 employees',
    industry: 'All industries',
    primaryGoals: ['Network reliability', 'Performance optimization', 'Security hardening', 'Infrastructure upgrades', 'Documentation'],
    keyPainPoints: ['Legacy equipment', 'Budget constraints', 'After-hours maintenance', 'Capacity planning', 'Vendor support'],
    techProficiency: 'Expert',
    decisionAuthority: 'Low - Recommends $5K-$25K',
    budgetRange: '$20K-$100K infrastructure',
    budgetTier: 'Low',
    successMetrics: ['Network uptime', 'Latency', 'Bandwidth utilization', 'Security incidents', 'Ticket resolution'],
    communicationPreferences: ['Technical documentation', 'Network diagrams', 'Monitoring dashboards'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Network documentation', 'Troubleshooting', 'Configuration scripts', 'Vendor comparison']
    },
    relationshipMap: {
      reportsTo: 'IT Director',
      collaborators: ['Security', 'Help desk', 'Vendors']
    }
  },
  {
    id: 13,
    section: 'Front of House',
    category: 'Influencers & Specialists',
    title: 'Web Developer/Designer',
    ageRange: '25-40 years',
    experience: '3-10 yrs web development',
    education: 'BS CS/Design or self-taught',
    location: 'Remote or hybrid',
    companySize: '20-200 employees',
    industry: 'Tech/agencies/e-commerce',
    primaryGoals: ['Website performance', 'User experience', 'Modern tech stack', 'Accessibility compliance', 'Fast deployment'],
    keyPainPoints: ['Scope creep', 'Browser compatibility', 'Performance optimization', 'Client feedback loops', 'Legacy codebases'],
    techProficiency: 'Expert',
    decisionAuthority: 'Low - Recommends tools $1K-$10K',
    budgetRange: '$5K-$50K tools/hosting',
    budgetTier: 'Low',
    successMetrics: ['Page load speed', 'Conversion rate', 'Accessibility score', 'Bug count', 'Project delivery time'],
    communicationPreferences: ['GitHub/GitLab', 'Design tools', 'Slack/Discord'],
    aiToolRecommendations: {
      primary: 'GitHub Copilot',
      secondary: 'Claude Sonnet',
      useCases: ['Code generation', 'Code review', 'Documentation', 'Debugging']
    },
    relationshipMap: {
      reportsTo: 'Tech Lead/CTO',
      collaborators: ['Designers', 'Marketing', 'Product']
    }
  },
  {
    id: 14,
    section: 'Front of House',
    category: 'Influencers & Specialists',
    title: 'Marketing Specialist',
    ageRange: '24-35 years',
    experience: '2-7 yrs marketing',
    education: 'BA Marketing/Communications',
    location: 'Office or hybrid',
    companySize: '20-200 employees',
    industry: 'B2B/B2C',
    primaryGoals: ['Campaign execution', 'Content creation', 'Social media management', 'Email marketing', 'Analytics reporting'],
    keyPainPoints: ['Bandwidth constraints', 'Tool complexity', 'Proving attribution', 'Creative bottlenecks', 'Approval delays'],
    techProficiency: 'Medium',
    decisionAuthority: 'Low - Recommends $1K-$5K',
    budgetRange: '$5K-$25K tools',
    budgetTier: 'Low',
    successMetrics: ['Campaign performance', 'Engagement rates', 'Content output', 'Lead generation', 'Social growth'],
    communicationPreferences: ['Marketing dashboards', 'Creative briefs', 'Team standups'],
    aiToolRecommendations: {
      primary: 'Claude Haiku',
      secondary: 'Jasper',
      useCases: ['Content drafts', 'Social media posts', 'Email copy', 'A/B test ideas']
    },
    relationshipMap: {
      reportsTo: 'Marketing Director',
      collaborators: ['Sales', 'Design', 'Content writers']
    }
  },
  {
    id: 15,
    section: 'Front of House',
    category: 'Influencers & Specialists',
    title: 'Sales Manager/Director',
    ageRange: '30-50 years',
    experience: '7-15 yrs sales 3-5 mgmt',
    education: 'BA Business + Sales certs',
    location: 'Office or hybrid',
    companySize: '50-300 employees',
    industry: 'B2B services/SaaS',
    primaryGoals: ['Hit revenue targets', 'Build/coach team', 'Optimize sales process', 'CRM adoption', 'Pipeline accuracy'],
    keyPainPoints: ['Unrealistic quotas', 'CRM data quality', 'Rep turnover', 'Long sales cycles', 'Marketing/sales alignment'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $10K-$50K tools',
    budgetRange: '$25K-$150K sales tools',
    budgetTier: 'Medium',
    successMetrics: ['Revenue attainment', 'Win rate', 'Pipeline velocity', 'Rep quota attainment', 'Forecast accuracy'],
    communicationPreferences: ['Sales dashboards', 'Pipeline reviews', 'Team standups'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Team',
      useCases: ['Proposal drafts', 'Competitive analysis', 'Email sequences', 'Coaching feedback']
    },
    relationshipMap: {
      reportsTo: 'VP Sales/CRO',
      directReports: ['Account executives', 'SDRs'],
      collaborators: ['Marketing', 'Customer Success', 'Product']
    }
  },
  {
    id: 16,
    section: 'Front of House',
    category: 'Industry-Specific',
    title: 'Professional Services Partner (Law/Accounting/Consulting)',
    ageRange: '40-60 years',
    experience: '15-25+ yrs professional services',
    education: 'JD/CPA/MBA + specialized certs',
    location: 'Major metro areas',
    companySize: '10-100 employees',
    industry: 'Legal/Accounting/Consulting',
    primaryGoals: ['Client confidentiality', 'Billable hour optimization', 'Business development', 'Practice growth', 'Regulatory compliance'],
    keyPainPoints: ['Data security concerns', 'Slow technology adoption', 'Client portal needs', 'Document management', 'Compliance burden'],
    techProficiency: 'Novice',
    decisionAuthority: 'High - Partner-level $50K+',
    budgetRange: '$50K-$200K annually',
    budgetTier: 'High',
    successMetrics: ['Billable hours', 'Client satisfaction', 'Revenue per partner', 'Realization rate', 'New client acquisition'],
    communicationPreferences: ['Client meetings', 'Partner meetings', 'Formal reports'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'Microsoft Copilot',
      useCases: ['Document drafting', 'Research', 'Client communications', 'Compliance review']
    },
    relationshipMap: {
      reportsTo: 'Managing Partner',
      directReports: ['Associates', 'Paralegals/Staff'],
      collaborators: ['Clients', 'Other partners']
    }
  },
  {
    id: 17,
    section: 'Front of House',
    category: 'Industry-Specific',
    title: 'Healthcare Practice Manager',
    ageRange: '35-55 years',
    experience: '10-20 yrs healthcare admin',
    education: 'BA Healthcare Admin + CMPE/FACHE',
    location: 'On-site clinical',
    companySize: '10-100 employees',
    industry: 'Healthcare',
    primaryGoals: ['HIPAA compliance', 'Patient satisfaction', 'Revenue cycle optimization', 'Staff scheduling', 'EHR efficiency'],
    keyPainPoints: ['Regulatory burden', 'Staff shortages', 'Insurance complexity', 'Patient communication', 'Technology integration'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium - Direct $10K-$75K',
    budgetRange: '$50K-$300K operations',
    budgetTier: 'Medium',
    successMetrics: ['Patient satisfaction', 'Collections rate', 'No-show rate', 'Staff utilization', 'Compliance audits'],
    communicationPreferences: ['Staff meetings', 'Compliance reports', 'Patient surveys'],
    aiToolRecommendations: {
      primary: 'Claude Team (HIPAA-ready)',
      secondary: 'Microsoft Copilot',
      useCases: ['Patient communication', 'Policy documentation', 'Staff training', 'Compliance checklists']
    },
    relationshipMap: {
      reportsTo: 'Physicians/Practice owners',
      directReports: ['Front desk', 'Billing', 'Clinical staff'],
      collaborators: ['EHR vendors', 'Insurance companies']
    }
  },
  {
    id: 18,
    section: 'Front of House',
    category: 'Industry-Specific',
    title: 'Manufacturing Operations Manager',
    ageRange: '35-55 years',
    experience: '10-20 yrs manufacturing',
    education: 'BS Engineering/Business + Lean/Six Sigma',
    location: 'On-site plant',
    companySize: '50-500 employees',
    industry: 'Manufacturing',
    primaryGoals: ['Production efficiency', 'Quality control', 'Supply chain optimization', 'Safety compliance', 'Cost reduction'],
    keyPainPoints: ['Equipment downtime', 'Supply chain disruptions', 'Labor shortages', 'Quality issues', 'Legacy systems'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium-High - Direct $25K-$100K',
    budgetRange: '$100K-$500K operations',
    budgetTier: 'High',
    successMetrics: ['OEE', 'Defect rate', 'On-time delivery', 'Safety incidents', 'Cost per unit'],
    communicationPreferences: ['Production dashboards', 'Daily standups', 'Quality reports'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Microsoft Copilot',
      useCases: ['Process documentation', 'Quality analysis', 'Training materials', 'Supplier evaluation']
    },
    relationshipMap: {
      reportsTo: 'VP Operations/Plant Manager',
      directReports: ['Supervisors', 'Quality team'],
      collaborators: ['Engineering', 'Supply chain', 'Maintenance']
    }
  },
  {
    id: 19,
    section: 'Front of House',
    category: 'Industry-Specific',
    title: 'E-commerce Business Owner',
    ageRange: '30-50 years',
    experience: '5-15 yrs retail/e-commerce',
    education: 'Variable - entrepreneurial',
    location: 'Remote/home office',
    companySize: '5-50 employees',
    industry: 'E-commerce/Retail',
    primaryGoals: ['Revenue growth', 'Customer acquisition', 'Payment security', 'Inventory management', 'Customer experience'],
    keyPainPoints: ['Competition', 'Customer acquisition costs', 'Inventory management', 'Technology stack', 'Security concerns'],
    techProficiency: 'Medium',
    decisionAuthority: 'Ultimate - Owner decisions',
    budgetRange: '$25K-$200K operations',
    budgetTier: 'Medium',
    successMetrics: ['Revenue', 'Conversion rate', 'Customer LTV', 'Cart abandonment', 'Returns rate'],
    communicationPreferences: ['E-commerce dashboards', 'Customer reviews', 'Vendor calls'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Product descriptions', 'Customer service', 'Marketing copy', 'Inventory analysis']
    },
    relationshipMap: {
      directReports: ['All staff'],
      collaborators: ['Platform vendors', 'Fulfillment', 'Marketing agencies']
    }
  },
  {
    id: 20,
    section: 'Front of House',
    category: 'Industry-Specific',
    title: 'Nonprofit Executive Director',
    ageRange: '35-60 years',
    experience: '10-25 yrs nonprofit/leadership',
    education: 'BA/MA Nonprofit Mgmt or related',
    location: 'Office or hybrid',
    companySize: '5-100 employees',
    industry: 'Nonprofit',
    primaryGoals: ['Mission advancement', 'Donor management', 'Grant success', 'Website accessibility', 'Budget efficiency'],
    keyPainPoints: ['Limited budget', 'Donor retention', 'Staff burnout', 'Technology gaps', 'Grant reporting'],
    techProficiency: 'Novice',
    decisionAuthority: 'High - Board-approved budgets',
    budgetRange: '$50K-$500K operations',
    budgetTier: 'Medium',
    successMetrics: ['Donor retention', 'Grant success rate', 'Program outcomes', 'Overhead ratio', 'Volunteer engagement'],
    communicationPreferences: ['Board presentations', 'Donor reports', 'Impact stories'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Team',
      useCases: ['Grant writing', 'Donor communications', 'Impact reports', 'Program documentation']
    },
    relationshipMap: {
      reportsTo: 'Board of Directors',
      directReports: ['Program directors', 'Development', 'Operations'],
      collaborators: ['Donors', 'Volunteers', 'Community partners']
    }
  },
  {
    id: 21,
    section: 'Front of House',
    category: 'Company Size Segments',
    title: 'Small Business Owner (10-50 employees)',
    ageRange: '30-60 years',
    experience: '5-20+ yrs entrepreneurship',
    education: 'Variable',
    location: 'Local/regional',
    companySize: '10-50 employees',
    industry: 'Various SMB',
    primaryGoals: ['Business growth', 'Profitability', 'IT reliability', 'Customer service', 'Work-life balance'],
    keyPainPoints: ['Wearing multiple hats', 'Limited IT knowledge', 'Budget constraints', 'Time management', 'Technology decisions'],
    techProficiency: 'Novice',
    decisionAuthority: 'Ultimate - Owner',
    budgetRange: '$25K-$100K IT/operations',
    budgetTier: 'Low',
    successMetrics: ['Revenue growth', 'Profit margin', 'Customer satisfaction', 'Employee retention', 'Owner time freedom'],
    communicationPreferences: ['Simple reports', 'Phone/video calls', 'Email'],
    aiToolRecommendations: {
      primary: 'Claude Pro',
      secondary: 'ChatGPT Plus',
      useCases: ['Business planning', 'Customer communications', 'Marketing content', 'Process documentation']
    },
    relationshipMap: {
      directReports: ['All employees'],
      collaborators: ['Accountant', 'IT provider', 'Vendors']
    }
  },
  {
    id: 22,
    section: 'Front of House',
    category: 'Company Size Segments',
    title: 'Mid-Market Department Head (50-200 employees)',
    ageRange: '35-50 years',
    experience: '10-20 yrs industry + mgmt',
    education: 'BA/BS + MBA preferred',
    location: 'Office or hybrid',
    companySize: '50-200 employees',
    industry: 'Various mid-market',
    primaryGoals: ['Department performance', 'Team development', 'Cross-functional collaboration', 'Budget management', 'Strategic initiatives'],
    keyPainPoints: ['Resource constraints', 'Cross-department coordination', 'Technology integration', 'Change management', 'Talent development'],
    techProficiency: 'Medium',
    decisionAuthority: 'Medium-High - $25K-$100K department',
    budgetRange: '$50K-$300K department',
    budgetTier: 'Medium',
    successMetrics: ['Department KPIs', 'Team engagement', 'Project delivery', 'Budget adherence', 'Cross-functional NPS'],
    communicationPreferences: ['Department dashboards', 'Executive summaries', 'Team meetings'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'Microsoft Copilot',
      useCases: ['Strategic planning', 'Team communications', 'Process improvement', 'Reporting']
    },
    relationshipMap: {
      reportsTo: 'VP/C-Suite',
      directReports: ['Managers', 'Specialists'],
      collaborators: ['Peer department heads', 'Cross-functional teams']
    }
  },
  {
    id: 23,
    section: 'Front of House',
    category: 'Company Size Segments',
    title: 'Enterprise Stakeholder (200+ employees)',
    ageRange: '40-55 years',
    experience: '15-25 yrs enterprise experience',
    education: 'Advanced degree + industry certs',
    location: 'Multi-location/global',
    companySize: '200+ employees',
    industry: 'Enterprise',
    primaryGoals: ['Enterprise governance', 'Multi-location coordination', 'Compliance frameworks', 'Strategic alignment', 'Risk management'],
    keyPainPoints: ['Organizational complexity', 'Governance requirements', 'Change velocity', 'Global coordination', 'Vendor management at scale'],
    techProficiency: 'Strategic',
    decisionAuthority: 'High - $100K+ strategic',
    budgetRange: '$500K-$5M+ enterprise',
    budgetTier: 'Ultimate',
    successMetrics: ['Enterprise KPIs', 'Compliance scores', 'Strategic initiative delivery', 'Risk metrics', 'Stakeholder satisfaction'],
    communicationPreferences: ['Executive dashboards', 'Board presentations', 'Governance reports'],
    aiToolRecommendations: {
      primary: 'Claude Enterprise',
      secondary: 'Microsoft Copilot',
      useCases: ['Strategic analysis', 'Governance documentation', 'Risk assessment', 'Executive communications']
    },
    relationshipMap: {
      reportsTo: 'C-Suite/Board',
      directReports: ['Division heads', 'Regional leaders'],
      collaborators: ['Cross-enterprise stakeholders', 'External advisors']
    }
  }
];

export const BACK_OF_HOUSE_PERSONAS: Persona[] = [
  {
    id: 24,
    section: 'Back of House',
    category: 'Executive Leadership',
    title: 'Chief Executive Officer',
    ageRange: '50-65 years',
    experience: '25+ years, founded/grew INT Inc.',
    education: 'MBA or equivalent business leadership',
    location: 'Lincolnshire, IL (hybrid/flexible)',
    companySize: '45-65 employees across 7 service lines',
    industry: 'Managed IT Services',
    primaryGoals: ['Maintain 25+ year track record', 'Position as AI-forward leader', 'Grow revenue 15-20% annually', 'Develop next-gen leadership', 'Strengthen women-owned position'],
    keyPainPoints: ['Balancing growth with quality', 'Finding/retaining talent', 'Keeping pace with technology', 'Maintaining profitability', 'Competition from larger MSPs'],
    techProficiency: 'Strategic',
    decisionAuthority: 'Ultimate - All strategic and financial decisions',
    budgetRange: 'Full company budget authority',
    budgetTier: 'Ultimate',
    successMetrics: ['Annual revenue growth %', 'Client retention rate >95%', 'Employee satisfaction', 'Profitability by service line', 'Industry awards'],
    communicationPreferences: ['Executive team meetings', 'Client relationships', 'Strategic planning'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'Microsoft Copilot',
      useCases: ['Strategic thinking', 'Long-form analysis', 'Leadership communication', 'Competitive analysis']
    },
    relationshipMap: {
      reportsTo: 'Board of Directors',
      directReports: ['President/COO', 'CFO', 'VP Client Services', 'Service Line Heads'],
      collaborators: ['Key clients', 'Strategic partners']
    }
  },
  {
    id: 25,
    section: 'Back of House',
    category: 'Executive Leadership',
    title: 'President/Chief Operating Officer',
    ageRange: '45-55 years',
    experience: '20+ years operations leadership',
    education: 'MBA or equivalent',
    location: 'Lincolnshire, IL (hybrid)',
    companySize: '45-65 employees',
    industry: 'Managed IT Services',
    primaryGoals: ['Operations excellence', 'Delivery coordination', 'Team development', 'Process optimization', 'Client satisfaction'],
    keyPainPoints: ['Resource allocation', 'Cross-team coordination', 'Scaling delivery', 'Quality consistency', 'Staff development'],
    techProficiency: 'Strategic',
    decisionAuthority: 'High - Operational decisions $25K+',
    budgetRange: 'Operational budget authority',
    budgetTier: 'Ultimate',
    successMetrics: ['Delivery quality scores', 'Utilization rates', 'Client NPS', 'Employee engagement', 'Operational efficiency'],
    communicationPreferences: ['Operations reviews', 'Team standups', 'Client escalations'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'Microsoft Copilot',
      useCases: ['Operations planning', 'Process documentation', 'Team communications', 'Performance analysis']
    },
    relationshipMap: {
      reportsTo: 'CEO',
      directReports: ['Service line VPs', 'Operations team'],
      collaborators: ['All department heads', 'Key clients']
    }
  },
  {
    id: 26,
    section: 'Back of House',
    category: 'Executive Leadership',
    title: 'Executive VP Finance (CFO)',
    ageRange: '45-55 years',
    experience: '20+ years finance leadership',
    education: 'CPA/MBA',
    location: 'Lincolnshire, IL',
    companySize: '45-65 employees',
    industry: 'Managed IT Services',
    primaryGoals: ['Financial planning', 'Budget oversight', 'Cash flow management', 'Profitability analysis', 'Compliance'],
    keyPainPoints: ['Revenue forecasting', 'Cost control', 'Service line profitability', 'Cash flow timing', 'Financial reporting'],
    techProficiency: 'Medium',
    decisionAuthority: 'Ultimate - All financial decisions',
    budgetRange: 'Full financial authority',
    budgetTier: 'Ultimate',
    successMetrics: ['Profitability', 'Cash flow', 'Budget accuracy', 'DSO', 'Financial reporting timeliness'],
    communicationPreferences: ['Financial dashboards', 'Executive reports', 'Board presentations'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'Microsoft Copilot',
      useCases: ['Financial analysis', 'Forecasting', 'Board reporting', 'Budget variance analysis']
    },
    relationshipMap: {
      reportsTo: 'CEO',
      directReports: ['Controller', 'Staff accountants'],
      collaborators: ['All department heads', 'External auditors']
    }
  },
  {
    id: 27,
    section: 'Back of House',
    category: 'Executive Leadership',
    title: 'Chief Technology Officer',
    ageRange: '40-50 years',
    experience: '15+ years technology leadership',
    education: 'BS/MS Computer Science',
    location: 'Remote-first',
    companySize: '45-65 employees',
    industry: 'Managed IT Services',
    primaryGoals: ['Internal tech infrastructure', 'Platform decisions', 'Innovation initiatives', 'Security architecture', 'Tool standardization'],
    keyPainPoints: ['Keeping up with AI advances', 'Tool sprawl', 'Integration complexity', 'Security requirements', 'Budget constraints'],
    techProficiency: 'Expert',
    decisionAuthority: 'High - Technology decisions $50K+',
    budgetRange: 'Technology budget authority',
    budgetTier: 'High',
    successMetrics: ['System uptime', 'Security posture', 'Tool adoption', 'Innovation metrics', 'Cost optimization'],
    communicationPreferences: ['Technical reviews', 'Architecture discussions', 'Vendor evaluations'],
    aiToolRecommendations: {
      primary: 'Claude Opus',
      secondary: 'GitHub Copilot',
      useCases: ['Architecture design', 'Technology evaluation', 'Security review', 'Innovation planning']
    },
    relationshipMap: {
      reportsTo: 'CEO',
      directReports: ['VP Technical Services', 'Network engineers'],
      collaborators: ['All service lines', 'Vendors']
    }
  },
  {
    id: 28,
    section: 'Back of House',
    category: 'Information Security Team',
    title: 'VP/Director of Information Security',
    ageRange: '35-50 years',
    experience: '12-20 yrs cybersecurity, 5+ leadership',
    education: 'BS + CISSP, CISM certifications',
    location: 'Remote-first with client travel',
    companySize: '3-5 person InfoSec team',
    industry: 'Managed IT Services',
    primaryGoals: ['Build market-leading InfoSec practice', '90%+ client audit success', 'Expand service offerings', 'Mentor security team', 'Win industry recognition'],
    keyPainPoints: ['Small team capacity', 'Evolving compliance frameworks', 'Balancing delivery/development', 'Specialized talent recruitment', 'Client maturity variance'],
    techProficiency: 'Expert',
    decisionAuthority: 'High - Service line strategy, hiring, tools',
    budgetRange: 'Service line budget + tools',
    budgetTier: 'High',
    successMetrics: ['Service line revenue +20% YoY', 'Audit success rate >90%', 'Utilization 75-85%', 'NPS >50', 'New client rate'],
    communicationPreferences: ['Team syncs', 'Client engagements', 'Business development'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'ChatGPT Team',
      useCases: ['Policy templates', 'Audit documentation', 'Security awareness content', 'Risk frameworks', 'Client presentations']
    },
    relationshipMap: {
      reportsTo: 'CEO/COO',
      directReports: ['Senior Security Consultant', 'Security Analysts', 'Compliance Specialist'],
      collaborators: ['Sales', 'Client Success', 'IT Services']
    }
  },
  {
    id: 29,
    section: 'Back of House',
    category: 'Information Security Team',
    title: 'Senior Security Consultant',
    ageRange: '30-45 years',
    experience: '8-15 yrs security consulting',
    education: 'BS + CISSP/CISA/CEH',
    location: 'Remote with client travel',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Lead client audits', 'Security program design', 'Client advisory', 'Team mentorship', 'Thought leadership'],
    keyPainPoints: ['Client scheduling', 'Documentation burden', 'Scope creep', 'Multiple concurrent audits', 'Staying current'],
    techProficiency: 'Expert',
    decisionAuthority: 'Medium - Client project decisions',
    budgetRange: 'Project-level recommendations',
    budgetTier: 'Medium',
    successMetrics: ['Client audit success', 'Client satisfaction', 'Utilization', 'Knowledge sharing', 'Certifications maintained'],
    communicationPreferences: ['Client meetings', 'Audit documentation', 'Team collaboration'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'ChatGPT Plus',
      useCases: ['Audit reports', 'Policy drafting', 'Risk assessments', 'Client recommendations']
    },
    relationshipMap: {
      reportsTo: 'VP InfoSec',
      collaborators: ['Security Analysts', 'Clients', 'Auditors']
    }
  },
  {
    id: 30,
    section: 'Back of House',
    category: 'Information Security Team',
    title: 'Security Analyst',
    ageRange: '25-35 years',
    experience: '3-7 yrs security',
    education: 'BS + Security+/CEH',
    location: 'Remote',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Vulnerability assessments', 'Security awareness training', 'Client monitoring', 'Documentation support', 'Skill development'],
    keyPainPoints: ['Multiple client environments', 'Tool variety', 'Documentation workload', 'Prioritization', 'Career growth'],
    techProficiency: 'Expert',
    decisionAuthority: 'Low - Execution and recommendations',
    budgetRange: 'N/A',
    budgetTier: 'Low',
    successMetrics: ['Assessment quality', 'Training completion rates', 'Documentation accuracy', 'Client feedback', 'Certifications earned'],
    communicationPreferences: ['Team standups', 'Client calls', 'Documentation systems'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Vulnerability analysis', 'Training content', 'Report drafting', 'Research']
    },
    relationshipMap: {
      reportsTo: 'Senior Security Consultant/VP InfoSec',
      collaborators: ['IT team', 'Clients']
    }
  },
  {
    id: 31,
    section: 'Back of House',
    category: 'Information Security Team',
    title: 'Compliance Specialist',
    ageRange: '28-40 years',
    experience: '5-10 yrs compliance/audit',
    education: 'BA + CISA/CIA',
    location: 'Remote',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Policy documentation', 'Audit preparation', 'Regulatory research', 'Compliance monitoring', 'Process improvement'],
    keyPainPoints: ['Regulatory changes', 'Documentation volume', 'Client coordination', 'Framework complexity', 'Resource constraints'],
    techProficiency: 'Medium',
    decisionAuthority: 'Low - Policy recommendations',
    budgetRange: 'N/A',
    budgetTier: 'Low',
    successMetrics: ['Documentation completeness', 'Audit prep efficiency', 'Regulatory currency', 'Client compliance scores', 'Process improvements'],
    communicationPreferences: ['Documentation reviews', 'Compliance meetings', 'Audit coordination'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Policy drafting', 'Regulatory research', 'Audit checklists', 'Compliance documentation']
    },
    relationshipMap: {
      reportsTo: 'VP InfoSec',
      collaborators: ['Security team', 'Clients', 'Auditors']
    }
  },
  {
    id: 32,
    section: 'Back of House',
    category: 'Technology/IT Services Team',
    title: 'VP of Technical Services',
    ageRange: '40-50 years',
    experience: '15+ yrs IT services leadership',
    education: 'BS IT + industry certifications',
    location: 'Hybrid',
    companySize: 'Manages IT service line',
    industry: 'Managed IT Services',
    primaryGoals: ['Service delivery excellence', 'Technical account management', 'Team development', 'Client retention', 'Service expansion'],
    keyPainPoints: ['Resource allocation', 'Client escalations', 'Tool standardization', 'Scaling support', 'Talent development'],
    techProficiency: 'Expert',
    decisionAuthority: 'High - Service line decisions',
    budgetRange: 'Service line budget',
    budgetTier: 'High',
    successMetrics: ['Client satisfaction', 'Resolution time', 'Utilization', 'Retention rate', 'Service revenue'],
    communicationPreferences: ['Team meetings', 'Client reviews', 'Executive updates'],
    aiToolRecommendations: {
      primary: 'Claude Team',
      secondary: 'Microsoft Copilot',
      useCases: ['Service documentation', 'Client communications', 'Team development', 'Process optimization']
    },
    relationshipMap: {
      reportsTo: 'CEO/CTO',
      directReports: ['System Admins', 'Network Engineers', 'Help Desk'],
      collaborators: ['All service lines', 'Clients']
    }
  },
  {
    id: 33,
    section: 'Back of House',
    category: 'Technology/IT Services Team',
    title: 'Service Tech Level 1 (Help Desk)',
    ageRange: '22-30 years',
    experience: '1-4 yrs IT support',
    education: 'Associates/BS IT + CompTIA A+',
    location: 'Remote',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Help desk excellence', 'Ticket resolution', 'Client onboarding', 'Knowledge building', 'Career advancement'],
    keyPainPoints: ['Ticket volume', 'Client variety', 'Documentation time', 'Escalation decisions', 'Learning curve'],
    techProficiency: 'Medium',
    decisionAuthority: 'Low - Ticket-level decisions',
    budgetRange: 'N/A',
    budgetTier: 'Low',
    successMetrics: ['Ticket resolution time', 'Client satisfaction', 'First-call resolution', 'Documentation quality', 'Certifications'],
    communicationPreferences: ['Ticket system', 'Client calls', 'Team chat'],
    aiToolRecommendations: {
      primary: 'Claude Haiku',
      secondary: 'ChatGPT Plus',
      useCases: ['Troubleshooting assistance', 'Documentation', 'Client communication drafts', 'Learning/research']
    },
    relationshipMap: {
      reportsTo: 'VP Technical Services',
      collaborators: ['System Admins', 'Clients']
    }
  },
  {
    id: 34,
    section: 'Back of House',
    category: 'Technology/IT Services Team',
    title: 'Systems Administrator',
    ageRange: '28-40 years',
    experience: '5-12 yrs system administration',
    education: 'BS IT + MCSE/AWS certs',
    location: 'Remote/Hybrid',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Server/cloud management', 'Infrastructure reliability', 'Security hardening', 'Monitoring', 'Automation'],
    keyPainPoints: ['Multi-client environments', 'Legacy systems', 'After-hours work', 'Documentation', 'Tool variety'],
    techProficiency: 'Expert',
    decisionAuthority: 'Medium - Technical decisions',
    budgetRange: 'Project recommendations',
    budgetTier: 'Medium',
    successMetrics: ['System uptime', 'Incident response', 'Automation rate', 'Client satisfaction', 'Security posture'],
    communicationPreferences: ['Technical documentation', 'Monitoring dashboards', 'Team collaboration'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'GitHub Copilot',
      useCases: ['Script automation', 'Troubleshooting', 'Documentation', 'Configuration management']
    },
    relationshipMap: {
      reportsTo: 'VP Technical Services',
      collaborators: ['Network Engineers', 'Security team', 'Clients']
    }
  },
  {
    id: 35,
    section: 'Back of House',
    category: 'Technology/IT Services Team',
    title: 'Network Engineer',
    ageRange: '28-45 years',
    experience: '5-15 yrs networking',
    education: 'BS IT + CCNA/CCNP',
    location: 'Hybrid with site visits',
    companySize: 'N/A',
    industry: 'Managed IT Services',
    primaryGoals: ['Network design', 'WiFi solutions', 'Security', 'Performance optimization', 'Client infrastructure'],
    keyPainPoints: ['Legacy equipment', 'Multi-vendor environments', 'Site visits', 'Capacity planning', 'Security requirements'],
    techProficiency: 'Expert',
    decisionAuthority: 'Medium - Technical recommendations',
    budgetRange: 'Project-level',
    budgetTier: 'Medium',
    successMetrics: ['Network uptime', 'Performance metrics', 'Security incidents', 'Client satisfaction', 'Project delivery'],
    communicationPreferences: ['Network diagrams', 'Technical documentation', 'Client meetings'],
    aiToolRecommendations: {
      primary: 'Claude Sonnet',
      secondary: 'ChatGPT Plus',
      useCases: ['Network documentation', 'Configuration templates', 'Troubleshooting', 'Proposals']
    },
    relationshipMap: {
      reportsTo: 'VP Technical Services',
      collaborators: ['System Admins', 'Security team', 'Clients']
    }
  }
];

export const ALL_PERSONAS = [...FRONT_OF_HOUSE_PERSONAS, ...BACK_OF_HOUSE_PERSONAS];

export const PERSONA_CATEGORIES: { section: PersonaSection; categories: PersonaCategory[] }[] = [
  {
    section: 'Front of House',
    categories: [
      'Primary Decision Makers',
      'Operational Decision Makers',
      'Influencers & Specialists',
      'Industry-Specific',
      'Company Size Segments'
    ]
  },
  {
    section: 'Back of House',
    categories: [
      'Executive Leadership',
      'Information Security Team',
      'Technology/IT Services Team',
      'Website Design & Development Team',
      'Branding & Identity Team',
      'Content Creation & Strategy Team',
      'Managed Marketing Services Team',
      'Operations/Consulting Team',
      'Client Services & Success',
      'Sales & Business Development',
      'Finance & Accounting',
      'Human Resources',
      'Administration & Office Operations',
      'Specialized/Emerging Roles'
    ]
  }
];

export function getClaudeRecommendation(persona: Persona): ClaudeRecommendation {
  const { techProficiency, budgetTier, aiToolRecommendations, primaryGoals } = persona;
  
  let modelId = 'sonnet-4-5';
  let modelName = 'Claude Sonnet 4.5';
  let rationale = 'Best balance of capability and cost for general enterprise use.';
  let estimatedROI = '30-50% productivity gain';
  let implementationApproach = 'Phased rollout with pilot program';
  
  if (techProficiency === 'Expert' && budgetTier === 'High') {
    modelId = 'opus-4-5';
    modelName = 'Claude Opus 4.5';
    rationale = 'Complex reasoning and extended thinking for technical leadership roles.';
    estimatedROI = '40-60% productivity gain on complex analysis';
    implementationApproach = 'Direct integration with development workflows';
  } else if (techProficiency === 'Expert' && budgetTier === 'Medium') {
    modelId = 'opus-4-0';
    modelName = 'Claude Opus 4.0';
    rationale = 'Deep analysis and security review capabilities for technical specialists.';
    estimatedROI = '35-50% productivity gain';
    implementationApproach = 'Team-based adoption with specialized prompts';
  } else if (budgetTier === 'Low' || techProficiency === 'Novice') {
    modelId = 'haiku-3-5';
    modelName = 'Claude Haiku 3.5';
    rationale = 'Fast, cost-effective for high-volume routine tasks and entry-level users.';
    estimatedROI = '20-35% productivity gain';
    implementationApproach = 'Simple use cases first, expand as comfort grows';
  } else if (budgetTier === 'Ultimate') {
    modelId = 'opus-4-5';
    modelName = 'Claude Opus 4.5';
    rationale = 'Maximum capability for strategic decision-making at executive level.';
    estimatedROI = '50-70% improvement in strategic analysis';
    implementationApproach = 'Executive assistant integration with governance controls';
  }
  
  const securityConsiderations = [
    'Enable Zero Data Retention (ZDR)',
    'Configure role-based access controls',
    'Implement audit logging',
    primaryGoals.some(g => g.toLowerCase().includes('compliance')) ? 'SOC 2/HIPAA compliance verification' : 'Standard security protocols',
    persona.category.includes('Security') ? 'Security-focused prompt engineering' : 'Data handling guidelines'
  ];
  
  return {
    modelId,
    modelName,
    rationale,
    estimatedROI,
    implementationApproach,
    securityConsiderations
  };
}

export function getPersonasByCategory(category: PersonaCategory): Persona[] {
  return ALL_PERSONAS.filter(p => p.category === category);
}

export function getPersonasBySection(section: PersonaSection): Persona[] {
  return ALL_PERSONAS.filter(p => p.section === section);
}

export function getPersonasByTechProficiency(level: TechProficiency): Persona[] {
  return ALL_PERSONAS.filter(p => p.techProficiency === level);
}

export function getPersonasByBudgetTier(tier: BudgetTier): Persona[] {
  return ALL_PERSONAS.filter(p => p.budgetTier === tier);
}
