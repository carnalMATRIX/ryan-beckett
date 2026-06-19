"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Undo2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  // Extract the slug from the URL (e.g., /projects/some-slug -> some-slug)
  const slug = pathname?.split("/").filter(Boolean).pop() || "unknown-project";

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-dark text-white px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-crimson-bright/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-crimson-bright/20 blur-2xl rounded-full scale-150 group-hover:bg-crimson-bright/40 transition-colors duration-500" />
            <Ghost
              size={120}
              strokeWidth={1}
              className="text-white/20 animate-bounce"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-extrabold text-6xl md:text-8xl tracking-tighter uppercase">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-light tracking-wide text-crimson-special">
            Project{" "}
            <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-none">
              &ldquo;{slug}&rdquo;
            </span>{" "}
            has stopped existing.
          </h2>
        </div>

        <p className="text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
          It looks like this project has entered stealth mode, been redacted by
          the digital gods, or more likely, I just haven&apos;t built it yet. Or
          maybe you just like typing random URLs?
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
          <Button asChild variant="secondary" size="lg" className="w-full md:w-auto rounded-none">
            <Link href="/projects" className="flex items-center justify-center gap-2">
              <Undo2 className="w-4.5 h-4.5" />
              Go to Project Archive
            </Link>
          </Button>
        </div>
      </div>

      {/* Aesthetic footer detail */}
      <div className="absolute bottom-12 left-0 w-full px-12 opacity-10">
        <div className="h-px bg-linear-to-r from-transparent via-white to-transparent" />
        <p className="text-[10px] uppercase tracking-[1em] text-center mt-4">
          System Error // {slug} // Not Found
        </p>
      </div>
    </main>
  );
}
