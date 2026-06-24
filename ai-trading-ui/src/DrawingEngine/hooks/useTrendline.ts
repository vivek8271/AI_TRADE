import { useState } from "react";

import type {
  Point,
  TrendLine,
} from "../types/drawing";
import type { Tool } from "../types/tool";

interface Props {
  trendLines: TrendLine[];

  selectedLineId: string | null;

  handleClick: (
    e: React.MouseEvent<SVGSVGElement>
  ) => void;

  handleMouseMove: (
    e: React.MouseEvent<SVGSVGElement>
  ) => void;

  handleeMouseUp: () => void;

  activeTool: Tool;
}

export function useTrendline({
  trendLines,
  selectedLineId,
  handleClick,
  handleMouseMove,
  handleMouseUp,
  activeTool,
}: Props) {

  const [trendLines, setTrendLines] =
    useState<TrendLine[]>([]);

  const [startPoint, setStartPoint] =
    useState<Point | null>(null);

  const [mousePoint, setMousePoint] =
    useState<Point | null>(null);

  const [selectedLineId, setSelectedLineId] =
    useState<string | null>(null);

  const [draggingLineId, setDraggingLineId] =
    useState<string | null>(null);

  const [draggingPoint, setDraggingPoint] =
    useState<"start" | "end" | null>(null);

  const [isDraggingLine, setIsDraggingLine] =
    useState(false);

  const [lastMousePos, setLastMousePos] =
    useState<Point | null>(null);


  const onCanvasClick = (
    e: React.MouseEvent<SVGSVGElement>
  ) => {
    setSelectedLineId(null);
    const rect = e.currentTarget.getBoundingClientRect();

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

    setTrendLines((prev) => [
      ...prev,
      newLine,
    ]);

    setStartPoint(null);
  };


  const onCanvasMouseMove = (
    e: React.MouseEvent<SVGSVGElement>
  ) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    if (
      draggingLineId &&
      isDraggingLine &&
      !draggingPoint &&
      lastMousePos
    ) {
      const dx =
        x - lastMousePos.x;

      const dy =
        y - lastMousePos.y;

      setTrendLines((prev) =>
        prev.map((line) => {

          if (
            line.id !== draggingLineId
          )
            return line;

          return {
            ...line,

            start: {
              x: line.start.x + dx,
              y: line.start.y + dy,
            },

            end: {
              x: line.end.x + dx,
              y: line.end.y + dy,
            },
          };
        })
      );

      setLastMousePos({
        x,
        y,
      });
    }

  };
  const onCanvasMouseUp = () => {
    setDraggingLineId(null);
    setDraggingPoint(null);
  };

  return {

    trendLines,

    startPoint,

    mousePoint,

    selectedLineId,

    draggingLineId,

    draggingPoint,

    isDraggingLine,

    setSelectedLineId,

    onCanvasClick,

    onCanvasMouseMove,

    onCanvasMouseUp,

    setDraggingLineId,

    setDraggingPoint,

    setIsDraggingLine,

    setLastMousePos,
  };
}