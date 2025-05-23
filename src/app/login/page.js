"use client";
import { DM_Sans } from "next/font/google";
import { BsGoogle } from "react-icons/bs";
import { useState, useEffect } from "react";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Login() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    <div className="flex items-center justify-center md:h-[95vh] bg-[#E4E4E4] px-4 py-8 sm:px-6 lg:px-0 lg:py-0">
      <div
        className={`w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-[#E4E4E4] text-center rounded-3xl lg:rounded-4xl px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 shadow-lg lg:shadow-2xl ${
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
          className={`${dmSans.className} text-5xl  lg:text-6xl mb-6 sm:mb-7 lg:mb-8 text-[#044343] tracking-tight`}
        >
          Welcome Back.
        </h1>

        <form className="space-y-4 sm:space-y-5 lg:space-y-6">
          <div>
            <input
              type="email"
              className={`${dmSans_lighter.className} border-b-4 sm:border-b-6 lg:border-b-8 border-l-4 sm:border-l-6 lg:border-l-8 border-t-2 border-r-2 rounded-3xl lg:rounded-4xl border-black text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4`}
              placeholder="Enter Email"
              required
            />
            <p className="text-right mt-2 text-sm sm:text-base text-[#044343]">
              <Link href="/forgot-password">Forgot Password?</Link>
            </p>
          </div>

          <input
            type="password"
            className={`${dmSans_lighter.className} border-b-4 sm:border-b-6 lg:border-b-8 border-l-4 sm:border-l-6 lg:border-l-8 border-t-2 border-r-2 rounded-3xl lg:rounded-4xl border-black text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4`}
            placeholder="Enter Password"
            required
          />

          <button
            type="submit"
            className={`${dmSans_lighter.className} border-b-4 sm:border-b-6 lg:border-b-8 border-l-4 sm:border-l-6 lg:border-l-8 border-t-2 border-r-2 rounded-3xl lg:rounded-4xl border-black text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 bg-[#044343] text-[#E4E4E4] hover:bg-[#033333] transition-colors`}
          >
            Login
          </button>

          <button
            type="button"
            className={`${dmSans_lighter.className} border-b-4 sm:border-b-6 lg:border-b-8 border-l-4 sm:border-l-6 lg:border-l-8 border-t-2 border-r-2 rounded-3xl lg:rounded-4xl border-black text-base sm:text-lg lg:text-xl w-full h-17 md:h-16 lg:h-20 p-3 sm:p-4 bg-[#044343] text-[#E4E4E4] hover:bg-[#033333] transition-colors flex items-center justify-center gap-2 sm:gap-3`}
          >
            <BsGoogle className="text-lg" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-sm sm:text-base text-center mt-4 sm:mt-5">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#044343] font-medium underline hover:no-underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
