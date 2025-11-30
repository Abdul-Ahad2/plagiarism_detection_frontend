"use client";
import ClearAnalysisCache from "@/components/ClearAnalysisCache";
import StudentNavbar from "@/components/navbars/UserNavbar";

export default function StudentLayout({ children }) {
  return (
    <div className="">
      <StudentNavbar />
      <ClearAnalysisCache />
      <main>{children}</main>
    </div>
  );
}
