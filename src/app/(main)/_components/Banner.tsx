import { Id } from "@/../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modal/ConfirmModal";

interface Props {
  documentID: Id<"documents">;
}

const Banner = ({ documentID }: Props) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentID });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentID });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>

      <Button
        size="sm"
        onClick={onRestore}
        className="border border-white bg-transparent hover:bg-primary/5 text-white hover:text-white h-auto px-2 p-1 font-normal"
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          className="border border-white bg-transparent hover:bg-primary/5 text-white hover:text-white h-auto px-2 p-1 font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
