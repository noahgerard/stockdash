"use client";

import Link from "next/link";
import ProfileArea from "./ProfileArea";
import FancySearch from "./FancySearch";

export function Navbar() {
  return (
    <div className="fixed flex w-full justify-center bg-slate-100">
      <div className="container flex items-center justify-between p-4">
        <p className="h-fit text-xl font-semibold text-black">
          <Link href="/">StockDash</Link>
        </p>
        <FancySearch />
        <div className="flex gap-2">
          <ProfileArea />
        </div>
      </div>
    </div>
  );
}
