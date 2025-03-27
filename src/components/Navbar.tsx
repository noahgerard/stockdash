"use client";

import Link from "next/link";
import ProfileArea from "./ProfileArea";

export function Navbar() {
  return (
    <div className="absolute flex w-full justify-center bg-slate-100">
      <div className="container flex items-center justify-between p-4">
        <p className="h-fit text-xl font-semibold text-black">
          <Link href="/">StockDash</Link>
        </p>
        <div className="flex gap-2">
          <ProfileArea />
        </div>
      </div>
    </div>
  );
}
