import Image from "next/image";
import { api } from "~/trpc/server";
import TickerPage from "./tickerPage";

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;

  const tickerData = await api.polygon.getStock({ ticker });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex">
          {tickerData.branding?.icon_url ? (
            <Image
              src={
                "https://placehold.co/600x600" /* tickerData.branding.icon_url */
              }
              alt={tickerData.ticker + " icon image"}
              width={50}
              height={50}
            />
          ) : (
            <div>No Image Available</div>
          )}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-2xl font-bold text-black">
              {tickerData.ticker}
            </h1>
            <p className="text-sm text-gray-500">
              {tickerData.description ?? "No description available"}
            </p>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-black">{tickerData.name}</h1>
        <TickerPage ticker="AAPL" />
      </div>
    </main>
  );
}
