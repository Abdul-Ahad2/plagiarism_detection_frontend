"use client";
import { DM_Sans } from "next/font/google";
import {
  PiChartLineUp,
  PiChartPieSlice,
  PiCalendarBlank,
  PiDownload,
  PiClock,
  PiWarningCircle,
} from "react-icons/pi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

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

// Mock data for charts
const monthlyUsageData = [
  { name: "Jan", used: 3, remaining: 7 },
  { name: "Feb", used: 5, remaining: 5 },
  { name: "Mar", used: 8, remaining: 2 },
  { name: "Apr", used: 4, remaining: 6 },
  { name: "May", used: 7, remaining: 3 },
  { name: "Jun", used: 2, remaining: 8 },
];

const similarityDistributionData = [
  { name: "0-30%", value: 12 },
  { name: "31-70%", value: 5 },
  { name: "71-100%", value: 3 },
];

const sourceDetectionData = [
  { name: "arXiv", detections: 45 },
  { name: "CORE", detections: 32 },
  { name: "Wikipedia", detections: 18 },
  { name: "PubMed", detections: 12 },
  { name: "DOAJ", detections: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const currentUsage = { used: 6, remaining: 4, resetDate: "2023-12-01" };

  return (
    <div className="selection:bg-purple-500 selection:text-white min-h-screen bg-[#E4E4E4] p-4 md:p-6">
      {/* Main Container */}
      <div className="bg-purple-300 rounded-4xl border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1
            className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
          >
            Your{" "}
            <span className="bg-purple-400 border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
              Analytics
            </span>
          </h1>
          <p className={`${dmSans_lighter.className} text-xl mt-4`}>
            Track your usage and detection patterns
          </p>
        </div>

        {/* Current Usage Card */}
        <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <h2
                className={`${dmSans_light.className} text-2xl mb-4 flex items-center gap-2`}
              >
                <PiChartLineUp className="text-purple-600" /> Current Monthly
                Usage
              </h2>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className={`${dmSans_lighter.className}`}>Used</span>
                    <span className={`${dmSans_light.className}`}>
                      {currentUsage.used}/10 checks
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                      className="bg-purple-500 h-4 rounded-full"
                      style={{ width: `${(currentUsage.used / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2">
                  <p className={`${dmSans_lighter.className} text-sm`}>
                    Remaining
                  </p>
                  <p className={`${dmSans.className} text-2xl`}>
                    {currentUsage.remaining}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2">
                  <p className={`${dmSans_lighter.className} text-sm`}>
                    Resets on
                  </p>
                  <p className={`${dmSans.className} text-2xl`}>
                    {currentUsage.resetDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Used", value: currentUsage.used },
                      { name: "Remaining", value: currentUsage.remaining },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#8B5CF6" />
                    <Cell fill="#DDD6FE" />
                  </Pie>
                  <Tooltip
                    content={<CustomTooltip />}
                    formatter={(value) => [
                      `${value} checks`,
                      value === currentUsage.used ? "Used" : "Remaining",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 bg-[#E4E4E4] p-1 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2">
            <PiCalendarBlank className="ml-2 text-gray-500" />
            <select
              className={`${dmSans_lighter.className} bg-transparent px-3 py-2 outline-none`}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last Year</option>
            </select>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Monthly Usage Chart */}
          <div className="bg-[#E4E4E4] p-6 rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2">
            <h2
              className={`${dmSans_light.className} text-2xl mb-6 flex items-center gap-2`}
            >
              <PiChartLineUp className="text-purple-600" /> Monthly Usage
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="used"
                    name="Used Checks"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="remaining"
                    name="Remaining Checks"
                    fill="#a18dfc"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Similarity Distribution */}
          <div className="bg-[#E4E4E4] p-6 rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2">
            <h2
              className={`${dmSans_light.className} text-2xl mb-6 flex items-center gap-2`}
            >
              <PiChartPieSlice className="text-purple-600" /> Similarity
              Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={similarityDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {similarityDistributionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 2
                            ? "#EF4444"
                            : index === 1
                            ? "#F59E0B"
                            : "#10B981"
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Source Detection Chart */}
        <div className="bg-[#E4E4E4] p-6 rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 mb-10">
          <h2
            className={`${dmSans_light.className} text-2xl mb-6 flex items-center gap-2`}
          >
            <PiWarningCircle className="text-purple-600" /> Detections by Source
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sourceDetectionData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="detections"
                  name="Detections"
                  fill="#8B5CF6"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button
            className={`${dmSans_light.className} px-8 py-4 bg-white rounded-3xl border-black border-b-8 border-l-8 border-r-2 border-t-2 text-xl flex items-center gap-3 h-28 hover:bg-purple-500 transition`}
          >
            <PiDownload size={24} /> Export Analytics Report
          </button>
        </div>
      </div>
    </div>
  );
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2 shadow-lg">
        <p className={`${dmSans_light.className} font-bold`}>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className={`${dmSans_lighter.className}`}
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
