// app/(public)/layout.js
import Navbar from "@/components/navbars/MainNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
