import React from 'react';
import { Search, Bell, Settings, TrendingUp, Sun, Moon, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Link } from 'wouter';
// import FloatingPanel from '@/components/FloatingChartWidget';

export default function TopNavbar() {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [marketStatus, setMarketStatus] = React.useState<'OPEN' | 'CLOSED' | 'PRE-MARKET'>('OPEN');

  return (
    <header className="h-14 border-b border-border bg-card/90 backdrop-blur-sm flex items-center justify-between px-4 z-10 shrink-0 relative">
      <div className="flex items-center gap-2 w-1/4">
        <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
          <TrendingUp className="w-5 h-5" />
        </div>
        <span className="font-semibold text-foreground hidden md:inline-block tracking-tight">AI Trading Platform</span>
      </div>
      {/* <FloatingPanel /> */}
      <div className="flex-1 max-w-xl mx-4 relative hidden sm:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search symbols, strategies, indicators... (Ctrl+K)" 
          className="w-full bg-background border-border pl-9 h-9 font-mono text-sm"
        />
      </div>
      

      <div className="flex items-center justify-end gap-2 w-1/4">
        <div className="hidden lg:flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-background border border-border text-xs font-mono font-medium">
          {marketStatus === 'OPEN' && <span className="w-2 h-2 rounded-full bg-trading-green animate-pulse"></span>}
          {marketStatus === 'PRE-MARKET' && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>}
          {marketStatus === 'CLOSED' && <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>}
          <span className="text-muted-foreground">MARKET</span>
          <span className={marketStatus === 'OPEN' ? 'text-trading-green' : marketStatus === 'PRE-MARKET' ? 'text-amber-500' : 'text-muted-foreground'}>
            {marketStatus}
          </span>
        </div>

        <Button variant="ghost" size="icon" className="w-9 h-9" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="w-9 h-9 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary"></span>
        </Button>
        <Link href="/settings" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
          <Settings className="w-4 h-4" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/20 text-primary text-xs">AM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 font-mono text-sm">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">Vivek kumar</p>
                <p className="text-xs text-muted-foreground">Pro Trader</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">My Account</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/journal">Trading Journal</Link></DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
