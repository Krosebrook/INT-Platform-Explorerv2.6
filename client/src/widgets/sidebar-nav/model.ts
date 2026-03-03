import { useState, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Compass,
  GitCompare,
  Grid3X3,
  Calculator,
  ClipboardCheck,
  Star,
  Hammer,
  Globe,
  Building2,
  Brain,
  Layers,
  FileText,
  Bot,
  Shield,
  LayoutDashboard,
  BarChart3,
  Rocket,
  Scale,
  Users,
  Store,
  Wrench,
  Settings,
  BookOpen,
  Lightbulb,
  BookMarked,
  ClipboardList,
  Library,
  HelpCircle,
} from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface NavGroup {
  label: string;
  icon: LucideIcon;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Discover',
    icon: Compass,
    items: [
      { label: 'Explorer', icon: Compass, path: '/explorer' },
      { label: 'Comparison', icon: GitCompare, path: '/comparison' },
      { label: 'Matrix', icon: Grid3X3, path: '/matrix' },
      { label: 'Intelligence Engine', icon: Brain, path: '/intelligence' },
      { label: 'Saved Stacks', icon: Layers, path: '/stacks' },
    ],
  },
  {
    label: 'Evaluate',
    icon: ClipboardCheck,
    items: [
      { label: 'ROI Calculator', icon: Calculator, path: '/roi' },
      { label: 'Assessment', icon: ClipboardCheck, path: '/assessment' },
      { label: 'Strategy', icon: Star, path: '/strategy' },
      { label: 'RFP Generator', icon: FileText, path: '/rfp' },
    ],
  },
  {
    label: 'Build',
    icon: Hammer,
    items: [
      { label: 'Profile Builder', icon: Hammer, path: '/profile-builder' },
      { label: 'Agent Builder', icon: Bot, path: '/agent-builder' },
      { label: 'System Baseline', icon: Shield, path: '/baseline' },
    ],
  },
  {
    label: 'Operate',
    icon: LayoutDashboard,
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Analytics', icon: BarChart3, path: '/analytics' },
      { label: 'Deployment', icon: Rocket, path: '/deployment' },
      { label: 'Governance', icon: Scale, path: '/governance' },
      { label: 'Collaboration', icon: Users, path: '/collaboration' },
    ],
  },
  {
    label: 'Ecosystem',
    icon: Globe,
    items: [
      { label: 'Microsoft', icon: Building2, path: '/ecosystem' },
      { label: 'App Marketplace', icon: Store, path: '/marketplace' },
      { label: 'MCP Tools', icon: Wrench, path: '/mcp-tools' },
    ],
  },
  {
    label: 'Resources',
    icon: BookOpen,
    items: [
      { label: 'Knowledge Base', icon: BookOpen, path: '/knowledge' },
      { label: 'Best Practices', icon: Lightbulb, path: '/best-practices' },
      { label: 'Feature Guides', icon: BookMarked, path: '/feature-guides' },
      { label: 'Operations Manual', icon: ClipboardList, path: '/operations' },
      { label: 'Reference Library', icon: Library, path: '/reference' },
      { label: 'FAQ', icon: HelpCircle, path: '/faq' },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    items: [
      { label: 'Settings', icon: Settings, path: '/settings' },
    ],
  },
];

const STORAGE_KEY = 'sidebar-collapsed';

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {
      // localStorage unavailable
    }
  }, [isCollapsed]);

  return { isCollapsed, setIsCollapsed, toggleCollapsed: () => setIsCollapsed(prev => !prev) };
}
