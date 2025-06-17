import ClearReportCache from "@/components/ClearReportCache";
import StudentNavbar from "@/components/navbars/StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <div className="">
      <StudentNavbar />
      <ClearReportCache />
      <main>{children}</main>
    </div>
  );
}
