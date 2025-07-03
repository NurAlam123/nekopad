"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Title from "./Title";
import Banner from "./Banner";
import Menu from "./Menu";
import Publish from "./Publish";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const document = useQuery(api.documents.getByID, {
    documentID: params.documentID as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center justify-between gap-x-4">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <Button variant="ghost" onClick={onResetWidth}>
            <MenuIcon className="h-6 w-6 text-muted-foreground" />
          </Button>
        )}

        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />

          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentID={document._id} />
          </div>
        </div>
      </nav>

      {document.isArchived && <Banner documentID={document._id} />}
    </>
  );
};

export default Navbar;
