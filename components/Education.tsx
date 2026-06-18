import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { PROGS } from "@/constants/education";

function Education() {
  return (
    <section className="bg-bg-light py-24">
      {/* Main Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:px-6 items-start">
        {/* Aside Container:
          - md:sticky pins it during scroll
          - md:top-1/2 and md:-translate-y-1/2 perfectly centres it vertically in the viewport
          - h-fit ensures it keeps its own height and doesn't stretch
        */}
        <aside className="w-full md:w-[35%] md:sticky md:top-1/2 md:top-[calc(50vh-370px)] h-fit flex-shrink-0 relative z-5 px-5 md:px-6 pt-10 pb-18 flex flex-col gap-8">
          <SectionHeading title="Education" number="03" />

          <blockquote className="relative pl-3">
            <p className="font-crimson italic font-medium text-[20px] md:text-[22px] leading-7.5 pb-2 pl-[0.4em] indent-[-0.4em]">
              “The beautiful thing about learning is that no one can take it
              away from you.”
            </p>
            <span className="font-roboto text-[14px] italic font-medium pl-[0.4em] text-base-light">
              - B.B. King
            </span>
            <div className="absolute left-0 -top-0.5 h-25 w-0.5 bg-crimson-bright" />
          </blockquote>

          <p className="font-light font-roboto leading-5 text-[14px]">
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

          <hr className="border-[#DDD]/30 mt-3" />

          <div>
            <h5 className="font-roboto font-light text-[16px] uppercase leading-13">
              Extracurricular
            </h5>
            <ul className="list-disc pl-4 flex flex-col gap-2">
              <li>Computer Science & Engineering Association</li>
              <li>Cyber Security & Intelligence (CSI)</li>
              <li>The Creatives&apos; Corner (AUTCC)</li>
              <li>AUT Edge Award (ongoing)</li>
            </ul>
          </div>

          {/* Background Image Container */}
          <div className="absolute inset-0 -z-1 transition-all duration-700 ease-out overflow-hidden left-0 top-0">
            <Image
              src="/images/edu/campus.JPG"
              alt="AUT Campus"
              fill
              sizes="(max-w-768px) 100vw, 35vw"
              className="object-cover h-full w-full object-right"
            />
            <div className="absolute inset-0 bg-radial to-[#360000] from-[#730001]/70 left-0 right-0 z-1" />
          </div>
        </aside>

        {/* Programmes Column: Takes up the remaining 65% width */}
        <div className="flex-1 flex flex-col gap-16 md:gap-24">
          {PROGS.map((prog, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 md:gap-8 items-start px-5 md:px-0"
            >
              {/* Logo Block */}
              <div className="flex-shrink-0">
                <Image
                  src={prog.logoPath || "/images/placeholder-logo.png"}
                  alt="Education Institute Logo"
                  width={90}
                  height={65}
                  className="object-contain md:h-25 md:w-32.25"
                />
              </div>

              {/* Text Block */}
              <div className="flex-1 flex flex-col gap-8">
                <div>
                  <span className="font-roboto tracking-[10%] font-bold text-crimson-bright text-[15px]">
                    {prog.date}
                  </span>
                  <h4 className="font-outfit text-[24px] tracking-[10%] text-white uppercase leading-7 md:leading-6 pb-2">
                    {prog.title}
                  </h4>
                  <h5 className="font-roboto italic font-bold text-[#979797] text-[18px] tracking-[7.5%]">
                    Focus: {prog.focus}
                  </h5>
                </div>

                <div>
                  <h6 className="font-semibold font-roboto uppercase text-[14px] tracking-[5%] text-crimson-special pb-2">
                    Core Subjects
                  </h6>
                  <ul className="flex flex-row flex-wrap gap-2.5">
                    {prog.subjects?.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className="bg-crimson-dark py-0.5 px-2.5"
                      >
                        <span className="text-[14px] text-white font-roboto font-base">
                          {sub.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h6 className="font-semibold font-roboto uppercase text-[14px] tracking-[5%] text-crimson-special pb-2">
                    Academic Mission
                  </h6>
                  <p className="font-crimson italic text-[16px] leading-6">
                    {prog.mission}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
