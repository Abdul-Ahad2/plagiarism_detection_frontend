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

function DetailCard({ icon, title, value }) {
  return (
    <div className="bg-white p-5 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-purple-500">{icon}</div>
        <h3 className={`${dmSans_light.className} text-xl`}>{title}</h3>
      </div>
      <p className={`${dmSans.className} text-2xl`}>{value}</p>
    </div>
  );
}
export default DetailCard;
