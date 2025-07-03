"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  return (
    <div className="col-span-2 max-w-3xl space-y-4">
      <p className="text-lg sm:text-xl md:text-2xl font-medium">
        Write. Organize. Focus. <br />
      </p>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to <span className="underline">Nekopad.</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Create Workspace for Notes, Docs &amp; More
      </h3>

      <Button>
        <Link href="/documents" className="w-full flex items-center">
          Enter Nekopad <ArrowRight className="h-4 w-4 ml-2" />{" "}
        </Link>
      </Button>
    </div>
  );
};

export default Heading;
