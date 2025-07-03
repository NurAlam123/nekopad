"use client";

import { useCallback, useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useCoverImageStore } from "@/store/useCoverImageStore";

import { UploaderProvider, UploadFn } from "../upload/uploader-provider";
import { SingleImageDropzone } from "../upload/single-image";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CoverImageModal = () => {
  const params = useParams();

  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrlError, setImageUrlError] = useState<string>();

  const { onClose, isOpen, url } = useCoverImageStore();

  const { edgestore } = useEdgeStore();

  const update = useMutation(api.documents.update);

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
        signal,
        onProgressChange,
      });

      await update({
        id: params.documentID as Id<"documents">,
        coverImage: res.url,
      });

      onClose();

      return res;
    },
    [edgestore, params, update, url, onClose],
  );

  const onClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (!imageUrl || !imageUrl.trim()) {
      setImageUrlError("URL is empty.");
      return;
    }

    const res = await fetch(
      `/api/validate-image?url=${encodeURIComponent(imageUrl)}`,
    );

    const data = await res.json();

    if (data.valid) {
      setImageUrlError("");

      if (url && url.includes("files.edgestore.dev")) {
        try {
          await edgestore.publicFiles.delete({
            url,
          });
        } catch {}
      }

      await update({
        id: params.documentID as Id<"documents">,
        coverImage: imageUrl,
      });

      onClose();
      return;
    } else if (data.error === "UNREACHABLE")
      setImageUrlError("Image URL is unreachable.");
    else if (data.error === "NOT_IMAGE")
      setImageUrlError("URL does not point to an image.");
    else if (data.error === "INVALID_URL")
      setImageUrlError("Image URL is invalid.");
    else setImageUrlError("Unknown Error");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <SingleImageDropzone className="w-full items-center justify-center" />
        </UploaderProvider>

        <div className="w-full bg-muted h-0.5 rounded-full my-1" />

        <div>
          <div className="flex gap-x-2">
            <Input
              placeholder="Paste the url..."
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button variant="outline" onClick={onClick}>
              Add
            </Button>
          </div>
          <div className="mt-2 ms-2">
            <p className="text-rose-600 text-xs">{imageUrlError}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
