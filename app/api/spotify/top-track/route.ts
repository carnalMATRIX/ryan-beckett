import { getTopTracks, getSpotifyProfile } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [tracksResponse, profileResponse] = await Promise.all([
      getTopTracks(),
      getSpotifyProfile(),
    ]);

    let spotifyProfileUrl = null;
    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      spotifyProfileUrl = profileData.external_urls?.spotify || null;
    }

    const { items } = await tracksResponse.json();

    if (!items || items.length === 0) {
      return NextResponse.json({
        error: "No tracks found",
        spotifyProfileUrl,
      }, { status: 200 }); // Status 200 so the client can still read the profile URL even if the track list is empty
    }

    const track = items[0];
    const topTrack = {
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
      spotifyProfileUrl,
    };

    return NextResponse.json(topTrack);
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 });
  }
}
