import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { PiUploadFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { HiDocumentReport } from "react-icons/hi";

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
      {/* hero-section */}
      <div className="w-full h-[87vh] flex bg-[#E4E4E4]">
        <div className="w-full bg-[#044343] text-[#E4E4E4] m-1 rounded-sm flex items-center justify-center">
          <div className="text-center">
            <h1 className={`${dmSans.className} text-[65px] tracking-tighter`}>
              Ensure Academic Integrity with{" "}
              <span className="bg-[#2c6666] border-black border-l-4 border-r-4">
                SleuthInk
              </span>
            </h1>
            <div>
              <p
                className={`${dmSans_lighter.className} text-xl text-[#E4E4E4]`}
              >
                Detect Plagiarism with Precision and Trust.
              </p>
            </div>
            <button
              className={`${dmSans_light.className} mt-6 px-10 py-8 text-[#044343] bg-[#E4E4E4]  text-lg border-black border-b-8 border-l-8 border-r-2 border-t-2  `}
            >
              Sign Up - It's Free
            </button>
          </div>
        </div>
      </div>
      {/* why-sleuthink */}
      <div className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center">
        <h1
          className={`${dmSans.className} text-[65px] tracking-tighter text-[#044343]`}
        >
          Why Choose SleuthInk?
        </h1>
      </div>
      <div className="w-full h-[85vh] flex bg-[#E4E4E4]">
        <div className="w-full flex items-center  p-24">
          <div className="text-[#044343]">
            <h1 className={`${dmSans_light.className} text-[34px] mb-10`}>
              Your Partner in Academic Integrity
            </h1>

            <p className={`${dmSans_lighter.className} text-3xl mb-24`}>
              SleuthInk stands out with cutting-edge plagiarism detection
              tailored for students, teachers, and researchers. Our platform
              leverages APIs to deliver precise, real-time results, surpassing
              free tools in accuracy and reliability. With a focus on privacy
              and ease of use, SleuthInk helps you maintain originality in
              assignments, grading, and research.
            </p>
          </div>
        </div>
        <div className="w-full m-1">
          <Image
            className="w-full object-cover rounded-sm"
            src={"/pic-1.png"}
            width={"1000"}
            height={"1000"}
          />
        </div>
      </div>
      {/* how-it-works */}
      <div className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center">
        <h1
          className={`${dmSans.className} text-[65px] tracking-tighter text-[#044343]`}
        >
          How It Works
        </h1>
      </div>
      <div className="w-full h-[85vh] bg-[#E4E4E4] flex  justify-center p-8">
        <div className="w-full max-w-8xl mx-auto grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-8">
          {/* Upload Box */}
          <div className="bg-[#044343] h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl">
            <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
              <PiUploadFill className="text-8xl mb-6" />
              <h1
                className={`${dmSans_light.className} text-3xl font-medium mb-3`}
              >
                Upload Your Work
              </h1>
              <p className={`${dmSans_lighter.className} text-2xl`}>
                Drag and drop PDF or Word files (up to 10MB or 50 pages) into
                our secure web portal.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <FaArrowRight className="text-4xl text-[#044343]" />

          {/* Analysis Box */}
          <div className="bg-[#044343] h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl">
            <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
              <TbReportSearch className="text-8xl mb-6" />
              <h1
                className={`${dmSans_light.className} text-3xl font-medium mb-3`}
              >
                Instant Analysis
              </h1>
              <p className={`${dmSans_lighter.className} text-2xl`}>
                SleuthInk scans your document against millions of academic
                sources using APIs like arXiv and CORE.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <FaArrowRight className="text-4xl text-[#044343]" />

          {/* Report Box */}
          <div className="bg-[#044343] h-[28rem] w-full aspect-[4/5] border-black border-b-8 border-l-8 border-r-2 border-t-2 text-[#E4E4E4] flex items-center justify-center rounded-4xl">
            <div className="text-center flex flex-col items-center justify-center w-full max-w-md px-4">
              <HiDocumentReport className="text-8xl mb-6" />
              <h1
                className={`${dmSans_light.className} text-3xl font-medium mb-3`}
              >
                Receive Your Report
              </h1>
              <p className={`${dmSans_lighter.className} text-2xl`}>
                Get a color-coded PDF report in minutes, with similarities
                marked in red (high), orange (moderate), or green (low), plus
                source links.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* detection-methods */}
      <div className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center">
        <h1
          className={`${dmSans.className} text-[65px] tracking-tighter text-[#044343]`}
        >
          Detection Methods
        </h1>
      </div>
      <div className="p-1 bg-[#E4E4E4]">
        <div className="w-full h-[85vh] bg-[#044343] flex justify-center rounded-sm">
          <div className="w-1/2 h-[85vh] p-8 grid grid-cols-2 grid-rows-2 gap-2 ">
            <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-[2rem] aspect-square w-full h-full">
              <div className="text-center">
                <h1
                  className={`${dmSans_light.className} text-2xl text-[#044343] m-3`}
                >
                  TF-IDF with Cosine Similarity
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl text-[#044343] p-4`}
                >
                  Finds exact text matches, flagging high , medium, or low in a
                  clear report.
                </p>
              </div>
            </div>

            <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-[2rem] aspect-square w-full h-full">
              <div className="text-center">
                <h1
                  className={`${dmSans_light.className} text-2xl text-[#044343] m-3`}
                >
                  Levenshtein Distance
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl text-[#044343] p-4`}
                >
                  Spots tiny edits, catching tweaked words in your report.
                </p>
              </div>
            </div>

            <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-[2rem] aspect-square w-full h-full">
              <div className="text-center">
                <h1
                  className={`${dmSans_light.className} text-2xl text-[#044343] m-3`}
                >
                  N-Gram Overlap with Jaccard Similarity
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl text-[#044343] p-4`}
                >
                  Detects shuffled or rephrased text, marking reordered bits.
                </p>
              </div>
            </div>

            <div className="bg-[#E4E4E4] flex items-center justify-center border-black border-l-8 border-b-8 border-r-2 border-t-2 rounded-[2rem] aspect-square w-full h-full">
              <div className="text-center">
                <h1
                  className={`${dmSans_light.className} text-2xl text-[#044343] m-3`}
                >
                  BERT with Cosine Similarity
                </h1>
                <p
                  className={`${dmSans_lighter.className} text-xl text-[#044343] p-4`}
                >
                  Nabs reworded or AI-made text by checking meaning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* privacy-and-ethic*/}
      <div className="w-full h-[20vh] bg-[#E4E4E4] rounded-sm flex items-center justify-center">
        <h1
          className={`${dmSans.className} text-[65px] tracking-tighter text-[#044343]`}
        >
          Privacy & Ethics
        </h1>
      </div>
      <div className="w-full h-[85vh] bg-[#E4E4E4] flex justify-center items-center">
        <div className="flex flex-col items-center space-y-12">
          <div className="w-3/5 h-[20vh] border-[#044343] border-b-8 border-l-8 flex items-center justify-center rounded-5xl p-4">
            <h1
              className={`${dmSans_lighter.className} text-3xl text-[#044343]`}
            >
              <span className={`${dmSans_light.className} text-4xl`}>
                Locked Tight
              </span>
              <FaArrowRight className="inline m-3" />
              Your documents are encrypted during upload and analysis, keeping
              them safe from prying eyes.
            </h1>
          </div>
          <div className="w-3/5 h-[20vh] border-[#044343] border-b-8 border-l-8 flex items-center justify-center rounded-5xl p-4">
            <h1
              className={`${dmSans_lighter.className} text-3xl text-[#044343]`}
            >
              <span className={`${dmSans_light.className} text-4xl`}>
                Gone in a Flash
              </span>
              <FaArrowRight className="inline m-3" />
              We delete your data right after generating your report, leaving no
              trace behind.
            </h1>
          </div>
          <div className="w-3/5 h-[20vh] border-[#044343] border-b-8 border-l-8 flex items-center justify-center rounded-5xl p-4">
            <h1
              className={`${dmSans_lighter.className} text-3xl text-[#044343]`}
            >
              <span className={`${dmSans_light.className} text-4xl`}>
                Fair and Square
              </span>
              <FaArrowRight className="inline m-3" />
              We use only open, trusted sources, ensuring honest and ethical
              plagiarism checks.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
