"use client";
import dynamic from "next/dynamic";
const SymbolOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SymbolOverview),
  {
    ssr: false,
  },
);

import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


export default function TickerPage({ ticker }: { ticker: string }) {
  return (
    <><div className="h-screen w-full">
      <AdvancedRealTimeChart theme="dark" autosize></AdvancedRealTimeChart>
	</div>

    </>
  );
}
