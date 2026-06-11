import type { UTCTimestamp } from "lightweight-charts";

type Timeframe = "1ms" | "1s" | "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

export function generateCandles({
  count,
  startPrice = 25000,
  timeframe = "1m",
}: {
  count: number;
  startPrice?: number;
  timeframe?: Timeframe;
}) {
  const candles = [];

  let currentPrice = startPrice;

  // timeframe in milliseconds
  const timeframeMs: Record<Timeframe, number> = {
    "1ms": 1,
    "1s": 1000,
    "1m": 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "1h": 60 * 60 * 1000,
    "4h": 4 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
  };

  const startDate = new Date("2026-01-01T00:00:00Z");

  for (let i = 0; i < count; i++) {
    const open = currentPrice;

    const move = (Math.random() - 0.5) * 200;
    const close = open + move;

    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;

    const currentDate = new Date(
      startDate.getTime() + i * timeframeMs[timeframe]
    );

    candles.push({
      // lightweight-charts expects seconds for intraday data
    //   time: currentDate
    // .toISOString()
    // .split("T")[0],
      time: Math.floor(currentDate.getTime() / 1000) as UTCTimestamp,
      open,
      high,
      low,
      close,
    });

    currentPrice = close;
  }

  return candles;
}
