"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Sparkles,
  QrCode,
  UserPlus,
  Home,
  Menu,
  X,
  Car,
  Activity,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Search Vehicle", href: "/search", icon: Search },
    { name: "AI insights", href: "/ai-report", icon: Sparkles },
    { name: "QR Code Entry", href: "/qr", icon: QrCode },
  ];

  return (
    <div className="flex min-h-screen bg-[#070b13] text-[#f3f4f6]">
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#0d121f] border-r border-[#1e293b]">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-[#1e293b]">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg text-white shadow-lg shadow-cyan-500/20">
            <Car size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SmartPark <span className="text-cyan-400 font-extrabold">AI</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
              Admin Terminal
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Management
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#111827] to-[#1e293b] text-cyan-400 border-l-2 border-cyan-400 shadow-md shadow-black/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-[#151c2c]"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-6 border-t border-[#1e293b]/60 mt-6 space-y-1.5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Guest Kiosk
            </div>
            <Link
              href="/entry"
              target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-[#151c2c] transition-all duration-200 group"
            >
              <UserPlus size={18} className="text-slate-400 group-hover:text-slate-200" />
              Visitor Kiosk
            </Link>
            
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-[#151c2c] transition-all duration-200 group"
            >
              <Home size={18} className="text-slate-400 group-hover:text-slate-200" />
              Landing Page
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-[#1e293b] bg-[#090d16] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-xs font-medium text-slate-400">System Secured</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </aside>

      <div className="flex flex-col flex-1 md:pl-64">
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-[#0d121f]/90 backdrop-blur border-b border-[#1e293b] md:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg text-white">
              <Car size={16} />
            </div>
            <span className="font-bold text-base bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              SmartPark <span className="text-cyan-400">AI</span>
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-slate-400 hover:text-slate-200 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </header>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <div className="relative flex flex-col flex-1 w-full max-w-xs bg-[#0d121f] border-r border-[#1e293b] p-6 focus:outline-none">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg text-white">
                  <Car size={18} />
                </div>
                <div>
                  <h1 className="font-bold text-lg">
                    SmartPark <span className="text-cyan-400 font-extrabold">AI</span>
                  </h1>
                  <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                    Admin Terminal
                  </span>
                </div>
              </div>

              <nav className="flex-1 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-[#111827] to-[#1e293b] text-cyan-400 border-l-2 border-cyan-400"
                          : "text-slate-400 hover:text-slate-100 hover:bg-[#151c2c]"
                      }`}
                    >
                      <Icon size={18} className={isActive ? "text-cyan-400" : "text-slate-400"} />
                      {item.name}
                    </Link>
                  );
                })}

                <div className="pt-6 border-t border-[#1e293b]/60 mt-6 space-y-1">
                  <Link
                    href="/entry"
                    target="_blank"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-[#151c2c] transition-all"
                  >
                    <UserPlus size={18} />
                    Visitor Kiosk
                  </Link>
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-[#151c2c] transition-all"
                  >
                    <Home size={18} />
                    Landing Page
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-x-hidden">
          <div className="py-6 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
