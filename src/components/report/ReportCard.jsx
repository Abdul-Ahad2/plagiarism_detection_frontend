import { DM_Sans } from "next/font/google";
import { PiEye, PiTrash } from "react-icons/pi";

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

function ReportCard({ report, onView, onDelete }) {
  return (
    <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 overflow-hidden h-full flex flex-col">
      {/* Header with Title and Similarity */}
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`${dmSans_light.className} text-xl`}>
            {report.title}
          </h3>
          <span
            className={`text-2xl font-bold ${
              report.similarity > 70
                ? "text-red-600"
                : report.similarity > 30
                ? "text-orange-500"
                : "text-green-600"
            }`}
          >
            {report.similarity}%
          </span>
        </div>

        {/* Metadata */}
        <div className="mb-4">
          <p className={`${dmSans_lighter.className} text-lg mb-2`}>
            {report.date} • {report.timeSpent}
          </p>
          <p className={`${dmSans_lighter.className} text-lg`}>
            {report.wordCount.toLocaleString()} words
          </p>
        </div>

        {/* Sources */}
        <div className="flex flex-wrap gap-2 mb-4">
          {report.sources.map((source, i) => (
            <span
              key={i}
              className="text-sm bg-purple-200 px-3 py-1 rounded-full border border-black"
            >
              {source}
            </span>
          ))}
        </div>

        {/* Flag Badge */}
        {report.flagged && (
          <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Flagged for Review
          </div>
        )}
      </div>

      {/* Footer with Actions */}
      <div className="bg-purple-200/50 px-6 py-4 border-t border-black flex justify-between items-center">
        <button
          onClick={onView}
          className={`${dmSans_light.className} px-4 py-2 bg-white rounded-xl border-black border-b-2 border-l-2 border-r-1 border-t-1 flex items-center gap-2 hover:bg-purple-100 transition`}
        >
          <PiEye size={20} /> View
        </button>
        <button
          onClick={onDelete}
          className={`${dmSans_light.className} px-4 py-2 bg-white rounded-xl border-black border-b-2 border-l-2 border-r-1 border-t-1 flex items-center gap-2 hover:bg-red-100 transition`}
        >
          <PiTrash size={20} /> Delete
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
