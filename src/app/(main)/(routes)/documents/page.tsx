"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";

const DocumentPage = () => {
  const { user } = useUser();
  return (
    <div className="h-svh flex flex-col gap-2 items-center justify-center">
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Nekopad
      </h2>
      <Button>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentPage;
