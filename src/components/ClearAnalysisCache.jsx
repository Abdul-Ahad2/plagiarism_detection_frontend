"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

export default function ClearAnalysisCache() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (!session?.user?.name) return;

    const analysisTypes = [
      "internal-analysis",
      "lexical-analysis",
      "semantic-analysis",
    ];

    // Check if previously on an analysis report page
    const wasOnAnalysisPage = analysisTypes.some((type) =>
      previousPathRef.current?.includes(`/${type}/analysis-report/`)
    );

    // Check if currently on an analysis report page
    const isOnAnalysisPage = analysisTypes.some((type) =>
      pathname.includes(`/${type}/analysis-report/`)
    );

    // Only clear when leaving an analysis page, not when entering one
    if (wasOnAnalysisPage && !isOnAnalysisPage) {
      console.log("Left analysis page, clearing all cache");
      // Clear all analysis cache keys
      const keys = Object.keys(localStorage).filter((key) =>
        key.match(/^(semantic|lexical|internal):/)
      );
      keys.forEach((key) => localStorage.removeItem(key));
    }

    previousPathRef.current = pathname;
  }, [pathname, session]);

  return null;
}
