import About from "@/components/About";
import Connect from "@/components/Connect";
import CTA from "@/components/CTA";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Inspo from "@/components/Inspo";
import ProjectsSnapshot from "@/components/ProjectsSnapshot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ProjectsSnapshot />
      <Education />
      <Inspo />
      <Connect />
      <CTA />
      <Footer />
    </main>
  );
}
