"use client";

import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { ArrowUpRight, Music, ExternalLink, Headphones } from "lucide-react";
import { SOCIALS } from "@/constants/socials";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { WaveformIcon } from "./WaveformIcon";

interface TopTrack {
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  spotifyProfileUrl?: string | null;
}

interface ConnectProps {
  spotifyDescription?: string | null;
  spotifyProfileUrl?: string | null;
}

function Connect({ spotifyDescription, spotifyProfileUrl }: ConnectProps) {
  const [topTrack, setTopTrack] = useState<TopTrack | null>(null);
  const [loading, setLoading] = useState(true);

  const socialsConfig = [
    {
      name: "github",
      title: "GitHub",
      url:
        process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/ryan-beckett",
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      url:
        process.env.NEXT_PUBLIC_LINKEDIN_URL ||
        "https://linkedin.com/in/ryan-beckett",
    },
    {
      name: "instagram",
      title: "Instagram",
      url:
        process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
        "https://instagram.com/ryan-beckett",
    },
  ];

  const displaySocials = socialsConfig.map((item) => {
    const socialConstant = SOCIALS.find(
      (s) => s.name.toLowerCase() === item.name,
    );
    return {
      name: item.title,
      url: item.url,
      svg: socialConstant ? socialConstant.svg : null,
    };
  });

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const response = await fetch("/api/spotify/top-track");
        if (response.ok) {
          const data = await response.json();
          setTopTrack(data);
        }
      } catch (error) {
        console.error("Error fetching top track:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTrack();
  }, []);

  return (
    <section className="bg-bg-light py-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeading number="05" title="CONNECT" />

        <div className="grid grid-cols-1 md:grid-cols-5 mt-5 gap-3">
          <ul className="flex flex-col gap-3 col-span-1 md:col-span-2 h-full mx-5 md:mx-0">
            {displaySocials.map((connect, index) => (
              <li key={index} className="flex-1 flex">
                <Link
                  href={connect.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center justify-between bg-bg-dark px-5 py-2 group flex-1"
                >
                  <div className="flex flex-row items-center gap-2">
                    <span className="[&>svg]:w-10 [&>svg]:h-10 group-hover:text-crimson-bright transition-all duration-300">
                      {connect.svg}
                    </span>
                    <p className="text-[20px] uppercase font-medium tracking-[10%]">
                      <span className="text-crimson-dark">{" // "}</span>{" "}
                      {connect.name}
                    </p>
                  </div>

                  <div className="bg-crimson-dark rounded-full h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-crimson-dark flex flex-col md:flex-row justify-between p-5 col-span-1 md:col-span-3">
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex flex-col md:flex-row gap-5 md:gap-15 md:items-center">
                <div className="w-full flex flex-row items-center gap-1">
                  <span className="[&>svg]:w-10 [&>svg]:h-10 group-hover:text-crimson-bright transition-all duration-300">
                    <Image
                      src="/icons/spotify-brands-solid-full.svg"
                      alt="Spotify"
                      height={40}
                      width={40}
                      className="text-white"
                    />
                  </span>
                  <p className="text-[20px] uppercase font-medium tracking-[10%] ml-1">
                    <span className="text-crimson-bright">{" // "}</span>{" "}
                    Spotify
                  </p>
                </div>
                <p className="md:min-w-[40%] hidden md:block text-xs font-bold uppercase text-base-light">
                  Now Playing
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-5 md:gap-15 items-start w-full">
                <p className="w-full text-sm font-roboto font-light">
                  {spotifyDescription}
                </p>

                <div className="w-full md:min-w-[40%] md:max-w-[40%] -mt-1 grid grid-cols-2 md:flex md:flex-col gap-4 items-center md:items-start">
                  <div className="col-span-1 min-w-0 w-full">
                    <p className="md:min-w-[40%] block md:hidden text-xs font-bold uppercase text-base-light -mt-5 pb-2">
                      Now Playing
                    </p>
                    <p className="text-white font-black text-xl lg:text-2xl leading-tight tracking-tight mt-1 truncate font-roboto">
                      {loading
                        ? "Loading track..."
                        : topTrack?.title || "Spotify Offline"}
                    </p>
                    <p className="text-base-light text-sm md:text-base truncate font-light font-roboto">
                      {loading
                        ? "Syncing..."
                        : topTrack?.artist || "Not currently playing"}
                    </p>
                  </div>

                  {/* Inline Album Art (Mobile Only) */}
                  <div className="col-span-1 relative w-full aspect-square shrink-0 block md:hidden">
                    {loading ? (
                      <div className="w-full h-full bg-white/5 animate-pulse" />
                    ) : topTrack ? (
                      <div className="relative size-full">
                        <Image
                          src={topTrack.albumImageUrl}
                          alt="Album Art"
                          fill
                          className="object-cover h-full w-full"
                        />
                        <WaveformIcon className="absolute top-1.5 right-1.5 bg-base-light text-crimson-bright p-1.5 size-5" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Music className="text-white/20 size-5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 md:flex-row">
                <Link
                  href={topTrack?.spotifyProfileUrl || spotifyProfileUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-fit"
                >
                  <Button
                    variant="secondary"
                    className="w-full md:w-fit py-5! md:py-3! flex items-center justify-center gap-2 cursor-pointer"
                  >
                    View Profile <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>

                <Link
                  href={topTrack?.songUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-fit"
                >
                  <Button className="w-full md:w-fit py-5! md:py-3! flex items-center justify-center gap-2 cursor-pointer">
                    Listen Now <Headphones className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative w-full md:max-w-[30%] mt-5 md:mt-0 hidden md:block">
              {loading ? (
                <div className="w-full h-full bg-white/5 animate-pulse" />
              ) : topTrack ? (
                <div className="relative">
                  <Image
                    src={topTrack.albumImageUrl}
                    alt="Album Art"
                    height={140}
                    width={140}
                    className="h-full w-full"
                  />

                  <WaveformIcon className="absolute top-1.5 right-1.5 bg-crimson-muted  text-crimson-bright p-1.5" />
                </div>
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <Music className="text-white/20 size-8" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Connect;
