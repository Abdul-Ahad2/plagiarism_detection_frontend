"use client";
import { Berkshire_Swash, DM_Sans, Raleway } from "next/font/google";
import { LiaHomeSolid } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // ← import the router
import { signOut } from "next-auth/react";

const rw = Raleway({
  subsets: ["cyrillic", "latin"],
  weight: ["500"],
});

const bs = Berkshire_Swash({
  subsets: ["latin"],
  weight: ["400"],
});

const ds = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const menuItems = [
  { href: "/dashboard/student/analytics", label: "Dashboard" },
  { href: "/dashboard/student/upload", label: "Check Plagiarism" },
  { href: "/dashboard/student/report", label: "Reports" },
  { href: "/dashboard/student/settings", label: "Settings" },
  // We’ll still list Logout here, but handle it specially in the rendering logic:
  { href: "/login", label: "Logout" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <>
      <div className={`${ds.className} w-full h-20 top-0 right-0 z-50 fixed`}>
        <div className="flex justify-between items-center h-20 px-6 backdrop-blur-sm bg-white/0 py-2">
          <div className={`${bs.className} text-gray-200 text-4xl`}>
            SluethInk.
          </div>

          {!isMenu ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="border-none relative text-sm md:text-base text-gray-300"
              onClick={() => setIsMenu(true)}
            >
              <FiMenu className="text-4xl" />
            </motion.div>
          ) : (
            <div
              className={`${rw.className} flex items-center justify-center gap-12`}
            >
              <AnimatePresence>
                {menuItems.map((item, index) => {
                  // ② Handle “Logout” differently:
                  if (item.label === "Logout") {
                    return (
                      <motion.div
                        key="logout"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <button
                          onClick={() => {
                            setIsMenu(false);
                            handleLogout();
                          }}
                          className={`${rw.className} text-gray-200 text-sm md:text-base`}
                        >
                          {item.label}
                        </button>
                      </motion.div>
                    );
                  }

                  // ③ For all other items, render a normal Link
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`${rw.className} text-gray-200 text-sm md:text-base`}
                        onClick={() => setIsMenu(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-none relative text-sm md:text-base text-gray-300"
                onClick={() => setIsMenu(false)}
              >
                <RxCross1 className="text-4xl" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
