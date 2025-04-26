"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function Header({
  dark,
  setDark,
}: {
  dark: boolean;
  setDark: (v: boolean) => void;
}) {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="w-full flex justify-between items-center py-4 border-b mb-4 mx-auto">
      {/* Logo como Link para Home */}
      <Link
        href="/"
        className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
      >
        FF12 Text Helper
      </Link>

      {/* Links e toggle */}
      <div className="flex items-center gap-4">
        <Link
          href="/docs"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors"
        >
          Docs
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors"
        >
          About
        </Link>
        <Toggle
          pressed={dark}
          onPressedChange={setDark}
          aria-label="Toggle dark mode"
          className="cursor-pointer"
        >
          {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Toggle>
      </div>
    </header>
  );
}
