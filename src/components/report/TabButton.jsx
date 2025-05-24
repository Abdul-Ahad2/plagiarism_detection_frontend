import { DM_Sans } from "next/font/google";

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

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${
        dmSans_light.className
      } px-6 py-3 text-lg rounded-3xl border-black ${
        active
          ? "bg-purple-500 text-white border-b-4 border-l-4 border-r-2 border-t-2"
          : "bg-[#E4E4E4] border-b-4 border-l-4 border-r-2 border-t-2 hover:bg-purple-200"
      }`}
    >
      {children}
    </button>
  );
}
export default TabButton;
