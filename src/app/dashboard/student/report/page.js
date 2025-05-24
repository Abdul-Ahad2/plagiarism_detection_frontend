"use client";
import { DM_Sans } from "next/font/google";
import {
  PiMagnifyingGlass,
  PiTrash,
  PiEye,
  PiDownload,
  PiClock,
  PiFunnel,
  PiInfo,
} from "react-icons/pi";
import { useState } from "react";
import ReportCard from "@/components/report/ReportCard";
import StatCard from "@/components/report/StatCard";
import TabButton from "@/components/report/TabButton";
import DetailCard from "@/components/report/DetailCard";

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

// Mock report data
const mockReports = [
  {
    id: 1,
    title: "Research Paper.pdf",
    date: "2023-11-15",
    similarity: 100,
    sources: ["arXiv", "CORE", "Wikipedia"],
    wordCount: 5240,
    timeSpent: "2 min 45 sec",
    flagged: true,
  },
  {
    id: 2,
    title: "Research Paper.pdf",
    date: "2023-11-15",
    similarity: 100,
    sources: ["arXiv", "CORE", "Wikipedia"],
    wordCount: 5240,
    timeSpent: "2 min 45 sec",
    flagged: true,
  },
  {
    id: 3,
    title: "Literature Review.docx",
    date: "2023-11-10",
    similarity: 45,
    sources: ["PubMed", "DOAJ"],
    wordCount: 3120,
    timeSpent: "1 min 58 sec",
    flagged: false,
  },
  {
    id: 4,
    title: "Thesis Draft.pdf",
    date: "2023-11-05",
    similarity: 12,
    sources: ["CORE", "Wikipedia"],
    wordCount: 8920,
    timeSpent: "4 min 12 sec",
    flagged: false,
  },
];

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState(mockReports);
  const [viewingReport, setViewingReport] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Calculate statistics
  const totalReports = reports.length;
  const avgSimilarity = (
    reports.reduce((sum, report) => sum + report.similarity, 0) / totalReports
  ).toFixed(1);
  const highSimilarityCount = reports.filter((r) => r.similarity > 70).length;

  return (
    <div className="selection:bg-purple-500 selection:text-white min-h-screen bg-[#E4E4E4] p-1 md:p-1">
      {/* Main Container */}
      <div className="bg-purple-300 rounded-4xl border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1
            className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
          >
            Your{" "}
            <span className="bg-purple-400 border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
              Reports
            </span>
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <StatCard value={totalReports} label="Total Checks" />
          <StatCard value={`${avgSimilarity}%`} label="Avg Similarity" />
          <StatCard value={highSimilarityCount} label="High Matches" />
        </div>

        {/* Controls Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-center w-full items-start md:items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <PiMagnifyingGlass className="absolute left-4 top-1/2 transform text-3xl -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search documents..."
                className={`${dmSans_lighter.className} w-full pl-12 pr-6 py-4 bg-[#E4E4E4] rounded-4xl border-black border-b-4 border-l-4 border-r-2 border-t-2 text-lg`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-2">
                <select
                  className={`${dmSans_lighter.className} bg-[#E4E4E4] px-4 py-3 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2 text-lg`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Similarity</option>
                  <option value="lowest">Lowest Similarity</option>
                </select>
              </div>

              <div className="flex gap-2">
                <TabButton
                  active={activeTab === "all"}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </TabButton>
                <TabButton
                  active={activeTab === "flagged"}
                  onClick={() => setActiveTab("flagged")}
                >
                  Flagged
                </TabButton>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={() => setViewingReport(report)}
              onDelete={() =>
                setReports(reports.filter((r) => r.id !== report.id))
              }
            />
          ))}
        </div>
      </div>

      {/* Report Detail Modal */}
      {viewingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-8 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`${dmSans.className} text-3xl mb-1`}>
                  {viewingReport.title}
                </h2>
                <p className={`${dmSans_lighter.className} text-lg`}>
                  Analyzed on {viewingReport.date} •{" "}
                  {viewingReport.wordCount.toLocaleString()} words
                </p>
              </div>
              <button
                onClick={() => setViewingReport(null)}
                className="text-2xl hover:text-purple-600"
              >
                ✕
              </button>
            </div>

            {/* Similarity Score */}
            <div className="bg-white p-6 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className={`${dmSans_light.className} text-xl`}>
                  Similarity Score
                </h3>
                <span
                  className={`text-2xl font-bold ${
                    viewingReport.similarity > 70
                      ? "text-red-600"
                      : viewingReport.similarity > 30
                      ? "text-orange-500"
                      : "text-green-600"
                  }`}
                >
                  {viewingReport.similarity}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    viewingReport.similarity > 70
                      ? "bg-red-600"
                      : viewingReport.similarity > 30
                      ? "bg-orange-500"
                      : "bg-green-600"
                  }`}
                  style={{ width: `${viewingReport.similarity}%` }}
                ></div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DetailCard
                icon={<PiClock size={24} />}
                title="Processing Time"
                value={viewingReport.timeSpent}
              />
              <DetailCard
                icon={<PiInfo size={24} />}
                title="Sources Checked"
                value={viewingReport.sources.join(", ")}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6">
              <button
                className={`${dmSans_light.className} px-8 py-4 bg-blue-400 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2 text-xl flex items-center gap-3 hover:bg-blue-500 transition`}
              >
                <PiDownload size={24} /> Download
              </button>
              <button
                className={`${dmSans_light.className} px-8 py-4 bg-purple-400 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2 text-xl hover:bg-purple-500 transition`}
              >
                View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
