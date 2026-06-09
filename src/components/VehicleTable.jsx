"use client";

import { useState } from "react";
import {
  Car,
  Bike,
  Clock,
  LogOut,
  Search,
  SlidersHorizontal,
  CheckCircle,
  Eye
} from "lucide-react";

export default function VehicleTable({ vehicles = [], onExit, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.vehicle_number
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "ALL" ||
      (typeFilter === "TWO" && vehicle.vehicle_type === "Two Wheeler") ||
      (typeFilter === "FOUR" && vehicle.vehicle_type === "Four Wheeler");

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && !vehicle.exited) ||
      (statusFilter === "EXITED" && vehicle.exited);

    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + 
      " • " + 
      date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0d121f] p-4 rounded-2xl border border-[#1e293b]">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by plate number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141b2c] border border-[#232d45] focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white pl-10 pr-4 py-2.5 rounded-xl text-sm transition outline-none placeholder-slate-600 font-mono tracking-wide"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider pr-1">
            <SlidersHorizontal size={14} />
            <span>Filters:</span>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#141b2c] border border-[#232d45] focus:border-cyan-500 text-slate-300 text-xs font-medium px-3 py-2.5 rounded-xl outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="TWO">Two Wheeler</option>
            <option value="FOUR">Four Wheeler</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#141b2c] border border-[#232d45] focus:border-cyan-500 text-slate-300 text-xs font-medium px-3 py-2.5 rounded-xl outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="EXITED">Exited</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#1e293b] bg-[#0d121f]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1e293b] bg-[#111726]/75 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">Vehicle Details</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Entry Time</th>
              <th className="px-6 py-4">Exit Time</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b]/70">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => {
                const isExited = vehicle.exited;
                return (
                  <tr
                    key={vehicle.id}
                    className="hover:bg-[#161d2d]/40 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl border ${
                            isExited
                              ? "bg-slate-800/40 text-slate-500 border-slate-800"
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          }`}
                        >
                          {vehicle.vehicle_type === "Two Wheeler" ? (
                            <Bike size={18} />
                          ) : (
                            <Car size={18} />
                          )}
                        </div>
                        <div>
                          <div className="font-mono font-bold tracking-wider text-sm text-white bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 inline-block uppercase">
                            {vehicle.vehicle_number}
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-1">
                            {vehicle.vehicle_type}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isExited
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse-glow"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isExited ? "bg-rose-400" : "bg-emerald-400"
                          }`}
                        ></span>
                        {isExited ? "Exited" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-500" />
                        <span>{formatDateTime(vehicle.entry_time)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {isExited ? (
                        <div className="flex items-center gap-1.5 text-rose-400/80">
                          <Clock size={14} className="text-rose-500/40" />
                          <span>{formatDateTime(vehicle.exit_time)}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onViewDetails && (
                          <button
                            onClick={() => onViewDetails(vehicle.vehicle_number)}
                            title="View Visitor Details"
                            className="p-2 bg-[#141b2c] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-[#232d45] transition-all"
                          >
                            <Eye size={15} />
                          </button>
                        )}

                        {!isExited ? (
                          <button
                            onClick={() => onExit(vehicle.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-semibold rounded-xl border border-rose-500/20 hover:border-transparent transition-all shadow-md active:scale-95 cursor-pointer"
                          >
                            <LogOut size={13} />
                            <span>Exit</span>
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1.5 bg-[#141b2c] text-slate-500 text-xs font-medium rounded-xl border border-transparent select-none">
                            <CheckCircle size={13} className="text-slate-600" />
                            <span>Logged Out</span>
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Car size={36} className="text-slate-600 animate-bounce" />
                    <p className="text-slate-400 font-medium">No vehicles found</p>
                    <p className="text-slate-600 text-xs">
                      Try adjusting your search query or filters.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-500 px-2">
        <span>
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </span>
        {vehicles.length > 0 && filteredVehicles.length === 0 && (
          <button
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("ALL");
              setStatusFilter("ALL");
            }}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
