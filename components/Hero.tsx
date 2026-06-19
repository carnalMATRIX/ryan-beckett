import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Socials from "@/components/Socials";

export default function Hero({
  description,
  socialCards,
  spotifyProfileUrl,
}: {
  description?: string | null;
  socialCards?: { platform: string; link: string }[] | null;
  spotifyProfileUrl?: string | null;
}) {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto">
      <div className="relative z-10 flex flex-col justify-between h-screen p-3 md:p-8">
        <div className="mt-10 text-left md:text-center">
          <h1 className="font-outfit uppercase text-7xl lg:text-[100px] text-crimson-muted font-bold tracking-[8%] md:tracking-[15%] leading-15">
            Ryan <span className="text-crimson-bright">Beckett</span>
          </h1>
          <h2 className="text-crimson-special font-roboto tracking-tight font-light uppercase text-3xl md:text-4xl mt-3 md:mt-5">
            <span className="inline md:hidden">{"//"} </span>
            Developer <br className="block md:hidden" />
            {"//"} UX Designer <br className="block md:hidden" />
            {"//"} Photographer
          </h2>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <p className="hidden md:block text-left max-w-72 text-zinc-300 font-light text-sm">
            {description}
          </p>

          <Socials
            type="desktop"
            socialCards={socialCards}
            spotifyProfileUrl={spotifyProfileUrl}
          />
        </div>

        <div className="px-0.5 text-base-light">
          <p className="text-center block md:hidden text-sm max-w-md mx-auto text-zinc-300 font-light mb-4">
            {description}
          </p>

          <Socials
            type="mobile"
            socialCards={socialCards}
            spotifyProfileUrl={spotifyProfileUrl}
          />

          <Link
            href="/#about"
            className="flex flex-col items-center text-sm group md:w-fit mx-auto transition-all duration-300"
          >
            <span>Continue reading</span>
            <ChevronDown className="animate-bounce animation-duration-[2s] group-hover:text-crimson-bright transition-colors duration-300" />
          </Link>
        </div>
      </div>

      <Image
        src="/images/hero/hero_bg.JPG"
        alt="Hero Background"
        layout="fill"
        objectFit="contain"
        objectPosition="center"
        className="absolute mt-3 h-screen w-screen -z-20"
      />
      <div className="absolute mt-5 h-screen w-screen bg-[radial-gradient(circle_at_center,transparent_72%,#010000_100%)] -z-10 pointer-events-none" />
    </section>
  );
}
