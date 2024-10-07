// Importing libraries
import React, { useContext, useState } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

// Importing context
import { SongContext } from "../Context/SongContext";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";

// Importing icons
import { SlOptionsVertical } from "react-icons/sl";
import {
  MdDeleteOutline,
  MdOutlinePlaylistAdd,
  MdQueuePlayNext,
} from "react-icons/md";
import musicbg from "../assets/musicbg.jpg";

const SongCard = ({ title, artistName, songSrc, userId, songId, file }) => {
  // Using context
  const { song, audio, __URL__ } = useContext(SongContext);
  const { setFetchSong } = useContext(FetchContext);
  const { dispatchQueue, dispatchList } = useContext(QueueContext);
  const navigate = useNavigate(); // Used to navigate to the playlist page

  const token = localStorage.getItem("access_token");
  let decoded;
  if (token) {
    decoded = decodeToken(token);
  }

  const [showOptions, setShowOptions] = useState(false);

  // Display the options
  const displayOptions = () => {
    setShowOptions((prev) => !prev);
  };

  // Play the song when the user clicks on the song card
  const handlePlay = () => {
    song.setSongName(title);
    song.setArtistName(artistName);
    song.setSongUrl(`${__URL__}/api/v1/stream/${songSrc}`);
    audio.src = `${__URL__}/api/v1/stream/${songSrc}`;
    audio.load();
    audio.play();
    song.setIsPlaying(true);
  };

  const headers = {
    "x-auth-token": localStorage.getItem("access_token"),
  };

  // Delete the song
  const deleteSong = async () => {
    const { status } = await axios.delete(
      `${__URL__}/api/v1/song/delete/${songId}?file=${file}`,
      { headers }
    );
    if (status === 200) setFetchSong((prev) => !prev);
  };

  const handleDelete = () => {
    confirm("Are you sure you want to delete this song?") && deleteSong();
  };

  // Add the song to the playlist
  const handleAddToPlaylist = () => {
    dispatchList({ type: "ADD_SONG", payload: { title, artistName, songSrc } });
    navigate("/playlists");
  };

  // Play the song next
  const handlePlayNext = () => {
    dispatchQueue({
      type: "ADD_TO_QUEUE",
      payload: { title, artistName, songSrc },
    });
  };

  return (
    <div className=" bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col  space-y-4 relative transition-transform transform hover:bg-sky-900 active:bg-sky-700 lg:w-[250px] md:w-[200px] w-[180px] mx-auto">
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
      <div className="flex justify-center items-center space-x-3">
        <button
          onClick={handleAddToPlaylist}
          className="text-white hover:text-blue-400"
        >
          <MdOutlinePlaylistAdd size={24} />
        </button>
        <button
          onClick={handlePlayNext}
          className="text-white hover:text-green-400"
        >
          <MdQueuePlayNext size={24} />
        </button>
        {decoded && decoded.id === userId && (
          <button
            onClick={handleDelete}
            className="text-white hover:text-red-400"
          >
            <MdDeleteOutline size={24} />
          </button>
        )}
      </div>
      {/* <---------------------------Mobile Options-------------------------> */}
      <div
        onClick={displayOptions}
        className="lg:hidden absolute top-4 right-4 cursor-pointer"
      >
        <SlOptionsVertical size={20} />
      </div>
      {showOptions && (
        <div className="absolute top-10 right-0 z-10 w-36 bg-gray-900 rounded-md p-2">
          <ul className="flex flex-col space-y-2">
            <button
              onClick={handleAddToPlaylist}
              className="text-left text-white hover:text-blue-400"
            >
              Add to playlist
            </button>
            <button
              onClick={handlePlayNext}
              className="text-left text-white hover:text-green-400"
            >
              Play next
            </button>
            {decoded && decoded.id === userId && (
              <button
                onClick={handleDelete}
                className="text-left text-white hover:text-red-400"
              >
                Delete
              </button>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SongCard;
