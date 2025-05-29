"use client";
import { useState, useEffect, useRef } from "react";
import { DM_Sans, Raleway } from "next/font/google";
import { PiDownload, PiArrowLeft, PiInfo } from "react-icons/pi";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
});

const rw = Raleway({
  subsets: ["latin"],
  weight: ["500"],
});

const rw_bold = Raleway({
  subsets: ["latin"],
  weight: ["700"],
});

export default function DocumentAnalysisPage() {
  // Mock data - replace with your actual API data
  const [document, setDocument] = useState({
    name: "Research Paper.pdf",
    content: `Plagiarism detection has become increasingly important in academic and professional settings. With the rise of digital content, the need for reliable plagiarism checkers has grown exponentially.

Machine learning algorithms can effectively identify copied content by comparing text against vast databases. These systems use techniques like fingerprinting, string matching, and citation analysis.




`,
    plagiarismData: [
      {
        text: "Plagiarism detection has become increasingly important in academic and professional settings.",
        similarity: 95,
        source: "Wikipedia: Plagiarism Detection",
        url: "https://en.wikipedia.org/wiki/Plagiarism_detection",
      },
      {
        text: "With the rise of digital content, the need for reliable plagiarism checkers has grown exponentially.",
        similarity: 82,
        source: "Academic Journal of Digital Ethics, 2022",
        url: "#",
      },
      {
        text: "Machine learning algorithms can effectively identify copied content",
        similarity: 65,
        source: "Tech Blog: AI in Education",
        url: "#",
      },
      {
        text: "techniques like fingerprinting, string matching, and citation analysis.",
        similarity: 45,
        source: "Research Paper: Text Analysis Methods",
        url: "#",
      },
      {
        text: "Recent advances in natural language processing",
        similarity: 30,
        source: "NLP Conference Proceedings 2023",
        url: "#",
      },
    ],
  });

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const contentRef = useRef(null);

  // Highlight text in content and escape HTML
  const highlightPlagiarizedText = () => {
    let content = document.content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    const sortedMatches = [...document.plagiarismData].sort(
      (a, b) => b.similarity - a.similarity
    );

    sortedMatches.forEach((match) => {
      const escapedMatchText = match.text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

      const color =
        match.similarity > 75
          ? "bg-red-500"
          : match.similarity > 50
          ? "bg-orange-500"
          : "bg-yellow-500";

      content = content.replace(
        escapedMatchText,
        `<span 
          class="${color} text-white px-1 cursor-pointer hover:opacity-90" 
          data-id="${escapedMatchText}"
        >${escapedMatchText}</span>`
      );
    });

    return { __html: content };
  };

  // Handle text selection
  useEffect(() => {
    const handleClick = (e) => {
      const highlightedSpan = e.target.closest("span[data-id]");
      if (highlightedSpan) {
        const text = highlightedSpan.getAttribute("data-id");
        const match = document.plagiarismData.find(
          (m) =>
            m.text ===
            text
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
        );
        setSelectedMatch(match);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("click", handleClick);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("click", handleClick);
      }
    };
  }, [document.plagiarismData]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-300 py-44">
      <div className="max-w-7xl mx-auto">
        <h1
          className={`${rw.className} text-3xl md:text-8xl text-center  mb-20`}
        >
          Document{" "}
          <span className="text-transparent bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text">
            Analysis
          </span>
        </h1>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
          <Link
            className={`${rw.className} flex items-center gap-2 text-purple-400 hover:text-purple-300`}
            href="/dashboard/student/report"
          >
            <PiArrowLeft size={20} /> Back to Reports
          </Link>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  High (76-100%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  Medium (51-75%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className={`${dmSans.className} text-sm`}>
                  Low (0-50%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Document Viewer */}
          <div className="lg:w-2/3 bg-gray-800 rounded-xl border border-gray-700 p-6 overflow-scroll h-screen">
            <div
              ref={contentRef}
              className={`${dmSans.className} leading-relaxed whitespace-pre-wrap`}
              dangerouslySetInnerHTML={highlightPlagiarizedText()}
            />
          </div>

          {/* Sources Panel */}
          <div className="lg:w-1/3 bg-gray-800 rounded-xl border border-gray-700 p-6 h-screen flex flex-col">
            {/* Fixed Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className={`${rw_bold.className} text-xl`}>
                Matched Sources
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`${rw.className} text-sm px-3 py-1 rounded ${
                    activeTab === "all"
                      ? "bg-purple-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("high")}
                  className={`${rw.className} text-sm px-3 py-1 rounded ${
                    activeTab === "high"
                      ? "bg-red-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  } transition`}
                >
                  High
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {selectedMatch ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <h3 className={`${rw_bold.className} text-lg mb-2`}>
                      Selected Text
                    </h3>
                    <p
                      className={`${dmSans.className} bg-gray-600 p-3 rounded`}
                    >
                      "{selectedMatch.text}"
                    </p>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <h3 className={`${rw_bold.className} text-lg mb-2`}>
                      Source
                    </h3>
                    <p className={`${dmSans.className} text-purple-400 mb-1`}>
                      {selectedMatch.source}
                    </p>
                    <a
                      href={selectedMatch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${dmSans.className} text-blue-400 text-sm hover:underline flex items-center gap-1`}
                    >
                      <PiInfo size={16} /> View source
                    </a>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <h3 className={`${rw_bold.className} text-lg mb-2`}>
                      Similarity
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-full bg-gray-600 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            selectedMatch.similarity > 75
                              ? "bg-red-500"
                              : selectedMatch.similarity > 50
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${selectedMatch.similarity}%` }}
                        ></div>
                      </div>
                      <span className={`${rw_bold.className}`}>
                        {selectedMatch.similarity}%
                      </span>
                    </div>
                    <p
                      className={`${dmSans.className} text-sm mt-2 ${
                        selectedMatch.similarity > 75
                          ? "text-red-400"
                          : selectedMatch.similarity > 50
                          ? "text-orange-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {selectedMatch.similarity > 75
                        ? "High probability of plagiarism"
                        : selectedMatch.similarity > 50
                        ? "Moderate similarity detected"
                        : "Low similarity - likely original"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedMatch(null)}
                    className={`${rw.className} w-full py-2 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition`}
                  >
                    Back to all matches
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {document.plagiarismData
                    .filter(
                      (match) =>
                        activeTab === "all" ||
                        (activeTab === "high" && match.similarity > 70)
                    )
                    .map((match, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition ${
                          match.similarity > 75
                            ? "border-l-4 border-red-500 bg-gray-750"
                            : match.similarity > 50
                            ? "border-l-4 border-orange-500 bg-gray-750"
                            : "border-l-4 border-yellow-500 bg-gray-750"
                        }`}
                        onClick={() => setSelectedMatch(match)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`${rw.className} line-clamp-2`}>
                            {match.text}
                          </h3>
                          <span
                            className={`${rw_bold.className} text-sm ${
                              match.similarity > 75
                                ? "text-red-400"
                                : match.similarity > 50
                                ? "text-orange-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {match.similarity}%
                          </span>
                        </div>
                        <p
                          className={`${dmSans.className} text-sm text-gray-400 line-clamp-1`}
                        >
                          {match.source}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Fixed Footer */}
            <div className="mt-auto pt-4">
              <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                <h3
                  className={`${rw_bold.className} text-lg mb-3 flex items-center gap-2`}
                >
                  <PiInfo size={20} /> Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Total Matches:
                    </span>
                    <span className={`${rw.className}`}>
                      {document.plagiarismData.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Highest Similarity:
                    </span>
                    <span className={`${rw.className} text-red-400`}>
                      {Math.max(
                        ...document.plagiarismData.map((m) => m.similarity)
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${dmSans.className}`}>
                      Average Similarity:
                    </span>
                    <span className={`${rw.className}`}>
                      {(
                        document.plagiarismData.reduce(
                          (sum, m) => sum + m.similarity,
                          0
                        ) / document.plagiarismData.length
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
