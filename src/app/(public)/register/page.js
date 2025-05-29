"use client";
import { DM_Sans, Raleway } from "next/font/google";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";

import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const dmSans_lightest = DM_Sans({
  subsets: ["latin-ext"],
  weight: ["300"],
});

const rw = Raleway({
  subsets: ["cyrillic"],
  weight: ["400"],
});

export default function Login() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      if (!isTouchDevice) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const rotateY = (x - 0.5) * 20;
        const rotateX = (0.5 - y) * 20;
        setRotation({ x: rotateX, y: rotateY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  return (
    <div className="flex items-center justify-center h-auto bg-gradient-to-r from-black to-gray-900 px-4 py-32 sm:px-6 lg:px-0 ">
      <div
        className={`w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center rounded-3xl lg:rounded-4xl px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 shadow-lg lg:shadow-2xl text-gray-200 ${
          isTouchDevice
            ? ""
            : "transition-transform duration-100 ease-out transform-style-preserve-3d"
        }`}
        style={{
          transform: isTouchDevice
            ? "none"
            : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <h1
          className={`${rw.className} text-5xl  lg:text-8xl mb-6 sm:mb-7 lg:mb-8 text-transparent bg-gradient-to-r from-purple-300 to-purple-900 bg-clip-text  tracking-tight`}
        >
          <span className="text-gray-300">Create</span> Account
        </h1>

        <form className="space-y-4 sm:space-y-5 lg:space-y-6">
          <input
            type="text"
            className={`${dmSans_lighter.className}  text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200 border-gray-200 border-b-[1px] focus:outline-none `}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            className={`${dmSans_lighter.className}  text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200 border-gray-200 border-b-[1px] focus:outline-none `}
            placeholder="Enter Email"
            required
          />

          <div className="relative mb-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className={`${dmSans_lighter.className} appearance-none   text-xl w-full h-17 sm:h-20 p-4  cursor-pointer focus:outline-none border-white border-b-[1px]`}
              required
            >
              <option value="" disabled hidden>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="researcher">Researcher</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#044343]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <input
            type="password"
            className={`${dmSans_lighter.className}  text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200 border-gray-200 border-b-[1px] focus:outline-none `}
            placeholder="Enter Password"
            required
          />
          <input
            type="password"
            className={`${dmSans_lighter.className}  text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 placeholder:text-gray-200 border-gray-200 border-b-[1px] focus:outline-none `}
            placeholder="Confrim Password"
            required
          />

          <button
            type="submit"
            className={`${dmSans_lightest.className}  text-3xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 bg-gradient-to-r hover:bg-gradient-to-l hover:from-purple-900 hover:to-purple-400 from-purple-400 to-purple-900 text-gray-300`}
          >
            Register
          </button>

          <button
            type="button"
            className={`${dmSans_lightest.className} bg-gradient-to-l text-3xl from-purple-400 to-purple-900 text-gray-300 w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4   flex items-center justify-center gap-2 sm:gap-3`}
          >
            <BsGoogle className="text-3xl" />
            <span>Sign up with Google</span>
          </button>

          <p className="text-sm sm:text-base text-center mt-4 sm:mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-transparent bg-gradient-to-r bg-clip-text from-purple-200 to-purple-400 border-purple-300 border-b-[1px] font-medium hover:no-underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

{
  /* <div className="relative mb-4">
  <select
    value={userRole}
    onChange={(e) => setUserRole(e.target.value)}
    className={`${dmSans_lighter.className} appearance-none border-b-8 border-l-8 border-t-2 border-r-2 rounded-3xl sm:rounded-4xl border-black text-lg sm:text-xl w-full h-17 sm:h-20 p-4 bg-[#E4E4E4] cursor-pointer`}
    required
  >
    <option value="" disabled hidden>
      Select your role
    </option>
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
    <option value="researcher">Researcher</option>
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 text-[#044343]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div> */
}
