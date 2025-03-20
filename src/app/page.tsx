import Image from "next/image";
import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="relative flex flex-col p-8 md:flex-row md:p-16">
            <div className="z-[1] flex min-w-[100px] basis-1/2 flex-col gap-4 pb-40">
              <h3 className="text-4xl font-semibold">
                <span className="text-green-400">Supercharge</span> Your
                Trading,
                <br /> Without the Risk
              </h3>
              <p>
                StockDash lets you practice trading risk-free with real-time
                data and powerful portfolio tracking. Refine your strategies,
                monitor performance, and build confidence—all in one easy-to-use
                dashboard.
              </p>
              <div>
                <Link href="/signup">Sign Up</Link>
              </div>
            </div>
            <div className="z-0 min-w-[100px] basis-1/2 p-2">
              <Image
                src="/blob1.png"
                alt="Blurry blobs"
                fill
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
