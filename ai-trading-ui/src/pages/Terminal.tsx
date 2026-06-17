import MarketSimulator from "@/services/marketSimulator";
import AiChartWorkspace from "../components/AIChartWorkspace";
export default function Terminal() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <MarketSimulator />
        </div>
    )
}