"use client";
import { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { PiUploadFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import Link from "next/link";
import RotatingBox from "@/components/RotatingBox";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["1000"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
});

export default function Home() {
  return (
    <>
      <div className="selection:bg-purple-500 selection:text-white">
        {/* hero-section */}
        <div className="w-full h-[87vh] flex bg-[#E4E4E4]">
          <div className="w-full bg-purple-300 text-gray-800 m-1 rounded-4xl flex items-center justify-center border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 ">
            <div className="text-center px-4">
              <h1
                className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
              >
                Ensure Academic Integrity with{" "}
                <span className="bg-purple-400 border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
                  SleuthInk
                </span>
              </h1>
              <div className="mt-4 md:mt-6">
                <p
                  className={`${dmSans_lighter.className} text-base md:text-xl text-black`}
                >
                  Detect Plagiarism with Precision and Trust.
                </p>
              </div>
              <RotatingBox className="inline-block">
                <Link
                  href={"/register"}
                  className={`${dmSans_light.className} mt-6 md:mt-8 px-8 py-6 md:px-10 md:py-8 text-black bg-[#E4E4E4] text-lg md:text-xl border-black border-b-8 border-l-8 border-r-2 border-t-2 rounded-4xl inline-block `}
                >
                  Sign Up - It&apos;s Free
                </Link>
              </RotatingBox>
            </div>
          </div>
        </div>
        <div
          id="why-choose"
          className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center"
        >
          <h1
            className={`${dmSans.className} text-center text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-black`}
          >
            Why Choose SleuthInk?
          </h1>
        </div>

        <div className="w-full lg:h-[85vh] flex flex-col lg:flex-row bg-[#E4E4E4]">
          {/* Text Content - Stacks above image on mobile */}
          <div className="w-full lg:w-1/2 flex items-center p-8 md:p-12 lg:p-24 ">
            <div className="text-black">
              <h1
                className={`${dmSans_light.className} text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-8 lg:mb-10 tracking-tighter`}
              >
                Your Partner in Academic Integrity
              </h1>

              <p
                className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-3xl mb-3`}
              >
                SleuthInk stands out with cutting-edge plagiarism detection
                tailored for students, teachers, and researchers. Our platform
                leverages APIs to deliver precise, real-time results, surpassing
                free tools in{" "}
                <span className="bg-purple-300 border-black border-l-2 border-r-2">
                  accuracy and reliability
                </span>
                . With a focus on privacy and ease of use, SleuthInk helps you
                maintain originality in assignments, grading, and research.
              </p>
              <RotatingBox className="inline-block">
                <Link
                  href={"/register"}
                  className={`${dmSans_light.className} mt-4  px-8 py-6 md:px-12 md:py-5 text-black bg-purple-300 text-lg md:text-xl border-black border-b-8 border-l-8 border-r-2 border-t-2 rounded-3xl inline-block `}
                >
                  Try It Now
                </Link>
              </RotatingBox>
            </div>
          </div>

          {/* Image - Stacks below text on mobile */}
          <div className="w-full lg:w-1/2 lg:m-1 order-first lg:order-none p-1 md:p-0">
            <Image
              className="w-full h-auto lg:h-full object-cover rounded-4xl shadow-2xl shadow-gray-600"
              src={"/pic-2.png"}
              width={1000}
              height={1000}
              alt="SleuthInk feature illustration"
            />
          </div>
        </div>
        {/* how-it-works */}
        <div
          id="how-it-works"
          className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center"
        >
          <h1
            className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-black`}
          >
            How It Works
          </h1>
        </div>

        <div className="w-full lg:h-[85vh] bg-[#E4E4E4] flex justify-center p-4 md:p-6 lg:p-8 ">
          <div className="w-full max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-8">
            {/* Upload Box */}
            <RotatingBox>
              <div className="bg-purple-300 h-[20rem] md:h-[25rem]  w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-black flex items-center justify-center rounded-4xl shadow-2xl shadow-gray-600">
                <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
                  <PiUploadFill className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-5 lg:mb-6" />
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-3xl font-medium mb-2 md:mb-3`}
                  >
                    Upload Your Work
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl`}
                  >
                    Drag and drop PDF or Word files (up to 10MB or 50 pages)
                    into our secure web portal.
                  </p>
                </div>
              </div>
            </RotatingBox>

            {/* Arrow - Hidden on mobile, shown on tablet+ */}
            <FaArrowRight className="hidden md:block text-3xl lg:text-4xl text-black rotate-90 md:rotate-0" />

            {/* Analysis Box */}
            <RotatingBox>
              <div className="bg-purple-300 h-[20rem] md:h-[25rem]  w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-black flex items-center justify-center rounded-4xl shadow-2xl shadow-gray-600">
                <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
                  <TbReportSearch className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-5 lg:mb-6" />
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-3xl font-medium mb-2 md:mb-3`}
                  >
                    Instant Analysis
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl`}
                  >
                    SleuthInk scans your document against millions of academic
                    sources using APIs like arXiv and CORE.
                  </p>
                </div>
              </div>
            </RotatingBox>

            {/* Arrow - Hidden on mobile, shown on tablet+ */}
            <FaArrowRight className="hidden md:block text-3xl lg:text-4xl text-[#044343] rotate-90 md:rotate-0" />

            {/* Report Box */}
            <RotatingBox>
              <div className="bg-purple-300 h-[20rem] md:h-[25rem]  w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-black flex items-center justify-center rounded-4xl lg:rounded-4xl shadow-2xl shadow-gray-600">
                <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
                  <HiDocumentReport className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-5 lg:mb-6" />
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-3xl font-medium mb-2 md:mb-3`}
                  >
                    Receive Your Report
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl`}
                  >
                    Get a color-coded PDF report in minutes, with similarities
                    marked in red (high), orange (moderate), or green (low),
                    plus source links.
                  </p>
                </div>
              </div>
            </RotatingBox>
          </div>
        </div>

        {/* detection-methods */}
        <div
          id="detection-methods"
          className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center"
        >
          <h1
            className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-black`}
          >
            Detection Methods
          </h1>
        </div>

        <div className="p-1 bg-[#E4E4E4] text-black">
          <div className="w-full lg:h-[140vh] bg-[#E4E4E4] flex justify-center rounded-4xl ">
            <div className="w-full lg:w-3/4 h-full p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-3 md:gap-4 lg:gap-2">
              {/* TF-IDF Box */}
              <RotatingBox>
                <div className="bg-purple-300 flex items-center justify-center border-black border-l-[12px] border-b-[12px] border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                  <div className="text-center p-2 md:p-3 lg:p-4">
                    <h1
                      className={`${dmSans.className} text-2xl md:text-xl lg:text-5xl text-black m-2 md:m-3`}
                    >
                      TF-IDF with Cosine Similarity
                    </h1>
                    <p
                      className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-3xl text-black p-2 md:p-3 lg:p-4`}
                    >
                      Finds exact text matches, flagging high, medium, or low in
                      a clear report.
                    </p>
                  </div>
                </div>
              </RotatingBox>

              {/* Levenshtein Box */}
              <RotatingBox>
                <div className="bg-purple-300 flex items-center justify-center border-black border-l-[12px] border-b-[12px] rounded-4xl  border-r-2 border-t-2 md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                  <div className="text-center p-2 md:p-3 lg:p-4">
                    <h1
                      className={`${dmSans.className} text-2xl md:text-xl lg:text-5xl  m-2 md:m-3`}
                    >
                      Levenshtein Distance
                    </h1>
                    <p
                      className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-3xl p-2 md:p-3 lg:p-4`}
                    >
                      Spots tiny edits, catching tweaked words in your report.
                    </p>
                  </div>
                </div>
              </RotatingBox>

              {/* N-Gram Box */}
              <RotatingBox>
                <div className="bg-purple-300 flex items-center justify-center border-black border-l-[12px] border-b-[12px] border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                  <div className="text-center p-2 md:p-3 lg:p-4">
                    <h1
                      className={`${dmSans.className} text-2xl md:text-xl lg:text-5xl m-2 md:m-3`}
                    >
                      N-Gram Overlap with Jaccard Similarity
                    </h1>
                    <p
                      className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-3xl  p-2 md:p-3 lg:p-4`}
                    >
                      Detects shuffled or rephrased text, marking reordered
                      bits.
                    </p>
                  </div>
                </div>
              </RotatingBox>

              {/* BERT Box */}
              <RotatingBox>
                <div className="bg-purple-300 flex items-center justify-center border-black border-l-[12px] border-b-[12px] border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                  <div className="text-center p-2 md:p-3 lg:p-4">
                    <h1
                      className={`${dmSans.className} text-2xl md:text-xl lg:text-5xl  m-2 md:m-3`}
                    >
                      BERT with Cosine Similarity
                    </h1>
                    <p
                      className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-3xl  p-2 md:p-3 lg:p-4`}
                    >
                      Nabs reworded or AI-made text by checking meaning.
                    </p>
                  </div>
                </div>
              </RotatingBox>
            </div>
          </div>
        </div>
        {/* privacy-and-ethics */}
        <div
          id="privacy"
          className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center"
        >
          <h1
            className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-black`}
          >
            Privacy & Ethics
          </h1>
        </div>

        <div className="w-full lg:h-[100vh] text-center bg-[#E4E4E4] md:px-40 flex justify-center items-center py-8 md:py-0">
          <RotatingBox className="inline-block">
            <div className="flex h-[90vh] flex-col items-center bg-purple-300 rounded-4xl border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 space-y-6 md:space-y-4 w-full px-4 pt-10 md:px-8 lg:px-0">
              <div className="w-full md:w-4/5 lg:w-3/5">
                <div className="h-auto md:h-[15vh] lg:h-auto flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
                  <div>
                    <div
                      className={`${dmSans.className} text-xl font-extrabold md:text-2xl lg:text-4xl block md:inline tracking-tighter`}
                    >
                      Locked Tight
                    </div>
                    <h1
                      className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-3xl text-black my-4 text-center md:text-center`}
                    >
                      <span className="block md:inline">
                        Your documents are encrypted during upload and analysis,
                        keeping them safe from prying eyes.
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              <hr className="text-black bg-black h-1 w-1/2 rounded-4xl" />

              {/* Gone in a Flash - Tilted 30deg right */}
              <div className="w-full md:w-4/5 lg:w-3/5">
                <div className="h-auto md:h-[15vh] lg:h-[20vh] flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
                  <div>
                    <div
                      className={`${dmSans.className} text-xl md:text-2xl lg:text-4xl block md:inline tracking-tighter`}
                    >
                      Gone in a Flash
                    </div>
                    <h1
                      className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-3xl my-4 text-black text-center md:text-center`}
                    >
                      <span className="block md:inline">
                        We delete your data right after generating your report,
                        leaving no trace behind.
                      </span>
                    </h1>
                  </div>
                </div>
              </div>

              <hr className="text-black bg-black h-1 w-1/2 rounded-4xl" />

              {/* Fair and Square - Tilted 30deg left */}
              <div className="w-full md:w-4/5 lg:w-3/5">
                <div className="h-auto md:h-[15vh] lg:h-[20vh] flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
                  <div>
                    <div
                      className={`${dmSans.className} text-xl md:text-2xl lg:text-4xl block md:inline tracking-tighter`}
                    >
                      Fair and Square
                    </div>
                    <h1
                      className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-3xl my-4 text-black text-center md:text-center`}
                    >
                      <span className="block md:inline">
                        We use only open, trusted sources, ensuring honest and
                        ethical plagiarism checks.
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </RotatingBox>
        </div>
      </div>
    </>
  );
}
