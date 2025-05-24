import { DM_Sans } from "next/font/google";
import { PiUpload, PiFilePdf, PiFileDoc, PiLock } from "react-icons/pi";
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

export default function UploadPage() {
  return (
    <div className="selection:bg-purple-500 selection:text-white">
      {/* Upload Section */}
      <div className="w-full h-[87vh] flex bg-[#E4E4E4]">
        <div className="w-full bg-purple-300 text-gray-800 m-1 rounded-4xl flex items-center justify-center border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2">
          <div className="text-center px-4 w-full max-w-4xl">
            <h1
              className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
            >
              Upload Your{" "}
              <span className="bg-purple-400 border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
                Document
              </span>
            </h1>

            <div className="mt-8 md:mt-12">
              {/* Drag & Drop Zone */}
              <div className="bg-[#E4E4E4] border-2 border-dashed border-black rounded-4xl p-8 md:p-12 mb-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <PiUpload className="text-5xl md:text-6xl text-purple-600" />
                  <p
                    className={`${dmSans_lighter.className} text-xl md:text-2xl`}
                  >
                    Drag & drop file here
                  </p>
                  <p
                    className={`${dmSans_lighter.className} text-sm md:text-base`}
                  >
                    (or click to browse)
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="flex items-center">
                      <PiFilePdf className="mr-1" /> PDF
                    </span>
                    <span className="flex items-center">
                      <PiFileDoc className="mr-1" /> Word
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 mb-1">
                <PiLock className="text-purple-600" />
                <span
                  className={`${dmSans_lighter.className} text-sm md:text-lg`}
                >
                  All files are encrypted and deleted after processing
                </span>
              </div>

              {/* Action Button */}
              <RotatingBox className="inline-block">
                <button
                  className={`${dmSans_light.className} mt-4 px-4 py-6 md:px-12 md:py-8 text-black bg-[#E4E4E4] text-lg md:text-xl border-black border-b-8 border-l-8 border-r-2 border-t-2 rounded-4xl inline-block`}
                >
                  Analyze for Plagiarism
                </button>
              </RotatingBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
