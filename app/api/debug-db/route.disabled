import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const collections = ["home-content", "media", "projects"];
    const stats: any = {};

    for (const slug of collections) {
      const result = await payload.find({
        collection: slug as any,
        depth: 0,
        limit: 10,
      });
      stats[slug] = {
        totalDocs: result.totalDocs,
        docs: result.docs.map(d => ({ 
          id: d.id, 
          title: (d as any).title || (d as any).alt || "N/A",
          slug: (d as any).projectBehaviour?.slug || "N/A"
        }))
      };
    }

    return NextResponse.json({ 
      database_uri: process.env.DATABASE_URI ? "HIDDEN" : "NOT SET",
      stats 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
