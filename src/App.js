import React, { useState } from "react";
import SearchBar from "./components/searchbar";
import SongList from "./components/songlist";
import Playlist from "./components/playlist";
import { getSongs } from "./api/api";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  async function handleSearch(searchTerm) {
    try {
      const songs = await getSongs(searchTerm);
      setSearchResults(songs);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch songs. Please try again later.");
    }
  }

  function handleAddToPlaylist(song) {
    setPlaylist(prevPlaylist => [...prevPlaylist, song]);
  }

  function handleRemoveFromPlaylist(song) {
    setPlaylist(prevPlaylist => prevPlaylist.filter(s => s.id !== song.id));
  }

  return (
    <div>
      <div className="dabba">
      <h1>MOOZIK</h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="app-container">
        <div>
          <h2>Search Results</h2>
          <SongList songs={searchResults} onAddToPlaylist={handleAddToPlaylist} />
        </div>
        <div>
          <h2>Playlist</h2>
          <Playlist songs={playlist} onRemoveFromPlaylist={handleRemoveFromPlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
