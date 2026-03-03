export const DEPARTMENTS = [
  'Sales',
  'Marketing',
  'Finance',
  'HR',
  'Customer Service',
  'Legal',
  'IT',
  'Operations',
  'Product',
  'Engineering'
];

export const COMPLIANCE_STANDARDS = [
  'SOC 2',
  'ISO 27001',
  'HIPAA',
  'GDPR',
  'FedRAMP',
  'PCI DSS',
  'CCPA',
  'NIST',
  'HITRUST'
];

export const INTEGRATION_CATEGORIES: Record<string, string[]> = {
  'CRM': ['Salesforce', 'HubSpot', 'Dynamics 365', 'Zoho'],
  'ERP': ['SAP', 'Oracle', 'NetSuite', 'Workday'],
  'HRIS': ['Workday', 'BambooHR', 'ADP', 'UKG'],
  'Productivity': ['Microsoft 365', 'Google Workspace', 'Slack', 'Zoom'],
  'Development': ['GitHub', 'GitLab', 'Jira', 'Azure DevOps'],
  'Analytics': ['Tableau', 'Power BI', 'Looker', 'Qlik']
};

export const PAIN_POINTS = [
  'Manual data entry and processing',
  'Long proposal and document creation cycles',
  'Multilingual communication barriers',
  'Inefficient customer support workflows',
  'Complex contract review processes',
  'Time-consuming research and analysis',
  'Repetitive email and communication tasks',
  'Data synthesis from multiple sources',
  'Content creation bottlenecks',
  'Meeting transcription and summarization'
];

export const ROI_BENCHMARKS: Record<string, Record<string, number>> = {
  'Sales': {
    'claude-sonnet': 4.5, 'claude-opus': 5.2, 'chatgpt-enterprise': 4.5, 'gemini-advanced': 4.2,
    'microsoft-copilot': 5.1, 'github-copilot': 2.0, 'mistral-large': 4.0, 'llama-3': 3.5,
    'grok-2': 3.8, 'deepseek-v3': 3.6, 'groq': 4.1, 'perplexity-pro': 3.9,
    'anthropic-api': 4.3, 'openai-api': 4.2, 'aws-bedrock': 3.8, 'azure-openai': 4.0,
    'cohere': 2.5, 'huggingface': 2.0, 'jasper': 4.5, 'copy-ai': 4.8,
    'notion-ai': 3.2, 'slack-ai': 2.8
  },
  'Marketing': {
    'claude-sonnet': 5.8, 'claude-opus': 6.1, 'chatgpt-enterprise': 6.1, 'gemini-advanced': 5.5,
    'microsoft-copilot': 4.8, 'github-copilot': 1.5, 'mistral-large': 4.5, 'llama-3': 4.0,
    'grok-2': 4.2, 'deepseek-v3': 4.0, 'groq': 4.5, 'perplexity-pro': 5.0,
    'anthropic-api': 5.5, 'openai-api': 5.8, 'aws-bedrock': 4.2, 'azure-openai': 4.5,
    'cohere': 3.0, 'huggingface': 2.5, 'jasper': 7.5, 'copy-ai': 7.0,
    'notion-ai': 4.5, 'slack-ai': 3.0
  },
  'Finance': {
    'claude-sonnet': 4.8, 'claude-opus': 5.5, 'chatgpt-enterprise': 3.7, 'gemini-advanced': 3.9,
    'microsoft-copilot': 5.8, 'github-copilot': 1.0, 'mistral-large': 4.2, 'llama-3': 3.8,
    'grok-2': 3.5, 'deepseek-v3': 4.0, 'groq': 3.8, 'perplexity-pro': 4.2,
    'anthropic-api': 4.6, 'openai-api': 4.0, 'aws-bedrock': 4.5, 'azure-openai': 4.8,
    'cohere': 2.8, 'huggingface': 2.2, 'jasper': 2.0, 'copy-ai': 2.5,
    'notion-ai': 3.5, 'slack-ai': 2.5
  },
  'HR': {
    'claude-sonnet': 5.0, 'claude-opus': 5.3, 'chatgpt-enterprise': 4.0, 'gemini-advanced': 4.1,
    'microsoft-copilot': 5.3, 'github-copilot': 0.5, 'mistral-large': 3.8, 'llama-3': 3.5,
    'grok-2': 3.6, 'deepseek-v3': 3.5, 'groq': 3.8, 'perplexity-pro': 4.0,
    'anthropic-api': 4.8, 'openai-api': 4.2, 'aws-bedrock': 3.5, 'azure-openai': 3.8,
    'cohere': 2.5, 'huggingface': 2.0, 'jasper': 3.5, 'copy-ai': 3.8,
    'notion-ai': 4.2, 'slack-ai': 3.5
  },
  'Customer Service': {
    'claude-sonnet': 6.5, 'claude-opus': 6.8, 'chatgpt-enterprise': 6.5, 'gemini-advanced': 6.2,
    'microsoft-copilot': 5.5, 'github-copilot': 0.5, 'mistral-large': 5.5, 'llama-3': 5.0,
    'grok-2': 5.2, 'deepseek-v3': 5.2, 'groq': 6.0, 'perplexity-pro': 5.5,
    'anthropic-api': 6.2, 'openai-api': 6.0, 'aws-bedrock': 5.0, 'azure-openai': 5.2,
    'cohere': 4.0, 'huggingface': 3.5, 'jasper': 3.0, 'copy-ai': 3.5,
    'notion-ai': 3.8, 'slack-ai': 4.5
  },
  'Legal': {
    'claude-sonnet': 7.2, 'claude-opus': 8.0, 'chatgpt-enterprise': 5.2, 'gemini-advanced': 5.0,
    'microsoft-copilot': 4.5, 'github-copilot': 0.5, 'mistral-large': 5.5, 'llama-3': 4.5,
    'grok-2': 4.2, 'deepseek-v3': 4.8, 'groq': 4.5, 'perplexity-pro': 5.8,
    'anthropic-api': 7.0, 'openai-api': 5.5, 'aws-bedrock': 4.8, 'azure-openai': 5.0,
    'cohere': 3.5, 'huggingface': 2.8, 'jasper': 2.0, 'copy-ai': 2.2,
    'notion-ai': 3.5, 'slack-ai': 2.5
  },
  'IT': {
    'claude-sonnet': 5.5, 'claude-opus': 5.8, 'chatgpt-enterprise': 5.5, 'gemini-advanced': 4.8,
    'microsoft-copilot': 6.5, 'github-copilot': 7.5, 'mistral-large': 5.2, 'llama-3': 5.8,
    'grok-2': 4.5, 'deepseek-v3': 5.5, 'groq': 5.0, 'perplexity-pro': 4.5,
    'anthropic-api': 5.2, 'openai-api': 5.5, 'aws-bedrock': 6.0, 'azure-openai': 6.2,
    'cohere': 4.0, 'huggingface': 5.5, 'jasper': 1.5, 'copy-ai': 1.5,
    'notion-ai': 3.5, 'slack-ai': 3.8
  },
  'Operations': {
    'claude-sonnet': 5.0, 'claude-opus': 5.2, 'chatgpt-enterprise': 4.2, 'gemini-advanced': 4.3,
    'microsoft-copilot': 5.0, 'github-copilot': 1.0, 'mistral-large': 4.0, 'llama-3': 3.8,
    'grok-2': 3.8, 'deepseek-v3': 4.0, 'groq': 4.2, 'perplexity-pro': 4.5,
    'anthropic-api': 4.8, 'openai-api': 4.5, 'aws-bedrock': 4.5, 'azure-openai': 4.5,
    'cohere': 3.0, 'huggingface': 2.5, 'jasper': 2.5, 'copy-ai': 2.8,
    'notion-ai': 4.5, 'slack-ai': 4.0
  },
  'Product': {
    'claude-sonnet': 5.8, 'claude-opus': 6.2, 'chatgpt-enterprise': 5.8, 'gemini-advanced': 5.1,
    'microsoft-copilot': 4.6, 'github-copilot': 5.5, 'mistral-large': 4.8, 'llama-3': 4.5,
    'grok-2': 4.5, 'deepseek-v3': 4.8, 'groq': 4.5, 'perplexity-pro': 5.5,
    'anthropic-api': 5.5, 'openai-api': 5.5, 'aws-bedrock': 4.2, 'azure-openai': 4.5,
    'cohere': 3.2, 'huggingface': 3.0, 'jasper': 4.0, 'copy-ai': 3.8,
    'notion-ai': 5.0, 'slack-ai': 3.5
  },
  'Engineering': {
    'claude-sonnet': 6.8, 'claude-opus': 7.2, 'chatgpt-enterprise': 6.2, 'gemini-advanced': 5.5,
    'microsoft-copilot': 5.2, 'github-copilot': 8.5, 'mistral-large': 6.0, 'llama-3': 6.5,
    'grok-2': 5.0, 'deepseek-v3': 6.5, 'groq': 5.8, 'perplexity-pro': 4.8,
    'anthropic-api': 6.5, 'openai-api': 6.2, 'aws-bedrock': 5.5, 'azure-openai': 5.8,
    'cohere': 4.5, 'huggingface': 6.0, 'jasper': 1.0, 'copy-ai': 1.0,
    'notion-ai': 3.0, 'slack-ai': 2.5
  }
};

export const PLATFORM_PRICING: Record<string, number> = {
  'claude-sonnet': 20,
  'claude-opus': 75,
  'chatgpt-enterprise': 60,
  'gemini-advanced': 20,
  'microsoft-copilot': 30,
  'github-copilot': 19,
  'mistral-large': 15,
  'llama-3': 0,
  'grok-2': 25,
  'deepseek-v3': 5,
  'groq': 10,
  'perplexity-pro': 20,
  'anthropic-api': 25,
  'openai-api': 25,
  'aws-bedrock': 30,
  'azure-openai': 30,
  'cohere': 15,
  'huggingface': 0,
  'jasper': 49,
  'copy-ai': 49,
  'notion-ai': 10,
  'slack-ai': 10
};

export const AI_PLATFORMS = [
  { id: 'claude-sonnet', name: 'Claude Sonnet 4', color: '#D97706' },
  { id: 'claude-opus', name: 'Claude Opus 4', color: '#B45309' },
  { id: 'chatgpt-enterprise', name: 'ChatGPT Enterprise', color: '#10A37F' },
  { id: 'gemini-advanced', name: 'Gemini Advanced', color: '#4285F4' },
  { id: 'microsoft-copilot', name: 'Microsoft Copilot', color: '#00A4EF' },
  { id: 'github-copilot', name: 'GitHub Copilot', color: '#24292E' },
  { id: 'mistral-large', name: 'Mistral Large 2', color: '#FF7000' },
  { id: 'llama-3', name: 'Meta Llama 3.1', color: '#0668E1' },
  { id: 'grok-2', name: 'xAI Grok 2', color: '#1DA1F2' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', color: '#4A90D9' },
  { id: 'groq', name: 'Groq LPU', color: '#FF4500' },
  { id: 'perplexity-pro', name: 'Perplexity Pro', color: '#20808D' },
  { id: 'anthropic-api', name: 'Anthropic API', color: '#D97757' },
  { id: 'openai-api', name: 'OpenAI API', color: '#10A37F' },
  { id: 'aws-bedrock', name: 'AWS Bedrock', color: '#FF9900' },
  { id: 'azure-openai', name: 'Azure OpenAI', color: '#0078D4' },
  { id: 'cohere', name: 'Cohere', color: '#39594D' },
  { id: 'huggingface', name: 'Hugging Face', color: '#FFD21E' },
  { id: 'jasper', name: 'Jasper', color: '#FF5A5F' },
  { id: 'copy-ai', name: 'Copy.ai', color: '#7C3AED' },
  { id: 'notion-ai', name: 'Notion AI', color: '#000000' },
  { id: 'slack-ai', name: 'Slack AI', color: '#4A154B' }
];

export interface Department {
  name: string;
  user_count: number;
  annual_spend: number;
  hourly_rate: number;
}

export interface AssessmentFormData {
  organization_name: string;
  assessment_date: string;
  departments: Department[];
  compliance_requirements: string[];
  desired_integrations: string[];
  pain_points: string[];
}

export interface PlatformROI {
  platform: string;
  platformName: string;
  total_annual_savings: number;
  total_cost: number;
  net_annual_savings: number;
  one_year_roi: number;
  three_year_roi: number;
}

export function calculatePlatformROI(departments: Department[], platformId: string): PlatformROI {
  let totalAnnualSavings = 0;
  let totalCost = 0;

  const platformInfo = AI_PLATFORMS.find(p => p.id === platformId);

  departments.forEach(dept => {
    const hoursPerWeek = ROI_BENCHMARKS[dept.name]?.[platformId] || 0;
    const weeksPerYear = 50;
    const annualHoursSaved = hoursPerWeek * weeksPerYear * dept.user_count;
    const annualSavings = annualHoursSaved * dept.hourly_rate;
    const platformCost = (PLATFORM_PRICING[platformId] || 20) * 12 * dept.user_count;
    
    totalCost += platformCost;
    totalAnnualSavings += annualSavings;
  });

  const netAnnualSavings = totalAnnualSavings - totalCost;
  const oneYearROI = totalCost > 0 ? ((netAnnualSavings / totalCost) * 100) : 0;
  const threeYearROI = totalCost > 0 ? (((netAnnualSavings * 3) / totalCost) * 100) : 0;

  return {
    platform: platformId,
    platformName: platformInfo?.name || platformId,
    total_annual_savings: totalAnnualSavings,
    total_cost: totalCost,
    net_annual_savings: netAnnualSavings,
    one_year_roi: oneYearROI,
    three_year_roi: threeYearROI
  };
}

export function calculateAllPlatformROI(departments: Department[]): PlatformROI[] {
  return AI_PLATFORMS.map(platform => calculatePlatformROI(departments, platform.id));
}
