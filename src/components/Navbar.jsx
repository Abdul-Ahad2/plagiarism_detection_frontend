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
        <div className="flex justify-between items-center h-full px-7">
          <div className="flex items-center space-x-6">
            <div className={`${bs.className} text-4xl font-bold`}>
              SleuthInk.
            </div>
            <div>Why SleuthInk</div>
            <div> How It Works</div>
            <div>Detection Methods</div>
            <div>Privacy & Ethics</div>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>Support</li>
              <li>Contact</li>
              <li>Log In</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
