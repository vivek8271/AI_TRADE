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

// interface BaseDrawing {
//   id: string;
//   selected: boolean;
//   createdBy: "user" | "ai";
// }

// interface TrendLine extends BaseDrawing {
//   type: "trendline";
//   start: Point;
//   end: Point;
// }

// interface HorizontalLine extends BaseDrawing {
//   type: "horizontalLine";
//   y: number;
// }

// interface RectangleDrawing extends BaseDrawing {
//   type: "rectangle";
//   start: Point;
//   end: Point;
// }

// export type Drawing =
//   | TrendLine
//   | HorizontalLine
//   | RectangleDrawing;