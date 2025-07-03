"use client";

import Link from "next/link";

import { ClerkLoading, SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

import Logo from "@/assets/Logo";
import Spinner from "@/components/Spinner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useMediaQuery } from "usehooks-ts";
import useScrollTop from "@/hooks/useScrollTop";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const scrolled = useScrollTop();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <nav
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center justify-between w-full p-6 transition-shadow duration-150 ease-in-out",
        scrolled && "border-b shadow-sm",
      )}
    >
      <div className="flex items-center gap-1">
        <Logo className="w-10 h-10" />
        <p className="font-semibold font-inter">Nekopad</p>
      </div>

      {isMobile ? (
        <Popover>
          <PopoverTrigger className="border p-2 rounded-sm">
            <MenuIcon className="size-4" />
          </PopoverTrigger>

          <PopoverContent className="w-full p-4 -translate-x-2">
            <Navbar.Bar />
          </PopoverContent>
        </Popover>
      ) : (
        <Navbar.Bar />
      )}
    </nav>
  );
};

Navbar.Bar = function NavbarBar({ isMobile }: { isMobile?: boolean }) {
  return (
    <>
      <div className="md:ml-auto justify-end w-full flex flex-col md:flex-row items-center gap-y-2 md:gap-y-0 gap-x-2">
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>

        <Unauthenticated>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </SignInButton>
          <SignInButton mode="modal">
            <Button size="sm">Get Nekopad Free</Button>
          </SignInButton>
        </Unauthenticated>

        <Authenticated>
          <Button variant="link" size="sm" asChild>
            <Link href="/documents">Enter Nekopad</Link>
          </Button>

          <UserButton afterSwitchSessionUrl="/" />
        </Authenticated>

        <ThemeToggle className={cn(isMobile && "w-full")} />
      </div>
    </>
  );
};

export default Navbar;
