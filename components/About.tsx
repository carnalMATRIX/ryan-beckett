import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

function About() {
  return (
    <section className="bg-bg-light py-24">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading number="01" title="About Me" />

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-5">
          <div className="flex flex-col gap-8 p-5 md:px-0">
            <div>
              <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
                Developer
              </h4>
              <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                dolores iusto eaque asperiores laudantium excepturi doloremque
                rerum id nobis voluptates eum dolore repellat corporis esse,
                reprehenderit dignissimos minus blanditiis recusandae!
              </p>
            </div>

            <Image
              src="/images/about/about_1.JPG"
              alt="about image one"
              width={400}
              height={435}
              className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
            />

            <div className="hidden md:block">
              <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
                Photographer
              </h4>
              <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus numquam, sit ut eaque architecto, a sapiente aut
                blanditiis iure quod repellat amet consectetur illo earum eos
                iusto animi enim eligendi?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 bg-crimson-dark p-5">
            <div>
              <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
                Self-Actualiser
              </h4>
              <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                dolores iusto eaque asperiores laudantium excepturi doloremque
                rerum id nobis voluptates eum dolore repellat corporis esse,
                reprehenderit dignissimos minus blanditiis recusandae!
              </p>
            </div>

            <Image
              src="/images/about/about_2.JPG"
              alt="about image one"
              width={400}
              height={435}
              className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
            />

            <div>
              <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
                Scholar
              </h4>
              <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus numquam, sit ut eaque architecto, a sapiente aut
                blanditiis iure quod repellat amet consectetur illo earum eos
                iusto animi enim eligendi?
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 p-5 md:px-0">
            <div className="hidden md:block">
              <h4 className="font-roboto font-light uppercase text-[22px] tracking-[10%]">
                Designer
              </h4>
              <p className="font-roboto font-medium text-base-light leading-5 text-[14px] max-w-100 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                dolores iusto eaque asperiores laudantium excepturi doloremque
                rerum id nobis voluptates eum dolore repellat corporis esse,
                reprehenderit dignissimos minus blanditiis recusandae!
              </p>
            </div>

            <Image
              src="/images/about/about_3.JPG"
              alt="about image one"
              width={400}
              height={435}
              className="w-91.5 h-100 md:w-100 md:h-108.75 mx-auto object-cover"
            />

            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
