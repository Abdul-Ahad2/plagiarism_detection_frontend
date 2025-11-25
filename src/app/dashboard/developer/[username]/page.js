// "use client";
// import { useState } from "react";

// export default function DeveloperDashboard() {
//   const [activeTab, setActiveTab] = useState("overview");

//   const StatCard = ({ title, value, subtitle }) => (
//     <div className="h-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
//       <div>
//         <p className="text-gray-500 text-sm mb-2">{title}</p>
//         <h3 className="text-4xl font-bold text-white">{value}</h3>
//         {subtitle && <p className="text-gray-400 text-xs mt-2">{subtitle}</p>}
//       </div>
//     </div>
//   );

//   const RequestRow = ({ req }) => (
//     <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
//       <div className="flex items-center justify-between">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-1">
//             <span
//               className={`px-2 py-1 rounded text-xs font-bold ${
//                 req.method === "POST"
//                   ? "bg-green-600/30 text-green-300"
//                   : "bg-blue-600/30 text-blue-300"
//               }`}
//             >
//               {req.method}
//             </span>
//             <h4 className="text-white font-semibold text-sm">{req.endpoint}</h4>
//           </div>
//           <p className="text-gray-400 text-xs">{req.timestamp}</p>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="text-right">
//             <p className="text-gray-400 text-xs mb-1">Status</p>
//             <p
//               className={`text-sm font-bold ${
//                 req.status === 200 ? "text-green-400" : "text-red-400"
//               }`}
//             >
//               {req.status}
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-400 text-xs mb-1">Time</p>
//             <p className="text-sm font-bold text-white">{req.responseTime}ms</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const ApiKeyCard = ({ apiKey }) => (
//     <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <h3 className="text-white font-semibold">{apiKey.name}</h3>
//           <p className="text-gray-400 text-xs mt-1">
//             Created: {apiKey.created}
//           </p>
//         </div>
//         <span
//           className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
//             apiKey.active
//               ? "bg-green-600/30 text-green-300"
//               : "bg-gray-600/30 text-gray-300"
//           }`}
//         >
//           {apiKey.active ? "Active" : "Inactive"}
//         </span>
//       </div>

//       <div className="bg-gray-900/50 rounded p-2 border border-gray-700/50 mb-3">
//         <p className="text-gray-300 font-mono text-xs truncate">{apiKey.key}</p>
//       </div>

//       <div className="flex justify-between text-xs">
//         <div>
//           <p className="text-gray-500 mb-1">Requests</p>
//           <p className="text-white font-bold">{apiKey.requests}</p>
//         </div>
//         <div className="text-right">
//           <p className="text-gray-500 mb-1">Last Used</p>
//           <p className="text-white font-bold">{apiKey.lastUsed}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gradient-to-r from-black to-gray-900 text-gray-300 min-h-screen">
//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
//         {/* Header */}
//         <div className="mb-12 mt-24">
//           <h1 className="text-6xl md:text-7xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent">
//               Developer Console.
//             </span>
//           </h1>
//           <p className="text-xl text-gray-400">
//             Manage API keys, monitor requests, and integrate with your
//             applications
//           </p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex gap-4 mb-12 border-b border-gray-700/50">
//           {["overview", "api-keys", "requests", "documentation"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-4 py-3 font-semibold transition-all ${
//                 activeTab === tab
//                   ? "text-blue-400 border-b-2 border-blue-400"
//                   : "text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               {tab.replace("-", " ").toUpperCase()}
//             </button>
//           ))}
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <>
//             <div className="grid md:grid-cols-2 text-center lg:grid-cols-3 gap-4 mb-12 px-72 py-20">
//               <StatCard
//                 title="Total Requests"
//                 value={stats.totalRequests.toLocaleString()}
//                 subtitle="All time API calls"
//               />
//               <StatCard
//                 title="Success Rate"
//                 value={`${stats.successRate}%`}
//                 subtitle="Successful responses"
//               />
//               <StatCard
//                 title="Avg Response Time"
//                 value={`${stats.avgResponseTime}ms`}
//                 subtitle="Average latency"
//               />
//               <StatCard
//                 title="Active Integrations"
//                 value={stats.activeIntegrations}
//                 subtitle="Connected applications"
//               />
//               <StatCard
//                 title="Requests Today"
//                 value={stats.requestsToday}
//                 subtitle="Current day"
//               />
//               <StatCard
//                 title="Errors Today"
//                 value={stats.errorsToday}
//                 subtitle="Failed requests"
//               />
//             </div>
//           </>
//         )}

//         {/* API Keys Tab */}
//         {activeTab === "api-keys" && (
//           <div>
//             <div className="flex justify-between items-center mb-8 ">
//               <h2 className="text-3xl font-bold text-white">API Keys</h2>
//               <button className="px-4 py-2 border-[1px] border-gray-500 text-white rounded-sm transition-colors">
//                 New Key
//               </button>
//             </div>
//             <div className="space-y-3">
//               {apiKeys.map((key) => (
//                 <ApiKeyCard key={key.id} apiKey={key} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Requests Tab */}
//         {activeTab === "requests" && (
//           <div>
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-white">Recent Requests</h2>
//               <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-colors">
//                 Refresh
//               </button>
//             </div>
//             <div className="space-y-3">
//               {recentRequests.map((req) => (
//                 <RequestRow key={req.id} req={req} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Documentation Tab */}
//         {activeTab === "documentation" && (
//           <div>
//             <h2 className="text-3xl font-bold text-white mb-8">
//               API Documentation
//             </h2>
//             <div className="space-y-6">
//               <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Getting Started
//                 </h3>
//                 <div className="bg-gray-900/50 rounded p-4 mb-4 border border-gray-700/50 overflow-x-auto">
//                   <code className="text-blue-300 font-mono text-sm">
//                     curl -X POST https://api.sleuthinc.com/v1/check-plagiarism \
//                     <br />
//                     &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \
//                     <br />
//                     &nbsp;&nbsp;-F "file=@document.pdf"
//                   </code>
//                 </div>
//                 <p className="text-gray-300">
//                   Start by generating an API key above, then use it in your
//                   requests.
//                 </p>
//               </div>

//               <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700/30">
//                 <h3 className="text-xl font-bold text-white mb-4">Endpoints</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-blue-400 font-mono mb-2">
//                       POST /api/v1/check-plagiarism
//                     </p>
//                     <p className="text-gray-300 text-sm">
//                       Check a single document for plagiarism
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-blue-400 font-mono mb-2">
//                       GET /api/v1/status/:requestId
//                     </p>
//                     <p className="text-gray-300 text-sm">
//                       Get the status of a plagiarism check request
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-blue-400 font-mono mb-2">
//                       POST /api/v1/batch-check
//                     </p>
//                     <p className="text-gray-300 text-sm">
//                       Check multiple documents in one request
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
