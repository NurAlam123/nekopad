"use client";

import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "@/../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface Props {
  parentDocumentID?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const DocumentList = ({ parentDocumentID, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();

  const [expended, setExpended] = useState<Record<string, boolean>>({});

  const onExpend = (documentID: string) => {
    setExpended((prev) => ({
      ...prev,
      [documentID]: !prev[documentID],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentID,
  });

  const onRedirect = (documentID: string) => {
    router.push(`/documents/${documentID}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />

        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expended && "last:block",
          level === 0 && "hidden",
        )}
      >
        No pages inside
      </p>

      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            level={level}
            active={params.documentID === document._id}
            onExpend={() => onExpend(document._id)}
          />
          {expended[document._id] && (
            <DocumentList parentDocumentID={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
