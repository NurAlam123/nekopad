"use client";

import Logo from "@/assets/Logo";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";

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
        Login
      </div>
    </nav>
  );
};

export default Navbar;
