"use client";

import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { api } from "@/../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentID: string) => router.push(`/documents/${documentID}`));

    toast.promise(promise, {
      loading: "Creating a new note",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-svh flex flex-col gap-2 items-center justify-center">
      <Logo className="size-32" />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Nekopad
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-1" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentPage;
