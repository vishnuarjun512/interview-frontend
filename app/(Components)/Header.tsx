"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Define navigation items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Careers", path: "/careers" },
  ];

  // Function to check if the link is active
  const isActive = (path: string): boolean => pathname === path;

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-green-200 via-green-50 to-white shadow">
      {/* Logo */}
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/logo.jpeg" alt="Logo" className="h-6 bg-green-300" />
        <h1 className="text-2xl font-bold ml-2 text-green-500">KickBegin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-8 ">
        {navItems.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={` ${
              isActive(path)
                ? "text-green-500 underline border-green-500"
                : "text-gray-600"
            } hover:text-green-500 text-xl font-semibold`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 text-md font-medium text-white bg-green-500 rounded"
        >
          Join us
        </button>
      </div>
    </header>
  );
};

export default Header;
