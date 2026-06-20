import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

// Load local variable fonts
const outfit = localFont({
  src: "../fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap",
});

const roboto = localFont({
  src: [
    {
      path: "../fonts/Roboto-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "../fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

const robotoFlex = localFont({
  src: "../fonts/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf",
  variable: "--font-roboto-flex",
  display: "swap",
});

const crimson = localFont({
  src: [
    {
      path: "../fonts/CrimsonPro-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../fonts/CrimsonPro-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beckett.vercel.app"),
  title: {
    default: "Ryan Beckett | Developer, Photographer, Designer",
    template: "%s | Ryan Beckett",
  },
  description:
    "Step into the world of Ryan Beckett, a multifaceted creative force as a developer, designer, and photographer based in Auckland, New Zealand.",
  keywords: [
    "Ryan Beckett",
    "Developer",
    "UX Designer",
    "Photographer",
    "Creative Portfolio",
    "Auckland",
    "New Zealand",
    "Web Development",
    "UI/UX Design",
  ],
  authors: [{ name: "Ryan Beckett", url: "https://beckett.vercel.app" }],
  creator: "Ryan Beckett",
  publisher: "Ryan Beckett",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://beckett.vercel.app",
    title: "Ryan Beckett | Developer, Photographer, Designer",
    description:
      "Step into the world of Ryan Beckett, a multifaceted creative force. As a developer, designer, and photographer, Ryan crafts digital experiences that captivate and inspire.",
    siteName: "Ryan Beckett",
    images: [
      {
        url: "/images/hero/hero_bg.JPG",
        width: 1200,
        height: 630,
        alt: "Ryan Beckett Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Beckett | Developer, Photographer, Designer",
    description:
      "Explore the portfolio of Ryan Beckett, a developer, designer, and photographer based in Auckland, New Zealand.",
    images: ["/images/hero/hero_bg.JPG"],
  },
  verification: {
    google: "VLoKkZLrIe1NuhvrhsNP4uaj6JH1gSpymmKB1Phug5s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${roboto.variable} ${robotoFlex.variable} ${crimson.variable} h-full antialiased font-roboto p-0 m-0`}
    >
      <body className="min-h-screen flex flex-col p-0 m-0 bg-[#010000]! text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
