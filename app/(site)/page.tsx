import About from "@/components/About";
import Connect from "@/components/Connect";
import CTA from "@/components/CTA";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Inspo from "@/components/Inspo";
import ProjectsSnapshot from "@/components/ProjectsSnapshot";
import { getCachedPayload } from "@/lib/payload";
import { getSpotifyProfile } from "@/lib/spotify";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const payload = await getCachedPayload();
  const { docs } = await payload.find({
    collection: "home-content",
    limit: 1,
  });

  const content = (docs?.[0] as any) || null;

  let spotifyProfileUrl = null;
  try {
    const profileRes = await getSpotifyProfile();
    if (profileRes.ok) {
      const profileData = await profileRes.json();
      spotifyProfileUrl = profileData.external_urls?.spotify || null;
    }
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
  }

  return (
    <main className="min-h-screen">
      <Hero
        description={content?.heroDescription}
        spotifyProfileUrl={spotifyProfileUrl}
        keyword1={content?.heroKeyword1}
        keyword2={content?.heroKeyword2}
        keyword3={content?.heroKeyword3}
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
        spotifyDescription={content?.spotifyDescription}
        spotifyProfileUrl={spotifyProfileUrl}
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
