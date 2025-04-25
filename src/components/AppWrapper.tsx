"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex flex-col h-full w-full max-w-7xl px-4">
      <Header dark={dark} setDark={setDark} />
      <main className="h-full overflow-hidden">{children}</main>
    </div>
  );
}
