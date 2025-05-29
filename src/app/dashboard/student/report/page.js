"use client";
import { DM_Sans, Raleway } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

const rw_bold = Raleway({
  subsets: ["latin"],
  weight: ["700"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
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
    title: "Literature Review.docx",
    date: "2023-11-10",
    similarity: 45,
    sources: ["PubMed", "DOAJ"],
    wordCount: 3120,
    timeSpent: "1 min 58 sec",
    flagged: false,
  },
  {
    id: 3,
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

  // Filter reports based on active tab and search term
  const filteredReports = reports
    .filter((report) => {
      if (activeTab === "flagged") return report.flagged;
      return true;
    })
    .filter((report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "highest") return b.similarity - a.similarity;
    if (sortBy === "lowest") return a.similarity - b.similarity;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44 px-52">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`${rw_bold.className} text-5xl md:text-6xl lg:text-7xl mb-4`}
          >
            Your{" "}
            <span className="bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">
              Reports
            </span>
          </h1>
          <p
            className={`${dmSans_light.className} text-lg md:text-xl text-gray-400 max-w-3xl mx-auto`}
          >
            Detailed analysis of all your plagiarism checks with comprehensive
            results
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12 px-40">
          {/* Total Checks Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center  border border-gray-700 p-6 text-center h-48 transition-transform hover:scale-105 ">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                Total Checks
              </h3>
              <p
                className={`${rw_bold.className} text-4xl md:text-5xl bg-gradient-to-r from-purple-200 to-purple-900 bg-clip-text text-transparent`}
              >
                {totalReports}
              </p>
            </div>
          </div>

          {/* Avg Similarity Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center h-48 border border-gray-700 p-6 text-center transition-transform hover:scale-105 ">
            <div>
              {" "}
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                Avg Similarity
              </h3>
              <p
                className={`${rw_bold.className} text-4xl md:text-5xl bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent`}
              >
                {avgSimilarity}%
              </p>
            </div>
          </div>

          {/* High Matches Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-48 flex justify-center items-center border border-gray-700 p-6 text-center transition-transform hover:scale-105 ">
            <div>
              <h3
                className={`${dmSans_light.className} text-gray-400 mb-2 text-base md:text-lg`}
              >
                High Matches
              </h3>
              <p
                className={`${rw_bold.className} text-4xl md:text-5xl bg-gradient-to-r from-red-100 to-red-800 bg-clip-text text-transparent`}
              >
                {highSimilarityCount}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <PiMagnifyingGlass className="absolute left-4 top-1/2 transform text-2xl -translate-y-1/2 text-white" />
              <input
                type="text"
                placeholder="Search documents..."
                className={`${rw.className} w-full pl-12 pr-6 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none text-gray-300`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <PiFunnel className="text-white text-xl" />
                <select
                  className={`${rw.className} bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 focus:border-purple-500 focus:outline-none`}
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
                <button
                  onClick={() => setActiveTab("all")}
                  className={`${rw.className} px-4 py-2 rounded-lg ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("flagged")}
                  className={`${rw.className} px-4 py-2 rounded-lg ${
                    activeTab === "flagged"
                      ? "bg-gradient-to-r from-red-400 to-red-800 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  Flagged
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedReports.map((report) => (
            <div
              key={report.id}
              className="bg-gradient-to-br h-80 from-gray-800 to-gray-900 border border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-13">
                  <div>
                    <h3
                      className={`${rw_bold.className} text-xl text-white mb-1`}
                    >
                      {report.title}
                    </h3>
                    <p
                      className={`${dmSans_light.className} text-gray-400 text-sm`}
                    >
                      {report.date} • {report.wordCount.toLocaleString()} words
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setReports(reports.filter((r) => r.id !== report.id))
                    }
                    className="text-gray-400 hover:text-red-400"
                  >
                    <PiTrash size={18} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`${dmSans_light.className} text-gray-400`}>
                      Similarity
                    </span>
                    <span
                      className={`${rw_bold.className} ${
                        report.similarity > 70
                          ? "text-red-400"
                          : report.similarity > 30
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {report.similarity}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        report.similarity > 70
                          ? "bg-gradient-to-r from-red-300 to-red-700"
                          : report.similarity > 30
                          ? "bg-gradient-to-r from-yellow-300 to-yellow-700"
                          : "bg-gradient-to-r from-green-300 to-green-700"
                      }`}
                      style={{ width: `${report.similarity}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <PiClock size={14} />
                    <span>{report.timeSpent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PiInfo size={14} />
                    <span>{report.sources.length} sources</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-12">
                  <button
                    onClick={() => setViewingReport(report)}
                    className={`${rw.className} flex-1 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg text-gray-300 hover:from-gray-600 hover:to-gray-700 flex items-center justify-center gap-2`}
                  >
                    <PiEye size={16} /> View
                  </button>
                  <button
                    className={`${rw.className} flex-1 py-2 bg-gradient-to-r from-purple-300 to-purple-700 rounded-lg text-gray-800 hover:from-purple-700 hover:to-purple-800 flex items-center justify-center gap-2`}
                  >
                    <PiDownload size={16} /> Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedReports.length === 0 && (
          <div className="text-center py-16">
            <p className={`${dmSans_light.className} text-gray-400 text-xl`}>
              No reports found. Upload a document to get started.
            </p>
          </div>
        )}

        {/* Report Detail Modal */}
        {viewingReport && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2
                    className={`${rw_bold.className} text-2xl md:text-3xl text-white mb-1`}
                  >
                    {viewingReport.title}
                  </h2>
                  <p className={`${dmSans_light.className} text-gray-400`}>
                    Analyzed on {viewingReport.date} •{" "}
                    {viewingReport.wordCount.toLocaleString()} words
                  </p>
                </div>
                <button
                  onClick={() => setViewingReport(null)}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Similarity Score */}
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`${rw_bold.className} text-xl text-white`}>
                    Similarity Score
                  </h3>
                  <span
                    className={`text-2xl font-bold ${
                      viewingReport.similarity > 70
                        ? "text-red-400"
                        : viewingReport.similarity > 30
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {viewingReport.similarity}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      viewingReport.similarity > 70
                        ? "bg-red-500"
                        : viewingReport.similarity > 30
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${viewingReport.similarity}%` }}
                  ></div>
                </div>
                <p className={`${dmSans_light.className} text-gray-400 mt-3`}>
                  {viewingReport.similarity > 70
                    ? "High probability of plagiarism"
                    : viewingReport.similarity > 30
                    ? "Moderate similarity detected"
                    : "Low similarity - likely original"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Processing Time */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <PiClock size={20} className="text-purple-400" />
                    <h4 className={`${rw_bold.className} text-white`}>
                      Processing Time
                    </h4>
                  </div>
                  <p className={`${dmSans_light.className} text-gray-300`}>
                    {viewingReport.timeSpent}
                  </p>
                </div>

                {/* Sources Checked */}
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3 mb-2">
                    <PiInfo size={20} className="text-blue-400" />
                    <h4 className={`${rw_bold.className} text-white`}>
                      Sources Checked
                    </h4>
                  </div>
                  <p className={`${dmSans_light.className} text-gray-300`}>
                    {viewingReport.sources.join(", ")}
                  </p>
                </div>
              </div>

              {/* Matched Sources */}
              <div className="mb-8">
                <h3 className={`${rw_bold.className} text-xl text-white mb-4`}>
                  Matched Sources
                </h3>
                <div className="space-y-3">
                  {viewingReport.sources.map((source, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
                    >
                      <span className={`${dmSans_light.className}`}>
                        {source}
                      </span>
                      <button className="text-purple-400 hover:text-purple-300">
                        <PiEye size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  className={`${rw_bold.className} px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition`}
                >
                  <PiDownload size={18} /> Download Report
                </button>
                <button
                  className={`${rw_bold.className} px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white hover:from-purple-600 hover:to-purple-700 transition`}
                >
                  View Detailed Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
