import { generateCandles } from "../data/candleGenerator";
import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import type { UTCTimestamp } from "lightweight-charts";
import type { TrendLine, Point } from "@/DrawingEngine/types/drawing";
import type { Timeframe, Tool } from "@/DrawingEngine/types/tool";
import DrawingCanvas from "@/DrawingEngine/DrwingCanvas";
import { useTrendline } from "@/DrawingEngine/hooks/useTrendline";


interface Props {
  activeTool: Tool;
  timeframe: Timeframe;
}


export default function MarketSimulator({ activeTool, timeframe }: Props) {

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const trendline = useTrendline();

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
          time: (lastCandle.time + 60) as UTCTimestamp,

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


  // useEffect(() => {
  //   const handleDelete =
  //     (e: KeyboardEvent) => {

  //       if (
  //         e.key !== "Delete"
  //       )
  //         return;

  //       if (!selectedLineId)
  //         return;

  //       setTrendLines((prev) =>
  //         prev.filter(
  //           (line) =>
  //             line.id !==
  //             selectedLineId
  //         )
  //       );

  //       setSelectedLineId(null);
  //     };

  //   window.addEventListener(
  //     "keydown",
  //     handleDelete
  //   );

  //   return () => {
  //     window.removeEventListener(
  //       "keydown",
  //       handleDelete
  //     );
  //   };
  // }, [selectedLineId]);

  // useEffect(() => {
  //   const handleMouseUp = () => {
  //     setDraggingLineId(null);
  //     setDraggingPoint(null);
  //   };

  //   window.addEventListener(
  //     "mouseup",
  //     handleMouseUp
  //   );

  //   return () =>
  //     window.removeEventListener(
  //       "mouseup",
  //       handleMouseUp
  //     );
  // }, []);

  // const handleMouseMove = (
  //   e: React.MouseEvent<SVGSVGElement>
  // ) => {
  //   const rect =
  //     e.currentTarget.getBoundingClientRect();

  //   const x =
  //     e.clientX - rect.left;

  //   const y =
  //     e.clientY - rect.top;

  //   if (
  //     draggingLineId &&
  //     isDraggingLine &&
  //     !draggingPoint &&
  //     lastMousePos
  //   ) {
  //     const dx =
  //       x - lastMousePos.x;

  //     const dy =
  //       y - lastMousePos.y;

  //     setTrendLines((prev) =>
  //       prev.map((line) => {

  //         if (
  //           line.id !== draggingLineId
  //         )
  //           return line;

  //         return {
  //           ...line,

  //           start: {
  //             x: line.start.x + dx,
  //             y: line.start.y + dy,
  //           },

  //           end: {
  //             x: line.end.x + dx,
  //             y: line.end.y + dy,
  //           },
  //         };
  //       })
  //     );

  //     setLastMousePos({
  //       x,
  //       y,
  //     });
  //   }

  //   // if (
  //   //   draggingLineId &&
  //   //   draggingPoint
  //   // ) {
  //   //   setTrendLines((prev) =>
  //   //     prev.map((line) => {

  //   //       if (
  //   //         line.id !== draggingLineId
  //   //       )
  //   //         return line;

  //   //       if (
  //   //         draggingPoint === "start"
  //   //       ) {
  //   //         return {
  //   //           ...line,

  //   //           start: {
  //   //             x,
  //   //             y,
  //   //           },
  //   //         };
  //   //       }

  //   //       return {
  //   //         ...line,

  //   //         end: {
  //   //           x,
  //   //           y,
  //   //         },
  //   //       };
  //   //     })
  //   //   );
  //   // }
  // };

  return (
    <div className="relative w-full h-full">
      <div

        ref={chartContainerRef}
        className="w-full h-full cursor-crosshair"
      />

      {/* <svg
        className="absolute inset-0 w-full h-full"
        onClick={handleClick}
        style={{
          zIndex: 999,
          pointerEvents:
            activeTool === "trendline"
              ? "auto"
              : "none",
        }}
        onMouseMove={handleMouseMove}

        onMouseUp={() => {
          setDraggingLineId(null);
          setDraggingPoint(null);
          setIsDraggingLine(false);
          setLastMousePos(null);
        }}
      >
        {trendLines.map((line) => (


          <g key={line.id}>
            <line
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke="transparent"
              strokeWidth={15}
              onClick={(e) => {
                e.stopPropagation();

                setSelectedLineId(line.id);
              }}
            />

            <line
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}
              stroke={
                selectedLineId === line.id
                  ? "#00FFFF"
                  : "#FFD700"
              }
              strokeWidth={
                selectedLineId === line.id
                  ? 4
                  : 2
              }
            />

            <line
              x1={line.start.x}
              y1={line.start.y}
              x2={line.end.x}
              y2={line.end.y}

              stroke="transparent"
              strokeWidth={15}

              onMouseDown={(e) => {
                e.stopPropagation();

                const rect =
                  e.currentTarget.ownerSVGElement!.getBoundingClientRect();

                setDraggingLineId(line.id);

                setIsDraggingLine(true);

                setLastMousePos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
            /> */}
      {/* // profestionally drawn circles to indicate selected line endpoints */}

      {/* {selectedLineId === line.id && (
              <>
                <circle
                  cx={line.start.x}
                  cy={line.start.y}
                  r={8}
                  fill="#00FFFF"
                  cursor="pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    setDraggingLineId(line.id);

                    setDraggingPoint("start");
                  }}
                />

                <circle
                  cx={line.end.x}
                  cy={line.end.y}
                  r={8}
                  fill="#00FFFF"
                  cursor="pointer"
                  onMouseDown={(e) => {
                    e.stopPropagation();

                    setDraggingLineId(line.id);

                    setDraggingPoint("end");
                  }}
                />
              </>
            )}
          </g>

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

      </svg> */}

      <DrawingCanvas

        trendLines={
          trendline.trendLines
        }

        selectedLineId={
          trendline.selectedLineId
        }

        handleClick={
          trendline.onCanvasClick
        }

        handleMouseMove={
          trendline.onCanvasMouseMove
        }

        handleMouseUp={
          trendline.onCanvasMouseUp
        }

        activeTool={
          activeTool
        }
      />
  
    </div>
  )
}
