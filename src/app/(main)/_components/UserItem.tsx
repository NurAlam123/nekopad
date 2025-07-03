"use clinent";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useState } from "react";

const UserItem = () => {
  const { user } = useUser();

  // ====
  // Handle hydration error
  // ====
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5 cursor-pointer rounded-sm"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="font-medium text-start line-clamp-1">
              {user?.fullName}&apos;s Nekopad
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 z-[999999]"
        align="start"
        alignOffset={11}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-x-2">
            <div className="rounded-md border bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&apos;s Nekopad
              </p>

              <p className="text-xs font-medium leading-none text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-secondary rounded-full" />
          <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground outline-none">
            <SignOutButton>
              <Button className="w-full" variant="destructive">
                Logout
              </Button>
            </SignOutButton>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
