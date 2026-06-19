import { INSPO } from "@/constants/inspo";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { getMediaUrl } from "@/lib/utils";

interface InspoProps {
  inspirations?: any[] | null;
  inspirationBodyText?: string | null;
}

function Inspo({ inspirations, inspirationBodyText }: InspoProps) {
  const displayInspo = inspirations || [];

  return (
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1 md:col-span-2 text-left">
          <SectionHeading number="04" title="EXTERNAL INSPIRATION" />

          {inspirationBodyText && (
            <p className="font-light text-gray-300 leading-relaxed mt-6 px-5 md:px-0 whitespace-pre-line">
              {inspirationBodyText}
            </p>
          )}
        </div>

        <div className="col-span-1 md:col-span-3 w-full px-5 md:px-0">
          <ul className="w-full flex flex-col gap-0 text-left">
            {displayInspo.map((inspo, index) => {
              const link = inspo.link || "#";
              const title = inspo.title || "";
              const bgImage = getMediaUrl(inspo.image) || "";

              return (
                <li key={index} className="w-full">
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block w-full py-4 md:px-5 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <p className="relative z-10 font-medium text-lg text-white transition-colors duration-300 font-roboto tracking-[10%] text-[24px] md:text-[20px] uppercase leading-8 md:leading-normal">
                        <span className="text-crimson-bright inline md:hidden">
                          {" // "}
                        </span>

                        <span className="text-base-light/70 md:text-white">
                          {"0" + (index + 1)}
                        </span>

                        <span className="text-crimson-bright hidden md:inline">
                          {" // "}
                        </span>

                        <br className="block md:hidden" />

                        {title}
                      </p>

                      <div className="z-20 mt-4 md:mt-0">
                        <span className="bg-crimson-dark md:bg-transparent group-hover:bg-crimson-bright text-base-light md:text-white px-12 md:px-4 py-2 transition-all duration-300">
                          View
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out w-full overflow-hidden left-0 top-0">
                      {bgImage && (
                        <Image
                          src={bgImage}
                          alt={title || "Inspo art"}
                          fill
                          sizes="(max-w-768px) 100vw, 50vw"
                          className="object-cover h-full w-full object-center"
                        />
                      )}
                      <div className="absolute inset-0 bg-radial to-[#360000] from-[#730001]/70 left-0 right-0" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Inspo;
