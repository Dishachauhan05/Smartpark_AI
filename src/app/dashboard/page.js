"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import VehicleTable from "@/components/VehicleTable";
import {
  getVehicles,
  exitVehicle,
  getDashboardStats,
} from "@/services/vehicle.service";
import {
  Car,
  Bike,
  Activity,
  LogOut,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    exited: 0,
    today: 0,
  });
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const vehicleData = await getVehicles();
      const statsData = await getDashboardStats();

      setVehicles(vehicleData);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function handleExit(id) {
    const success = await exitVehicle(id);
    if (success) {
      loadData();
    }
  }

  const handleViewDetails = (plateNumber) => {
    router.push(`/search?plate=${encodeURIComponent(plateNumber)}`);
  };

  const twoWheelersCount = vehicles.filter(v => v.vehicle_type === "Two Wheeler").length;
  const fourWheelersCount = vehicles.filter(v => v.vehicle_type === "Four Wheeler").length;
  
  const twoWheelersActive = vehicles.filter(v => v.vehicle_type === "Two Wheeler" && !v.exited).length;
  const fourWheelersActive = vehicles.filter(v => v.vehicle_type === "Four Wheeler" && !v.exited).length;

  const exitedVehicles = vehicles.filter(v => v.exited && v.exit_time && v.entry_time);
  const avgDurationMins = exitedVehicles.length > 0 
    ? Math.round(
        exitedVehicles.reduce((acc, curr) => {
          const diffMs = new Date(curr.exit_time) - new Date(curr.entry_time);
          return acc + (diffMs / 60000);
        }, 0) / exitedVehicles.length
      )
    : 0;

  const entryHours = vehicles.map(v => new Date(v.entry_time).getHours());
  const peakHour = entryHours.length > 0
    ? (() => {
        const counts = {};
        let maxHr = entryHours[0];
        let maxCount = 0;
        entryHours.forEach(hr => {
          counts[hr] = (counts[hr] || 0) + 1;
          if (counts[hr] > maxCount) {
            maxCount = counts[hr];
            maxHr = hr;
          }
        });
        const formatHr = maxHr === 0 ? "12 AM" : maxHr === 12 ? "12 PM" : maxHr > 12 ? `${maxHr - 12} PM` : `${maxHr} AM`;
        return formatHr;
      })()
    : "N/A";

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b]/70 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Dashboard Control Panel
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Real-time security logs, vehicle occupancy stats, and checkout systems
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setLoading(true);
                loadData();
              }}
              className="px-4 py-2 bg-[#0d121f] hover:bg-[#151c2c] text-slate-300 font-semibold text-xs rounded-xl border border-[#1e293b] transition"
            >
              Force Refresh
            </button>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-xl border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Feed
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-cyan-400 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Active Vehicles</span>
                <span className="text-3xl font-extrabold text-white mt-1.5 block tracking-tight">
                  {loading ? "..." : stats.active}
                </span>
              </div>
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Car size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
              <Activity size={12} className="text-cyan-400" />
              <span>Currently parked inside lot</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-400 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-400/5 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Today's entries</span>
                <span className="text-3xl font-extrabold text-white mt-1.5 block tracking-tight">
                  {loading ? "..." : stats.today}
                </span>
              </div>
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Calendar size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
              <TrendingUp size={12} className="text-indigo-400" />
              <span>New logs registered today</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-rose-400 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-400/5 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Logged Out</span>
                <span className="text-3xl font-extrabold text-white mt-1.5 block tracking-tight">
                  {loading ? "..." : stats.exited}
                </span>
              </div>
              <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
                <LogOut size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} className="text-rose-400" />
              <span>Checked out successfully</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-slate-400 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/5 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform"></div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Total Records</span>
                <span className="text-3xl font-extrabold text-white mt-1.5 block tracking-tight">
                  {loading ? "..." : stats.total}
                </span>
              </div>
              <div className="p-3 bg-slate-800 text-slate-300 rounded-xl">
                <Layers size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
              <ArrowUpRight size={12} className="text-slate-400" />
              <span>Total vehicle check-in logs</span>
            </div>
          </div>
        </div>

        {!loading && vehicles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-[#1e293b] lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center border-b border-[#1e293b]/50 pb-4">
                <div>
                  <h3 className="font-bold text-base text-white">Occupancy Distribution</h3>
                  <p className="text-[10px] text-slate-500">Classification of currently parked vehicles</p>
                </div>
                <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {stats.active} Active
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Bike size={14} className="text-cyan-400" />
                      Two Wheelers ({twoWheelersActive})
                    </span>
                    <span>{stats.active > 0 ? Math.round((twoWheelersActive / stats.active) * 100) : 0}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${stats.active > 0 ? (twoWheelersActive / stats.active) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Car size={14} className="text-purple-400" />
                      Four Wheelers ({fourWheelersActive})
                    </span>
                    <span>{stats.active > 0 ? Math.round((fourWheelersActive / stats.active) * 100) : 0}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${stats.active > 0 ? (fourWheelersActive / stats.active) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">Total Database Share</span>
                <div className="h-6 w-full flex rounded-xl overflow-hidden text-[10px] font-bold text-[#090d16] select-none">
                  {twoWheelersCount > 0 && (
                    <div 
                      className="bg-gradient-to-r from-cyan-400 to-cyan-500 flex items-center justify-center transition-all duration-500"
                      style={{ width: `${(twoWheelersCount / stats.total) * 100}%` }}
                      title={`Two Wheelers: ${twoWheelersCount}`}
                    >
                      Motorbikes ({Math.round((twoWheelersCount / stats.total) * 100)}%)
                    </div>
                  )}
                  {fourWheelersCount > 0 && (
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center transition-all duration-500 text-white"
                      style={{ width: `${(fourWheelersCount / stats.total) * 100}%` }}
                      title={`Four Wheelers: ${fourWheelersCount}`}
                    >
                      Cars ({Math.round((fourWheelersCount / stats.total) * 100)}%)
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-[#1e293b] flex flex-col justify-between space-y-5">
              <div className="border-b border-[#1e293b]/50 pb-4">
                <h3 className="font-bold text-base text-white">Stay Analytics</h3>
                <p className="text-[10px] text-slate-500">Facility traffic telemetry insights</p>
              </div>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <div className="flex items-center justify-between p-3.5 bg-[#111726]/40 rounded-xl border border-[#1e293b]/50">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Avg Stay Time</span>
                    <span className="text-lg font-extrabold text-cyan-400 mt-0.5 inline-block">
                      {avgDurationMins > 0 ? `${avgDurationMins} mins` : "N/A"}
                    </span>
                  </div>
                  <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                    <Clock size={16} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#111726]/40 rounded-xl border border-[#1e293b]/50">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Peak entry hour</span>
                    <span className="text-lg font-extrabold text-purple-400 mt-0.5 inline-block">
                      {peakHour}
                    </span>
                  </div>
                  <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                    <TrendingUp size={16} />
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500">
                Calculated dynamically from closed transaction records.
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Security Access Logs</span>
            </h2>
          </div>

          {loading ? (
            <div className="glass-panel rounded-2xl p-12 text-center border border-[#1e293b] flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
              <p className="text-slate-400 text-sm">Synchronizing access logs...</p>
            </div>
          ) : (
            <VehicleTable
              vehicles={vehicles}
              onExit={handleExit}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}