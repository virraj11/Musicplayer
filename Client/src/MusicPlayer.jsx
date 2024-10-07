import React, { useRef, useState, useEffect, useContext } from "react";
import stereo from "./assets/stereo.jpg";
import { SongContext } from "./Context/SongContext";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { HiPause } from "react-icons/hi";

const MusicPlayer = () => {
  const audioRef = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const { song } = useContext(SongContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    const updateDuration = () => {
      const seconds = Math.floor(audioRef.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    };

    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    audioRef.current.addEventListener("loadedmetadata", updateDuration);
    audioRef.current.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const whilePlaying = () => {
    progressBar.current.value = audioRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioRef.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const nextSong = () => {
    // Implement next song functionality...
  };

  const previousSong = () => {
    // Implement previous song functionality...
  };

  return (
    <div className="fixed bg-gray-900 bottom-0 right-0 left-0 px-5 py-3 flex justify-between items-center shadow-lg text-white">
      <div className="flex items-center space-x-4">
        <img src={stereo} alt="" className="rounded-lg w-14 lg:w-20" />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">
            {song.songName || "Song Name"}
          </h3>
          <p className="text-sm text-gray-400">
            {song.songArtist || "Artist Name"}
          </p>
        </div>
      </div>

      <audio ref={audioRef} preload="auto">
        <source src={song.songUrl} type="audio/mpeg" />
      </audio>

      <div className="hidden lg:flex lg:flex-col lg:w-1/2 items-center">
        <input
          type="range"
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        <div className="flex w-full justify-between text-xs mt-1">
          <p>{calculateTime(currentTime)}</p>
          <p>
            {duration && !isNaN(duration) ? calculateTime(duration) : "00:00"}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={previousSong}
          className="text-gray-400 hover:text-white"
        >
          <BiSkipPreviousCircle size={45} />
        </button>
        <button
          onClick={togglePlayPause}
          className="text-gray-400 hover:text-white"
        >
          {isPlaying ? (
            <HiPause size={50} />
          ) : (
            <BsFillPlayCircleFill size={50} />
          )}
        </button>
        <button onClick={nextSong} className="text-gray-400 hover:text-white">
          <BiSkipNextCircle size={45} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
