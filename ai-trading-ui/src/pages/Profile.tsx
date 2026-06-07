import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeContext } from '@/contexts/ThemeContext';

export default function Profile() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight">Profile & Preferences</h1>
        <p className="text-muted-foreground text-sm">Manage your personal information and trading settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="glass-panel text-center flex flex-col items-center pt-8 pb-6">
            <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/20">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-mono">AM</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold font-mono">Alex Morgan</h2>
            <p className="text-sm text-muted-foreground mb-4">trader@alphatech.com</p>
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider border border-primary/20">
              Pro Trader Plan
            </div>
            <Button variant="outline" className="mt-6 w-full max-w-[200px]">Edit Avatar</Button>
          </Card>

          <Card className="glass-panel">
             <CardHeader><CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">App Preferences</CardTitle></CardHeader>
             <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                 <Label className="flex flex-col">
                   <span>Dark Mode</span>
                   <span className="text-xs text-muted-foreground font-normal">Use dark theme by default</span>
                 </Label>
                 <Switch checked={theme === 'dark'} onCheckedChange={(c) => setTheme(c ? 'dark' : 'light')} />
               </div>
               <div className="flex items-center justify-between">
                 <Label className="flex flex-col">
                   <span>Sound Effects</span>
                   <span className="text-xs text-muted-foreground font-normal">Play sounds on execution</span>
                 </Label>
                 <Switch defaultChecked />
               </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-6">
          <Card className="glass-panel">
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Alex" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Morgan" className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="trader@alphatech.com" type="email" className="bg-background/50" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader><CardTitle>Trading Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Market</Label>
                <Select defaultValue="crypto">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="stocks">US Equities</SelectItem>
                    <SelectItem value="indices">Indices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Default Timeframe</Label>
                <Select defaultValue="15m">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Default Risk per Trade</Label>
                  <span className="text-sm font-mono text-muted-foreground">1.5%</span>
                </div>
                <input type="range" min="0.1" max="5" step="0.1" defaultValue="1.5" className="w-full accent-primary" />
                <p className="text-xs text-muted-foreground">This sets the default position size calculator risk.</p>
              </div>
              
              <Button variant="outline">Update Trading Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}