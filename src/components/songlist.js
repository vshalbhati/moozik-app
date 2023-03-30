import React from "react";

function SongList(props) {
  return (
    <ul>
      {props.songs.map(song => (
        <li key={song.id}>
          <div >
            <img className="sngimg" src={song.coverArtUrl} alt={song.title} />
          </div>
          <div>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <button onClick={() => props.onAddToPlaylist(song)}>Add to Playlist</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SongList;
