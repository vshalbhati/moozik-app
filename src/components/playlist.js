import React from "react";

function Playlist(props) {
  return (
    <ul>
      {props.songs.map(song => (
        <li key={song.id}>
          <div>
            <img src={song.coverArtUrl} alt={song.title} />
          </div>
          <div>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <button onClick={() => props.onRemoveFromPlaylist(song)}>Remove from Playlist</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Playlist;
