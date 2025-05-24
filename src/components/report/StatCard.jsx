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

function StatCard({ value, label }) {
  return (
    <div className="bg-[#E4E4E4] flex items-center justify-center px-8 py-6 rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 text-center h-[25vh] w-2/12 max-w-xs">
      <div>
        <p className={`${dmSans_light.className} text-4xl mb-2`}>{value}</p>
        <p className={`${dmSans_lighter.className} text-xl`}>{label}</p>
      </div>
    </div>
  );
}
export default StatCard;
