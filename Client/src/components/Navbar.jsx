import React, { useContext } from "react";
import { SidebarContext } from "../Context/SibebarContext";
import { Link, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { ImBlog } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { CgPlayList } from "react-icons/cg";
import { GiMusicSpell } from "react-icons/gi";
import { BiWindowClose } from "react-icons/bi";
import { BsFillMenuAppFill } from "react-icons/bs";
import "../utils/style.css";

const Navbar = () => {
  const sideBar = useContext(SidebarContext);
  const toggleMenu = () => {
    sideBar.setShowMenu(!sideBar.showMenu);
  };
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <header className="z-50 w-full sticky bg-gray-900 text-white top-0 flex flex-col justify-between items-center py-1 lg:py-5 px-10 font-space shadow-lg h-14 lg:h-16 ">
      <nav className="w-full flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white hover:text-yellow-500 transition duration-300"
        >
          BeatBox
        </Link>
        <button onClick={toggleMenu} className="lg:hidden text-yellow-500">
          <BsFillMenuAppFill size={25} />
        </button>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden text-xl flex flex-col bg-gray-900 w-64 fixed z-50 top-0 p-5 h-screen items-start justify-start space-y-10 pt-16 transition-transform duration-300 ease-in-out ${
            sideBar.showMenu ? "right-0" : "-right-64"
          }`}
        >
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-yellow-500 transition duration-300"
          >
            <GoHome />
            <span>Home</span>
          </Link>
          <Link
            to="/explore"
            className="flex items-center space-x-2 hover:text-yellow-500 transition duration-300"
          >
            <GiMusicSpell />
            <span>Songs</span>
          </Link>
          <Link
            to="/upload"
            className="flex items-center space-x-2 hover:text-yellow-500 transition duration-300"
          >
            <TfiWrite />
            <span>Upload</span>
          </Link>
          <Link
            to="/playlists"
            className="flex items-center space-x-2 hover:text-yellow-500 transition duration-300"
          >
            <CgPlayList />
            <span>Playlist</span>
          </Link>

          {token ? (
            <button
              onClick={logOut}
              className="bg-yellow-500 px-5 py-2 rounded-md shadow-lg text-gray-900 text-sm hover:bg-yellow-600 transition duration-300"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-yellow-500 px-5 py-2 rounded-md shadow-lg text-gray-900 text-sm hover:bg-yellow-600 transition duration-300"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 px-5 py-2 rounded-md shadow-lg text-gray-900 text-sm hover:bg-yellow-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            onClick={toggleMenu}
            className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-600 transition duration-300"
          >
            <BiWindowClose />
            <span>Close</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10 text-white lg:text-lg">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"
          >
            <GoHome />
            <span>Home</span>
          </Link>
          <Link
            to="/explore"
            className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"
          >
            <ImBlog />
            <span>Songs</span>
          </Link>
          <Link
            to="/upload"
            className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"
          >
            <TfiWrite />
            <span>Upload</span>
          </Link>
          <Link
            to="/playlists"
            className="flex items-center space-x-2 hover:text-purple-600 transition duration-300"
          >
            <CgPlayList />
            <span>Playlists</span>
          </Link>

          {token ? (
            <button
              onClick={logOut}
              className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md shadow-lg text-sm hover:bg-purple-700 transition duration-300"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md shadow-lg text-sm hover:bg-purple-700 transition duration-300"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-md shadow-lg text-sm hover:bg-purple-700 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
