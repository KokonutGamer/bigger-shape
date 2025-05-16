import React, { useEffect } from "react";

const inputClass =
  "w-full rounded px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";

const handleSubmit = () => {};

const LoginPage = () => {
  //   If user is already logged in, redirect them to another page
  useEffect(() => {
    document.title = "Log Into SHAPE";
  }, []);
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Seattle.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="h-screen flex items-center justify-end pr-16">
        <div
          className="
            bg-blue-300
            rounded-lg
            p-[2vh] sm:p-[3vh] md:p-[4vh]
            text-black
            shadow-md
            w-full sm:w-[40%] md:w-[30%]
            max-w-md
            min-h-[60vh]
            flex flex-col items-stretch justify-center space-y-2
            "
        >
          <h1 className="text-xl font-bold text-center">Log Into SHAPE</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className={inputClass} required />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={inputClass}
              required
            ></input>
            <button
              type="submit"
              className="
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            py-2
            px-6
            rounded transition
            duration-300
            "
            >
              Sign In
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-black" />
            <span className="mx-4 text-black">OR</span>
            <hr className="flex-grow border-t border-black" />
          </div>
          <button
            type="submit"
            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            py-2
            px-6
            rounded transition
            duration-300
            flex items-center justify-center space-x-2
            "
          >
            <img
              src="/google-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            ></img>
            <span className="text-center">Log in with Google</span>
          </button>
          <div className="flex justify-between text-sm">
            <a href="/signup" className="text-blue-600 underline">
              Don't have an account?
            </a>
            <span>Forgot password?</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
