"use client";

import { useCoverImageStore } from "@/store/useCoverImageStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCallback } from "react";
import { useEdgeStore } from "@/lib/edgestore";

import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { UploaderProvider, UploadFn } from "../upload/uploader-provider";
import { SingleImageDropzone } from "../upload/single-image";

const CoverImageModal = () => {
  const params = useParams();

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

      return res;
    },
    [edgestore, params, update, url],
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <UploaderProvider uploadFn={uploadFn} autoUpload>
          <SingleImageDropzone className="w-1/2 items-center justify-center" />
        </UploaderProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
