// import { useEffect, useRef } from "react";
// import {
//   createChart,
//   CandlestickSeries,
// } from "lightweight-charts";

// import { candleData } from "./../data/mockData";

// export default function MockCandlestickChart() {
//   const chartContainerRef =
//     useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!chartContainerRef.current) return;

//     const container = chartContainerRef.current;

//     const chart = createChart(container, {
//       width: container.clientWidth,
//       height: container.clientHeight,

//       layout: {
//           background: {
//             color: 'transparent'
//           },
//           textColor: "#ffffff",
//         },
        
//         grid: {
//           vertLines: {
//             color: "#1c1d1f",
//           },
//           horzLines: {
//             color: "#1c1d1f",
//           },
//         },
//     });

//     const candleSeries = chart.addSeries(CandlestickSeries);

//     candleSeries.setData(candleData);

//     chart.timeScale().fitContent();

//     const resizeObserver =
//       new ResizeObserver(() => {
//         chart.applyOptions({
//           width: container.clientWidth,
//           height: container.clientHeight,
//         });
//       });

//     resizeObserver.observe(container);

//     return () => {
//       resizeObserver.disconnect();
//       chart.remove();
//     };
//   }, []);

//   return (
//     <div
//       ref={chartContainerRef}
//       className="w-full h-full"
//     />
//   );
// }