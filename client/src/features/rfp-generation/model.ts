import { useState, useCallback } from "react";

export type RFPSectionType = "ExecutiveSummary" | "Requirements" | "Vendors" | "EvaluationCriteria" | "Timeline" | "Budget";

export interface RFPSection {
  id: string;
  type: RFPSectionType;
  title: string;
  content: string;
}

export interface RFPDocument {
  id: string;
  title: string;
  status: "draft" | "review" | "final";
  vendorPlatformIds: string[];
  sections: RFPSection[];
  createdAt: string;
  updatedAt: string;
}

export const SECTION_TEMPLATES: RFPSection[] = [
  { id: "sec-executive-summary", type: "ExecutiveSummary", title: "Executive Summary", content: "This Request for Proposal (RFP) outlines the requirements for selecting an enterprise AI platform partner. The goal is to identify a solution that aligns with our strategic objectives, compliance needs, and technical architecture.\n\nPlease describe your organization's background, the business problem being addressed, and the expected outcomes from the selected platform." },
  { id: "sec-requirements", type: "Requirements", title: "Requirements", content: "Functional Requirements:\n- Natural language processing and generation capabilities\n- API-first architecture with RESTful endpoints\n- Support for fine-tuning and custom model deployment\n- Multi-modal input support (text, image, document)\n\nNon-Functional Requirements:\n- 99.9% uptime SLA\n- Sub-200ms average response latency\n- Horizontal scalability to 10,000+ concurrent users\n- Data residency options (US, EU, APAC)" },
  { id: "sec-vendors", type: "Vendors", title: "Vendor Information", content: "Vendors are requested to provide the following information:\n\n1. Company overview and relevant experience\n2. Platform architecture and deployment options\n3. Customer references (minimum 3 enterprise clients)\n4. Support model and SLA details\n5. Security certifications (SOC 2 Type II, ISO 27001, GDPR, HIPAA)\n6. Roadmap and innovation timeline" },
  { id: "sec-evaluation-criteria", type: "EvaluationCriteria", title: "Evaluation Criteria", content: "Proposals will be evaluated against the following weighted criteria:\n\n- Technical Capabilities (30%): Model quality, API features, extensibility\n- Security & Compliance (25%): Certifications, data privacy, audit trails\n- Cost & Commercial Terms (20%): Pricing transparency, volume discounts, contract flexibility\n- Implementation & Support (15%): Onboarding timeline, documentation, support responsiveness\n- Strategic Fit (10%): Roadmap alignment, partnership model, innovation culture" },
  { id: "sec-timeline", type: "Timeline", title: "Timeline", content: "RFP Issued: [Date]\nQuestions Due: [Date + 2 weeks]\nProposals Due: [Date + 4 weeks]\nShortlist Announced: [Date + 6 weeks]\nVendor Demos: [Date + 7-8 weeks]\nFinal Selection: [Date + 10 weeks]\nContract Negotiation: [Date + 12 weeks]\nImplementation Kickoff: [Date + 14 weeks]" },
  { id: "sec-budget", type: "Budget", title: "Budget", content: "Please provide a detailed cost breakdown including:\n\n- Per-seat / per-token licensing fees\n- Implementation and onboarding costs\n- Training and enablement costs\n- Ongoing support and maintenance fees\n- Volume discount tiers for 500, 1,000, and 5,000+ users\n- Optional: 1-year, 2-year, and 3-year commitment pricing" },
];

export function useRFPEditor() {
  const [document, setDocument] = useState<RFPDocument | null>(null);
  const [activeSection, setActiveSection] = useState<RFPSection | null>(null);

  const createDocument = useCallback((title: string, vendorPlatformIds: string[]) => {
    const now = new Date().toISOString();
    const newDoc: RFPDocument = {
      id: "rfp_" + (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)),
      title, status: "draft", vendorPlatformIds,
      sections: SECTION_TEMPLATES.map((tpl) => ({ ...tpl })),
      createdAt: now, updatedAt: now,
    };
    setDocument(newDoc);
    setActiveSection(newDoc.sections[0]);
  }, []);

  const updateSectionContent = useCallback((sectionId: string, content: string) => {
    setDocument((prev) => {
      if (!prev) return prev;
      return { ...prev, sections: prev.sections.map((s) => s.id === sectionId ? { ...s, content } : s), updatedAt: new Date().toISOString() };
    });
    setActiveSection((prev) => prev && prev.id === sectionId ? { ...prev, content } : prev);
  }, []);

  const updateTitle = useCallback((title: string) => {
    setDocument((prev) => prev ? { ...prev, title, updatedAt: new Date().toISOString() } : prev);
  }, []);

  return { document, activeSection, setActiveSection, createDocument, updateSectionContent, updateTitle };
}
