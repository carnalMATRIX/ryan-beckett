import { SOCIALS } from "@/constants/socials";
import Link from "next/link";

interface SocialsProps {
  type: "desktop" | "mobile";
  socialCards?: { platform: string; link: string }[] | null;
  spotifyProfileUrl?: string | null;
}

export default function Socials({ type, socialCards, spotifyProfileUrl }: SocialsProps) {
  const updatedSocials = SOCIALS.map((social) => {
    if (social.name.toLowerCase() === "spotify") {
      return {
        ...social,
        url: spotifyProfileUrl || social.url,
      };
    }
    const card = socialCards?.find(
      (c) => c.platform.toLowerCase() === social.name.toLowerCase()
    );
    return {
      ...social,
      url: card?.link || social.url,
    };
  });

  if (type === "desktop") {
    return (
      <div className="hidden md:flex flex-col items-center gap-6 z-50 pointer-events-auto animate-fade-in">
        <div className="flex flex-col gap-5 items-end relative">
          {updatedSocials.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-bright-muted hover:text-crimson-bright transition-all duration-300 transform hover:scale-105 flex flex-row items-center gap-6 font-roboto tracking-[5%] font-medium uppercas text-[13px]"
              aria-label={social.name}
            >
              {social.name}
              {social.svg}
            </Link>
          ))}

          <div className="absolute -top-2.5 right-7.5 bg-base-light h-40 w-0.5" />
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div className="flex md:hidden justify-center items-center gap-8 py-4 my-2">
      {updatedSocials.map((social) => (
        <Link
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-crimson-bright-muted active:text-crimson-bright transition-colors duration-200 [&>svg]:w-10 [&>svg]:h-10"
          aria-label={social.name}
        >
          {social.svg}
        </Link>
      ))}
    </div>
  );
}
