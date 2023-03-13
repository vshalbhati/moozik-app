const API_HOST = "shazam.p.rapidapi.com";
const API_KEY = "214e8ae2c7msh30ed631ddab79dcp1bf6a4jsn61fe676cb1cc";

export async function getSongs(searchTerm) {
  const url = `https://${API_HOST}/search?term=${searchTerm}&locale=en-US&offset=0&limit=5`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.tracks.hits.map(hit => ({
    id: hit.track.key,
    title: hit.track.title,
    artist: hit.track.subtitle,
    album: hit.track.hub,
    coverArtUrl: hit.track.images.coverart,
    audioUrl: hit.track.url
  }));
}
