import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'wouter';
import type { LucideIcon } from 'lucide-react';
import { Zap, Layers, FileText } from 'lucide-react';
import { NAV_GROUPS } from '@/widgets/sidebar-nav/model';

export interface Command {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  group: string;
  keywords: string[];
}

const navCommands: Command[] = NAV_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    id: `nav-${item.path}`,
    label: item.label,
    icon: item.icon,
    path: item.path,
    group: group.label,
    keywords: [item.label.toLowerCase(), item.path.replace('/', '')],
  })),
);

const phase2Commands: Command[] = [
  { id: 'nav-/intelligence', label: 'Intelligence Engine', icon: Zap, path: '/intelligence', group: 'Intelligence', keywords: ['intelligence', 'ai', 'engine', 'smart', 'insights'] },
  { id: 'nav-/stacks', label: 'Saved Stacks', icon: Layers, path: '/stacks', group: 'Intelligence', keywords: ['stacks', 'saved', 'collection', 'bundle'] },
  { id: 'nav-/rfp', label: 'RFP Generator', icon: FileText, path: '/rfp', group: 'Intelligence', keywords: ['rfp', 'proposal', 'generator', 'document'] },
];

function buildAllCommands(): Command[] {
  const existingIds = new Set(navCommands.map((c) => c.id));
  const uniquePhase2 = phase2Commands.filter((c) => !existingIds.has(c.id));
  return [...navCommands, ...uniquePhase2];
}

export const ALL_COMMANDS: Command[] = buildAllCommands();

export const COMMAND_GROUPS: string[] = Array.from(
  new Map(ALL_COMMANDS.map((c) => [c.group, c.group])).values(),
);

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [, setLocation] = useLocation();

  useEffect(() => { if (!open) setSearch(''); }, [open]);

  const filtered = useMemo(() => {
    if (!search.trim()) return ALL_COMMANDS;
    const term = search.toLowerCase();
    return ALL_COMMANDS.filter((cmd) =>
      cmd.label.toLowerCase().includes(term) || cmd.path.toLowerCase().includes(term) || cmd.keywords.some((kw) => kw.includes(term)),
    );
  }, [search]);

  const execute = useCallback((command: Command) => {
    setLocation(command.path);
    setOpen(false);
  }, [setLocation]);

  return { open, setOpen, search, setSearch, filtered, execute } as const;
}
