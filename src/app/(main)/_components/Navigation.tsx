"use client";

import {
  ChevronLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";

import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DocumentList from "./DocumentList";
import TrashBox from "./TrashBox";
import Item from "./Item";
import UserItem from "./UserItem";

import { toast } from "sonner";

import { useSearchStore } from "@/store/useSearchStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Navbar from "./Navbar";

const Navigation = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const create = useMutation(api.documents.create);

  const searchOnOpen = useSearchStore((state) => state.onOpen);
  const settingsOnOpen = useSettingsStore((state) => state.onOpen);

  const isResizingRef = useRef<boolean>(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile);

  // ====
  // Handle hydration error
  // ====
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ====
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [isMobile, pathname]);

  // =====
  // Handle resizing the sidebar
  // =====
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navRef.current.style.setProperty("left", `${newWidth}px`);
      navRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // =====
  // Reset the width of the sidebar
  // =====
  const resetWidth = () => {
    if (sidebarRef.current && navRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );
      navRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  // =====
  // Collapse the sidebar
  // =====
  const collapse = () => {
    if (sidebarRef.current && navRef.current) {
      setIsResetting(true);
      setIsCollapsed(true);

      sidebarRef.current.style.width = "0";
      navRef.current.style.setProperty("width", "100%");
      navRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // ====
  // Create a new document
  // ====
  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentID) =>
      router.push(`/documents/${documentID}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  // ====

  if (!hasMounted) return null;

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto flex w-60 flex-col z-[9999] sm:absolute md:relative",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
        )}
      >
        <Button
          variant="ghost"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100",
            isCollapsed && "hidden",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div>
          <UserItem />
          <Item label="Search" icon={Search} onClick={searchOnOpen} isSearch />
          <Item onClick={settingsOnOpen} label="Settings" icon={Settings} />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>

        <div className="mt-2">
          <DocumentList />
          <div className="mt-2">
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          </div>

          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>

            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)] overflow-hidden",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentID ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <Button variant="ghost" onClick={resetWidth}>
                <MenuIcon
                  role="button"
                  className="h-6 w-6 text-muted-foreground cursor-pointer"
                />
              </Button>
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
