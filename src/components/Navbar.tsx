"use client";

import Link from "next/link";
import ProfileArea from "./ProfileArea";

export function Navbar() {
  return (
    <div className="absolute flex w-full justify-center bg-slate-100">
      <div className="container flex items-center justify-between p-4">
        <p className="text-black text-xl font-semibold h-fit"><Link href="/">StockDash</Link></p>
        <ProfileArea />
      </div>
    </div>
  );
}
