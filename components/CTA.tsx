import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

function CTA() {
  return (
    <section className="bg-bg-dark py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-5">
        <div className="flex flex-col gap-5 max-w-full md:max-w-[65%]">
          <SectionHeading number="06" title="Get In Touch" />

          <h3 className="font-outfit uppercase font-black text-[55px] leading-13 mx-5 md:mx-0">
            Let&apos;s Build
            <br />
            Something
            <br />
            <span className="text-crimson-bright">Meaningful</span>
          </h3>

          <p className="font-roboto font-light text-[15px] leading-5 text-base-light mx-5 md:mx-0">
            I'm always looking to connect with teams working on software,
            human-computer interaction, intelligence, or high-impact digital
            products.
          </p>

          <hr className="border-base-light opacity-30 my-2 mx-5 md:mx-0" />

          <h6 className="text-crimson-special uppercase font-semibold font-roboto text-[14px] mx-5 md:mx-0">
            The Quick & Simple
          </h6>

          <div className="flex flex-col gap-2 mx-5 md:mx-0">
            <div className="bg-crimson-dark w-fit py-2 px-3 flex flex-row gap-2.5 items-center">
              <MapPin />
              <p className="font-roboto font-bold tracking-[5%] text-[12px] uppercase">
                Auckland, NZ
              </p>
            </div>
            <div className="bg-crimson-dark w-fit py-2 px-3 flex flex-row gap-2.5 items-center">
              <Mail />
              <Link
                href="mailto:ryanbakker@outlook.co.nz"
                className="font-roboto font-bold tracking-[5%] text-[12px] uppercase"
              >
                ryanbakker@outlook.co.nz
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2.5 mx-5 md:mx-0">
          <div className="flex flex-row items-center gap-1.5 bg-zinc-700 w-fit px-2 py-1">
            <div className="h-3 w-3 bg-green-600 animate-pulse rounded-full" />
            <p className="text-sm font-medium font-roboto text-zinc-200">
              Currently open for collaboration
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default CTA;
