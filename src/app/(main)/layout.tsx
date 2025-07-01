"use client";

import Spinner from "@/components/Spinner";
import Navigation from "./_components/Navigation";
import { useConvexAuth } from "convex/react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <>
      {isAuthenticated && !isLoading ? (
        <div className="h-svh flex dark:bg-[#1f1f1f]">
          <Navigation />
          <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
      ) : (
        <div className="h-svh flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
};

export default MainLayout;
