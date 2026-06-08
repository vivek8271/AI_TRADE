// import React, { useMemo } from 'react';
// import { motion } from 'framer-motion';

// // Simple mock data generator for candles
// const generateCandles = (count = 50) => {
//   let basePrice = 23000;
//   return Array.from({ length: count }).map((_, i) => {
//     const open = basePrice + (Math.random() - 0.4) * 50;
//     const close = open + (Math.random() - 0.45) * 80; // slight upward bias
//     const high = Math.max(open, close) + Math.random() * 40;
//     const low = Math.min(open, close) - Math.random() * 40;
//     const volume = Math.random() * 100;
//     basePrice = close;
//     return { open, close, high, low, volume };
//   });
// };

// export default function MockCandlestickChart({ symbol = "NIFTY 50", hideAxes = false }: { symbol?: string, hideAxes?: boolean }) {
//   const candles = useMemo(() => generateCandles(), []);
  
//   // Chart dimensions
//   const padding = 20;
  
//   // Calculate scales
//   const minLow = Math.min(...candles.map(c => c.low));
//   const maxHigh = Math.max(...candles.map(c => c.high));
//   const priceRange = maxHigh - minLow;
//   const maxVolume = Math.max(...candles.map(c => c.volume));

//   return (
//     <div className="w-full h-full flex flex-col relative bg-[#0a0e17]">
//       {/* Chart Watermark/Overlay */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap">
//         {symbol}
//       </div>

//       {/* Top Legend */}
//       <div className="absolute top-2 left-4 flex gap-4 text-xs font-mono z-10">
//         <span className="font-semibold text-foreground">{symbol}</span>
//         {(() => {
//           const last = candles[candles.length - 1];
//           const isUp = last.close >= last.open;
//           return (
//             <>
//               <span className="text-muted-foreground">O <span className={isUp ? 'text-trading-green' : 'text-trading-red'}>{last.open.toFixed(2)}</span></span>
//               <span className="text-muted-foreground">H <span className={isUp ? 'text-trading-green' : 'text-trading-red'}>{last.high.toFixed(2)}</span></span>
//               <span className="text-muted-foreground">L <span className={isUp ? 'text-trading-green' : 'text-trading-red'}>{last.low.toFixed(2)}</span></span>
//               <span className="text-muted-foreground">C <span className={isUp ? 'text-trading-green' : 'text-trading-red'}>{last.close.toFixed(2)}</span></span>
//             </>
//           );
//         })()}
//       </div>

//       <div className="flex-1 w-full h-full relative">
//         <svg className="w-full h-full" preserveAspectRatio="none">
//           {/* Grid Lines */}
//           <g className="text-white/5" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4">
//             <line x1="0" y1="25%" x2="100%" y2="25%" />
//             <line x1="0" y1="50%" x2="100%" y2="50%" />
//             <line x1="0" y1="75%" x2="100%" y2="75%" />
//             <line x1="25%" y1="0" x2="25%" y2="100%" />
//             <line x1="50%" y1="0" x2="50%" y2="100%" />
//             <line x1="75%" y1="0" x2="75%" y2="100%" />
//           </g>

//           {/* AI Drawn elements */}
//           {!hideAxes && (
//             <>
//               {/* Support Zone */}
//               <rect x="0" y="70%" width="100%" height="10%" fill="hsl(142 70% 45% / 0.1)" />
//               <line x1="0" y1="70%" x2="100%" y2="70%" stroke="hsl(142 70% 45%)" strokeWidth="1" strokeDasharray="4 4" />
              
//               {/* Resistance Zone */}
//               <rect x="0" y="20%" width="100%" height="8%" fill="hsl(0 80% 50% / 0.1)" />
//               <line x1="0" y1="28%" x2="100%" y2="28%" stroke="hsl(0 80% 50%)" strokeWidth="1" strokeDasharray="4 4" />

//               {/* Trendline */}
//               <motion.line 
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 1.5, ease: "easeOut" }}
//                 x1="10%" y1="85%" x2="90%" y2="35%" 
//                 stroke="hsl(200 100% 55%)" 
//                 strokeWidth="2" 
//               />
//             </>
//           )}

//           {/* Candles & Volume */}
//           <g>
//             {candles.map((candle, i) => {
//               const xPercent = (i / candles.length) * 100;
//               const candleWidth = 100 / candles.length * 0.6; // percentage width
              
//               // Y positions (0% is top, 100% is bottom)
//               const getY = (val: number) => 100 - ((val - minLow) / priceRange) * 80 - 10; // keep in top 80%
              
//               const highY = getY(candle.high);
//               const lowY = getY(candle.low);
//               const openY = getY(candle.open);
//               const closeY = getY(candle.close);
              
//               const isUp = candle.close >= candle.open;
//               const color = isUp ? 'hsl(142 70% 45%)' : 'hsl(0 80% 50%)';
              
//               const bodyTopY = Math.min(openY, closeY);
//               const bodyHeight = Math.max(Math.abs(closeY - openY), 0.5); // min height

//               // Volume bar (bottom 15%)
//               const volHeight = (candle.volume / maxVolume) * 15;
//               const volY = 100 - volHeight;

//               return (
//                 <g key={i}>
//                   {/* Volume */}
//                   <rect 
//                     x={`${xPercent + candleWidth/2}%`} 
//                     y={`${volY}%`} 
//                     width={`${candleWidth}%`} 
//                     height={`${volHeight}%`} 
//                     fill={color} 
//                     opacity="0.3"
//                   />
//                   {/* Wick */}
//                   <line 
//                     x1={`${xPercent + candleWidth}%`} 
//                     y1={`${highY}%`} 
//                     x2={`${xPercent + candleWidth}%`} 
//                     y2={`${lowY}%`} 
//                     stroke={color} 
//                     strokeWidth="1.5" 
//                   />
//                   {/* Body */}
//                   <rect 
//                     x={`${xPercent + candleWidth/2}%`} 
//                     y={`${bodyTopY}%`} 
//                     width={`${candleWidth}%`} 
//                     height={`${bodyHeight}%`} 
//                     fill={isUp ? '#0a0e17' : color} 
//                     stroke={color}
//                     strokeWidth="1.5"
//                   />
//                 </g>
//               );
//             })}
//           </g>
//         </svg>

//         {/* Right Price Axis */}
//         {!hideAxes && (
//           <div className="absolute right-0 top-0 bottom-0 w-14 border-l border-white/10 bg-background/50 backdrop-blur-sm flex flex-col justify-between py-[10%] text-[10px] font-mono text-muted-foreground text-right pr-2">
//             <div>{maxHigh.toFixed(0)}</div>
//             <div>{(maxHigh - priceRange * 0.25).toFixed(0)}</div>
//             <div>{(maxHigh - priceRange * 0.5).toFixed(0)}</div>
//             <div>{(maxHigh - priceRange * 0.75).toFixed(0)}</div>
//             <div>{minLow.toFixed(0)}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
} from "lightweight-charts";

import candleData from "./chartData";

export default function MockCandlestickChart() {
  const chartContainerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(
      chartContainerRef.current,
      {
        width: chartContainerRef.current.clientWidth,
        height: window.innerHeight,

        layout: {
          background: {
            color: 'transparent'
          },
          textColor: "#ffffff",
        },
        
        grid: {
          vertLines: {
            color: "#1c1d1f",
          },
          horzLines: {
            color: "#1c1d1f",
          },
        },
      }
    );
    chart.timeScale().fitContent();

    const candleSeries =
      chart.addSeries(CandlestickSeries);

    candleSeries.setData(candleData);

    return () => chart.remove();
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full"
    />
  );
}