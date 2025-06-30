"use client";

import Logo from "@/assets/Logo";
import Spinner from "@/components/Spinner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { ClerkLoading, SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6 transition-shadow duration-150 ease-in-out",
        scrolled && "border-b shadow-sm",
      )}
    >
      <div className="flex items-center gap-1">
        <Logo className="w-10 h-10" />
        <p className="font-semibold font-inter">Nekopad</p>
      </div>

      <div className="md:ml-auto justify-end w-full flex items-center gap-x-2">
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

        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
