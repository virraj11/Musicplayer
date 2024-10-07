import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Register = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [message, setMessage] = useState(null); // To handle popup messages
  const [isSuccess, setIsSuccess] = useState(false); // To differentiate between success and error messages

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let __URL__;
  if (document.domain === "localhost") {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${__URL__}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();

    if (data.status === "error") {
      setErr(data.message);
      setMessage(data.message);
      setIsSuccess(false);
    } else if (data.status === "success") {
      setMessage("Registration Successful");
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    setInputs({
      fullName: "",
      email: "",
      password: "",
    });
  };

  // Close the popup message
  const closePopup = () => {
    setMessage(null);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 via-purple-900 to-black px-5">
      {/* Popup message */}
      {message && (
        <div
          className={`fixed inset-0 flex items-start justify-center z-50 mt-6`}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg text-center relative">
            <button className="absolute top-0 right-0 p-1" onClick={closePopup}>
              <IoMdCloseCircle className="text-red-500 text-2xl" />
            </button>
            <h2
              className={`text-lg ${
                isSuccess ? "text-green-600" : "text-red-600"
              } font-bold`}
            >
              {message}
            </h2>
            {isSuccess && (
              <p className="text-gray-500">Redirecting to login page...</p>
            )}
          </div>
        </div>
      )}

      <form
        className="bg-white flex flex-col px-8 py-10 shadow-2xl rounded-xl w-80"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-indigo-900 text-3xl mb-5 underline font-extrabold">
          Register
        </h1>
        <div className="flex flex-col space-y-5 p-5 rounded-xl">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            className="border border-indigo-600 outline-none rounded-md px-2 py-2 placeholder:px-1 focus:border-purple-900 focus:ring-2 focus:ring-purple-600 transition-all"
            required
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="border border-indigo-600 outline-none rounded-md px-2 py-2 placeholder:px-1 focus:border-purple-900 focus:ring-2 focus:ring-purple-600 transition-all"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="border border-indigo-600 outline-none rounded-md px-2 py-2 placeholder:px-1 focus:border-purple-900 focus:ring-2 focus:ring-purple-600 transition-all"
            required
            onChange={handleChange}
          />

          {err && <p className="text-red-500">{err}</p>}
          <button
            type="submit"
            className="bg-purple-800 text-white py-2 rounded-md shadow-md hover:bg-purple-900 hover:tracking-wider font-mono transition-all"
          >
            Submit
          </button>
          <div>
            <Link to="/login" className="hover:underline text-purple-900 flex">
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
