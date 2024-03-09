"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col w-full">
      <hr className="w-full flex" />
      <div className="flex items-center justify-between w-[98%] ml-4 h-12">
        <Link href="/terms">Terms and Conditions</Link>
        <Link href="/privacypolicy">Privacy Policy</Link>
      </div>
    </div>
  );
}
