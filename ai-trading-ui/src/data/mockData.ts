import { generateCandles } from "./candleGenerator";

export const candleData = generateCandles({ count: 500, timeframe: "1m" });