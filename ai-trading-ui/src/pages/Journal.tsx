import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Bold, Italic, List, Plus, Smile, Meh, Frown, Flame } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const PAST_ENTRIES = [
  { id: 1, date: 'Oct 24, 2023', symbol: 'NIFTY', result: '+2,500', emotion: 'Confident', summary: 'Played the morning breakout perfectly.' },
  { id: 2, date: 'Oct 23, 2023', symbol: 'BTC', result: '-800', emotion: 'Fear', summary: 'Stopped out early, didn\'t trust the setup.' },
  { id: 3, date: 'Oct 22, 2023', symbol: 'AAPL', result: '+1,200', emotion: 'Neutral', summary: 'Textbook mean reversion trade.' },
];

export default function Journal() {
  return (
    <div className="h-full p-6 bg-background flex gap-6 overflow-hidden">
      
      {/* Left: New Entry Form */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold font-mono tracking-tight">Trading Journal</h1>
            <p className="text-muted-foreground text-sm">Document your setups, emotions, and lessons.</p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Save Entry</Button>
        </div>

        <Card className="glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Trade Context</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Symbol</label>
              <Input placeholder="e.g. NIFTY 50" className="font-mono bg-background/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">P&L ($)</label>
              <Input type="number" placeholder="+/-" className="font-mono bg-background/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Emotion</label>
              <Select>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="How did you feel?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confident"><div className="flex items-center"><Flame className="w-4 h-4 mr-2 text-orange-500" /> Confident</div></SelectItem>
                  <SelectItem value="neutral"><div className="flex items-center"><Meh className="w-4 h-4 mr-2 text-gray-500" /> Neutral</div></SelectItem>
                  <SelectItem value="fear"><div className="flex items-center"><Frown className="w-4 h-4 mr-2 text-blue-500" /> Fear/Anxiety</div></SelectItem>
                  <SelectItem value="greedy"><div className="flex items-center"><Smile className="w-4 h-4 mr-2 text-trading-green" /> Greedy/FOMO</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel flex-1 min-h-[400px] flex flex-col">
          <CardHeader className="pb-2 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Trade Notes</CardTitle>
              <div className="flex items-center gap-1 border border-border rounded p-1 bg-background/50">
                <Button variant="ghost" size="icon" className="h-6 w-6"><Bold className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-6 w-6"><Italic className="w-3 h-3" /></Button>
                <Button variant="ghost" size="icon" className="h-6 w-6"><List className="w-3 h-3" /></Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <Textarea 
              placeholder="What was the setup? Why did you take this trade?..." 
              className="flex-1 resize-none border-0 focus-visible:ring-0 rounded-none bg-transparent p-4"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="glass-panel">
            <CardHeader className="pb-2"><CardTitle className="text-sm">What went well?</CardTitle></CardHeader>
            <CardContent><Textarea placeholder="Positives..." className="min-h-[100px] bg-background/50" /></CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Mistakes / Improvements</CardTitle></CardHeader>
            <CardContent><Textarea placeholder="Lessons learned..." className="min-h-[100px] bg-background/50" /></CardContent>
          </Card>
        </div>

        <Card className="glass-panel border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors cursor-pointer">
            <Camera className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm font-medium">Click to paste or upload chart screenshot</p>
          </CardContent>
        </Card>

      </div>

      {/* Right: Past Entries */}
      <div className="w-[350px] shrink-0 flex flex-col">
        <h2 className="text-lg font-bold font-mono tracking-tight mb-4">Past Entries</h2>
        <Card className="glass-panel flex-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <Input placeholder="Search journal..." className="h-8 text-xs bg-background/50" />
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {PAST_ENTRIES.map(entry => (
                <div key={entry.id} className="p-3 rounded-lg border border-border bg-background/30 hover:bg-secondary/40 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono font-bold text-sm">{entry.symbol}</span>
                    <span className={`font-mono text-sm font-medium ${entry.result.startsWith('+') ? 'text-trading-green' : 'text-trading-red'}`}>
                      {entry.result}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{entry.summary}</p>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-muted-foreground">{entry.date}</span>
                    <Badge variant="outline" className="text-[10px] font-normal h-4 px-1">{entry.emotion}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
      
    </div>
  );
}