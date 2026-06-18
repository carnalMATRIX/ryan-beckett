export interface Programme {
  title: string;
  date: string;
  focus: string;
  subjects: {
    label: string;
  }[];
  mission: string;
  logoPath: string;
}

export const PROGS: Programme[] = [
  {
    title: "BA. Computer & Information Sciences",
    date: "2026 – Present",
    focus: "Human-Computer Interaction",
    subjects: [
      {
        label: "Software Development",
      },
      {
        label: "Artificial Intelligence",
      },
      {
        label: "Business & Psychology",
      },
    ],
    mission:
      "With two diplomas and various experiences working in web development, I  return with a fresh start. While in an AI bubble, my course selection  prioritises in-depth learning of artificial intelligence, while focusing on all important aspects, including mission-critical code,  human-computer psychology, and project management.",
    logoPath: "/images/edu/logo_aut.svg",
  },
  {
    title: "Lvl 6 Dip. Web Design & Production",
    date: "2021 – 2022",
    focus: "Full-Stack Development",
    subjects: [
      {
        label: "Web App Development",
      },
      {
        label: "UI/UX Research & Design",
      },
      {
        label: "Website Deployment",
      },
    ],
    mission:
      "During this diploma, I studied four key topics: UI/UX Design &  Development, Advanced Website Design, React.js Web App Development, and  WordPress Development with HTML, CSS, and PHP. This provided a step up  from my Level 5 diploma and allowed me to direct my focus toward web  development. This diploma also led me to my treasured experience at The  Web Guys.",
    logoPath: "/images/edu/logo_yoobee.svg",
  },
  {
    title: "Lvl 5 Dip. Digital Design",
    date: "2020",
    focus: "Web & Graphic Design",
    subjects: [
      {
        label: "Graphic Design",
      },
      {
        label: "Web Development",
      },
      {
        label: "Product Design",
      },
    ],
    mission:
      "This diploma encompassed all things design, from creating pamphlets and  product packaging to building entire websites using WordPress. I view  this course as the foundation for my experience and knowledge today. It  introduced me to a professional approach to web development and the  fundamentals of leading a project-based team.",
    logoPath: "/images/edu/logo_yoobee.svg",
  },
];
