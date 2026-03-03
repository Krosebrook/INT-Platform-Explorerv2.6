import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'wouter';
import type { LucideIcon } from 'lucide-react';
import { NAV_GROUPS } from '@/widgets/sidebar-nav/model';

export interface Command {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  group: string;
  keywords: string[];
}

export const ALL_COMMANDS: Command[] = NAV_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    id: `nav-${item.path}`,
    label: item.label,
    icon: item.icon,
    path: item.path,
    group: group.label,
    keywords: [item.label.toLowerCase(), item.path.replace('/', '')],
  })),
);

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
