"use client";

import { Button } from "@/components/ui/button";
import Header from "./__components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-2 w-full h-full">
      <div className="flex w-full justify-center items-center text-center mt-2">
        <Header />
      </div>
      <div className="flex justify-center items-center w-full text-center">
        <Button asChild>
          <Link href="/signin">Begin</Link>
        </Button>
      </div>
    </div>
  );
}
