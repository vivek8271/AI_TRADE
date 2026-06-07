import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ShieldAlert, AlertTriangle, Activity, Crosshair } from 'lucide-react';

const pieData = [
  { name: 'Tech', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Finance', value: 25, color: 'hsl(280 100% 60%)' },
  { name: 'Crypto', value: 20, color: 'hsl(43 100% 50%)' },
  { name: 'Cash', value: 10, color: 'hsl(var(--muted-foreground))' },
];

const barData = [
  { name: 'Mon', risk: 1.2 },
  { name: 'Tue', risk: 1.8 },
  { name: 'Wed', risk: 0.5 },
  { name: 'Thu', risk: 2.4 },
  { name: 'Fri', risk: 1.1 },
];

export default function Risk() {
  return (
    <div className="p-6 h-full overflow-y-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-mono tracking-tight">Risk Management</h1>
        <p className="text-muted-foreground text-sm">Monitor exposure, drawdowns, and portfolio allocation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel border-t-4 border-t-primary">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Risk Per Trade</p>
                <h3 className="text-2xl font-mono font-bold">1.5%</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded text-primary"><Crosshair className="w-4 h-4" /></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: &lt; 2.0%</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-t-4 border-t-amber-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Daily Risk Limit</p>
                <h3 className="text-2xl font-mono font-bold text-amber-500">3.0%</h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded text-amber-500"><AlertTriangle className="w-4 h-4" /></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Used today: 1.2%</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-t-4 border-t-trading-red">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Max Drawdown</p>
                <h3 className="text-2xl font-mono font-bold text-trading-red">-8.2%</h3>
              </div>
              <div className="p-2 bg-trading-red/10 rounded text-trading-red"><Activity className="w-4 h-4" /></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Since inception</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-t-4 border-t-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Current Exposure</p>
                <h3 className="text-2xl font-mono font-bold">42.0%</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded text-blue-500"><ShieldAlert className="w-4 h-4" /></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Capital deployed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Position Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={pieData}
                   innerRadius={80}
                   outerRadius={110}
                   paddingAngle={5}
                   dataKey="value"
                   stroke="none"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip 
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                   itemStyle={{ color: 'hsl(var(--foreground))' }}
                 />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold font-mono">14</div>
                <div className="text-xs text-muted-foreground uppercase">Positions</div>
             </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>Risk by Day (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                 <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                 <Tooltip 
                   cursor={{ fill: 'hsl(var(--secondary))' }}
                   contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                 />
                 <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}