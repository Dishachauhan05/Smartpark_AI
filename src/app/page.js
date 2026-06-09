"use client";

import Link from "next/link";
import {
  Car,
  LayoutDashboard,
  UserPlus,
  Search,
  QrCode,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10"></div>

      <header className="relative z-10 border-b border-slate-800/60 bg-[#0d121f]/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <Car size={22} />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SmartPark <span className="text-cyan-400 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] text-cyan-400/80 font-bold tracking-widest uppercase block -mt-1 font-mono">
                v1.0.0
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-cyan-500/10 active:scale-95"
            >
              <span>Admin Console</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6 animate-pulse-glow">
          <Sparkles size={14} className="text-cyan-400" />
          <span>Next-Gen Smart Parking Analytics</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
          AI-Powered Parking & Visitor{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Control Center
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Log vehicles, generate instant entries, inspect database records, and run predictive operational reports using Google Gemini AI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-16 max-w-6xl">
          <Link
            href="/dashboard"
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col text-left group"
          >
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit group-hover:bg-cyan-500 group-hover:text-slate-900 transition-all duration-300">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="font-bold text-lg text-white mt-5 group-hover:text-cyan-400 transition-colors">
              Admin Dashboard
            </h3>
            <p className="text-sm text-slate-400 mt-2 flex-grow">
              Live tracking dashboard showing active vehicles, exit events, and system telemetry metrics.
            </p>
            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-cyan-400/80 group-hover:text-cyan-300">
              <span>Access console</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/entry"
            target="_blank"
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col text-left group"
          >
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl w-fit group-hover:bg-purple-500 group-hover:text-slate-900 transition-all duration-300">
              <UserPlus size={24} />
            </div>
            <h3 className="font-bold text-lg text-white mt-5 group-hover:text-purple-400 transition-colors">
              Visitor Kiosk
            </h3>
            <p className="text-sm text-slate-400 mt-2 flex-grow">
              Tablet-friendly self-checkout form for guests to register their vehicles and print digital slips.
            </p>
            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-purple-400/80 group-hover:text-purple-300">
              <span>Open kiosk</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/search"
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col text-left group"
          >
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl w-fit group-hover:bg-indigo-500 group-hover:text-slate-900 transition-all duration-300">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-lg text-white mt-5 group-hover:text-indigo-400 transition-colors">
              Search Database
            </h3>
            <p className="text-sm text-slate-400 mt-2 flex-grow">
              Control room search terminal to query vehicle profiles, audit check-ins, and inspect visitors.
            </p>
            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-indigo-400/80 group-hover:text-indigo-300">
              <span>Search plates</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <Link
            href="/qr"
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col text-left group"
          >
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl w-fit group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-300">
              <QrCode size={24} />
            </div>
            <h3 className="font-bold text-lg text-white mt-5 group-hover:text-emerald-400 transition-colors">
              Pass QR Kiosk
            </h3>
            <p className="text-sm text-slate-400 mt-2 flex-grow">
              Printable check-in board containing a scanned QR code to easily share registration access.
            </p>
            <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-emerald-400/80 group-hover:text-emerald-300">
              <span>View QR Code</span>
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        <section className="mt-32 border-t border-slate-800/60 pt-16 w-full max-w-5xl">
          <h2 className="text-2xl font-bold mb-10 text-center">Engineered for Modern Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex gap-4">
              <div className="p-2.5 bg-slate-800/40 rounded-xl text-cyan-400 h-fit border border-[#1e293b]">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Lightning Registrations</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Guests register their own plates under 30 seconds via QR Code scanning on mobile devices.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2.5 bg-slate-800/40 rounded-xl text-purple-400 h-fit border border-[#1e293b]">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Gemini AI Synthesis</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Synthesize real-time operational reports, traffic spikes, and visitor habits in one click.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-2.5 bg-slate-800/40 rounded-xl text-emerald-400 h-fit border border-[#1e293b]">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Secure Cloud Vault</h4>
                <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                  Encrypted logs linked securely via Supabase DB with automated entry auditing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/40 py-8 bg-[#04060b] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SmartPark AI Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}