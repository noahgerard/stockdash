"use client";

import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        welcome to the dashboard bro
        <div>
          <Link href={"/dashboard/portfolios/"}>Your Portfolios</Link>
        </div>
      </div>
    </main>
  );
}
