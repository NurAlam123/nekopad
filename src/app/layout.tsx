import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { Toaster } from "sonner";

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
              {children}
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
