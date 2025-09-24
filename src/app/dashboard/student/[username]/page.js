"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function dashboard() {
  return (
    <>
      <h1 className="flex justify-center items-center text-white bg-gray-800 h-screen">
        Dashboard
      </h1>
    </>
  );
}
