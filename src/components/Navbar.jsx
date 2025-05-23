import { DM_Sans } from "next/font/google";
import { Berkshire_Swash } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Navbar() {
  return (
    <>
      <div
        className={`${dmSans.className} w-full bg-[#E4E4E4] h-[13vh] text-[#045757]`}
      >
        {/* Mobile & Tablet View - Only Logo */}
        <div className="md:hidden flex items-center justify-center h-full">
          <div className={`${bs.className} text-4xl font-bold`}>SleuthInk.</div>
        </div>

        {/* Desktop View - Full Navigation */}
        <div className="hidden md:flex justify-between items-center h-full px-7">
          <div className="flex items-center space-x-6">
            <div className={`${bs.className} text-4xl font-bold`}>
              SleuthInk.
            </div>
            <a href="/#why-choose">Why SleuthInk</a>
            <a href="/#how-it-works">How It Works</a>
            <a href="/#detection-methods">Detection Methods</a>
            <a href="/#privacy">Privacy & Ethics</a>
          </div>
          <div>
            <div className="flex space-x-6">
              <div>Support</div>
              <div>Contact</div>
              <Link href={"/login"}>Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
