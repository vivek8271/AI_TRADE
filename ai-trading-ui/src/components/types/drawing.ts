export interface Point {
  x: number;
  y: number;
}

export interface TrendLine {
  id: string;

  start: Point;

  end: Point;

  createdBy: "user" | "ai";
}