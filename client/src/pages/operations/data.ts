// ---------------------------------------------------------------------------
// Operations Manual -- static data
// ---------------------------------------------------------------------------

export interface ServiceTier {
  name: string;
  description: string;
  features: string[];
  sla: string;
  price: string;
  recommended?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    name: "Starter",
    description: "Basic access, community support",
    features: [
      "Basic platform access",
      "Community forum support",
      "Standard documentation",
      "5 GB storage",
      "Single-user workspace",
    ],
    sla: "99% uptime",
    price: "$0/mo",
  },
  {
    name: "Professional",
    description: "Priority support, advanced features",
    features: [
      "Full platform access",
      "Priority email & chat support",
      "Advanced analytics dashboard",
      "50 GB storage",
      "Team workspaces (up to 25 users)",
      "Custom integrations",
    ],
    sla: "99.9% uptime",
    price: "$49/mo",
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "Dedicated support, custom SLAs",
    features: [
      "Unlimited platform access",
      "Dedicated account manager",
      "Custom SLA agreements",
      "Unlimited storage",
      "Unlimited team members",
      "SSO & advanced security",
      "On-premise deployment option",
    ],
    sla: "99.99% uptime",
    price: "Custom pricing",
  },
];

// ---------------------------------------------------------------------------

export interface ROIPhase {
  phase: string;
  title: string;
  activities: string[];
  deliverables: string[];
  duration: string;
}

export const roiPhases: ROIPhase[] = [
  {
    phase: "Phase 1",
    title: "Discovery",
    activities: [
      "Stakeholder interviews",
      "Current-state assessment",
      "Pain-point identification",
      "Opportunity mapping",
    ],
    deliverables: [
      "Discovery report",
      "Prioritized use-case backlog",
      "Baseline metrics snapshot",
    ],
    duration: "2 weeks",
  },
  {
    phase: "Phase 2",
    title: "Implementation",
    activities: [
      "Platform configuration",
      "Integration development",
      "Data migration",
      "User acceptance testing",
    ],
    deliverables: [
      "Configured environment",
      "Integration endpoints",
      "Test results & sign-off",
      "Deployment runbook",
    ],
    duration: "4 weeks",
  },
  {
    phase: "Phase 3",
    title: "Optimization",
    activities: [
      "Performance tuning",
      "Workflow refinement",
      "Training delivery",
      "Adoption monitoring",
    ],
    deliverables: [
      "Optimization report",
      "Training materials",
      "Updated runbooks",
      "KPI dashboard",
    ],
    duration: "3 weeks",
  },
  {
    phase: "Phase 4",
    title: "Scale",
    activities: [
      "Cross-department rollout",
      "Advanced use-case enablement",
      "Continuous improvement cycles",
      "Executive business reviews",
    ],
    deliverables: [
      "Expansion roadmap",
      "Quarterly business reviews",
      "ROI actuals report",
      "Long-term success plan",
    ],
    duration: "Ongoing",
  },
];

// ---------------------------------------------------------------------------

export interface SuccessMetric {
  name: string;
  target: string;
  current: string;
  unit: string;
  trend: "up" | "down" | "stable";
}

export const successMetrics: SuccessMetric[] = [
  {
    name: "User Adoption Rate",
    target: "80%",
    current: "72%",
    unit: "%",
    trend: "up",
  },
  {
    name: "Weekly Active Users",
    target: "70%",
    current: "65%",
    unit: "%",
    trend: "up",
  },
  {
    name: "Time to First Value",
    target: "< 7 days",
    current: "5 days",
    unit: "days",
    trend: "down",
  },
  {
    name: "Time Saved per User",
    target: "5+ hrs/week",
    current: "4.2 hrs/week",
    unit: "hrs/week",
    trend: "up",
  },
  {
    name: "Error Reduction",
    target: "30%",
    current: "26%",
    unit: "%",
    trend: "up",
  },
  {
    name: "Net Promoter Score",
    target: "50+",
    current: "47",
    unit: "NPS",
    trend: "up",
  },
  {
    name: "Support Ticket Volume",
    target: "< 5%",
    current: "6.1%",
    unit: "% users/mo",
    trend: "down",
  },
  {
    name: "Cost ROI (12 mo)",
    target: "5x",
    current: "4.3x",
    unit: "x",
    trend: "up",
  },
];

// ---------------------------------------------------------------------------

export interface TroubleshootingItem {
  problem: string;
  symptoms: string[];
  solution: string;
  category: string;
}

export const troubleshootingItems: TroubleshootingItem[] = [
  {
    problem: "Artifacts not rendering",
    symptoms: [
      "Blank or broken UI after loading",
      "Console shows rendering errors",
      "Older browser detected",
    ],
    solution:
      "Use the latest version of Chrome, Edge, or Firefox. Clear browser cache and disable conflicting extensions.",
    category: "Web Platform",
  },
  {
    problem: "File upload fails",
    symptoms: [
      "Upload progress stalls at 0%",
      "Error toast: 'File too large'",
      "Unsupported format message",
    ],
    solution:
      "Ensure file is under 10 MB. Convert to a supported format (PDF, PNG, CSV). Check network connectivity.",
    category: "Web Platform",
  },
  {
    problem: "MCP server connection failure",
    symptoms: [
      "Timeout when connecting to MCP endpoint",
      "Invalid JSON configuration error",
      "Authentication token expired",
    ],
    solution:
      "Validate your MCP JSON config for syntax errors. Refresh authentication credentials and verify the endpoint URL is reachable.",
    category: "Desktop & MCP",
  },
  {
    problem: "Slow response times",
    symptoms: [
      "Responses take > 30 seconds",
      "Context window approaching 100K tokens",
      "Spinner persists without result",
    ],
    solution:
      "Start a new conversation to reset context. Summarize prior context before continuing. Check API rate-limit status.",
    category: "Desktop & MCP",
  },
  {
    problem: "SSO login loop",
    symptoms: [
      "Redirected back to login after authenticating",
      "Session cookie not persisting",
      "Third-party cookie warnings in console",
    ],
    solution:
      "Allow third-party cookies for the auth domain. Verify IdP callback URL matches configuration. Contact IT if SAML metadata is stale.",
    category: "Authentication",
  },
  {
    problem: "Dashboard data not updating",
    symptoms: [
      "Metrics show stale values",
      "Last-updated timestamp is hours old",
      "No error but data unchanged",
    ],
    solution:
      "Check the data pipeline status page. Force a manual sync from Settings > Data Sources. Verify API keys have not expired.",
    category: "Analytics",
  },
  {
    problem: "Mobile push notifications missing",
    symptoms: [
      "No alerts despite enabled settings",
      "Background app refresh is off",
      "OS-level notification permission denied",
    ],
    solution:
      "Enable Background App Refresh in your device settings. Grant notification permissions to the app. Re-install if the issue persists.",
    category: "Mobile",
  },
  {
    problem: "Integration webhook failures",
    symptoms: [
      "Webhook delivery returns 4xx / 5xx",
      "Payload signature mismatch",
      "Events queued but not delivered",
    ],
    solution:
      "Verify the webhook URL is publicly accessible. Regenerate the signing secret and update both sides. Review retry logs for error details.",
    category: "Integrations",
  },
];
