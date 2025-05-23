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

export default function Register() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [userRole, setUserRole] = useState("");

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
    <div className="flex items-center justify-center h-[115vh] bg-[#E4E4E4]">
      <div
        className="h-[108vh] w-6/12 bg-[#E4E4E4] shadow-2xl text-center rounded-4xl px-10"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <h1
          className={`${dmSans.className} text-6xl m-7 text-[#044343] tracking-[-5px] `}
        >
          Create Account.
        </h1>
        <form>
          <input
            type="text"
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4`}
            placeholder="Enter Full Name"
          />
          <input
            type="text"
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4`}
            placeholder="Enter Email"
          />

          {/* User Role Dropdown */}
          <div className="relative mb-4">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className={`${dmSans_lighter.className} appearance-none border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 bg-[#E4E4E4] cursor-pointer`}
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
                className="w-6 h-6 text-[#044343]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4`}
            placeholder="Enter Password"
          />
          <input
            type="password"
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4`}
            placeholder="Confirm Password"
          />
          <button
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4 bg-[#044343] text-[#E4E4E4]`}
            type="submit"
          >
            Register
          </button>
          <button
            className={`${dmSans_lighter.className} border-b-8 border-l-8 border-t-2 border-r-2 rounded-4xl border-black text-xl w-full h-20 p-4 mb-4 bg-[#044343] text-[#E4E4E4] flex justify-center items-center space-x-4`}
            type="button"
          >
            <BsGoogle />
            <div>Sign up with Google</div>
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#044343] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
