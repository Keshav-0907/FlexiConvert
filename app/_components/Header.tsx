"use client";
import Link from "next/link";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const HeaderItems = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Pricing", url: "/services" },
];

const Header = () => {
  const { colorMode, setColorMode } = useTheme();

  return (
    <div
      className={`flex justify-between md:px-10 md:py-5 px-5 py-3 items-center ${
        colorMode === "light" ? "" : "bg-gray-800"
      }`}
    >
      <div className="">
        <img src="/FC_logo.png" className="w-36" alt="logo" />
      </div>

      <div className={`hidden gap-16 text-sm items-center font-medium md:flex ${colorMode === "light" ? "" : "text-white"}`}>
        {HeaderItems.map((item, index) => (
          <Link href={"/"} key={index}>
            {item.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        <button className="text-sm text-gray-500 mr-5 border-[1px] border-gray-600 p-1 rounded-lg">
        <Moon size={20} onClick={() => setColorMode("dark")} />
          {/* {colorMode === "light" ? (
            <Moon size={20} onClick={() => setColorMode("dark")} />
          ) : (
            <Sun
              size={20}
              className="text-white"
              onClick={() => setColorMode("light")}
            />
          )} */}
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 text-sm rounded-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
