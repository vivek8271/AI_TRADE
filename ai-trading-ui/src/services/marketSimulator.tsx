import { generateCandles } from "../data/candleGenerator";
import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

export default function MarketSimulator() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,

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
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    // initial data
    const candleData = generateCandles({ count: 500, timeframe: "1m" });
    candleSeries.setData(candleData);
    chart.timeScale().fitContent();


    const resizeObserver =
      new ResizeObserver(() => {
        chart.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      });

    resizeObserver.observe(container);

    let tickCount = 0;
    let lastCandle = candleData[candleData.length - 1];
    const interval = setInterval(() => {
      tickCount++;

      const move =
        (Math.random() - 0.5) * 50;

      const updatedClose =
        lastCandle.close + move;

      const updatedCandle = {
        ...lastCandle,

        high: Math.max(
          lastCandle.high,
          updatedClose
        ),

        low: Math.min(
          lastCandle.low,
          updatedClose
        ),

        close: updatedClose,
      };

      candleSeries.update(updatedCandle);

      lastCandle = updatedCandle;

      if (tickCount >= 60) {
        tickCount = 0;

        const newCandle = {
          time: lastCandle.time + 60,

          open: lastCandle.close,

          high: lastCandle.close,

          low: lastCandle.close,

          close: lastCandle.close,
        };

        candleSeries.update(newCandle);

        lastCandle = newCandle;
      }
    }, 1000);

    return () => {
      // resizeObserver.disconnect();
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
