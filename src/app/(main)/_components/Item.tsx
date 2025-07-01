"use client";

import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Id } from "@/../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  icon: LucideIcon;
  onClick: () => void;

  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  onExpend?: () => void;
  expended?: boolean;
  isSearch?: boolean;
  level?: number;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  documentIcon,
  level = 0,
  isSearch,
  onExpend,
  expended,
}: Props) => {
  const ChevronIcon = expended ? ChevronDown : ChevronRight;

  return (
    <div
      role="button"
      onClick={onClick}
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "cursor-pointer group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground",
        active && "bg-primary/5 text-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full hover:bg-neutral-300 rounded-sm dark:bg-neutral-600 mr-1 cursor-pointer"
          onClick={() => {}}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div>{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none rounded items-center gap-1 border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-sm">⌘</span>
          <span>K</span>
        </kbd>
      )}
    </div>
  );
};

export default Item;
