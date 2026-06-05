import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
