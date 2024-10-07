import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SidebarContext } from "../Context/SibebarContext";
import { useNavigate } from "react-router-dom";
import { SongContext } from "../Context/SongContext";

const UploadSong = () => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(SidebarContext);
  const { __URL__ } = useContext(SongContext);

  useEffect(() => {
    if (showMenu) setShowMenu(false);
  }, []);

  // State to manage form data
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [description, setDescription] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "x-auth-token": localStorage.getItem("access_token"),
      },
    };

    const result = await axios.post(
      `${__URL__}/api/v1/song/upload`,
      formData,
      config
    );

    if (result.status === 201) {
      alert("File uploaded successfully");
      navigate("/explore");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-black px-5">
      <h1 className="text-4xl text-white font-bold mb-10">Upload a New Song</h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold">Song Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-3 rounded-md border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition"
            placeholder="Enter the song title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full p-3 rounded-md border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition"
            placeholder="Enter a brief description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold">Artist Name</label>
          <input
            type="text"
            name="artist"
            className="w-full p-3 rounded-md border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition"
            placeholder="Enter the artist's name"
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold">Album</label>
          <input
            type="text"
            name="album"
            className="w-full p-3 rounded-md border-2 border-gray-200 focus:outline-none focus:border-purple-500 transition"
            placeholder="Enter the album name"
            onChange={(e) => setAlbum(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold">
            Upload Audio File
          </label>
          <input
            type="file"
            name="file"
            accept="audio/*"
            onChange={handleFileChange}
            required
            className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded-md font-semibold hover:bg-purple-800 transition-all"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
};

export default UploadSong;
