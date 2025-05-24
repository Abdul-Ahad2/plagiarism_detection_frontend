"use client";
import { DM_Sans } from "next/font/google";
import {
  PiGear,
  PiBell,
  PiLock,
  PiUser,
  PiToggleLeft,
  PiToggleRight,
  PiCheckCircle,
  PiWarningCircle,
} from "react-icons/pi";
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

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    strictMode: true,
    autoDelete: true,
    apiSources: ["arXiv", "CORE", "Wikipedia"],
    sensitivity: 75,
    language: "English",
  });

  const availableSources = ["arXiv", "CORE", "Wikipedia", "PubMed", "DOAJ"];

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSource = (source) => {
    setSettings((prev) => {
      const newSources = prev.apiSources.includes(source)
        ? prev.apiSources.filter((s) => s !== source)
        : [...prev.apiSources, source];
      return { ...prev, apiSources: newSources };
    });
  };

  return (
    <div className="selection:bg-purple-500 selection:text-white min-h-screen bg-[#E4E4E4] p-4 md:p-1">
      {/* Main Container */}
      <div className="bg-purple-300 rounded-4xl border-black border-b-[12px] border-l-[12px] border-r-2 border-t-2 p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1
            className={`${dmSans.className} text-5xl md:text-5xl lg:text-[65px] tracking-tighter leading-tight`}
          >
            Account{" "}
            <span className="bg-purple-400 border-black border-l-4 border-r-4 text-5xl md:text-[65px] px-2 py-1 md:px-0 md:py-0 block md:inline-block mt-2 md:mt-0">
              Settings
            </span>
          </h1>
          <p className={`${dmSans_lighter.className} text-xl mt-4`}>
            Customize your plagiarism detection preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-6">
              <h2
                className={`${dmSans_light.className} text-2xl mb-4 flex items-center gap-2`}
              >
                <PiUser className="text-purple-600" /> Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`${dmSans_lighter.className} block mb-1`}>
                    Display Name
                  </label>
                  <input
                    type="text"
                    className={`${dmSans_lighter.className} w-full p-3 bg-white rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2`}
                    defaultValue="Student User"
                  />
                </div>
                <div>
                  <label className={`${dmSans_lighter.className} block mb-1`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`${dmSans_lighter.className} w-full p-3 bg-white rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2`}
                    defaultValue="student@university.edu"
                  />
                </div>
                <button
                  className={`${dmSans_light.className} mt-4 px-6 py-3 bg-purple-400 rounded-3xl border-black border-b-4 border-l-4 border-r-2 border-t-2 hover:bg-purple-500 transition`}
                >
                  Update Profile
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-6">
              <h2
                className={`${dmSans_light.className} text-2xl mb-4 flex items-center gap-2`}
              >
                <PiBell className="text-purple-600" /> Notifications
              </h2>
              <div className="space-y-4">
                <ToggleSetting
                  label="Email Notifications"
                  enabled={settings.notifications}
                  onChange={() => toggleSetting("notifications")}
                />
                <ToggleSetting
                  label="High Similarity Alerts"
                  enabled={settings.strictMode}
                  onChange={() => toggleSetting("strictMode")}
                />
                <ToggleSetting
                  label="Monthly Usage Reports"
                  enabled={true}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Detection Settings */}
            <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-6">
              <h2
                className={`${dmSans_light.className} text-2xl mb-4 flex items-center gap-2`}
              >
                <PiGear className="text-purple-600" /> Detection Preferences
              </h2>
              <div className="space-y-6">
                <div>
                  <label className={`${dmSans_lighter.className} block mb-2`}>
                    Sensitivity Level: {settings.sensitivity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.sensitivity}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        sensitivity: e.target.value,
                      }))
                    }
                    className="w-full accent-purple-500"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>More Lenient</span>
                    <span>More Strict</span>
                  </div>
                </div>

                <div>
                  <label className={`${dmSans_lighter.className} block mb-2`}>
                    API Sources
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSources.map((source) => (
                      <button
                        key={source}
                        onClick={() => toggleSource(source)}
                        className={`p-2 rounded-xl border-black border-b-2 border-l-2 border-r-1 border-t-1 flex items-center gap-2 ${
                          settings.apiSources.includes(source)
                            ? "bg-purple-400"
                            : "bg-white"
                        }`}
                      >
                        {settings.apiSources.includes(source) ? (
                          <PiCheckCircle className="text-green-600" />
                        ) : (
                          <PiWarningCircle className="text-gray-400" />
                        )}
                        {source}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`${dmSans_lighter.className} block mb-2`}>
                    Report Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className={`${dmSans_lighter.className} w-full p-3 bg-white rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2`}
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-[#E4E4E4] rounded-4xl border-black border-b-8 border-l-8 border-r-2 border-t-2 p-6">
              <h2
                className={`${dmSans_light.className} text-2xl mb-4 flex items-center gap-2`}
              >
                <PiLock className="text-purple-600" /> Privacy & Security
              </h2>
              <div className="space-y-4">
                <ToggleSetting
                  label="Auto-delete Reports After 30 Days"
                  enabled={settings.autoDelete}
                  onChange={() => toggleSetting("autoDelete")}
                />
                <ToggleSetting
                  label="Dark Mode"
                  enabled={settings.darkMode}
                  onChange={() => toggleSetting("darkMode")}
                />
                <div>
                  <button
                    className={`${dmSans_light.className} w-full px-4 py-3 bg-red-100 text-red-800 rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2 hover:bg-red-200 transition flex items-center justify-center gap-2`}
                  >
                    <PiWarningCircle /> Delete All My Data
                  </button>
                </div>
                <div>
                  <button
                    className={`${dmSans_light.className} w-full px-4 py-3 bg-red-100 text-red-800 rounded-2xl border-black border-b-4 border-l-4 border-r-2 border-t-2 hover:bg-red-200 transition flex items-center justify-center gap-2`}
                  >
                    <PiWarningCircle /> Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-10">
          <button
            className={`${dmSans_light.className} px-8 py-4 bg-white rounded-3xl border-black border-b-8 border-l-8 border-r-2 border-t-2 h-20 text-xl hover:bg-purple-500 transition`}
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Toggle Component
function ToggleSetting({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`${dmSans_lighter.className}`}>{label}</span>
      <button onClick={onChange} className="relative focus:outline-none">
        <div
          className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 ${
            enabled ? "bg-purple-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              enabled ? "translate-x-7" : "translate-x-1"
            }`}
          ></div>
        </div>
      </button>
    </div>
  );
}
