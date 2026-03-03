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
    ],
  },
  {
    label: 'Evaluate',
    icon: ClipboardCheck,
    items: [
      { label: 'ROI Calculator', icon: Calculator, path: '/roi' },
      { label: 'Assessment', icon: ClipboardCheck, path: '/assessment' },
      { label: 'Strategy', icon: Star, path: '/strategy' },
    ],
  },
  {
    label: 'Build',
    icon: Hammer,
    items: [
      { label: 'Profile Builder', icon: Hammer, path: '/profile-builder' },
    ],
  },
  {
    label: 'Ecosystem',
    icon: Globe,
    items: [
      { label: 'Microsoft', icon: Building2, path: '/ecosystem' },
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
