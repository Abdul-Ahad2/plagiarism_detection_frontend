"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Loader2,
  Plus,
  X,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code,
  Zap,
  Shield,
} from "lucide-react";

export default function DeveloperDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [creatingKey, setCreatingKey] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  const endpoints = [
    {
      id: "lexical",
      method: "POST",
      path: "/api/v1/developer/lexical-analysis",
      title: "Lexical Analysis",
      description:
        "Check documents against web sources and databases for plagiarism using semantic matching",
      requestBody: `file: [Binary file data] (PDF, DOC, DOCX)`,
      response: {
        id: "692b7d29945639b18a759783",
        name: "Teacher Lexical Analysis",
        status: "completed",
        processingTime: "0m 27s",
        uploadDate: "2025-11-29T23:09:29.266274",
        analysisType: "lexical",
        documents: [
          {
            id: 1,
            name: "Andrew Wyke.docx",
            author: null,
            similarity: 100,
            ai_similarity: 0.862,
            flagged: true,
            wordCount: 288,
            matches: [
              {
                matched_text:
                  "Over the past few months, we've continued adding new features and updates to WhatsApp.",
                similarity: 100,
                context: "Potential plagiarism detected",
                source_type: "web",
                source_url:
                  "https://www.mirror.co.uk/tech/whatsapp-free-update",
                source_title: "Mirror - WhatsApp Update",
              },
            ],
          },
        ],
        summary: {
          totalDocuments: 1,
          flaggedDocuments: 1,
          highestSimilarity: 100,
          averageSimilarity: 100,
        },
      },
    },
    {
      id: "semantic",
      method: "POST",
      path: "/api/v1/developer/semantic-analysis",
      title: "Semantic Analysis",
      description:
        "Perform deep semantic analysis on documents to detect conceptually similar content and paraphrasing",
      requestBody: `files: [Binary file data] (PDF, DOC, DOCX, max 10 files)`,
      response: {
        id: "req_semantic_001",
        name: "Semantic Analysis Batch",
        status: "completed",
        processingTime: "0m 45s",
        uploadDate: "2025-11-29T22:15:10.123456",
        analysisType: "semantic",
        documents: [
          {
            id: 1,
            name: "document.docx",
            author: null,
            similarity: 85,
            semantic_score: 0.89,
            flagged: true,
            wordCount: 450,
            matches: [
              {
                matched_text: "The company's revenue increased significantly",
                similarity: 85,
                context: "Semantic similarity - potential paraphrasing",
                source_type: "web",
                source_url: "https://example.com/article",
                source_title: "Business Report",
              },
            ],
          },
        ],
        summary: {
          totalDocuments: 1,
          flaggedDocuments: 1,
          highestSimilarity: 85,
          averageSimilarity: 85,
          semanticOverallScore: 0.89,
        },
      },
    },
    {
      id: "internal",
      method: "POST",
      path: "/api/v1/developer/internal-analysis",
      title: "Internal Analysis",
      description:
        "Compare multiple documents against each other to detect internal plagiarism and duplication",
      requestBody: `files: [Binary file data] (PDF, DOC, DOCX, max 10 files)`,
      response: {
        id: "69241025aa2e2957ee9a33c8",
        name: "Internal Plagiarism Check",
        status: "completed",
        processingTime: "0m 04s",
        uploadDate: "2025-11-24T07:58:29.306155",
        analysisType: "internal",
        documents: [
          {
            id: 1,
            name: "A_simple.docx",
            author: null,
          },
          {
            id: 2,
            name: "B_same_as_A.docx",
            author: null,
          },
        ],
        comparisons: [
          {
            id: "1-2",
            docA: "A_simple.docx",
            docB: "B_same_as_A.docx",
            similarity: 100,
            flagged: true,
            overlaps: [
              {
                fromDoc: "A_simple.docx",
                toDoc: "B_same_as_A.docx",
                text: "As part of the requirements for the Degree of Masters of Science...",
                similarity: 100,
                context: "Exact/near-exact sentence overlap",
              },
            ],
          },
        ],
        summary: {
          totalDocuments: 2,
          totalComparisons: 1,
          flaggedComparisons: 1,
          highestSimilarity: 100,
          averageSimilarity: 100,
        },
      },
    },
  ];

  const toggleEndpoint = (id) => {
    setExpandedEndpoint(expandedEndpoint === id ? null : id);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "developer") {
      fetchDashboardData();
    }
  }, [status, session]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsRes = await fetch("/api/v1/developer/stats");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      }

      // Fetch API keys
      const keysRes = await fetch("/api/v1/developer/api-keys");
      if (keysRes.ok) {
        const keysData = await keysRes.json();
        setApiKeys(keysData.apiKeys);
      }

      // Fetch recent requests
      const requestsRes = await fetch("/api/v1/developer/requests?limit=10");
      if (requestsRes.ok) {
        const requestsData = await requestsRes.json();
        setRecentRequests(requestsData.requests);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName || newKeyName.trim().length === 0) {
      alert("Please enter a name for your API key");
      return;
    }

    try {
      setCreatingKey(true);

      const response = await fetch("/api/v1/developer/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setApiKeys([data.apiKey, ...apiKeys]);
        setShowKeyModal(false);
        setNewKeyName("");
        // Show success message with the new key
        setCopiedKey(data.apiKey.key);
        setTimeout(() => setCopiedKey(null), 5000);
      } else {
        alert(
          `Error: ${data.error}${
            data.details ? "\nDetails: " + data.details : ""
          }`
        );
      }
    } catch (error) {
      console.error("Error creating API key:", error);
      alert(`Failed to create API key. Error: ${error.message}`);
    } finally {
      setCreatingKey(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const StatCard = ({ title, value, subtitle }) => (
    <div className="h-50 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm  p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div>
        <p className="text-gray-500 text-sm mb-2">{title}</p>
        <h3 className="text-4xl font-bold text-white">{value}</h3>
        {subtitle && <p className="text-gray-400 text-xs mt-2">{subtitle}</p>}
      </div>
    </div>
  );

  const RequestRow = ({ req }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm  p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-1  text-xs font-bold ${
                req.method === "POST"
                  ? "bg-green-600/30 text-green-300"
                  : req.method === "GET"
                  ? "bg-blue-600/30 text-blue-300"
                  : "bg-purple-600/30 text-purple-300"
              }`}
            >
              {req.method}
            </span>
            <h4 className="text-white font-semibold text-sm">{req.endpoint}</h4>
          </div>
          <p className="text-gray-400 text-xs">{req.timestamp}</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <p
              className={`text-sm font-bold ${
                req.status >= 200 && req.status < 300
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {req.status}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Time</p>
            <p className="text-sm font-bold text-white">{req.responseTime}ms</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ApiKeyCard = ({ apiKey }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm  p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">{apiKey.name}</h3>
          <p className="text-gray-400 text-xs mt-1">
            Created: {apiKey.created}
          </p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
            apiKey.active
              ? "bg-green-600/30 text-green-300"
              : "bg-gray-600/30 text-gray-300"
          }`}
        >
          {apiKey.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="bg-gray-900/50  p-2 border border-gray-700/50 mb-3 flex items-center justify-between">
        <p className="text-gray-300 font-mono text-xs truncate flex-1">
          {apiKey.key}
        </p>
        <button
          onClick={() => copyToClipboard(apiKey.key)}
          className="ml-2 p-1 hover:bg-gray-700/50  transition-colors"
          title="Copy to clipboard"
        >
          {copiedKey === apiKey.key ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex justify-between text-xs">
        <div>
          <p className="text-gray-500 mb-1">Requests</p>
          <p className="text-white font-bold">{apiKey.requests}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 mb-1">Last Used</p>
          <p className="text-white font-bold">{apiKey.lastUsed}</p>
        </div>
      </div>
    </div>
  );

  if (loading || status === "loading") {
    return (
      <div className="bg-gradient-to-r from-black to-gray-900 text-gray-300 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading developer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 text-gray-300 min-h-screen">
      {/* API Key Creation Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800  border border-gray-700 max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                Create New API Key
              </h3>
              <button
                onClick={() => {
                  setShowKeyModal(false);
                  setNewKeyName("");
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-white font-medium mb-2 block">
                API Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production Key, Test Key"
                className="w-full p-3 bg-gray-700/50 border border-gray-600  text-white focus:border-blue-500 focus:outline-none placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !creatingKey) {
                    handleCreateApiKey();
                  }
                }}
              />
              <p className="text-gray-400 text-xs mt-2">
                Choose a descriptive name to identify this key
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowKeyModal(false);
                  setNewKeyName("");
                }}
                className="flex-1 px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white  transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateApiKey}
                disabled={creatingKey || !newKeyName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creatingKey ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Key"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 mt-24">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-200 to-blue-700 bg-clip-text text-transparent">
              Developer Console.
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Integrate SleuthInc's plagiarism detection API into your
            applications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 border-b border-gray-700/50">
          {["overview", "api-keys", "requests", "documentation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition-all ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {stats && (
              <div className="grid md:grid-cols-2 text-center lg:grid-cols-3 py-20 px-64 gap-4 mb-12">
                <StatCard
                  title="Total Requests"
                  value={stats.totalRequests.toLocaleString()}
                  subtitle="All time API calls"
                />
                <StatCard
                  title="Success Rate"
                  value={`${stats.successRate}%`}
                  subtitle="Successful responses"
                />
                <StatCard
                  title="Avg Response Time"
                  value={`${stats.avgResponseTime}ms`}
                  subtitle="Average latency"
                />
                <StatCard
                  title="Active Integrations"
                  value={stats.activeIntegrations}
                  subtitle="Connected applications"
                />
                <StatCard
                  title="Requests Today"
                  value={stats.requestsToday}
                  subtitle="Current day"
                />
                <StatCard
                  title="Errors Today"
                  value={stats.errorsToday}
                  subtitle="Failed requests"
                />
              </div>
            )}
          </>
        )}

        {/* API Keys Tab */}
        {activeTab === "api-keys" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">API Keys</h2>
                <p className="text-gray-400 text-sm mt-1">
                  You can only have one active API key
                </p>
              </div>
              <button
                onClick={() => setShowKeyModal(true)}
                disabled={apiKeys.length >= 1}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                New Key
              </button>
            </div>
            {apiKeys.length === 0 ? (
              <div className="bg-gray-800/30 backdrop-blur-sm  p-12 border border-gray-700/30 text-center">
                <p className="text-gray-400 mb-4">
                  You don't have any API keys yet.
                </p>
                <button
                  onClick={() => setShowKeyModal(true)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white  transition-colors"
                >
                  Create Your First API Key
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <ApiKeyCard key={key.id} apiKey={key} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Recent Requests</h2>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300  transition-colors"
              >
                Refresh
              </button>
            </div>
            {recentRequests.length === 0 ? (
              <div className="bg-gray-800/30 backdrop-blur-sm  p-12 border border-gray-700/30 text-center">
                <p className="text-gray-400">
                  No API requests yet. Start using your API keys to see requests
                  here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentRequests.map((req) => (
                  <RequestRow key={req.id} req={req} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === "documentation" && (
          <div className="min-h-screen bg-transparent">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  API Documentation
                </h1>
                <p className="text-gray-400">
                  Complete reference for SleuthinC plagiarism detection
                  endpoints
                </p>
              </div>

              {/* Quick Start */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-4">
                  Getting Started
                </h3>
                <p className="text-gray-300 mb-4">
                  Start by generating an API key above, then use it in your
                  requests. All API requests must include your API key in the
                  Authorization header.
                </p>
                <div className="bg-gray-900/50  p-4 border border-gray-700/50 overflow-x-auto">
                  <code className="text-blue-300 font-mono text-sm">
                    curl -X POST
                    https://plagiarism-detection-frontend.vercel.app/api/v1/developer/lexical-analysis
                    \
                    <br />
                    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;-F "file=@document.pdf"
                  </code>
                </div>
              </div>

              {/* Base URL */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-4">Base URL</h3>
                <div className="bg-gray-900/50  p-4 border border-gray-700/50">
                  <code className="text-blue-300 font-mono">
                    https://plagiarism-detection-frontend.vercel.app/
                  </code>
                </div>
              </div>

              {/* Authentication */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-4">
                  Authentication
                </h3>
                <p className="text-gray-300 mb-4">
                  All API requests require authentication using your API key in
                  the Authorization header:
                </p>
                <div className="bg-gray-900/50  p-4 border border-gray-700/50">
                  <code className="text-blue-300 font-mono text-sm">
                    Authorization: Bearer sk_live_your_api_key_here
                  </code>
                </div>
              </div>

              {/* Endpoints */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-6">
                  API Endpoints
                </h3>
                <div className="space-y-4">
                  {endpoints.map((endpoint) => (
                    <div
                      key={endpoint.id}
                      className="border border-gray-700/50  overflow-hidden"
                    >
                      {/* Endpoint Header */}
                      <button
                        onClick={() => toggleEndpoint(endpoint.id)}
                        className="w-full bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-6 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4 flex-1 text-left">
                          <span className="px-3 py-1 bg-green-600/30 text-green-300  text-xs font-bold">
                            {endpoint.method}
                          </span>
                          <div>
                            <code className="text-blue-400 font-mono text-sm block">
                              {endpoint.path}
                            </code>
                            <p className="text-gray-400 text-sm mt-1">
                              {endpoint.description}
                            </p>
                          </div>
                        </div>
                        {expandedEndpoint === endpoint.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {/* Endpoint Details */}
                      {expandedEndpoint === endpoint.id && (
                        <div className="bg-gray-800/20 p-6 border-t border-gray-700/30 space-y-6">
                          {/* Request */}
                          <div>
                            <h4 className="text-white font-semibold mb-3">
                              Request
                            </h4>
                            <div className="bg-gray-900/50  p-4 border border-gray-700/50">
                              <p className="text-gray-400 text-xs mb-2">
                                Body:
                              </p>
                              <code className="text-blue-300 font-mono text-sm">
                                {endpoint.requestBody}
                              </code>
                            </div>
                          </div>

                          {/* Response */}
                          <div>
                            <h4 className="text-white font-semibold mb-3">
                              Response
                            </h4>
                            <div className="bg-gray-900/50  p-4 border border-gray-700/50 overflow-x-auto">
                              <pre className="text-green-300 font-mono text-xs whitespace-pre-wrap break-words">
                                {JSON.stringify(endpoint.response, null, 2)}
                              </pre>
                            </div>
                          </div>

                          {/* Details */}
                          <div>
                            <h4 className="text-white font-semibold mb-3">
                              Details
                            </h4>
                            <div className="space-y-2 text-sm text-gray-300">
                              <p>
                                <span className="text-gray-400">
                                  • Supported formats:
                                </span>{" "}
                                PDF, DOC, DOCX, TXT
                              </p>
                              <p>
                                <span className="text-gray-400">
                                  • Max file size:
                                </span>{" "}
                                500 words per document
                              </p>
                              <p>
                                <span className="text-gray-400">
                                  • Max files:
                                </span>{" "}
                                {endpoint.id === "lexical" ? "1" : "10"} per
                                request
                              </p>
                              <p>
                                <span className="text-gray-400">
                                  • Processing timeout:
                                </span>{" "}
                                5 minutes
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Responses */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-6">
                  Error Responses
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      code: 401,
                      title: "Unauthorized",
                      message: "Invalid or expired API key",
                    },
                    {
                      code: 400,
                      title: "Bad Request",
                      message: "No files provided or invalid format",
                    },
                    {
                      code: 502,
                      title: "Bad Gateway",
                      message: "Failed to connect to analysis service",
                    },
                    {
                      code: 500,
                      title: "Internal Server Error",
                      message: "Processing error occurred",
                    },
                  ].map((error) => (
                    <div
                      key={error.code}
                      className="bg-gray-900/50  p-4 border border-gray-700/50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-red-600/30 text-red-300  text-xs font-bold">
                          {error.code}
                        </span>
                        <span className="text-white font-semibold">
                          {error.title}
                        </span>
                      </div>
                      <code className="text-blue-300 font-mono text-sm block">
                        {`{ "error": "${error.message}" }`}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate Limits */}
              <div className="bg-gray-800/30 backdrop-blur-sm p-8 border border-gray-700/30 ">
                <h3 className="text-xl font-bold text-white mb-4">
                  Rate Limits & Quotas
                </h3>
                <div className="space-y-2 text-gray-300">
                  <p>• Maximum file size: 500 words per document</p>
                  <p>
                    • Maximum files per request: 1 (lexical) or 10
                    (semantic/internal)
                  </p>
                  <p>• Processing timeout: 3-4 minutes</p>
                  <p>
                    • API calls are logged and tracked against your account
                    quota
                  </p>
                  <p>• Check your dashboard for current usage statistics</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
