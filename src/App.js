import React, { useState, useEffect } from "react";
import SearchBar from "./components/searchbar";
import SongList from "./components/songlist";
import Playlist from "./components/playlist";
import { getSongs } from "./api/api";
import fetchTopChartSongs from './api/api';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaTimes } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons'
import Login from "./components/login";
import Register from "./components/register"
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [topChartSongs, setTopChartSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const songsData = await fetchTopChartSongs();
      setTopChartSongs(songsData);
    };

    fetchData();
  }, []);

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
  const [likedSongs, setLikedSongs] = useState([]);

  const handleLike = (song) => {
    setLikedSongs([...likedSongs, song]);
  };
  const removefromliked = (song) => {
    const updatedLikedSongs = likedSongs.filter(
      (likedSong) => likedSong.title !== song.title
    );
    setLikedSongs(updatedLikedSongs);
  };


  return (
    <div>
      <div className="dabba">
      <h1>MOOZIK</h1>
      <div className="niche"><h1>(</h1></div>
      </div>
      <div className="sidenav">
        
        <div className="playlists">
        <FontAwesomeIcon icon={faMusic} />
          <h4>Playlists</h4>
        </div>
        <div className="mysongs">
        <FontAwesomeIcon icon={faRecordVinyl} />
          <h4>My Songs</h4>
        </div>
        <div className="surpise">
        <FontAwesomeIcon icon={faGift} />
          <h4>Surprise Me</h4>
        </div>
        <div className="down">
        <div className="account">
        <FaUser />
          <h4>Account</h4>
          {/* <Login>Login</Login> */}
        </div>
        <div className="settings">
      <IoMdSettings />
          <h4>Settings</h4>
        </div>
        </div>
        
      </div>
      <div >
      <SearchBar  onSearch={handleSearch} />
      </div>
      <div className="app-container">
        <div className="srcres" >
          <SongList  songs={searchResults} onAddToPlaylist={handleAddToPlaylist} />
        </div>
        {/* <div>
          <h2>Playlist</h2>
          <Playlist songs={playlist} onRemoveFromPlaylist={handleRemoveFromPlaylist} />
        </div> */}
        <div className="tcs">
        <h2>Top Chart Songs</h2>
        <div >
        <ul className="cards">
          {topChartSongs.map((song) => (
            <div className="card" key={song.id}>
              <img src={song.album.images[0].url} alt={song.name} />
              <div className="lj">
              <p>{song.name}</p>
              <FontAwesomeIcon icon={faHeart} className="heart-icon" onClick={() => handleLike(song)}/>
              </div>
              </div>
          ))}
        </ul>
      </div>
      </div> 
      <div className="liked">
        <h2>LIKED SONGS</h2>
      <ul className="cards">
        {likedSongs.map((song) => (
          <div className="card" key={song.id}>
              <img src={song.album.images[0].url} alt={song.name} />
            <div className="lj">
            <p>{song.name} </p>
            <FaTimes className="FaTimes" onClick={()=>removefromliked(song)}/>
            </div>
            
          </div>
        ))}
      </ul>
      </div>
      </div>
    </div>
    // <BrowserRouter>
    //     {/* <div className="gv">
    //     <Login/>
    //     <h1>djwnsdnjxw</h1>
    //     </div> */}
    //         <Routes>
    //             <Route path="/" element={<Login/>}/>
    //             <Route path="/register" element={<Register/>}/>
    //         </Routes>
    // </BrowserRouter>

  );
}

export default App;
