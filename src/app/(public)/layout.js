// app/(public)/layout.js
import Navbar from "@/components/navbars/MainNavbar";
import { Toaster } from "sonner";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Toaster
        position="bottom-right"
        richColors
        closeButton
        toastOptions={{
          className: "bg-white text-black",
          style: {
            background: "#fff",
            color: "#000",
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
    </>
  );
}
