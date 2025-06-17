// src/components/ClearReportCache.jsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Clears the "report" key from localStorage whenever
 * the path stops matching /dashboard/student/report/[id].
 */
export default function ClearReportCache() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/dashboard/student/report/")) {
      localStorage.removeItem("report");
    }
  }, [pathname]);

  return null;
}
