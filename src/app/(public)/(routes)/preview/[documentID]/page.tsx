"use client";

import { notFound, useParams } from "next/navigation";

import { Id } from "@/../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/ThemeToggle";

const PreviewPage = () => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    [],
  );

  const params = useParams<{ documentID: Id<"documents"> }>();

  const document = useQuery(api.documents.getByID, {
    documentID: params.documentID,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentID,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />

        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10 h-svh">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return notFound();
  }

  return (
    <div className="pb-40">
      <div className="absolute top-2 right-4 z-[999]">
        <ThemeToggle />
      </div>
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />

        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default PreviewPage;
