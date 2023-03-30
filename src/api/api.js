import axios from 'axios';
const API_HOST = "spotify23.p.rapidapi.com";
const API_KEY = "214e8ae2c7msh30ed631ddab79dcp1bf6a4jsn61fe676cb1cc";

export async function getSongs(searchTerm) {
  const response = await fetch('https://spotify23.p.rapidapi.com/search/', {
    params: {
      q: searchTerm,
      type: 'multi',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
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
const fetchTopChartSongs = async () => {
  const response = await axios.get(`https://spotify23.p.rapidapi.com/tracks/`, {
    params: {ids: '4WNcduiCmDNfmTEz7JvmLv'},
    headers: {
      'x-rapidapi-key': `214e8ae2c7msh30ed631ddab79dcp1bf6a4jsn61fe676cb1cc`,
      'x-rapidapi-host': `spotify23.p.rapidapi.com`
    }
  });
  return response.data.tracks;
};

export default fetchTopChartSongs;
