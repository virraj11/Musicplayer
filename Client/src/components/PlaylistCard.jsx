import React, { useState, useContext } from "react";
import axios from "axios";
import { SongContext } from "../Context/SongContext";
import playlist from "../assets/playlist.jpg";
import { CgPlayListAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { QueueContext } from "../Context/QueueContex";

const PlaylistCard = ({ playlistName, playlistId, noSongs }) => {
  const { setFetchPlaylist } = useContext(FetchContext);
  const { __URL__ } = useContext(SongContext);
  const { list, dispatchList } = useContext(QueueContext);

  const [loading, setLoading] = useState(false);

  // Adding song to playlist
  const addSongToPlaylist = async () => {
    if (list.length === 0) return alert("Please select a song");
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("access_token"),
    };
    const { status } = await axios.post(
      `${__URL__}/api/v1/playlist/add/${playlistId}`,
      list,
      { headers }
    );
    if (status === 200) {
      alert("Song added to playlist");
      setFetchPlaylist((prev) => !prev);
      dispatchList({ type: "REMOVE_SONG", payload: list[0]["title"] });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between space-x-4 transition-transform ">
      <Link
        to={`/playlist/${playlistId}`}
        className="flex items-center space-x-4"
      >
        <img
          src={playlist}
          alt="Playlist cover"
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <p className="text-lg font-semibold truncate">{playlistName}</p>
          <p className="text-sm text-gray-400">Songs - {noSongs}</p>
        </div>
      </Link>
      <button
        onClick={addSongToPlaylist}
        className={`flex items-center justify-center p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <CgPlayListAdd size={28} className="text-white" />
      </button>
    </div>
  );
};

export default PlaylistCard;
