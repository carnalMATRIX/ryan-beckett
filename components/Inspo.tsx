import { INSPO } from "@/constants/inspo";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import Image from "next/image";

function Inspo() {
  return (
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="col-span-1 md:col-span-2">
          <SectionHeading number="04" title="EXTERNAL INSPIRATION" />

          <p className="font-light text-gray-300 leading-relaxed mt-6 px-5 md:px-0">
            Learning is a core part of who I am. The most fundamental
            characteristic I admire in a person is a sense of curiosity.
            Learning is a skill I&apos;m actively working on, including refining
            how I ask questions and optimising the best methods for me to learn
            effectively and efficiently.
            <br />
            <br />
            Although I am returning to studies at twenty-three, I&apos;m loving
            every second of it and feel I value it more than I ever have in the
            past.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 w-full px-5 md:px-0">
          <ul className="w-full flex flex-col gap-0">
            {INSPO.map((inspo, index) => (
              <li key={index} className="w-full">
                {/* 1. Added 'group' so child elements can react when this Link is hovered */}
                <Link
                  href={inspo.link}
                  className="group relative block w-full py-4 md:px-5 transition-all duration-300"
                >
                  {/* 2. Added 'relative z-10' to force the text content to stay on top of the image container */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <p className="relative z-10 font-medium text-lg text-white transition-colors duration-300 font-roboto tracking-[10%] text-[24px] md:text-[20px] uppercase leading-8 md:leading-normal">
                      <span className="text-crimson-bright inline md:hidden">
                        {" // "}
                      </span>

                      <span className="text-base-light md:text-white">
                        {"0" + (index + 1)}
                      </span>

                      <span className="text-crimson-bright hidden md:inline">
                        {" // "}
                      </span>

                      <br className="block md:hidden" />

                      {inspo.title}
                    </p>

                    <div className="z-20 mt-4 md:mt-0">
                      <span className="bg-base-light md:bg-transparent group-hover:bg-crimson-bright text-crimson-bright md:text-white px-12 md:px-4 py-2 transition-all duration-300">
                        View
                      </span>
                    </div>
                  </div>
                  {/* 3. Background Image Container:
                      - Added 'opacity-0 group-hover:opacity-100' to handle the visibility toggle
                      - Fixed a typo in your 'ease-out' class string
                  */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out w-full overflow-hidden left-0 top-0">
                    <Image
                      src="/images/inspo/inspo_bg.jpg"
                      alt="Inspo art"
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover h-full w-full object-center"
                    />
                    <div className="absolute inset-0 bg-radial to-[#360000] from-[#730001]/70 left-0 right-0" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Inspo;
