import Image from "next/image";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200">
        <div className="container border-2 flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col md:flex-row p-8 md:p-16 relative">
            <div className="flex basis-1/2 flex-col gap-4 min-w-[100px] z-[1] pb-40">
              <h3 className="font-semibold text-4xl"><span className="text-green-400">Supercharge</span> Your Trading,<br /> Without the Risk</h3>
              <p>StockDash lets you practice trading risk-free with real-time data and powerful portfolio tracking. Refine your strategies, monitor performance, and build confidence—all in one easy-to-use dashboard.</p>
              <div>
                <Link href="/signup">Sign Up</Link>
              </div>
            </div>
            <div className="basis-1/2 min-w-[100px] p-2 z-0">
              <Image src="/blob1.png" alt="Blurry blobs" fill objectFit="contain" />
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
