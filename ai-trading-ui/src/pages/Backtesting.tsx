import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Save, Settings as SettingsIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';

const generateBacktestData = () => {
  let val = 10000;
  return Array.from({ length: 100 }).map((_, i) => {
    val = val * (1 + (Math.random() - 0.48) * 0.05);
    return { day: i, value: val };
  });
};

export default function Backtesting() {
  const [data, setData] = React.useState(generateBacktestData());
  const finalValue = data[data.length - 1].value;
  const returnPct = ((finalValue - 10000) / 10000) * 100;

  const runTest = () => setData(generateBacktestData());

  return (
    <div className="p-6 h-full overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight">Strategy Backtesting</h1>
          <p className="text-muted-foreground text-sm">Simulate AI strategies against historical data.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><SettingsIcon className="w-4 h-4 mr-2" /> Parameters</Button>
          <Button onClick={runTest}><Play className="w-4 h-4 mr-2" /> Run Simulation</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-panel">
            <CardHeader><CardTitle>Strategy Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Active Model</div>
                <div className="font-medium font-mono text-sm border border-border bg-background/50 p-2 rounded">Mean Reversion AI v2.4</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Timeframe</div>
                <div className="font-medium">1 Hour</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Asset Class</div>
                <div className="font-medium">Crypto Majors</div>
              </div>
              <div className="pt-4 border-t border-border">
                <Button variant="secondary" className="w-full"><Save className="w-4 h-4 mr-2" /> Save Strategy</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-sm text-primary uppercase tracking-wider">Simulation Results</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground">Initial Balance</span>
                  <span className="font-mono">$10,000.00</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-muted-foreground">Final Balance</span>
                  <span className="font-mono font-bold text-lg">${finalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-2 border-t border-primary/10">
                  <span className="text-xs text-muted-foreground">Net Return</span>
                  <span className={`font-mono font-bold ${returnPct >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                    {returnPct >= 0 ? '+' : ''}{returnPct.toFixed(2)}%
                  </span>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="glass-panel h-full min-h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Performance over 100 simulated periods</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={runTest}><RotateCcw className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" hide />
                  <YAxis domain={['auto', 'auto']} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => `$${(val/1000).toFixed(1)}k`} width={60} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    labelStyle={{ display: 'none' }}
                    itemStyle={{ color: 'hsl(var(--primary))', fontFamily: 'monospace' }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Equity']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}