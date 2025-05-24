// app/(public)/layout.js
import Navbar from "@/components/navbars/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
