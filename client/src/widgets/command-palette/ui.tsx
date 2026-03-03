import { useEffect } from 'react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator } from '@/shared/ui/command';
import { useCommandPalette, COMMAND_GROUPS } from './model';
import type { Command } from './model';

export function CommandPalette() {
  const { open, setOpen, search, setSearch, filtered, execute } = useCommandPalette();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setOpen]);

  const activeGroups = COMMAND_GROUPS.filter((group) => filtered.some((cmd) => cmd.group === group));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput data-testid="command-palette-input" placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
      <CommandList data-testid="command-palette-list">
        <CommandEmpty data-testid="command-palette-empty">No results found.</CommandEmpty>
        {activeGroups.map((group, groupIndex) => {
          const groupCommands = filtered.filter((cmd) => cmd.group === group);
          if (groupCommands.length === 0) return null;
          return (
            <div key={group}>
              {groupIndex > 0 && <CommandSeparator />}
              <CommandGroup heading={group} data-testid={`command-group-${group.toLowerCase()}`}>
                {groupCommands.map((cmd: Command) => (
                  <CommandItem key={cmd.id} value={`${cmd.label} ${cmd.keywords.join(' ')}`} onSelect={() => execute(cmd)} data-testid={`command-item-${cmd.id}`}>
                    <cmd.icon className="mr-2 h-4 w-4" /><span>{cmd.label}</span>
                    <CommandShortcut className="hidden sm:inline-flex">{cmd.path}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          );
        })}
      </CommandList>
      <div className="border-t bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          {typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd className="pointer-events-none ml-0.5 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">K</kbd>
        <span className="ml-2">to toggle</span>
        <span className="mx-2">|</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">↵</kbd>
        <span className="ml-2">to select</span>
      </div>
    </CommandDialog>
  );
}
