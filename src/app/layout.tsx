import type { Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { AppWrapper } from "@/components/AppWrapper";
import { metadata } from "@/app/metadata";
import { defaultFont } from "@/lib/utils/font";
import clsx from "clsx";
import "./globals.css";

export { metadata };

export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          defaultFont.variable,
          "h-screen flex flex-col justify-center items-center"
        )}
      >
        <AppWrapper>{children}</AppWrapper>
        <Toaster />
      </body>
    </html>
  );
}
