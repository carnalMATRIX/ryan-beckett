import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { PROGS } from "@/constants/education";
import { getMediaUrl } from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { jsxConverters } from "@/lib/RichTextConverters";

interface EducationProps {
  quote?: string | null;
  quoteAuthor?: string | null;
  bodyText?: any;
  extracurricularActivities?: { activityName: string }[] | null;
  items?: any[] | null;
  asideImage?: any;
}

function Education({
  quote,
  quoteAuthor,
  bodyText,
  extracurricularActivities,
  items,
  asideImage,
}: EducationProps) {
  const displayItems = items || [];
  const displayActivities = extracurricularActivities || [];

  return (
    <section className="bg-bg-light py-24">
      {/* Main Layout Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:px-6 items-start">
        <aside className="w-full md:w-[35%] md:sticky md:top-[calc(50vh-370px)] h-fit flex-shrink-0 relative z-5 px-5 md:px-6 pt-10 pb-18 flex flex-col gap-8">
          <SectionHeading title="Education" number="03" />

          {(quote || quoteAuthor) && (
            <blockquote className="relative pl-3 text-left">
              {quote && (
                <p className="font-crimson italic font-medium text-[20px] md:text-[22px] leading-7.5 pb-2 pl-[0.4em] indent-[-0.4em]">
                  “{quote}”
                </p>
              )}
              {quoteAuthor && (
                <span className="font-roboto text-[14px] italic font-medium pl-[0.4em] text-base-light">
                  - {quoteAuthor}
                </span>
              )}
              <div className="absolute left-0 -top-0.5 h-25 w-0.5 bg-crimson-bright" />
            </blockquote>
          )}


          <div className="font-light font-roboto leading-5 text-[14px] text-zinc-300 text-left">
            {bodyText ? (
              typeof bodyText === "object" ? (
                <RichText data={bodyText} converters={jsxConverters} />
              ) : (
                bodyText
              )
            ) : null}
          </div>

          <hr className="border-[#DDD]/30 mt-3" />

          <div>
            <h5 className="font-roboto font-light text-[16px] uppercase leading-13 text-left">
              Extracurricular
            </h5>
            <ul className="list-disc pl-4 flex flex-col gap-2 text-left text-zinc-300 font-light text-[14px]">
              {displayActivities.map((act: any, i: number) => (
                <li key={i}>{act.activityName}</li>
              ))}
            </ul>
          </div>

          {/* Background Image Container */}
          {getMediaUrl(asideImage) && (
            <div className="absolute inset-0 -z-1 transition-all duration-700 ease-out overflow-hidden left-0 top-0">
              <Image
                src={getMediaUrl(asideImage)!}
                alt="Education background"
                fill
                sizes="(max-w-768px) 100vw, 35vw"
                className="object-cover h-full w-full object-right"
              />
              <div className="absolute inset-0 bg-radial to-[#360000] from-[#730001]/70 left-0 right-0 z-1" />
            </div>
          )}
        </aside>

        {/* Programmes Column: Takes up the remaining 65% width */}
        <div className="flex-1 flex flex-col gap-16 md:gap-24">
          {displayItems.map((prog, index) => {
            const date = prog.date || (prog as any).completionYears || "";
            const logoPath = prog.logoPath || getMediaUrl((prog as any).providerLogo) || "/images/placeholder-logo.png";
            const subjectsList = prog.subjects 
              ? prog.subjects.map((s: any) => s.label) 
              : [
                  (prog as any).primarySubject,
                  (prog as any).secondarySubject,
                  (prog as any).tertiarySubject
                ].filter(Boolean);

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 md:gap-8 items-start px-5 md:px-0 text-left"
              >
                {/* Logo Block */}
                <div className="flex-shrink-0">
                  <Image
                    src={logoPath}
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
                      {date}
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
                      {subjectsList.map((sub: string, subIndex: number) => (
                        <li
                          key={subIndex}
                          className="bg-crimson-dark py-0.5 px-2.5"
                        >
                          <span className="text-[14px] text-white font-roboto font-base">
                            {sub}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h6 className="font-semibold font-roboto uppercase text-[14px] tracking-[5%] text-crimson-special pb-2">
                      Academic Mission
                    </h6>
                    <div className="font-crimson italic text-[16px] leading-6 text-zinc-300">
                      {prog.mission && typeof prog.mission === "object" ? (
                        <RichText data={prog.mission} converters={jsxConverters} />
                      ) : (
                        prog.mission
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
