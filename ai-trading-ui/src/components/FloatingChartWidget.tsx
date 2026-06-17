// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, X, Maximize2, Minimize2, GripHorizontal } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import MockCandlestickChart from './MockCandlestickChart';
// import MarketSimulator from '../services/marketSimulator';
// import { TrendingUp, Minus, Square, Type, Divide, LayoutGrid, Maximize } from 'lucide-react';
// import type { Tool } from './types/tool';

// const DEFAULT_W = 820;
// const DEFAULT_H = 520;
// const MIN_W = 420;
// const MIN_H = 300;

// type ToolItem = {
//   tool: Tool;
//   icon: React.FC;
// };
// const tools: ToolItem[] = [
//   { tool: 'cursor', icon: Type },
//   { tool: 'trendline', icon: TrendingUp },
//   { tool: 'horizontalLine', icon: Minus },
//   { tool: 'rectangle', icon: Square },
//   { tool: 'text', icon: Type },
// ];


// export default function FloatingChartWidget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [timeframe, setTimeframe] = useState('15m');
//   const [layout, setLayout] = useState<'single' | 'grid'>('single');
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });

//   const panelRef = useRef<HTMLDivElement>(null);
//   const resizing = useRef(false);
//   const resizeStart = useRef({ mouseX: 0, mouseY: 0, w: DEFAULT_W, h: DEFAULT_H });

//   const [activeTool, setActiveTool] = useState<Tool>('cursor');
//   // const [timeframe, setTimeframe] = useState<Timeframe>("1m");

//   // Center on first open
//   const initPosition = useCallback(() => {
//     setPos({
//       x: Math.max(0, (window.innerWidth - DEFAULT_W) / 2),
//       y: Math.max(0, (window.innerHeight - DEFAULT_H) / 2 - 40),
//     });
//     setSize({ w: DEFAULT_W, h: DEFAULT_H });
//   }, []);

//   const handleOpen = () => {
//     if (!isOpen) initPosition();
//     setIsOpen(true);
//     setIsMaximized(false);
//   };

//   // --- Drag via mousedown on title bar ---
//   const dragging = useRef(false);
//   const dragStart = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });

//   const onTitleMouseDown = (e: React.MouseEvent) => {
//     if (isMaximized) return;
//     dragging.current = true;
//     dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, posX: pos.x, posY: pos.y };
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       if (dragging.current) {
//         const dx = e.clientX - dragStart.current.mouseX;
//         const dy = e.clientY - dragStart.current.mouseY;
//         setPos({
//           x: Math.max(0, Math.min(window.innerWidth - size.w, dragStart.current.posX + dx)),
//           y: Math.max(0, Math.min(window.innerHeight - 60, dragStart.current.posY + dy)),
//         });
//       }
//       if (resizing.current) {
//         const dx = e.clientX - resizeStart.current.mouseX;
//         const dy = e.clientY - resizeStart.current.mouseY;
//         setSize({
//           w: Math.max(MIN_W, resizeStart.current.w + dx),
//           h: Math.max(MIN_H, resizeStart.current.h + dy),
//         });
//       }
//     };
//     const onUp = () => {
//       dragging.current = false;
//       resizing.current = false;
//     };
//     window.addEventListener('mousemove', onMove);
//     window.addEventListener('mouseup', onUp);
//     return () => {
//       window.removeEventListener('mousemove', onMove);
//       window.removeEventListener('mouseup', onUp);
//     };
//   }, [size.w]);

//   // --- Resize handle (bottom-right corner) ---
//   const onResizeMouseDown = (e: React.MouseEvent) => {
//     resizing.current = true;
//     resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, w: size.w, h: size.h };
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const maximize = () => {
//     if (!isMaximized) {
//       setIsMaximized(true);
//     } else {
//       setIsMaximized(false);
//       initPosition();
//     }
//   };

//   return (
//     <>
//       {/* Floating trigger button */}
//       <motion.button
//         whileHover={{ scale: 1.08 }}
//         whileTap={{ scale: 0.93 }}
//         onClick={handleOpen}
//         title="Open Chart"
//         className="fixed bottom-6 right-[5.5rem] z-40 w-12 h-12 rounded-full bg-card border border-primary/30 text-primary flex items-center justify-center shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-colors"
//       >
//         <LineChart className="w-5 h-5" />
//       </motion.button>

//       {/* Floating chart panel */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={panelRef}
//             initial={{ opacity: 0, scale: 0.92 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.92 }}
//             transition={{ duration: 0.18 }}
//             className="bg-card border border-border/80 shadow-2xl overflow-hidden flex flex-col"
//             style={{
//               ...(isMaximized
//                 ? { position: 'fixed' as const, inset: 0, width: '100vw', height: '100vh', borderRadius: 0 }
//                 : { position: 'fixed' as const, left: pos.x, top: pos.y, width: size.w, height: size.h, borderRadius: '0.5rem' }),
//               zIndex: 60,
//             }}
//           >
//             {/* Title / drag bar */}
//             <div
//               onMouseDown={onTitleMouseDown}
//               className="h-10 border-b border-border flex items-center justify-between px-3 bg-card/80 backdrop-blur-sm select-none shrink-0"
//               style={{ cursor: isMaximized ? 'default' : 'grab' }}
//             >
//               <div className="flex items-center gap-2 text-sm font-medium font-mono">
//                 <GripHorizontal className="w-4 h-4 text-muted-foreground" />
//                 <LineChart className="w-4 h-4 text-primary" />
//                 <span className="text-foreground">AI Chart Workspace</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Button
//                   variant="ghost" size="icon"
//                   className="w-6 h-6 text-muted-foreground hover:text-foreground"
//                   onClick={maximize}
//                   title={isMaximized ? 'Restore' : 'Maximize'}
//                 >
//                   {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
//                 </Button>
//                 <Button
//                   variant="ghost" size="icon"
//                   className="w-6 h-6 text-muted-foreground hover:text-destructive"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <X className="w-3.5 h-3.5" />
//                 </Button>
//               </div>
//             </div>

//             {/* Chart controls bar */}
//             <div className="h-11 border-b border-border flex items-center justify-between px-2 bg-background/60 shrink-0">
//               <div className="flex items-center gap-2">
//                 <Select defaultValue="NIFTY">
//                   <SelectTrigger className="w-[130px] h-7 bg-background border-border font-mono text-xs font-medium">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="NIFTY">NIFTY 50</SelectItem>
//                     <SelectItem value="BTC">BTC/USD</SelectItem>
//                     <SelectItem value="REL">RELIANCE</SelectItem>
//                     <SelectItem value="AAPL">AAPL</SelectItem>
//                     <SelectItem value="ETH">ETH/USD</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 <div className="h-4 w-px bg-border" />

//                 <div className="flex items-center gap-0.5 bg-background rounded border border-border p-0.5">
//                   {['1m', '5m', '15m', '1H', '4H', '1D'].map(tf => (
//                     <button
//                       key={tf}
//                       onClick={() => setTimeframe(tf)}
//                       className={`px-2 py-0.5 text-xs rounded-sm font-medium transition-colors ${timeframe === tf ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
//                     >
//                       {tf}
//                     </button>
//                   ))}
//                 </div>

//                 <div className="h-4 w-px bg-border" />

//                 <div className="flex items-center gap-0.5 bg-background rounded border border-border p-0.5">
//                   <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground"><TrendingUp className="w-3.5 h-3.5" /></Button>
//                   <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground"><Minus className="w-3.5 h-3.5" /></Button>
//                   <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground"><Square className="w-3.5 h-3.5" /></Button>
//                   <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground"><Divide className="w-3.5 h-3.5" /></Button>
//                   <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground"><Type className="w-3.5 h-3.5" /></Button>
//                 </div>
//               </div>

//               <div className="flex items-center gap-1 bg-background rounded border border-border p-0.5">
//                 <Button variant={layout === 'single' ? 'secondary' : 'ghost'} size="icon" className="w-6 h-6" onClick={() => setLayout('single')}>
//                   <Maximize className="w-3.5 h-3.5" />
//                 </Button>
//                 <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-6 h-6" onClick={() => setLayout('grid')}>
//                   <LayoutGrid className="w-3.5 h-3.5" />
//                 </Button>
//               </div>
//             </div>

//             {/* Chart + Watchlist body */}
//             <div className="flex flex-1 overflow-hidden">
//               <div className="flex-1 relative overflow-hidden bg-background">
//                 {layout === 'single' ? (
//                   // <MockCandlestickChart />
//                   <MarketSimulator activeTool={activeTool} timeframe={timeframe} />
//                 ) : (
//                   <div className="grid grid-cols-2 grid-rows-2 h-full gap-px bg-border">
//                     <div className="bg-background"><MockCandlestickChart symbol="NIFTY 50" hideAxes /></div>
//                     <div className="bg-background"><MockCandlestickChart symbol="BTC/USD" hideAxes /></div>
//                     <div className="bg-background"><MockCandlestickChart symbol="RELIANCE" hideAxes /></div>
//                     <div className="bg-background"><MockCandlestickChart symbol="ETH/USD" hideAxes /></div>
//                   </div>
//                 )}
//               </div>

//             </div>

//             {/* Resize handle */}
//             {!isMaximized && (
//               <div
//                 onMouseDown={onResizeMouseDown}
//                 className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize z-10 flex items-end justify-end pb-1 pr-1"
//               >
//                 <svg width="10" height="10" viewBox="0 0 10 10" className="text-muted-foreground/50">
//                   <path d="M 9 1 L 1 9 M 9 5 L 5 9 M 9 9 L 9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                 </svg>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
