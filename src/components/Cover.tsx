"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon, MoreHorizontal, X } from "lucide-react";
import { useCoverImageStore } from "@/store/useCoverImageStore";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/../convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

interface Props {
  url?: string;
  preview?: boolean;
  isArchived?: boolean;
}

const Cover = ({ url, preview, isArchived }: Props) => {
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
        <div className={cn("relative w-full h-full", isArchived && "hidden")}>
          <div>
            <div className="hidden md:block">
              <Cover.Menu validURL={validURL} setValidURL={setValidURL} />
            </div>
            <div className="absolute bottom-0 right-2 block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="border rounded-sm dark:backdrop-blur-md bg-muted p-1 cursor-pointer md:hidden">
                  <MoreHorizontal className="text-muted-foreground dark:text-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Cover.Menu validURL={validURL} setValidURL={setValidURL} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
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
      <div className="opacity-100 md:opacity-0 group-hover:opacity-100 absolute right-5 bottom-5 flex items-center gap-x-2">
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
