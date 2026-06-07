import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { ChevronUp, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const mockEquityData = Array.from({ length: 30 }).map((_, i) => ({
  value: 110000 + i * 500 + Math.random() * 2000
}));

const recentTrades = [
  { id: 1, date: '10:42:15', symbol: 'NIFTY 50', side: 'BUY', entry: '22,400', exit: '22,450', pnl: 2500 },
  { id: 2, date: '09:15:30', symbol: 'BTC/USD', side: 'SELL', entry: '68,100', exit: '67,500', pnl: 1200 },
  { id: 3, date: 'Yesterday', symbol: 'RELIANCE', side: 'BUY', entry: '2,820', exit: '2,810', pnl: -800 },
  { id: 4, date: 'Yesterday', symbol: 'AAPL', side: 'SELL', entry: '186.50', exit: '185.00', pnl: 1500 },
];

export default function BottomPanel() {
  return (
    <div className="flex h-full w-full bg-card/60 backdrop-blur border-t border-border overflow-x-auto overflow-y-hidden">
      <div className="flex p-4 gap-6 min-w-max h-full items-center">
        
        {/* Account Summary */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Target className="w-3 h-3" /> Account Summary
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Total Capital</div>
              <div className="text-xl font-mono font-bold">$125,430</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Available Margin</div>
              <div className="text-xl font-mono font-bold">$45,200</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Daily P&L</div>
              <div className="text-lg font-mono font-bold text-trading-green">+$2,340 <span className="text-xs ml-1">+1.9%</span></div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Overall P&L</div>
              <div className="text-lg font-mono font-bold text-trading-green">+$18,750 <span className="text-xs ml-1">+17.6%</span></div>
            </div>
          </div>
        </div>

        <div className="h-full w-px bg-border/50 shrink-0" />

        {/* Performance Stats */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Performance
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
              <div className="text-lg font-mono font-bold">68.4%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Profit Factor</div>
              <div className="text-lg font-mono font-bold">2.3x</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Avg RR</div>
              <div className="text-lg font-mono font-bold">1:2.4</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Max Drawdown</div>
              <div className="text-lg font-mono font-bold text-trading-red">-8.2%</div>
            </div>
          </div>
        </div>

        <div className="h-full w-px bg-border/50 shrink-0" />

        {/* Equity Curve */}
        <div className="flex flex-col gap-2 shrink-0 w-[200px]">
           <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Equity Curve (30d)</div>
           <div className="h-[80px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={mockEquityData}>
                 <YAxis domain={['dataMin', 'dataMax']} hide />
                 <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="h-full w-px bg-border/50 shrink-0" />

        {/* Recent Trades Table */}
        <div className="flex flex-col gap-2 shrink-0 flex-1 min-w-[400px]">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Trades</div>
          <div className="border border-border/50 rounded overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground">Time</th>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground">Symbol</th>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground">Side</th>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground text-right">Entry</th>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground text-right">Exit</th>
                  <th className="py-1.5 px-3 font-medium text-muted-foreground text-right">P&L</th>
                </tr>
              </thead>
              <tbody>
                {recentTrades.map(trade => (
                  <tr key={trade.id} className="border-t border-border/30 hover:bg-secondary/20">
                    <td className="py-1.5 px-3 text-muted-foreground">{trade.date}</td>
                    <td className="py-1.5 px-3 font-mono font-medium">{trade.symbol}</td>
                    <td className="py-1.5 px-3">
                      <Badge variant="outline" className={`text-[10px] h-4 px-1 rounded-sm ${trade.side === 'BUY' ? 'text-trading-green border-trading-green/30' : 'text-trading-red border-trading-red/30'}`}>
                        {trade.side}
                      </Badge>
                    </td>
                    <td className="py-1.5 px-3 font-mono text-right">{trade.entry}</td>
                    <td className="py-1.5 px-3 font-mono text-right">{trade.exit}</td>
                    <td className={`py-1.5 px-3 font-mono font-medium text-right ${trade.pnl > 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                      {trade.pnl > 0 ? '+' : ''}${Math.abs(trade.pnl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}