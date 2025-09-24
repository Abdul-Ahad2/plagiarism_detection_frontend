"use client";


import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Teacher Dashboard with only mock data (no API required)

export default function TeacherDashboardFull() {
  // Mock states
  const [reports, setReports] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fake reports
    const fakeReports = [
      {
        id: 1,
        studentName: "Ali Raza",
        fileName: "Research Paper",
        similarity: 82,
        date: "2025-09-01",
      },
      {
        id: 2,
        studentName: "Sara Khan",
        fileName: "Essay on AI",
        similarity: 45,
        date: "2025-09-02",
      },
      {
        id: 3,
        studentName: "Usman Ahmed",
        fileName: "Case Study",
        similarity: 91,
        date: "2025-09-03",
      },
    ];
    setReports(fakeReports);

    // Fake events
    setEvents([
      { id: "e1", text: "Ali uploaded Research Paper", time: "2025-09-01" },
      { id: "e2", text: "Sara uploaded Essay on AI", time: "2025-09-02" },
    ]);

    // Fake stats
    setStats({
      totalStudents: 120,
      totalReports: 340,
      avgSimilarity: 42,
      flaggedCount: 18,
    });
  }, []);

  // Derived metrics
  const metrics = useMemo(() => {
    const totalReports = reports.length;
    const flaggedCount = reports.filter((r) => r.similarity >= 70).length;
    const avgSimilarity =
      totalReports === 0
        ? 0
        : Math.round(
            reports.reduce((s, r) => s + r.similarity, 0) / totalReports
          );

    return {
      totalReports,
      flaggedCount,
      avgSimilarity,
      studentsCount: 10,
      reportsToday: 2,
    };
  }, [reports]);

  // Chart data (fake)
  const trendData = [
    { day: "Mon", avg: 45, count: 12 },
    { day: "Tue", avg: 60, count: 15 },
    { day: "Wed", avg: 50, count: 18 },
    { day: "Thu", avg: 55, count: 14 },
    { day: "Fri", avg: 70, count: 20 },
  ];

  const similarityDistribution = [
    { name: "0-30", value: 5 },
    { name: "31-70", value: 10 },
    { name: "71-100", value: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-gray-200 py-12">
 
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">Teacher Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Overview of submissions, flagged cases and system health
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Reports today</div>
            <div className="text-xl font-bold">{metrics.reportsToday}</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiCard title="Total Reports" value={metrics.totalReports} />
          <KpiCard title="Flagged Reports" value={metrics.flaggedCount} />
          <KpiCard title="Avg Similarity" value={`${metrics.avgSimilarity}%`} />
          <KpiCard title="Students" value={metrics.studentsCount} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Line chart */}
            <div className="p-6 rounded-2xl bg-gray-800/50 shadow">
              <h3 className="text-lg font-semibold mb-4">Similarity Trend</h3>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="#a855f7"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution */}
            <div className="p-6 rounded-2xl bg-gray-800/50 shadow flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="font-semibold mb-3">Similarity Distribution</h4>
                <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={similarityDistribution}>
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#a855f7" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-44">
                <h4 className="font-semibold mb-3">Flagged vs Clean</h4>
                <div style={{ height: 140 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={similarityDistribution}
                        dataKey="value"
                        outerRadius={60}
                        label
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f97316" />
                        <Cell fill="#ef4444" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent flagged reports */}
            <div className="p-6 rounded-2xl bg-gray-800/50 shadow">
              <h3 className="text-lg font-semibold mb-3">
                Recent Flagged Reports
              </h3>
              <div className="space-y-3">
                {reports
                  .filter((r) => r.similarity >= 70)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between p-3 rounded-md bg-gray-900/40"
                    >
                      <div>
                        <div className="font-medium">{r.studentName}</div>
                        <div className="text-sm text-gray-400">
                          {r.fileName} • {r.similarity}%
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded bg-gray-800">
                        View
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Activity */}
            <div className="p-4 rounded-2xl bg-gray-800/50 shadow">
              <h3 className="font-semibold mb-3">Activity Feed</h3>
              <div className="space-y-3 text-sm text-gray-300">
                {events.map((e) => (
                  <div key={e.id} className="p-3 rounded-md bg-gray-900/20">
                    <div className="flex items-center justify-between">
                      <div>{e.text}</div>
                      <div className="text-xs text-gray-400">{e.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System health */}
            <div className="p-4 rounded-2xl bg-gray-800/50 shadow">
              <h3 className="font-semibold mb-3">System Health</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Queue length</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span>FastAPI status</span>
                  <span className="text-green-400">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg processing</span>
                  <span>120ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-20" />
      </div>
    </div>
  );
}

// Small reusable KPI card
function KpiCard({ title, value }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-800/50 shadow text-center">
      <h4 className="text-gray-400">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
