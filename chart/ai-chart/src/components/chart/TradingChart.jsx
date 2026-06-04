import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";


import candleData from "./chartData";

const TradingChart = () => {
    const chartContainerRef = useRef();
    // const [lines, setLines] = useState([]);
    // const [startPoint, setStartPoint] = useState(null);

    // const handleClick = (e) => {
    //     const rect = e.currentTarget.getBoundingClientRect();

    //     const point = {
    //         x: e.clientX - rect.left,
    //         y: e.clientY - rect.top,
    //     };

    //     if (!startPoint) {
    //         setStartPoint(point);
    //         return;
    //     }

    //     const newLine = {
    //         id: Date.now(),
    //         x1: startPoint.x,
    //         y1: startPoint.y,
    //         x2: point.x,
    //         y2: point.y,
    //     };

    //     setLines((prev) => [...prev, newLine]);
    //     setStartPoint(null);
    // };

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: window.innerHeight,

            layout: {
                background: {
                    color: "#0f172a",
                },
                textColor: "#ffffff",
            },

            grid: {
                vertLines: {
                    color: "#37393d",
                },
                horzLines: {
                    color: "#282a2e",
                },
            },
        });

        const candlestickSeries = chart.addSeries(
            CandlestickSeries
        );

        candlestickSeries.setData(candleData);

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    return (

        <div
            ref={chartContainerRef}
            className="w-full"
        />

        
    );
};

export default TradingChart;