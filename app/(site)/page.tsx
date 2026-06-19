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
import JsonLd from "@/components/JsonLd";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const payload = await getCachedPayload();
  const { docs } = await payload.find({
    collection: "home-content",
    limit: 1,
  });

  const content = (docs?.[0] as any) || null;

  const siteUrl = "https://beckett.vercel.app";
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Beckett",
    url: siteUrl,
    jobTitle: "Developer, UX Designer, Photographer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Auckland",
      addressCountry: "New Zealand",
    },
    sameAs: [
      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/ryan-beckett",
      process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/ryan-beckett",
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/ryan-beckett",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ryan Beckett Portfolio",
    url: siteUrl,
    description: "Portfolio of Ryan Beckett, a Developer, UX Designer, and Photographer based in Auckland, New Zealand.",
  };

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
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
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
    </>
  );
}
