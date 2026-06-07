import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, CornerDownLeft, Sparkles, Activity, PencilLine, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const MOCK_MESSAGES = [
  { role: 'user', content: 'Analyze NIFTY 50 trend' },
  { 
    role: 'ai', 
    content: 'Based on current price action, NIFTY 50 is in a strong uptrend on the daily timeframe. Here are the key levels:',
    table: [
      ['Level', 'Price', 'Type'],
      ['R2', '22,650', 'Resistance'],
      ['R1', '22,500', 'Resistance'],
      ['S1', '22,350', 'Support'],
      ['S2', '22,200', 'Support'],
    ],
    setup: { bias: 'Bullish', entry: '22,400', sl: '22,300', tp: '22,600' }
  },
  { role: 'user', content: 'Draw trendline on BTC/USD' },
  { role: 'ai', content: 'I have drawn an ascending trendline on BTC/USD connecting the recent higher lows at $64,200 and $65,800. The trend remains intact.' },
];

export default function AITerminal() {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full bg-card/80 backdrop-blur border-r border-border">
      <div className="p-3 border-b border-border flex items-center justify-between bg-muted/30">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs bg-background"><Activity className="w-3 h-3 mr-1" /> Analyze</Button>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-background"><PencilLine className="w-3 h-3 mr-1" /> Draw Trendline</Button>
          <Button variant="outline" size="sm" className="h-7 text-xs bg-background hidden xl:flex"><Layers className="w-3 h-3 mr-1" /> Market Structure</Button>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground">Clear</Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {MOCK_MESSAGES.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-secondary text-foreground'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex-1 max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-primary/10 border border-primary/20 text-foreground' : 'bg-secondary/50 border border-border text-foreground'}`}>
                  <p>{msg.content}</p>
                  
                  {msg.table && (
                    <div className="mt-3 border border-border rounded overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-muted">
                          <tr>{msg.table[0].map((h, j) => <th key={j} className="p-2 font-medium">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {msg.table.slice(1).map((row, j) => (
                            <tr key={j} className="border-t border-border/50">
                              {row.map((cell, k) => <td key={k} className="p-2 text-muted-foreground">{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {msg.setup && (
                    <div className="mt-3 p-3 bg-background rounded border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Trade Setup</span>
                        <Badge variant="outline" className="bg-trading-green/10 text-trading-green border-trading-green/20">{msg.setup.bias}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-muted-foreground mb-1">Entry</div>
                          <div className="font-mono">{msg.setup.entry}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Take Profit</div>
                          <div className="font-mono text-trading-green">{msg.setup.tp}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Stop Loss</div>
                          <div className="font-mono text-trading-red">{msg.setup.sl}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border bg-card/50">
        <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
          {['Support/Resistance', 'Fibonacci Levels', 'Volume Profile'].map(chip => (
            <button key={chip} className="shrink-0 px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors border border-border/50">
              {chip}
            </button>
          ))}
        </div>
        <div className="relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about the markets..." 
            className="w-full bg-background border-border pr-10"
          />
          <Button size="icon" variant="ghost" className="absolute right-1 top-1 w-8 h-8 text-primary hover:bg-primary/10">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}