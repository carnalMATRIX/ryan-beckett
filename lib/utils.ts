import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMediaUrl(media: any): string {
  if (!media) return "";
  
  const url = typeof media === "object" ? media.url : media;
  if (!url) return "";

  // If it's a relative path, return it as is (Next.js handles this)
  if (url.startsWith("/")) return url;

  // If it's an absolute URL, check if it's internal
  if (url.startsWith("http")) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    
    // If the URL starts with our configured server URL, make it relative
    if (url.startsWith(serverUrl)) {
      return url.replace(serverUrl, "");
    }

    // Also catch hardcoded localhost if we're in a deployed environment
    if (url.includes("localhost:3000") && !serverUrl.includes("localhost")) {
       return url.replace(/https?:\/\/localhost:3000/, "");
    }

    return url;
  }

  // Fallback: ensure it starts with a slash if it doesn't look like an absolute URL
  return url.startsWith("/") ? url : `/${url}`;
}
