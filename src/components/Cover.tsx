"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImageStore } from "@/store/useCoverImageStore";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/../convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  const [validURL, setValidURL] = useState<string>("");

  useEffect(() => {
    async function checkValidImage() {
      if (!url) return;

      const res = await fetch(
        `/api/validate-image?url=${encodeURIComponent(url)}`,
      );

      const data = await res.json();

      if (data.valid) {
        setValidURL(url);
      } else {
        setValidURL("");
      }
    }

    checkValidImage();
  }, [url]);

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !validURL && "h-[12vh]",
        validURL && "bg-muted",
      )}
    >
      {!!validURL && (
        <Image
          src={validURL}
          fill
          alt="Cover"
          className="object-cover"
          {...(validURL.includes(".gif") && { unoptimized: true })}
        />
      )}

      {validURL && !preview && (
        <Cover.Menu validURL={validURL} setValidURL={setValidURL} />
      )}
    </div>
  );
};

Cover.Menu = function CoverMenu({
  validURL,
  setValidURL,
}: {
  validURL: string;
  setValidURL: React.Dispatch<React.SetStateAction<string>>;
}) {
  const coverImage = useCoverImageStore();

  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const { edgestore } = useEdgeStore();

  const onRemove = async () => {
    if (validURL)
      try {
        await edgestore.publicFiles.delete({
          url: validURL,
        });
      } catch {}

    removeCoverImage({
      id: params.documentID as Id<"documents">,
    });

    setValidURL("");
  };

  return (
    <>
      <div className="opacity-0 group-hover:opacity-100 absolute right-5 bottom-5 flex items-center gap-x-2">
        <Button
          onClick={() => coverImage.onReplace(validURL)}
          className="text-muted-foreground text-xs dark:backdrop-blur-md dark:text-foreground dark:hover:text-muted"
          variant="outline"
          size="sm"
        >
          <ImageIcon className="size-4 mr-2" />
          Change cover
        </Button>

        <Button
          onClick={onRemove}
          className="text-muted-foreground text-xs dark:backdrop-blur-md dark:text-foreground dark:hover:text-muted"
          variant="outline"
          size="sm"
        >
          <X className="size-4 mr-2" />
          Remove
        </Button>
      </div>
    </>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[22vh]" />;
};

export default Cover;
