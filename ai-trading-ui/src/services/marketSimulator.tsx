import { generateCandles } from "../data/candleGenerator";
import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import type { TrendLine, Point } from "@/components/types/drawing";
import type { Timeframe, Tool } from "@/components/types/tool";

interface Props {
  activeTool: Tool;
  timeframe: Timeframe;
}


export default function MarketSimulator({ activeTool, timeframe }: Props) {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [trendLines, setTrendLines] =
    useState<TrendLine[]>([]);
  // const [drawings, setDrawings] =
  //   useState<Drawing[]>([]);

  const [mousePoint, setMousePoint] =
    useState<Point | null>(null);

  const [startPoint, setStartPoint] =
    useState<Point | null>(null);

  const handleClick = (
    e: React.MouseEvent<SVGSVGElement>
  ) => {
    // if (activeTool !== "trendline")
    //   return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (!startPoint) {
      setStartPoint(point);
      return;
    }

    const newLine: TrendLine = {
      id: crypto.randomUUID(),
      start: startPoint,
      end: point,
      createdBy: "user",
    };
    // const newLine: TrendLine = {
    //   id: crypto.randomUUID(),
    //   type: "trendline",

    //   start: startPoint,
    //   end: point,

    //   selected: false,

    //   createdBy: "user",
    // };

    setTrendLines((prev) => [
      ...prev,
      newLine,
    ]);

    setStartPoint(null);
  };

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

      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },

      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
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
    const candleData = generateCandles({ count: 500, timeframe });
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

      const move = (Math.random() - 0.5) * 50;

      const updatedClose = lastCandle.close + move;

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
      resizeObserver.disconnect();
      clearInterval(interval);
      chart.remove();
    };
  }, [timeframe]);


  return (
    <div className="relative w-full h-full">
      <div

        ref={chartContainerRef}
        className="w-full h-full cursor-crosshair"
      />

      <svg
        className="absolute inset-0 w-full h-full"
        onClick={handleClick}
        style={{
          zIndex: 999,
          pointerEvents:
            activeTool === "trendline"
              ? "auto"
              : "none",
        }}

        onMouseMove={(e) => {
          const rect =
            e.currentTarget.getBoundingClientRect();

          setMousePoint({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
      >
        {trendLines.map((line) => (
          <line
            key={line.id}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="#FFD700"
            strokeWidth={2}
          ></line>
        ))}

        {startPoint && mousePoint &&
          activeTool === "trendline" && (
            <line
              x1={startPoint.x}
              y1={startPoint.y}
              x2={mousePoint.x}
              y2={mousePoint.y}
              stroke="#FFD700"
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          )
        }

      </svg>
    </div>
  )
}
