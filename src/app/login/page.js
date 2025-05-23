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

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to window
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Calculate rotation values (adjust multiplier for more/less rotation)
      const rotateY = (x - 0.5) * 20; // 20 degrees max rotation
      const rotateX = (0.5 - y) * 20;

      setRotation({ x: rotateX, y: rotateY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-[85vh] bg-[#E4E4E4]">
      <div
        className="h-[78vh] w-6/12 bg-[#E4E4E4]   text-center rounded-4xl px-10 shadow-2xl"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <h1
          className={`${dmSans.className} text-6xl m-7 text-[#044343] tracking-[-5px] `}
        >
          Welcome Back.
        </h1>
        <form>
          <input
            type="text"
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4`}
            placeholder="Enter Email"
          />
          <p className="text-right mr-5 text-[#044343]">Forgot Password?</p>
          <input
            type="text"
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-9`}
            placeholder="Enter Password"
          />
          <button
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4 bg-[#044343] text-[#E4E4E4]`}
            type="submit"
          >
            Login
          </button>
          <button
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4 bg-[#044343] text-[#E4E4E4] flex justify-center items-center space-x-4`}
            type="submit"
          >
            <BsGoogle />
            <div>Signin with Google</div>
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href={"/register"} className="text-[#044343] underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
