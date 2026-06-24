import TrendlineRenderer from "./renderers/TrendlineRenderer";

interface Props {
  trendLines: any[];

  selectedLineId: string | null;

  setSelectedLineId: (
    id: string
  ) => void;

  handleClick: (
    e: React.MouseEvent<SVGSVGElement>
  ) => void;

  handleMouseMove: (
    e: React.MouseEvent<SVGSVGElement>
  ) => void;

  activeTool: string;
}

export default function DrawingCanvas({
  trendLines,
  selectedLineId,
  setSelectedLineId,
  handleClick,
  handleMouseMove,
  activeTool,
}: Props) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      style={{
        zIndex: 999,
        pointerEvents:
          activeTool === "trendline"
            ? "auto"
            : "none",
      }}
    >
      <TrendlineRenderer
        trendLines={trendLines}
        selectedLineId={
          selectedLineId
        }
        setSelectedLineId={
          setSelectedLineId
        }
      />
    </svg>
  );
}