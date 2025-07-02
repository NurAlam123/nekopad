import type { Metadata } from "next";
import { inter } from "@/fonts";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";

import SettingsModal from "@/components/SettingsModal";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nekopad",
  description:
    "Write. Organize. Focus. Create Workspace for Notes, Docs & More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <ConvexClientProvider>
              <Toaster richColors />
              <SettingsModal />
              {children}
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
