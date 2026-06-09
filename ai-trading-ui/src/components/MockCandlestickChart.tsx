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