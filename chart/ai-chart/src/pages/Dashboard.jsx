import TradingChart from "../components/chart/TradingChart";

const Dashboard = () => {
    return (
        <div className="bg-slate-950 min-h-screen p-5">
            {/* <h1 className="text-white text-3xl mb-5">
                AI Trading Platform
            </h1> */}

            <TradingChart />
        </div>
    );
};

export default Dashboard;