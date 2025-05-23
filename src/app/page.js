"use client";
import { useState, useEffect } from "react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { PiUploadFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";
import Link from "next/link";

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

const RotatingBox = ({ children, className = "" }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10; // Reduced from 20 to 10 for subtler effect
    const rotateX = (0.5 - y) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <>
      {/* hero-section */}
      <div className="w-full h-[87vh] flex bg-[#E4E4E4]">
        <div className="w-full bg-[#044343] text-[#E4E4E4] m-1 rounded-4xl flex items-center justify-center border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 ">
          <div className="text-center px-4">
            <h1
              className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
            >
              Ensure Academic Integrity with{" "}
              <span className="bg-[#2c6666] border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
                SleuthInk
              </span>
            </h1>
            <div className="mt-4 md:mt-6">
              <p
                className={`${dmSans_lighter.className} text-base md:text-xl text-[#E4E4E4]`}
              >
                Detect Plagiarism with Precision and Trust.
              </p>
            </div>
            <RotatingBox className="inline-block">
              <Link
                href={"/register"}
                className={`${dmSans_light.className} mt-6 md:mt-8 px-8 py-6 md:px-10 md:py-8 text-[#044343] bg-[#E4E4E4] text-lg md:text-xl border-black border-b-8 border-l-8 border-r-2 border-t-2 rounded-4xl inline-block `}
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
          className={`${dmSans.className} text-center text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-[#044343]`}
        >
          Why Choose SleuthInk?
        </h1>
      </div>

      <div className="w-full lg:h-[85vh] flex flex-col lg:flex-row bg-[#E4E4E4]">
        {/* Text Content - Stacks above image on mobile */}
        <div className="w-full lg:w-1/2 flex items-center p-8 md:p-12 lg:p-24 ">
          <div className="text-[#044343]">
            <h1
              className={`${dmSans_light.className} text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-8 lg:mb-10`}
            >
              Your Partner in Academic Integrity
            </h1>

            <p
              className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-3xl mb-12 md:mb-16 lg:mb-24`}
            >
              SleuthInk stands out with cutting-edge plagiarism detection
              tailored for students, teachers, and researchers. Our platform
              leverages APIs to deliver precise, real-time results, surpassing
              free tools in accuracy and reliability. With a focus on privacy
              and ease of use, SleuthInk helps you maintain originality in
              assignments, grading, and research.
            </p>
          </div>
        </div>

        {/* Image - Stacks below text on mobile */}
        <div className="w-full lg:w-1/2 lg:m-1 order-first lg:order-none p-1 md:p-0">
          <Image
            className="w-full h-auto lg:h-full object-cover rounded-4xl shadow-2xl shadow-gray-600"
            src={"/pic-1.png"}
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
          className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-[#044343]`}
        >
          How It Works
        </h1>
      </div>

      <div className="w-full lg:h-[85vh] bg-[#E4E4E4] flex justify-center p-4 md:p-6 lg:p-8 ">
        <div className="w-full max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 lg:gap-8">
          {/* Upload Box */}
          <RotatingBox>
            <div className="bg-[#044343] h-[20rem] md:h-[25rem] lg:h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl shadow-2xl shadow-gray-600">
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
                  Drag and drop PDF or Word files (up to 10MB or 50 pages) into
                  our secure web portal.
                </p>
              </div>
            </div>
          </RotatingBox>

          {/* Arrow - Hidden on mobile, shown on tablet+ */}
          <FaArrowRight className="hidden md:block text-3xl lg:text-4xl text-[#044343] rotate-90 md:rotate-0" />

          {/* Analysis Box */}
          <RotatingBox>
            <div className="bg-[#044343] h-[20rem] md:h-[25rem] lg:h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl shadow-2xl shadow-gray-600">
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
            <div className="bg-[#044343] h-[20rem] md:h-[25rem] lg:h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl lg:rounded-4xl shadow-2xl shadow-gray-600">
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
                  marked in red (high), orange (moderate), or green (low), plus
                  source links.
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
          className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-[#044343]`}
        >
          Detection Methods
        </h1>
      </div>

      <div className="p-1 bg-[#E4E4E4]">
        <div className="w-full lg:h-[85vh] bg-[#044343] flex justify-center rounded-4xl border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2">
          <div className="w-full lg:w-1/2 h-full p-4 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 grid-rows-4 md:grid-rows-2 lg:grid-rows-2 gap-3 md:gap-4 lg:gap-2">
            {/* TF-IDF Box */}
            <RotatingBox>
              <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                <div className="text-center p-2 md:p-3 lg:p-4">
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-xl lg:text-2xl text-[#044343] m-2 md:m-3`}
                  >
                    TF-IDF with Cosine Similarity
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-xl text-[#044343] p-2 md:p-3 lg:p-4`}
                  >
                    Finds exact text matches, flagging high, medium, or low in a
                    clear report.
                  </p>
                </div>
              </div>
            </RotatingBox>

            {/* Levenshtein Box */}
            <RotatingBox>
              <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 rounded-4xl lg:border-b-8 border-r-2 border-t-2 md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                <div className="text-center p-2 md:p-3 lg:p-4">
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-xl lg:text-2xl text-[#044343] m-2 md:m-3`}
                  >
                    Levenshtein Distance
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-xl text-[#044343] p-2 md:p-3 lg:p-4`}
                  >
                    Spots tiny edits, catching tweaked words in your report.
                  </p>
                </div>
              </div>
            </RotatingBox>

            {/* N-Gram Box */}
            <RotatingBox>
              <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                <div className="text-center p-2 md:p-3 lg:p-4">
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-xl lg:text-2xl text-[#044343] m-2 md:m-3`}
                  >
                    N-Gram Overlap with Jaccard Similarity
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-xl text-[#044343] p-2 md:p-3 lg:p-4`}
                  >
                    Detects shuffled or rephrased text, marking reordered bits.
                  </p>
                </div>
              </div>
            </RotatingBox>

            {/* BERT Box */}
            <RotatingBox>
              <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-4xl md:rounded-4xl lg:rounded-[2rem] aspect-square w-full h-full">
                <div className="text-center p-2 md:p-3 lg:p-4">
                  <h1
                    className={`${dmSans_light.className} text-2xl md:text-xl lg:text-2xl text-[#044343] m-2 md:m-3`}
                  >
                    BERT with Cosine Similarity
                  </h1>
                  <p
                    className={`${dmSans_lighter.className} text-xl md:text-lg lg:text-xl text-[#044343] p-2 md:p-3 lg:p-4`}
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
          className={`${dmSans.className} text-4xl md:text-5xl lg:text-[65px] tracking-tighter text-[#044343]`}
        >
          Privacy & Ethics
        </h1>
      </div>

      <div className="w-full lg:h-[85vh] bg-[#E4E4E4] flex justify-center items-center py-8 lg:py-0">
        <div className="flex flex-col items-center space-y-6 md:space-y-4 w-full px-4 md:px-8 lg:px-0">
          {/* Locked Tight */}
          <RotatingBox className="w-full md:w-4/5 lg:w-3/5">
            <div className="h-auto md:h-[15vh] lg:h-[20vh] border-black border-b-[12px] rounded-4xl border-l-[12px] border-r-2 border-t-2 flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
              <h1
                className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl text-[#044343] text-center md:text-left`}
              >
                <span
                  className={`${dmSans.className} text-xl font-extrabold md:text-2xl lg:text-3xl block md:inline`}
                >
                  Locked Tight
                </span>
                <FaArrowRight className="hidden md:inline mx-3" />
                <span className="block md:inline">
                  Your documents are encrypted during upload and analysis,
                  keeping them safe from prying eyes.
                </span>
              </h1>
            </div>
          </RotatingBox>

          {/* Gone in a Flash */}
          <RotatingBox className="w-full md:w-4/5 lg:w-3/5">
            <div className="h-auto md:h-[15vh] lg:h-[20vh] border-black border-b-[12px] rounded-4xl border-l-[12px] border-r-2 border-t-2 flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
              <h1
                className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl text-[#044343] text-center md:text-left`}
              >
                <span
                  className={`${dmSans.className} text-xl md:text-2xl lg:text-3xl block md:inline`}
                >
                  Gone in a Flash
                </span>
                <FaArrowRight className="hidden md:inline mx-3" />
                <span className="block md:inline">
                  We delete your data right after generating your report,
                  leaving no trace behind.
                </span>
              </h1>
            </div>
          </RotatingBox>

          {/* Fair and Square */}
          <RotatingBox className="w-full md:w-4/5 lg:w-3/5">
            <div className="h-auto md:h-[15vh] lg:h-[20vh] border-black border-b-[12px] rounded-4xl border-l-[12px] border-r-2 border-t-2 flex items-center justify-center lg:rounded-5xl p-4 md:p-6">
              <h1
                className={`${dmSans_lighter.className} text-lg md:text-xl lg:text-2xl text-[#044343] text-center md:text-left`}
              >
                <span
                  className={`${dmSans.className} text-xl md:text-2xl lg:text-3xl block md:inline`}
                >
                  Fair and Square
                </span>
                <FaArrowRight className="hidden md:inline mx-3" />
                <span className="block md:inline">
                  We use only open, trusted sources, ensuring honest and ethical
                  plagiarism checks.
                </span>
              </h1>
            </div>
          </RotatingBox>
        </div>
      </div>
    </>
  );
}
