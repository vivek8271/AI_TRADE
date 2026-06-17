// import React, { useState } from 'react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
// import { LayoutGrid, Maximize, TrendingUp, Minus, Square, Type, Divide } from 'lucide-react';
// import MockCandlestickChart from './MockCandlestickChart';
// import WatchlistPanel from './WatchlistPanel';
// import { createChart, CandlestickSeries } from "lightweight-charts";
// // import candleData from "./chartData";


// export default function AIAssistantWidget() {
//   const [timeframe, setTimeframe] = useState('15m');
//   const [layout, setLayout] = useState('single');

//   // const chartContainerRef = useRef();
  
//   //     useEffect(() => {
//   //         const chart = createChart(chartContainerRef.current, {
//   //             width: chartContainerRef.current.clientWidth,
//   //             height: window.innerHeight,
  
//   //             layout: {
//   //                 background: {
//   //                     color: "#0f172a",
//   //                 },
//   //                 textColor: "#ffffff",
//   //             },
  
//   //             grid: {
//   //                 vertLines: {
//   //                     color: "#37393d",
//   //                 },
//   //                 horzLines: {
//   //                     color: "#282a2e",
//   //                 },
//   //             },
//   //         });
  
//   //         const candlestickSeries = chart.addSeries(
//   //             CandlestickSeries
//   //         );
  
//   //         candlestickSeries.setData(candleData);
  
//   //         const handleResize = () => {
//   //             chart.applyOptions({
//   //                 width: chartContainerRef.current.clientWidth,
//   //             });
//   //         };
  
//   //         window.addEventListener("resize", handleResize);
  
//   //         return () => {
//   //             window.removeEventListener("resize", handleResize);
//   //             chart.remove();
//   //         };
//   //     }, []);

//   return (
//     <div className="flex h-full w-full bg-background">
//       <div className="flex-1 flex flex-col h-full border-r border-border">
//         {/* Chart Controls */}
//         <div className="h-12 border-b border-border flex items-center justify-between px-2 bg-card/40 shrink-0">
//           <div className="flex items-center gap-2">
//             <Select defaultValue="NIFTY">
//               <SelectTrigger className="w-[140px] h-8 bg-background border-border font-mono font-medium">
//                 <SelectValue placeholder="Symbol" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="NIFTY">NIFTY 50</SelectItem>
//                 <SelectItem value="BTC">BTC/USD</SelectItem>
//                 <SelectItem value="REL">RELIANCE</SelectItem>
//                 <SelectItem value="AAPL">AAPL</SelectItem>
//                 <SelectItem value="ETH">ETH/USD</SelectItem>
//               </SelectContent>
//             </Select>

//             <div className="h-4 w-px bg-border mx-1" />

//             <div className="flex items-center gap-1 bg-background rounded-md border border-border p-0.5">
//               {['1m', '5m', '15m', '1H', '4H', '1D'].map(tf => (
//                 <button
//                   key={tf}
//                   onClick={() => setTimeframe(tf)}
//                   className={`px-2 py-1 text-xs rounded-sm font-medium transition-colors ${timeframe === tf ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
//                 >
//                   {tf}
//                 </button>
//               ))}
//             </div>

//             <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

//             {/* Drawing Tools */}
//             <div className="hidden sm:flex items-center gap-1 bg-background rounded-md border border-border p-0.5">
//               <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground"><TrendingUp className="w-4 h-4" /></Button>
//               <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground"><Minus className="w-4 h-4" /></Button>
//               <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground"><Square className="w-4 h-4" /></Button>
//               <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground"><Divide className="w-4 h-4" /></Button>
//               <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground"><Type className="w-4 h-4" /></Button>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1 bg-background rounded-md border border-border p-0.5">
//               <Button variant={layout === 'single' ? 'secondary' : 'ghost'} size="icon" className="w-7 h-7" onClick={() => setLayout('single')}>
//                 <Maximize className="w-4 h-4" />
//               </Button>
//               <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-7 h-7" onClick={() => setLayout('grid')}>
//                 <LayoutGrid className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Chart Area */}

      
// {/* 
//         <div className="flex-1 relative overflow-hidden bg-background">
//           {layout === 'single' ? (
//             <MockCandlestickChart />
//           ) : (
//             <div className="grid grid-cols-2 grid-rows-2 h-full gap-px bg-border">
//               <div className="bg-background"><MockCandlestickChart symbol="NIFTY 50" hideAxes /></div>
//               <div className="bg-background"><MockCandlestickChart symbol="BTC/USD" hideAxes /></div>
//               <div className="bg-background"><MockCandlestickChart symbol="RELIANCE" hideAxes /></div>
//               <div className="bg-background"><MockCandlestickChart symbol="ETH/USD" hideAxes /></div>
//             </div>
//           )}
//         </div>*/}
//       </div> 

//       {/* Right Watchlist */}
//       {/* <div className="w-[280px] h-full hidden lg:block shrink-0 bg-card/40">
//         <WatchlistPanel />
//       </div> */}
//     </div>
//   );
// }