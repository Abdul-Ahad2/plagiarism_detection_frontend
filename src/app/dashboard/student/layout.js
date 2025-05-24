import Footer from "@/components/Footer";
import StudentNavbar from "@/components/navbars/StudentNavbar";

export default function StudentLayout({ children }) {
  return (
    <div className="">
      <StudentNavbar />
      <main className="">{children}</main>
    </div>
  );
}
