import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeContext } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import React from "react";
import NotFound from "./pages/not-found";
import MainLayout from "./components/layout/MainLayout";
// import Terminal from "./services/marketSimulator";
import Workspace from "./pages/Workspace";
import Journal from "./pages/Journal";
import Risk from "./pages/Risk";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Backtesting from "./pages/Backtesting";
import CommandPalette from "./components/CommandPalette";
import portfolio from "./pages/Portfolio";
import Terminal from "./pages/Terminal";
import charts from "./pages/Charts";
import WatchlistPanel from "./components/WatchlistPanel";
// import FloatingChartWidget from "./components/FloatingChartWidget"; 
// import AIAssistantWidget from "./components/AIAssistantWidget";
import AIChartWorkspace from "./components/AIChartWorkspace";
const queryClient = new QueryClient();

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Workspace} />
        <Route path="/watchlist" component={WatchlistPanel} />
        <Route path="/portfolio" component={portfolio} />
        <Route path="/charts" component={charts} />
        <Route path="/journal" component={Journal} />
        <Route path="/risk" component={Risk} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/backtesting" component={Backtesting} />
        <Route path="/terminal" component={Terminal} />
        {/* <Route path="/ai-assistant" component={AIAssistantWidget} /> */}
        <Route path="/ai-chart-workspace" component={AIChartWorkspace} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined"){
      const stored = localStorage.getItem("theme");
      if (stored) return stored as "light" | "dark";
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <AIChartWorkspace />
          {/* <FloatingChartWidget /> */}
          <Toaster />
          <CommandPalette />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
