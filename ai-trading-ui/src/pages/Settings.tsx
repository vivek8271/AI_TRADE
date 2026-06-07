import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Palette, Layout, Bell, Bot } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your trading terminal experience.</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-[600px] mb-8 bg-card/80 backdrop-blur border border-border">
          <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Palette className="w-4 h-4 mr-2" /> Appearance</TabsTrigger>
          <TabsTrigger value="workspace" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Layout className="w-4 h-4 mr-2" /> Workspace</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Bell className="w-4 h-4 mr-2" /> Alerts</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"><Bot className="w-4 h-4 mr-2" /> AI Config</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Theme & Colors</CardTitle>
              <CardDescription>Customize the visual appearance of the terminal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Color Scheme</Label>
                  <p className="text-sm text-muted-foreground">Dark mode is highly recommended for trading.</p>
                </div>
                <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                  <SelectTrigger className="w-[180px] bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Terminal Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Accent Color</Label>
                <div className="flex gap-4">
                  {['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-orange-500', 'bg-rose-500'].map((color, i) => (
                    <button key={i} className={`w-8 h-8 rounded-full ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground' : 'opacity-70 hover:opacity-100'}`} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Layout Management</CardTitle>
              <CardDescription>Save and restore your panel configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button>Save Current Layout</Button>
                <Button variant="outline" className="text-destructive border-destructive/50 hover:bg-destructive/10 hover:text-destructive">Reset to Default</Button>
              </div>
              <div className="mt-8 space-y-4 border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <Label className="flex flex-col">
                    <span>Show Market Status</span>
                    <span className="text-xs text-muted-foreground font-normal">Display open/closed badge in navbar</span>
                  </Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="flex flex-col">
                    <span>Show Quick Trade Buttons</span>
                    <span className="text-xs text-muted-foreground font-normal">Show Buy/Sell directly on charts</span>
                  </Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Alert Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Price Alerts', desc: 'When assets hit your target levels' },
                { title: 'Trade Fills', desc: 'When orders are executed' },
                { title: 'Risk Warnings', desc: 'Approaching daily drawdown limit' },
                { title: 'AI Insights', desc: 'Significant pattern detections' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Label className="flex flex-col">
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground font-normal">{item.desc}</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Switch defaultChecked /> Push</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground"><Switch defaultChecked={i > 1} /> Email</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card className="glass-panel border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary" /> AI Assistant Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Analysis Style</Label>
                <Select defaultValue="concise">
                  <SelectTrigger className="bg-background/50 w-[250px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise & Actionable</SelectItem>
                    <SelectItem value="detailed">Detailed & Educational</SelectItem>
                    <SelectItem value="quant">Quant/Statistical Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Strategy Aggressiveness</Label>
                  <span className="text-sm font-mono text-muted-foreground">Balanced</span>
                </div>
                <input type="range" min="1" max="3" step="1" defaultValue="2" className="w-full max-w-[400px] accent-primary" />
                <div className="flex justify-between w-full max-w-[400px] text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Balanced</span>
                  <span>Aggressive</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}