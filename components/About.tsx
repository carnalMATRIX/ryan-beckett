import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { getMediaUrl } from "@/lib/utils";

interface AboutProps {
  aboutCells?: {
    heading: string;
    content: string;
    id?: string | null;
  }[] | null;
  developerImage?: any;
  studentImage?: any;
  creativeImage?: any;
}

function About({
  aboutCells,
  developerImage,
  studentImage,
  creativeImage,
}: AboutProps) {
  const renderCell = (index: number) => {
    const cell = aboutCells?.[index];
    if (!cell) return null;
    return (
      <div>
        <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
          {cell.heading}
        </h4>
        <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2 text-left whitespace-pre-line">
          {cell.content}
        </p>
      </div>
    );
  };

  return (
    <section className="bg-bg-light py-24">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading number="01" title="About Me" />

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-5">
          {/* Column 1 */}
          <div className="flex flex-col gap-8 p-5 md:px-0">
            {renderCell(0)}

            {getMediaUrl(developerImage) && (
              <Image
                src={getMediaUrl(developerImage)!}
                alt="left column image"
                width={400}
                height={435}
                className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
              />
            )}

            {renderCell(1)}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8 bg-crimson-dark p-5">
            {renderCell(2)}

            {getMediaUrl(studentImage) && (
              <Image
                src={getMediaUrl(studentImage)!}
                alt="centre column image"
                width={400}
                height={435}
                className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
              />
            )}

            {renderCell(3)}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 p-5 md:px-0">
            {renderCell(4)}

            {getMediaUrl(creativeImage) && (
              <Image
                src={getMediaUrl(creativeImage)!}
                alt="right column image"
                width={400}
                height={435}
                className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
              />
            )}

            {renderCell(5)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
