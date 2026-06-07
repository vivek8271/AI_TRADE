import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const MOCK_WATCHLIST = [
  { symbol: 'NIFTY 50', price: '22,450.00', change: 1.2, vol: '12.4M' },
  { symbol: 'BTC/USD', price: '67,240.50', change: -0.8, vol: '8.2B' },
  { symbol: 'RELIANCE', price: '2,847.25', change: 2.1, vol: '5.6M' },
  { symbol: 'AAPL', price: '185.40', change: 0.4, vol: '45.2M' },
  { symbol: 'ETH/USD', price: '3,520.10', change: -1.3, vol: '4.1B' },
  { symbol: 'GOLD', price: '2,340.80', change: 0.6, vol: '2.3M' },
  { symbol: 'TSLA', price: '174.50', change: -2.4, vol: '68.1M' },
  { symbol: 'EUR/USD', price: '1.0845', change: 0.1, vol: '1.2B' },
];

export default function WatchlistPanel() {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">Watchlist</h3>
        <span className="text-xs text-muted-foreground font-mono">8 items</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border/50">
        <div className="col-span-2">Symbol</div>
        <div className="text-right">Price</div>
        <div className="text-right">Chg%</div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {MOCK_WATCHLIST.map((item, i) => (
            <motion.div 
              key={item.symbol}
              whileHover={{ backgroundColor: 'hsl(var(--secondary) / 0.5)' }}
              className="grid grid-cols-4 gap-2 px-3 py-3 text-sm border-b border-border/30 cursor-pointer group"
            >
              <div className="col-span-2 flex flex-col justify-center">
                <span className="font-semibold font-mono">{item.symbol}</span>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground/70 transition-colors">Vol: {item.vol}</span>
              </div>
              <div className="text-right flex items-center justify-end font-mono">
                {item.price}
              </div>
              <div className="text-right flex items-center justify-end">
                <span className={`px-1.5 py-0.5 rounded text-xs font-mono font-medium ${
                  item.change > 0 
                    ? 'bg-trading-green/10 text-trading-green' 
                    : 'bg-trading-red/10 text-trading-red'
                }`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}