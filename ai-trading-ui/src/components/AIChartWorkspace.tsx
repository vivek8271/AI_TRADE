import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, X, Maximize2, Minimize2, GripHorizontal,
  TrendingUp, Minus, Square, Type, Divide, LayoutGrid, Maximize,
  TerminalSquare
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// import MockCandlestickChart from './MockCandlestickChart';
import MarketSimulator from '../services/marketSimulator';
import type { Timeframe, Tool } from './types/tool';

type ToolItem = {
  tool: Tool;
  icon: React.FC;
};

const tools: ToolItem[] = [
  { tool: 'cursor', icon: Type },
  { tool: 'trendline', icon: TrendingUp },
  { tool: 'horizontalLine', icon: Minus },
  { tool: 'rectangle', icon: Square },
  { tool: 'text', icon: Type },
];

/* ── Shared floating panel hook ── */
function useFloatingPanel(defaultW: number, defaultH: number) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: defaultW, h: defaultH });

  const dragging = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const resizing = useRef(false);
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, w: defaultW, h: defaultH });

  const initPosition = useCallback((offsetX = 0, offsetY = 0) => {
    setPos({
      x: Math.max(20, (window.innerWidth - defaultW) / 2 + offsetX),
      y: Math.max(20, (window.innerHeight - defaultH) / 2 + offsetY),
    });
    setSize({ w: defaultW, h: defaultH });
  }, [defaultW, defaultH]);

  const open = useCallback((offsetX = 0, offsetY = 0) => {
    initPosition(offsetX, offsetY);
    setIsOpen(true);
    setIsMaximized(false);
  }, [initPosition]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback((offsetX = 0, offsetY = 0) => {
    setIsOpen(prev => { if (!prev) { initPosition(offsetX, offsetY); } return !prev; });
    setIsMaximized(false);
  }, [initPosition]);

  const onTitleMouseDown = useCallback((e: React.MouseEvent, curPos: { x: number; y: number }) => {
    dragging.current = true;
    dragStart.current = { mouseX: e.clientX, mouseY: e.clientY, posX: curPos.x, posY: curPos.y };
    e.preventDefault();
  }, []);

  const onResizeMouseDown = useCallback((e: React.MouseEvent, curSize: { w: number; h: number }) => {
    resizing.current = true;
    resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, w: curSize.w, h: curSize.h };
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mouseX;
        const dy = e.clientY - dragStart.current.mouseY;
        setSize(s => {
          setPos({
            x: Math.max(0, Math.min(window.innerWidth - s.w, dragStart.current.posX + dx)),
            y: Math.max(0, Math.min(window.innerHeight - 60, dragStart.current.posY + dy)),
          });
          return s;
        });
      }
      if (resizing.current) {
        const dx = e.clientX - resizeStart.current.mouseX;
        const dy = e.clientY - resizeStart.current.mouseY;
        setSize({
          w: Math.max(320, resizeStart.current.w + dx),
          h: Math.max(220, resizeStart.current.h + dy),
        });
      }
    };
    const onUp = () => { dragging.current = false; resizing.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const toggleMaximize = useCallback(() => {
    setIsMaximized(m => !m);
    setIsOpen(true);
  }, []);

  const panelStyle = (isMax: boolean, p: { x: number; y: number }, s: { w: number; h: number }): React.CSSProperties =>
    isMax
      ? { position: 'fixed', inset: 0, width: '100vw', height: '100vh', borderRadius: 0, zIndex: 99999 }
      : { position: 'fixed', left: p.x, top: p.y, width: s.w, height: s.h, borderRadius: '0.5rem', zIndex: 99999 };

  return { isOpen, isMaximized, pos, size, open, close, toggle, toggleMaximize, onTitleMouseDown, onResizeMouseDown, panelStyle };
}

/* ── Resize grip ── */
function ResizeGrip({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  return (
    <div onMouseDown={onMouseDown}
      className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-10 flex items-end justify-end pb-1.5 pr-1.5">
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-muted-foreground/40">
        <path d="M 9 1 L 1 9 M 9 5 L 5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}



export default function AIChartWorkspace() {
  /* Chart panel */
  const chart = useFloatingPanel(860, 540);
  const [layout, setLayout] = useState<'single' | 'grid'>('single');
  const [activeTool, setActiveTool] = useState<Tool>('cursor');
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");

  /* Chat panel */
  const chat = useFloatingPanel(360, 420);
  const [message, setMessage] = useState('');



  /* ── Chart panel ── */
  const chartPanel = (
    <AnimatePresence>
      {chart.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.15 }}
          className="bg-card border border-border/80 shadow-2xl overflow-auto flex flex-col"
          style={chart.panelStyle(chart.isMaximized, chart.pos, chart.size)}
        >
          {/* Title / drag bar */}
          <div
            onMouseDown={e => !chart.isMaximized && chart.onTitleMouseDown(e, chart.pos)}
            style={{ cursor: chart.isMaximized ? 'default' : 'grab' }}
            className="h-10 border-b border-border flex items-center justify-between px-3 bg-card/80 backdrop-blur-sm select-none shrink-0"
          >
            <div className="flex items-center gap-2 text-sm font-medium font-mono">
              <GripHorizontal className="w-4 h-4 text-muted-foreground/60" />
              <TerminalSquare className="w-4 h-4 text-primary" />
              <span>AI Chart Workspace</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground" onClick={chart.toggleMaximize}>
                {chart.isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-destructive" onClick={chart.close}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="h-11 border-b border-border flex items-center justify-between px-3 bg-background/60 shrink-0 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Select defaultValue="NIFTY">
                <SelectTrigger className="w-[130px] h-7 bg-background border-border font-mono text-xs font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIFTY">NIFTY 50</SelectItem>
                  <SelectItem value="BTC">BTC/USD</SelectItem>
                  <SelectItem value="REL">RELIANCE</SelectItem>
                  <SelectItem value="AAPL">AAPL</SelectItem>
                  <SelectItem value="ETH">ETH/USD</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-4 w-px bg-border" />

              <div className="flex items-center gap-0.5 bg-background rounded border border-border p-0.5">
                {['1m','5m','15m','1H','4H','1D'].map(tf => (
                  <button key={tf} onClick={() => setTimeframe(tf as Timeframe)}
                    className={`px-2 py-0.5 text-xs rounded-sm font-medium transition-colors ${timeframe === tf ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {tf}
                  </button>
                ))}

              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-0.5 bg-background rounded border border-border p-0.5">
                {/* {[TrendingUp, Minus, Square, Divide, Type].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground">
                    <Icon className="w-3.5 h-3.5" />
                  </Button>
                ))} */}

                {tools.map(({ icon: Icon, tool }) => (
                  <Button
                    key={tool}
                    onClick={() => setActiveTool(tool)}
                    variant={
                      activeTool === tool
                        ? "default"
                        : "ghost"
                    }
                  >
                    <Icon />
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-background rounded border border-border p-0.5 shrink-0">
              <Button variant={layout === 'single' ? 'secondary' : 'ghost'} size="icon" className="w-6 h-6" onClick={() => setLayout('single')}>
                <Maximize className="w-3.5 h-3.5" />
              </Button>
              <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" className="w-6 h-6" onClick={() => setLayout('grid')}>
                <LayoutGrid className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 relative overflow-hidden bg-background">
            {layout === 'single' ? (
              // <MockCandlestickChart />
              <MarketSimulator activeTool={activeTool}  timeframe={timeframe} />
            ) : (
              <div className="grid grid-cols-2 grid-rows-2 h-full gap-px bg-border">
                <MarketSimulator activeTool={activeTool}  timeframe={timeframe} />
                <MarketSimulator activeTool={activeTool}  timeframe={timeframe} />
                <MarketSimulator activeTool={activeTool}  timeframe={timeframe} />
                <MarketSimulator activeTool={activeTool}  timeframe={timeframe} />
                {/* <div className="bg-background"><MockCandlestickChart /></div>
                <div className="bg-background"><MockCandlestickChart /></div>
                <div className="bg-background"><MockCandlestickChart /></div>
                <div className="bg-background"><MockCandlestickChart /></div> */}

              </div>
            )}
          </div>
          {!chart.isMaximized && <ResizeGrip onMouseDown={e => chart.onResizeMouseDown(e, chart.size)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ── Chat panel ── */
  const chatPanel = (
    <AnimatePresence>
      {chat.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.15 }}
          className="bg-card border border-border/80 shadow-2xl overflow-hidden flex flex-col"
          style={chat.panelStyle(chat.isMaximized, chat.pos, chat.size)}
        >
          {/* Title / drag bar */}
          <div
            onMouseDown={e => !chat.isMaximized && chat.onTitleMouseDown(e, chat.pos)}
            style={{ cursor: chat.isMaximized ? 'default' : 'grab' }}
            className="h-10 border-b border-border flex items-center justify-between px-3 bg-card/80 backdrop-blur-sm select-none shrink-0"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <GripHorizontal className="w-4 h-4 text-muted-foreground/60" />
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-foreground" onClick={chat.toggleMaximize}>
                {chat.isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </Button>
              <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-destructive" onClick={chat.close}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background/50">
            <p className="text-sm text-muted-foreground">How can I help you trade today?</p>
            <div className="flex flex-wrap gap-2">
              {["Explain RSI", "Risk management tips", "Market summary", "Best entry points", "Stop loss strategy"].map((q) => (
                <button key={q}
                  className="text-xs bg-secondary hover:bg-secondary/80 px-2 py-1 rounded border border-border text-foreground transition-colors text-left">
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card/60 shrink-0 flex gap-2">
            <Input
              placeholder="Ask anything about markets..."
              className="text-sm bg-background flex-1"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button size="sm" className="shrink-0" onClick={() => setMessage('')}>Send</Button>
          </div>

          {!chat.isMaximized && <ResizeGrip onMouseDown={e => chat.onResizeMouseDown(e, chat.size)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {ReactDOM.createPortal(chartPanel, document.body)}
      {ReactDOM.createPortal(chatPanel, document.body)}

      {/* Terminal icon → opens INDEX chart */}
      <div className="fixed bottom-6 right-[5.5rem] z-[99998]">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => chart.isOpen ? chart.close() : chart.open()}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${chart.isOpen
            ? 'bg-destructive/80 text-white'
            : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          title="Index Chart"
        >
          {chart.isOpen ? <X className="w-5 h-5" /> : <TerminalSquare className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Sparkle → opens AI chat */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => chat.isOpen ? chat.close() : chat.open(40, 40)}
        className={`fixed bottom-6 right-6 z-[99998] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${chat.isOpen ? 'bg-destructive/80 text-white' : 'bg-primary text-primary-foreground hover:shadow-primary/30'
          }`}
        title="AI Chat"
      >
        <motion.div animate={{ rotate: chat.isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          {chat.isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        </motion.div>
      </motion.button>
    </>
  );
}
