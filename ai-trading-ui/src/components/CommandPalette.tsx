import React, { useEffect, useState } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useLocation } from 'wouter';
import { Bot, Home, LineChart, ShieldAlert, BookOpen, Settings } from 'lucide-react';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => setLocation('/'))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Workspace Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation('/journal'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Trading Journal</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation('/risk'))}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            <span>Risk Management</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setLocation('/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => console.log('Open AI'))}>
            <Bot className="mr-2 h-4 w-4" />
            <span>Ask AI Assistant</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => console.log('New Trade'))}>
            <LineChart className="mr-2 h-4 w-4" />
            <span>New Trade Setup</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}