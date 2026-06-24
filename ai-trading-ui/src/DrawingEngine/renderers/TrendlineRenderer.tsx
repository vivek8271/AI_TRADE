import type { TrendLine } from "../types/drawing";

interface Props {
  trendLines: TrendLine[];

  selectedLineId: string | null;

  setSelectedLineId: (
    id: string
  ) => void;
}

export default function TrendlineRenderer({
  trendLines,
  selectedLineId,
  setSelectedLineId,
}: Props) {
  return (
    <>
      {trendLines.map((line) => (
        <g key={line.id}>
          <line
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="transparent"
            strokeWidth={15}
            onMouseDown={(e) => {
              e.stopPropagation();

              setSelectedLineId(
                line.id
              );
            }}
          />

          <line
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke={
              selectedLineId ===
              line.id
                ? "#00FFFF"
                : "#FFD700"
            }
            strokeWidth={
              selectedLineId ===
              line.id
                ? 4
                : 2
            }
          />
        </g>
      ))}
    </>
  );
}