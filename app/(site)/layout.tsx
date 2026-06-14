import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Beckett // Developer // Designer // Photographer",
  description:
    "Step into the world of Ryan Beckett, a multifaceted creative force. As a developer, designer, and photographer, Ryan crafts digital experiences that captivate and inspire. Explore his portfolio to witness the seamless blend of technology and artistry that defines his work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
