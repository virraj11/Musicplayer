import React, { useContext } from "react";
import axios from "axios";
import { SongContext } from "../Context/SongContext";
import { decodeToken } from "react-jwt";
import musicbg from "../assets/musicbg.jpg";
import { useNavigate } from "react-router-dom";
import { CgRemoveR } from "react-icons/cg";
import { FetchContext } from "../Context/FetchContext";

const PlaylilstSong = ({ title, artistName, songSrc, playlistId }) => {
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchPlaylist } = useContext(FetchContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const decoded = decodeToken(token);

  // Play the song when the user clicks on the song card
  const handlePlay = () => {
    audio.pause();
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    song.songName = title;
    song.songArtist = artistName;
    song.songUrl = songSrc;
    audio.load();
    audio.play();
    song.setIsPlaying(true);
  };

  const headers = {
    "Content-Type": "application/json",
    "x-auth-token": localStorage.getItem("access_token"),
  };

  // Remove the song from playlist
  const removeSong = async () => {
    const { status } = await axios.delete(
      `http://localhost:1337/api/v1/playlist/remove/${playlistId}?song=${title}`,
      { headers }
    );
    if (status === 200) {
      setFetchPlaylist((prev) => !prev);
    }
  };

  const handleRemove = () => {
    removeSong();
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4 relative transition-transform transform hover:scale-105 lg:w-[250px] md:w-[200px] w-[180px] mx-auto">
      <div onClick={handlePlay} className="cursor-pointer">
        <img
          src={musicbg}
          alt="Album cover"
          className="w-full h-36 rounded-lg object-cover"
        />
      </div>
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold truncate">{title}</div>
        <div className="text-sm text-gray-400 truncate">{artistName}</div>
      </div>
      <button
        onClick={handleRemove}
        className="text-white hover:text-red-400 transition-colors"
      >
        <CgRemoveR size={24} />
      </button>
    </div>
  );
};

export default PlaylilstSong;
