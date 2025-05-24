import { DM_Sans } from "next/font/google";
import { Berkshire_Swash } from "next/font/google";
import Link from "next/link";
import { PiFileText, PiUpload, PiChartBar, PiGear } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400"] });

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

export default function StudentNavbar() {
  return (
    <div
      className={`${dmSans.className} w-full bg-[#E4E4E4] h-[13vh] text-black `}
    >
      <div className="flex justify-between items-center h-full px-7">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link href="/dashboard/student/report" className="flex items-center">
            <PiFileText className="mr-2" /> My Reports
          </Link>
          <Link href="/dashboard/student/upload" className="flex items-center">
            <PiUpload className="mr-1" /> Check Plagiarism
          </Link>
        </div>

        <div className=" flex items-center justify-center h-full">
          <div className={`${bs.className} text-4xl font-bold text-black`}>
            SleuthInk.
          </div>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6">
          <Link
            href="/dashboard/student/analytics"
            className="flex items-center"
          >
            <PiChartBar className="mr-1" /> Analytics
          </Link>
          <Link
            href="/dashboard/student/settings"
            className="flex items-center"
          >
            <PiGear className="mr-1" /> Settings
          </Link>
          <Link href="/" className="flex items-center">
            <IoIosLogOut className="mr-1" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
