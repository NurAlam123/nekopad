import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-svh flex justify-center items-center">
      <div>
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">404</h1>
          <span className="inline-block h-full mx-1 text-2xl">|</span>
          <h2 className="text-3xl font-semibold">Not Found</h2>
        </div>
        <Button className="w-full mt-4">
          <Link href="/" className="w-full">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
