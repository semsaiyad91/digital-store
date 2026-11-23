
"use client";

import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Settings,
  Boxes,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
};

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Stock In", href: "/stock-in", icon: ArrowDownToLine },
  { name: "Sales", href: "/sales", icon: ArrowUpFromLine },
  { name: "History", href: "/history", icon: History },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex flex-col
        border-r border-white/10
        bg-[#101020] text-white
        transition-all duration-300 ease-in-out

        md:sticky md:top-0 md:h-screen
        md:translate-x-0

        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${collapsed ? "w-64 md:w-20" : "w-64"}
      `}
    >
      {/* Logo and Toggle */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">

        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-600">
            <Boxes size={23} />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">
                Stock<span className="text-purple-400">Pro</span>
              </h1>
              <p className="text-[10px] text-gray-400">
                Inventory Manager
              </p>
            </div>
          )}
        </div>

        {/* Desktop Toggle */}
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white md:block"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>

        {/* Mobile Close */}
        <button
          onClick={onCloseMobile}
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-gray-400 hover:bg-white/10 md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={collapsed ? item.name : undefined}
              className={`
                flex items-center gap-3 rounded-xl
                px-4 py-3 text-sm font-medium
                transition-all duration-200

                ${collapsed ? "md:justify-center md:px-2" : ""}

                ${
                  active
                    ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white shadow-lg shadow-purple-900/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <Icon size={20} className="shrink-0" />

              <span className={collapsed ? "md:hidden" : ""}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/settings"
          onClick={onCloseMobile}
          title={collapsed ? "Settings" : undefined}
          className={`
            flex items-center gap-3 rounded-xl px-4 py-3
            text-sm text-gray-400 hover:bg-white/5 hover:text-white
            ${collapsed ? "md:justify-center md:px-2" : ""}
          `}
        >
          <Settings size={20} className="shrink-0" />
          <span className={collapsed ? "md:hidden" : ""}>
            Settings
          </span>
        </Link>
      </div>
    </aside>
  );
}
