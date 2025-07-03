import { ImageIcon, Smile, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";

import IconPicker from "./IconPicker";
import { Button } from "./ui/button";

import { useMutation } from "convex/react";
import { Doc } from "@/../convex/_generated/dataModel";
import { api } from "@/../convex/_generated/api";
import { useCoverImageStore } from "@/store/useCoverImageStore";

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImageStore();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);

    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({ id: initialData._id });
  };

  const onTitleFocus = () => {
    if (!inputRef.current) return;

    inputRef.current.value = "";

    if (value.toLowerCase() !== "untitled") {
      inputRef.current.value = value;
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && !initialData.isArchived && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>

          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && (preview || initialData.isArchived) && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-100 md:opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && !initialData.isArchived && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="size-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && !initialData.isArchived && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="size-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextAreaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          onFocus={onTitleFocus}
          disabled={preview || initialData.isArchived}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold outline-none break-words text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
