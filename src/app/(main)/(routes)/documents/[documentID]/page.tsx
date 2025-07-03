"use client";

import { useParams } from "next/navigation";

import { Id } from "@/../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

import Toolbar from "@/components/Toolbar";
import Cover from "@/components/Cover";

const DocumentPage = () => {
  const params = useParams<{ documentID: Id<"documents"> }>();

  const document = useQuery(api.documents.getByID, {
    documentID: params.documentID,
  });

  if (document === undefined) {
    return <div>Loading</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentPage;
