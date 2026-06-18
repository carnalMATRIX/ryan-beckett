import { getTopTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getTopTracks();
    const { items } = await response.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No tracks found" }, { status: 404 });
    }

    const track = items[0];
    const topTrack = {
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    };

    return NextResponse.json(topTrack);
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json({ error: "Failed to fetch top track" }, { status: 500 });
  }
}
