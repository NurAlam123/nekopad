"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-svh flex flex-col justify-center items-center gap-y-4">
      <h2 className="text-3xl">Something went wrong!</h2>
      <div className="space-x-2">
        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
