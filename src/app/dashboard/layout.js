// app/dashboard/layout.js
import { Toaster } from "sonner";
export default function DashboardLayout({ children }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
