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

interface Props {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: Props) => {
  const params = useParams();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const coverImage = useCoverImageStore();

  const onRemove = () => {
    removeCoverImage({
      id: params.documentID as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted",
      )}
    >
      {!!url && (
        <Image
          src={url}
          fill
          alt="Cover"
          className="object-cover"
          {...(url.includes(".gif") && { unoptimized: true })}
        />
      )}

      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute right-5 bottom-5 flex items-center gap-x-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="size-4 mr-2" />
            Change cover
          </Button>

          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="size-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
