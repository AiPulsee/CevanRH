"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Menu } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-foreground">
      {/* Premium Light Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center bg-white border-b border-slate-100 h-20 px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group mr-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1967D2]">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#202124]">CevanRH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#202124]">
            <Link href="/" className="hover:text-[#1967D2] transition-colors font-bold">Home</Link>
            <Link href="/jobs" className="hover:text-[#1967D2] transition-colors font-bold">Find Jobs</Link>
            <Link href="/employers" className="hover:text-[#1967D2] transition-colors font-bold">Employers</Link>
            <Link href="/candidates" className="hover:text-[#1967D2] transition-colors font-bold">Candidates</Link>
            <Link href="/blog" className="hover:text-[#1967D2] transition-colors font-bold">Blog</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 ml-auto">
            <Link href="/login" className="text-sm font-bold text-[#202124] hover:text-[#1967D2] transition-colors">
              Login / Register
            </Link>
            <Button size="lg" className="rounded-xl font-bold bg-[#1967D2] hover:bg-blue-700 h-12 px-8">
              Job Post
            </Button>
          </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
