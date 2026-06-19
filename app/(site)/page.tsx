import About from "@/components/About";
import Connect from "@/components/Connect";
import CTA from "@/components/CTA";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Inspo from "@/components/Inspo";
import ProjectsSnapshot from "@/components/ProjectsSnapshot";
import { getCachedPayload } from "@/lib/payload";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const payload = await getCachedPayload();
  const { docs } = await payload.find({
    collection: "home-content",
    limit: 1,
  });

  const content = (docs?.[0] as any) || null;

  return (
    <main className="min-h-screen">
      <Hero
        description={content?.heroDescription}
        socialCards={content?.socialCards as any}
        spotifyProfileUrl={content?.spotifyProfileUrl}
      />
      <About
        aboutCells={content?.aboutCells}
        developerImage={content?.aboutDeveloperImage}
        studentImage={content?.aboutStudentImage}
        creativeImage={content?.aboutCreativeImage}
      />
      <ProjectsSnapshot />
      <Education
        quote={content?.educationQuote}
        quoteAuthor={content?.educationQuoteAuthor}
        bodyText={content?.educationBodyText}
        extracurricularActivities={content?.extracurricularActivities}
        items={content?.educationItems}
        asideImage={content?.educationAsideImage}
      />
      <Inspo inspirations={content?.inspirations} inspirationBodyText={content?.inspirationBodyText} />
      <Connect
        socialCards={content?.socialCards as any}
        spotifyDescription={content?.spotifyDescription}
        spotifyProfileUrl={content?.spotifyProfileUrl}
        spotifyListenUrl={content?.spotifyListenUrl}
      />
      <CTA
        location={content?.location}
        email={content?.email}
        contactDescription={content?.contactDescription}
      />
      <Footer />
    </main>
  );
}
