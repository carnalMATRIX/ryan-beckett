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
  title: "RYAN BECKETT // AKL NZ",
  description:
    "Step into the world of Ryan Beckett, a multifaceted creative force. As a developer, designer, and photographer, Ryan crafts digital experiences that captivate and inspire. Explore his portfolio to witness the seamless blend of technology and artistry that defines his work.",
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
      <body className="min-h-screen flex flex-col p-0 m-0 bg-[#010000]! text-white">
        {children}
      </body>
    </html>
  );
}
