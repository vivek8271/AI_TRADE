import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, LineChart, BookOpen, ShieldAlert, Cpu, Activity, Briefcase, Bot, User, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const navSections = [
  {
    title: "Dashboard",
    items: [
      { name: "Workspace", icon: Home, href: "/" },
      { name: "Watchlist", icon: Activity, href: "/watchlist" },
      { name: "Portfolio", icon: Briefcase, href: "/portfolio" },
    ]
  },
  {
    title: "Trading",
    items: [
      { name: "AI Terminal", icon: Bot, href: "/terminal" },
      { name: "Charts", icon: LineChart, href: "/charts" },
      { name: "Backtesting", icon: Cpu, href: "/backtesting" },
    ]
  },
  {
    title: "Analytics",
    items: [
      { name: "Trading Journal", icon: BookOpen, href: "/journal" },
      { name: "Risk Analysis", icon: ShieldAlert, href: "/risk" },
    ]
  },
  {
    title: "Account",
    items: [
      { name: "Profile", icon: User, href: "/profile" },
      { name: "Settings", icon: SettingsIcon, href: "/settings" },
    ]
  }
];

export default function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const [location] = useLocation();

  return (
    <div className={cn(
      "h-full border-r border-border bg-card/50 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-2">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                  {section.title}
                </h4>
              )}
              {collapsed && idx !== 0 && <div className="h-px bg-border my-2 mx-4" />}
              {section.items.map((item) => {
                const active = location === item.href || (item.href !== '/' && location.startsWith(item.href));
                return (
                  <Link key={item.name} href={item.href} className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative group",
                    active 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}>
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                    {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />}
                    {collapsed && (
                      <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-popover border border-border text-popover-foreground px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
