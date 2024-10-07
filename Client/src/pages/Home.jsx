import React from "react";
import { Link } from "react-router-dom";
import { FiPlayCircle } from "react-icons/fi";
import { FaHeadphones, FaMusic } from "react-icons/fa";

const HomePage = () => {
  const token = localStorage.getItem("access_token");

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Your Favorite Music, All in One Place
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-gray-300">
            Discover new songs, create playlists, and enjoy your music anytime,
            anywhere.
          </p>
          <Link
            to="/explore"
            className="mt-8 inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Featured Playlists */}
      <div className="py-16 px-8 lg:px-24">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-12">
          Featured Playlists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Playlist Card */}
          <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/7271799/pexels-photo-7271799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Playlist Cover"
              className="w-full h-80 object-cover group-hover:opacity-80 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Chill Vibes</h3>
              <p className="text-gray-400">
                Relax and unwind with this smooth playlist.
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <Link to="/playlist/1" className="text-white text-3xl">
                <FiPlayCircle />
              </Link>
            </div>
          </div>

          {/* Playlist Card */}
          <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/7502557/pexels-photo-7502557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Playlist Cover"
              className="w-full h-80 object-cover group-hover:opacity-80 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Top Hits</h3>
              <p className="text-gray-400">
                Stay updated with the latest chart-toppers.
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <Link to="/playlist/2" className="text-white text-3xl">
                <FiPlayCircle />
              </Link>
            </div>
          </div>

          {/* Playlist Card */}
          <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/4498179/pexels-photo-4498179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Playlist Cover"
              className="w-full h-80 object-cover group-hover:opacity-80 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">Workout Beats</h3>
              <p className="text-gray-400">
                Get pumped with high-energy tracks.
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300">
              <Link to="/playlist/3" className="text-white text-3xl">
                <FiPlayCircle />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-Up Section (Hidden if logged in) */}
      {!token && (
        <section className="signup-section bg-purple-600 p-10 mt-10 rounded-lg shadow-lg pb-40">
          <h2 className="text-3xl font-bold text-center mb-5">Join Us Today</h2>
          <p className="text-lg text-center mb-10">
            Sign up now to enjoy unlimited access to all our features!
          </p>
          <div className="flex justify-center space-x-5">
            <Link
              to="/register"
              className="inline-block bg-white text-purple-600 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-gray-900 px-8 py-3 rounded-md text-white font-semibold hover:bg-gray-800 transition duration-300"
            >
              Log In
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
