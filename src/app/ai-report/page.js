"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Sparkles,
  Bot,
  Terminal,
  Copy,
  Check,
  Download,
  AlertCircle,
  FileText,
  Activity
} from "lucide-react";

export default function AIReportPage() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");

  const loadingSteps = [
    "Initializing analytics environment...",
    "Querying Supabase database parking logs...",
    "Aggregating visitor entry-exit intervals...",
    "Sending telemetry data payload to Gemini 2.5 Flash...",
    "Synthesizing traffic peak predictions and recommendations...",
    "Structuring report layout..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  async function generateReport() {
    setLoading(true);
    setError("");
    setReport("");
    setLoadingStep(0);

    try {
      const response = await fetch("/api/generate-report");
      const data = await response.json();
      if (response.ok && data.report) {
        setReport(data.report);
      } else {
        setError(data.error || "Failed to generate AI insights.");
      }
    } catch (err) {
      setError("Network error occurred. Please check database connection.");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([report], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `smartpark-ai-report-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b]/70 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Bot className="text-purple-400" size={32} />
              <span>AI Parking Insights</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Harness LLM cognitive power to build flow observations, peak indicators, and operational suggestions
            </p>
          </div>

          {!loading && (
            <button
              onClick={generateReport}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:opacity-95 text-white font-semibold text-sm rounded-xl transition duration-200 shadow-lg shadow-purple-500/20 active:scale-95 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Generate AI Analysis</span>
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl">
            <div className="bg-[#111622] px-4 py-3 border-b border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-purple-400" />
                <span className="text-xs font-mono text-slate-400">gemini-terminal-stream // session active</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
            </div>

            <div className="p-6 bg-[#090d16] font-mono text-xs text-slate-300 space-y-3 min-h-[200px] flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-purple-400/90">&gt; npm run query-analytics</p>
                {loadingSteps.slice(0, loadingStep + 1).map((step, idx) => (
                  <p key={idx} className="text-emerald-400 flex items-center gap-2">
                    <span>✔</span>
                    <span>{step}</span>
                  </p>
                ))}
                {loadingStep < loadingSteps.length && (
                  <p className="text-cyan-400 flex items-center gap-2 animate-pulse">
                    <span>❯</span>
                    <span>{loadingSteps[loadingStep]}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-[#1e293b]/40">
                <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
                <span className="text-[10px] text-slate-500">Retrieving intelligence analysis from server...</span>
              </div>
            </div>
          </div>
        )}

        {report && !loading && (
          <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#111622] px-6 py-4 border-b border-[#1e293b] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Synthesized Parking Report</h3>
                  <span className="text-[10px] text-slate-500 block">Generated by Gemini 2.5 Flash</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Raw</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition"
                >
                  <Download size={14} />
                  <span>Download (.txt)</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#0c111c]/60 max-w-none">
              <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-sans whitespace-pre-wrap selection:bg-purple-500/30">
                {report}
              </div>
            </div>

            <div className="bg-[#090d16] px-6 py-4 border-t border-[#1e293b] text-[10px] text-slate-500 flex items-center gap-2">
              <Activity size={12} className="text-purple-400 animate-pulse" />
              <span>Operational insights are modeled probabilistically based on actual security records. Verify important details.</span>
            </div>
          </div>
        )}

        {!report && !loading && (
          <div className="glass-panel rounded-2xl p-12 text-center border border-[#1e293b] flex flex-col items-center justify-center space-y-5 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-lg text-purple-400 animate-bounce">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Generate Operations Analysis</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                Connect to database logs to extract check-in durations, identify visitor peak traffic, and construct operational intelligence dashboards using generative AI model reasoning.
              </p>
            </div>
            <button
              onClick={generateReport}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/15 transition duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Launch AI Report Engine</span>
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}