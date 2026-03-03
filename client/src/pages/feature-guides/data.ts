export interface FeatureGuide {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Core' | 'Advanced' | 'Enterprise';
  status: 'GA' | 'Beta' | 'Coming Soon';
  highlights: string[];
  useCases: string[];
  tips: string[];
}

export const FEATURE_GUIDES: FeatureGuide[] = [
  {
    id: 'web-search',
    name: 'Web Search',
    description:
      'Real-time access to the internet for fetching up-to-date information, citations, and market data directly within conversations.',
    icon: 'Globe',
    category: 'Core',
    status: 'GA',
    highlights: [
      'Fetches live web results with source citations',
      'Supports follow-up queries to refine search results',
      'Automatically synthesizes information from multiple sources',
      'Respects safe-search and content-policy filters',
    ],
    useCases: [
      'Researching the latest competitor pricing, product launches, or regulatory changes',
      'Verifying facts, statistics, or recent news before including them in a deliverable',
      'Looking up technical documentation or release notes for third-party libraries',
    ],
    tips: [
      'Use specific, narrow queries rather than broad topics for higher-quality results',
      'Ask Claude to cite sources so you can verify the information independently',
      'Combine web search with artifacts to produce well-sourced reports in one step',
    ],
  },
  {
    id: 'memory',
    name: 'Memory',
    description:
      'Persistent context storage that remembers preferences, project details, and style guides across conversations within a project.',
    icon: 'Brain',
    category: 'Core',
    status: 'GA',
    highlights: [
      'Retains project-specific context between sessions',
      'Stores style guides, acronyms, and user preferences',
      'Supports explicit save and forget commands',
      'Scoped to individual projects for data isolation',
    ],
    useCases: [
      'Maintaining brand voice guidelines so every draft stays consistent',
      'Keeping track of project dependencies and architectural decisions over time',
    ],
    tips: [
      'Explicitly tell Claude what to remember rather than expecting it to infer importance',
      'Periodically review stored memories and prune outdated information',
      'Never store passwords, API keys, or PII in memory',
    ],
  },
  {
    id: 'artifacts',
    name: 'Artifacts',
    description:
      'A dedicated panel for generating, previewing, and iterating on substantial content such as code, documents, diagrams, and interactive components.',
    icon: 'PanelRight',
    category: 'Core',
    status: 'GA',
    highlights: [
      'Live preview for React components, HTML, and SVG',
      'Supports Mermaid diagrams, Markdown documents, and code files',
      'Versioned history allows reverting to previous iterations',
      'Shareable via unique artifact links',
    ],
    useCases: [
      'Drafting a long-form blog post or legal document that needs multiple revision rounds',
      'Generating and previewing a React UI component before copying it into your codebase',
      'Creating architecture diagrams with Mermaid.js for engineering reviews',
    ],
    tips: [
      'Ask Claude to update the existing artifact instead of creating a new one to preserve context',
      'Use the "copy" button to grab clean code without markdown wrapping',
      'Combine artifacts with code execution to prototype data-driven visualizations',
    ],
  },
  {
    id: 'code-execution',
    name: 'Code Execution',
    description:
      'A secure, sandboxed Python runtime where Claude can write and execute code to analyze data, perform calculations, and generate visualizations.',
    icon: 'Terminal',
    category: 'Advanced',
    status: 'GA',
    highlights: [
      'Sandboxed environment with no network access for safety',
      'Pre-loaded with pandas, numpy, matplotlib, and other data science libraries',
      'Supports file uploads for CSV, Excel, and JSON analysis',
      'Outputs charts and tables directly in the conversation',
    ],
    useCases: [
      'Analyzing an uploaded CSV of sales data to compute averages, trends, and outliers',
      'Running complex financial projections with compound interest or scenario modeling',
      'Creating publication-ready data visualizations with matplotlib or seaborn',
    ],
    tips: [
      'Always review the generated Python code to verify the logic before trusting results',
      'Upload files directly rather than pasting raw data for better parsing accuracy',
      'Ask Claude to explain each step of the analysis for transparency',
    ],
  },
  {
    id: 'file-analysis',
    name: 'File Analysis',
    description:
      'Upload and process documents including PDFs, Word files, spreadsheets, and text files for summarization, extraction, and Q&A.',
    icon: 'FileSearch',
    category: 'Core',
    status: 'GA',
    highlights: [
      'Parses PDFs, DOCX, XLSX, CSV, and plain text files',
      'Extracts tables, key figures, and structured data from documents',
      'Supports multi-file uploads for cross-document analysis',
      'Handles documents up to 30 MB in size',
    ],
    useCases: [
      'Summarizing a 50-page quarterly earnings report into actionable bullet points',
      'Extracting specific clauses from a legal contract for compliance review',
      'Comparing data across multiple spreadsheets to identify discrepancies',
    ],
    tips: [
      'Upload the original file rather than copy-pasting content to preserve formatting and tables',
      'Ask targeted questions about specific sections rather than requesting a full summary first',
      'Combine file analysis with code execution for deep quantitative analysis of spreadsheets',
    ],
  },
  {
    id: 'vision',
    name: 'Vision',
    description:
      'Analyze images including screenshots, photos, charts, diagrams, and handwritten notes with advanced visual understanding.',
    icon: 'Eye',
    category: 'Advanced',
    status: 'GA',
    highlights: [
      'Reads text from images, screenshots, and scanned documents (OCR)',
      'Interprets charts, graphs, and data visualizations',
      'Describes photos and complex visual scenes in detail',
      'Analyzes UI screenshots for design feedback',
    ],
    useCases: [
      'Extracting data from a photographed whiteboard after a brainstorming session',
      'Getting design feedback on UI mockups or screenshots of a web application',
      'Converting a chart or infographic image into structured data or a table',
    ],
    tips: [
      'Provide high-resolution images for best accuracy, especially for small text',
      'Tell Claude what you are looking for in the image to get focused analysis',
      'Combine vision with artifacts to recreate hand-drawn diagrams as clean Mermaid or SVG output',
    ],
  },
  {
    id: 'voice',
    name: 'Voice',
    description:
      'Natural speech input and output enabling hands-free conversations, real-time dictation, and spoken responses.',
    icon: 'Mic',
    category: 'Advanced',
    status: 'Beta',
    highlights: [
      'Real-time speech-to-text transcription',
      'Natural-sounding voice responses with multiple voice options',
      'Supports interruption and back-and-forth spoken dialogue',
      'Works across mobile and desktop platforms',
    ],
    useCases: [
      'Hands-free brainstorming while commuting or away from the keyboard',
      'Dictating meeting notes or action items in real time',
    ],
    tips: [
      'Speak clearly and at a natural pace for best transcription accuracy',
      'Use voice for ideation and switch to text for precision editing and code',
      'Combine voice input with memory so Claude remembers spoken context in future sessions',
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    description:
      'Organized workspaces that group conversations, files, and memories under a single project with custom instructions and shared context.',
    icon: 'FolderKanban',
    category: 'Enterprise',
    status: 'GA',
    highlights: [
      'Custom system prompts scoped to each project',
      'Shared file library accessible across all project conversations',
      'Project-level memory that persists between chat sessions',
      'Supports templates for repeatable workflows',
    ],
    useCases: [
      'Creating a dedicated workspace for a client engagement with relevant docs and guidelines',
      'Setting up a project for your engineering team with coding standards and architecture docs',
      'Organizing ongoing research into separate themed projects for easy retrieval',
    ],
    tips: [
      'Write clear, concise project instructions rather than overloading with every possible rule',
      'Upload reference documents to the project library so Claude has context in every conversation',
      'Use separate projects for distinct workstreams to avoid context bleed',
    ],
  },
  {
    id: 'teams',
    name: 'Teams',
    description:
      'Multi-user collaboration features for sharing conversations, projects, and organizational knowledge with role-based access controls.',
    icon: 'Users',
    category: 'Enterprise',
    status: 'Beta',
    highlights: [
      'Shared project workspaces with team-wide visibility',
      'Role-based access controls (admin, member, viewer)',
      'Centralized billing and usage analytics per team',
      'Activity logs and audit trails for compliance',
    ],
    useCases: [
      'Sharing a best-practices project across your entire department so everyone benefits from the same context',
      'Managing team-wide Claude usage with centralized billing and seat management',
      'Enabling knowledge sharing by allowing team members to view and continue each other\'s conversations',
    ],
    tips: [
      'Assign the admin role only to team leads to maintain control over project settings',
      'Use team-level custom instructions to enforce organizational standards across all members',
      'Review usage analytics monthly to optimize seat allocation and identify power users',
    ],
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description:
      'Programmatic access to Claude through REST APIs and SDKs for embedding AI capabilities into custom applications, workflows, and automation pipelines.',
    icon: 'Code',
    category: 'Enterprise',
    status: 'GA',
    highlights: [
      'RESTful API with streaming and batch request support',
      'Official SDKs for Python, TypeScript, and Java',
      'Fine-grained rate limiting and usage tracking per API key',
      'Supports tool use, system prompts, and multi-turn conversations',
    ],
    useCases: [
      'Building a customer-support chatbot powered by Claude with your product knowledge base',
      'Automating document processing pipelines that classify, extract, and summarize at scale',
      'Integrating Claude into CI/CD workflows for automated code review or test generation',
    ],
    tips: [
      'Use streaming responses for better perceived latency in user-facing applications',
      'Implement exponential backoff for rate-limit retries to avoid cascading failures',
      'Start with the Messages API and add tool use incrementally as your integration matures',
    ],
  },
];
