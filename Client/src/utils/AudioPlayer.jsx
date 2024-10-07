import React, { useState, useEffect, useRef, useContext } from "react";
import musicbg from "../assets/musicbg.jpg";
import { SongContext } from "../Context/SongContext";
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { FiSkipBack, FiSkipForward } from "react-icons/fi";

const AudioPlayer = () => {
  const { song, audio } = useContext(SongContext);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progressBar = useRef();

  useEffect(() => {
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        if (progressBar.current) {
          progressBar.current.max = audio.duration;
        }
      };

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
        if (progressBar.current) {
          progressBar.current.value = audio.currentTime;
        }
      };

      audio.addEventListener("loadedmetadata", setAudioData);
      audio.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audio.removeEventListener("loadedmetadata", setAudioData);
        audio.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [audio]);

  const togglePlayPause = () => {
    if (!song || !audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    song.setIsPlaying(!song.isPlaying);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  return (
    <div className="fixed flex justify-around lg:justify-center lg:space-x-40 items-center bottom-0 right-0 left-0 bg-gray-900 text-white px-5 py-2 shadow-xl">
      <div className="flex items-center space-x-5">
        <img src={musicbg} alt="" className="rounded-lg w-12 lg:w-16" />
        <div>
          <h3 className="text-lg font-semibold">
            {song.songName || "Song Name"}
          </h3>
          <p className="text-sm text-gray-400">
            {song.songArtist || "Artist Name"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 lg:space-x-5">
        <button className="text-gray-400 hover:text-white transition duration-300">
          <FiSkipBack size={30} />
        </button>
        <button
          onClick={togglePlayPause}
          className="text-gray-400 hover:text-white transition duration-300"
        >
          {song.isPlaying ? <CiPause1 size={40} /> : <CiPlay1 size={40} />}
        </button>
        <button className="text-gray-400 hover:text-white transition duration-300">
          <FiSkipForward size={30} />
        </button>
      </div>

      <div className="hidden lg:flex items-center space-x-3">
        <input
          type="range"
          min="0"
          ref={progressBar}
          defaultValue="0"
          step="any"
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-sm text-gray-400">
          {calculateTime(currentTime)}/{calculateTime(duration)}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
