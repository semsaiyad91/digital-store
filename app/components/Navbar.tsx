
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";

type NavbarProps = {
  onMenuClick: () => void;
};

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/stock-in": "Stock In",
  "/sales": "Sales",
  "/history": "History",
  "/settings": "Settings",
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="relative z-30 flex h-20 w-full shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#101020] px-4 text-white sm:px-6">

      {/* Left - Mobile Menu + Page Title */}
      <div className="flex min-w-0 items-center gap-3">

        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#19182d] p-2.5 text-gray-300 transition hover:border-purple-500/50 hover:bg-purple-600/20 hover:text-white md:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight sm:text-2xl">
            {pageTitle}
          </h1>

          <p className="mt-1 hidden text-xs text-gray-400 sm:block">
            Overview of your stock and business
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Search Bar - Desktop */}
        <div className="hidden w-48 items-center gap-3 rounded-xl border border-white/10 bg-[#19182d] px-4 py-2.5 transition focus-within:border-purple-500 lg:flex xl:w-72">
          <Search
            size={18}
            className="shrink-0 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfile((prev) => !prev)}
            aria-expanded={showProfile}
            aria-haspopup="menu"
            className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-white/5 sm:p-2"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-800 font-bold sm:h-10 sm:w-10">
              S
            </div>

            {/* Shop Details */}
            <div className="hidden text-left xl:block">
              <p className="text-sm font-semibold">
                My Shop
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-gray-400 transition-transform duration-200 sm:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div
              role="menu"
              className="absolute right-0 top-14 z-50 w-52 rounded-xl border border-white/10 bg-[#19182d] p-2 shadow-2xl shadow-black/50"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <User size={17} />
                My Profile
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                <Settings size={17} />
                Settings
              </button>

              <div className="my-2 border-t border-white/10" />

              <button
                type="button"
                role="menuitem"
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

