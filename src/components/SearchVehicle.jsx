"use client";

import { useState } from "react";
import { searchVehicle, exitVehicle } from "@/services/vehicle.service";
import {
  Search,
  Car,
  Bike,
  User,
  Phone,
  FileText,
  Clock,
  LogOut,
  Calendar,
  AlertCircle,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";

export default function SearchVehicle({ initialPlate = "", onStatusChange }) {
  const [vehicleNumber, setVehicleNumber] = useState(initialPlate);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!vehicleNumber.trim()) {
      setError("Please enter a vehicle plate number");
      return;
    }

    setLoading(true);
    setError("");
    setVehicle(null);

    try {
      const result = await searchVehicle(vehicleNumber.trim());
      if (result) {
        setVehicle(result);
      } else {
        setError(`Vehicle "${vehicleNumber.toUpperCase()}" not found in our records.`);
      }
    } catch (err) {
      setError("An error occurred during search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async (id) => {
    setActionLoading(true);
    try {
      const success = await exitVehicle(id);
      if (success) {
        const updated = await searchVehicle(vehicleNumber);
        setVehicle(updated);
        if (onStatusChange) {
          onStatusChange();
        }
      } else {
        alert("Failed to process exit.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + 
      " on " + 
      date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 shadow-xl border border-[#1e293b]">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Vehicle Database Query
        </h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Enter Plate Number (e.g. MH12AB1234)"
              value={vehicleNumber}
              onChange={(e) => {
                setError("");
                setVehicleNumber(e.target.value);
              }}
              className="w-full bg-[#141b2c] border border-[#232d45] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white pl-12 pr-4 py-3.5 rounded-xl text-base font-mono tracking-widest transition outline-none placeholder-slate-600 uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-cyan-500/15 active:scale-95 disabled:opacity-75 flex items-center justify-center min-w-[120px] cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Search Plate"
            )}
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 mt-4 text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-sm animate-shake">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {vehicle && (
        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-[#1e293b] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#111726]/60 px-6 py-5 border-b border-[#1e293b] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`p-3.5 rounded-2xl border ${
                  vehicle.exited
                    ? "bg-slate-800/40 text-slate-500 border-slate-800"
                    : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                }`}
              >
                {vehicle.vehicle_type === "Two Wheeler" ? (
                  <Bike size={24} />
                ) : (
                  <Car size={24} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-mono text-2xl font-bold tracking-widest text-white uppercase bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                    {vehicle.vehicle_number}
                  </h2>
                  <button
                    onClick={() => copyToClipboard(vehicle.vehicle_number)}
                    className="p-1.5 hover:bg-slate-800 text-slate-500 hover:text-slate-300 rounded-lg transition"
                    title="Copy plate number"
                  >
                    {copiedText ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  {vehicle.vehicle_type} • DB Record ID: {vehicle.id}
                </span>
              </div>
            </div>

            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  vehicle.exited
                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse-glow"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    vehicle.exited ? "bg-rose-400" : "bg-emerald-400"
                  }`}
                ></span>
                {vehicle.exited ? "Exited / Logged Out" : "Currently Parked"}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0c111c]/60">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-[#1e293b]/70 pb-2">
                Logistics & Timeline
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-cyan-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Checked In</span>
                    <span className="text-sm font-medium text-slate-300">
                      {formatDateTime(vehicle.entry_time)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className={`mt-0.5 ${vehicle.exited ? "text-rose-400" : "text-slate-600"}`}>
                    <LogOut size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Checked Out</span>
                    <span className={`text-sm font-medium ${vehicle.exited ? "text-slate-300" : "text-slate-500 italic"}`}>
                      {vehicle.exited ? formatDateTime(vehicle.exit_time) : "Still inside parking lot"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 text-slate-400">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Duration</span>
                    <span className="text-sm font-medium text-slate-300">
                      {vehicle.exited 
                        ? `${Math.max(1, Math.round((new Date(vehicle.exit_time) - new Date(vehicle.entry_time)) / 60000))} minutes`
                        : `${Math.max(1, Math.round((new Date() - new Date(vehicle.entry_time)) / 60000))} minutes (ongoing)`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {!vehicle.exited && (
                <div className="pt-4">
                  <button
                    onClick={() => handleExit(vehicle.id)}
                    disabled={actionLoading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-500/10 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {actionLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <LogOut size={16} />
                    )}
                    <span>Process Vehicle Exit</span>
                  </button>
                </div>
              )}

              {vehicle.exited && (
                <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-800/10 border border-slate-800/30 p-3.5 rounded-xl">
                  <CheckCircle size={18} className="text-slate-500" />
                  <span>This vehicle transaction has been closed.</span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-[#1e293b]/70 pb-2">
                Visitor Profile
              </h3>

              {vehicle.visitor ? (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyan-400">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Full Name</span>
                      <span className="text-sm font-semibold text-slate-200">
                        {vehicle.visitor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyan-400">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Phone Contact</span>
                      <a
                        href={`tel:${vehicle.visitor.phone}`}
                        className="text-sm font-semibold text-cyan-400 hover:underline inline-flex items-center gap-1"
                      >
                        {vehicle.visitor.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyan-400">
                      <FileText size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Purpose of Visit</span>
                      <span className="text-sm font-medium text-slate-300">
                        {vehicle.visitor.purpose || <span className="text-slate-600 italic">Not specified</span>}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-[#1e293b] rounded-2xl bg-[#090d16]/30 text-center">
                  <User size={24} className="text-slate-600 mb-2" />
                  <p className="text-xs text-slate-400">No Visitor profile attached</p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    This vehicle was registered directly without guest metadata.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
