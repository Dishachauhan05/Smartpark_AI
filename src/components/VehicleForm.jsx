"use client";

import { useState } from "react";
import { createVehicle } from "@/services/vehicle.service";
import {
  User,
  Phone,
  FileText,
  Hash,
  Car,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  ChevronRight,
  ArrowLeft,
  Bike,
  ShieldAlert,
  Ticket
} from "lucide-react";

export default function VehicleForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: "",
    vehicleNumber: "",
    vehicleType: "Two Wheeler",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectVehicleType = (type) => {
    setFormData((prev) => ({
      ...prev,
      vehicleType: type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name.trim()) {
      setError("Please specify your full name.");
      setLoading(false);
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please input a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }
    if (!formData.vehicleNumber.trim()) {
      setError("License plate number is required.");
      setLoading(false);
      return;
    }

    const result = await createVehicle(formData);
    setLoading(false);

    if (result.success) {
      setSuccessData({
        ...formData,
        entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        entryDate: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
        ticketId: "SP-" + Math.floor(100000 + Math.random() * 900000)
      });
      setFormData({
        name: "",
        phone: "",
        purpose: "",
        vehicleNumber: "",
        vehicleType: "Two Wheeler",
      });
    } else {
      setError(result.error || "Submission failed. Please verify network connection.");
    }
  };

  if (successData) {
    return (
      <div className="max-w-md mx-auto relative animate-in fade-in zoom-in-95 duration-500 py-6">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10"></div>
        <div className="bg-[#0e1422] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 via-[#161d30] to-cyan-500/10 p-6 text-center border-b border-[#232d45] relative">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">Entry Authorized</h3>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">SmartPark Digital Pass</p>
          </div>

          <div className="p-6 space-y-6 bg-[#0e1422]">
            <div className="border border-dashed border-[#232d45] bg-[#0b0f19]/60 rounded-2xl p-5 space-y-4 relative overflow-hidden">
              <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#0e1422] rounded-full border-r border-[#232d45]"></div>
              <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#0e1422] rounded-full border-l border-[#232d45]"></div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">TICKET NO.</span>
                  <span className="text-sm font-mono font-extrabold text-cyan-400 tracking-wider">
                    {successData.ticketId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">FACILITY ACCESS</span>
                  <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    LEVEL GATES
                  </span>
                </div>
              </div>

              <hr className="border-[#232d45]/70 border-dashed" />

              <div>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">VEHICLE PLATE</span>
                <span className="text-2xl font-mono font-black text-white tracking-widest bg-[#070b13] px-3.5 py-1.5 rounded-xl border border-[#232d45] block text-center uppercase shadow-inner mt-1.5">
                  {successData.vehicleNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">DRIVER NAME</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">{successData.name}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">CONTACT</span>
                  <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">{successData.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1 border-t border-[#232d45]/40">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">CHECK-IN TIME</span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock size={11} className="text-slate-400" />
                    {successData.entryTime}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">DATE</span>
                  <span className="text-xs font-semibold text-slate-300 mt-0.5 block">{successData.entryDate}</span>
                </div>
              </div>

              {successData.purpose && (
                <div className="pt-2 border-t border-[#232d45]/40">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">VISIT DESCRIPTION</span>
                  <span className="text-xs text-slate-300 italic mt-0.5 block truncate">
                    "{successData.purpose}"
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex flex-col items-center">
              <div className="w-48 h-10 bg-slate-100/90 rounded-md p-1.5 flex items-center justify-between overflow-hidden relative">
                <div className="w-full h-full flex justify-between gap-[2px] opacity-80">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 h-full rounded"
                      style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2) * 1.5}px` }}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500"></div>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">SCANNABLE BARCODE AT TERMINAL</span>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 hover:text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-cyan-500/10 active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft size={14} className="text-white" />
              <span className="text-white">Register Another Vehicle</span>
            </button>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="/dashboard"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-[#111625] hover:bg-[#192237] text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition border border-[#232d45] active:scale-[0.98] text-center"
              >
                Dashboard
              </a>
              <a
                href="/"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-[#111625] hover:bg-[#192237] text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition border border-[#232d45] active:scale-[0.98] text-center"
              >
                Home Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full duration-300">
      {error && (
        <div className="flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-xs mb-6 animate-shake">
          <ShieldAlert size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <User size={16} />
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#0d121f] border border-[#1e293b] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 text-white pl-11 pr-4 py-3.5 rounded-xl text-sm transition outline-none placeholder-slate-600 font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Phone size={16} />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#0d121f] border border-[#1e293b] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 text-white pl-11 pr-4 py-3.5 rounded-xl text-sm transition outline-none placeholder-slate-600 font-medium"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicle Category</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => selectVehicleType("Two Wheeler")}
              className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 outline-none cursor-pointer ${
                formData.vehicleType === "Two Wheeler"
                  ? "bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 text-cyan-400 border-cyan-400 shadow-lg shadow-cyan-500/5"
                  : "bg-[#0d121f] text-slate-500 border-[#1e293b] hover:text-slate-300 hover:bg-[#151c2c]"
              }`}
            >
              <div className={`p-2.5 rounded-xl mb-2 transition duration-300 ${
                formData.vehicleType === "Two Wheeler"
                  ? "bg-cyan-500/15 border border-cyan-500/20 text-cyan-400"
                  : "bg-slate-800/40 text-slate-500"
              }`}>
                <Bike size={24} />
              </div>
              <span className="text-xs font-bold block">Two Wheeler</span>
              <span className="text-[9px] text-slate-600 mt-0.5 block">Motorbikes, Scooters</span>
            </button>

            <button
              type="button"
              onClick={() => selectVehicleType("Four Wheeler")}
              className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 outline-none cursor-pointer ${
                formData.vehicleType === "Four Wheeler"
                  ? "bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 text-cyan-400 border-cyan-400 shadow-lg shadow-cyan-500/5"
                  : "bg-[#0d121f] text-slate-500 border-[#1e293b] hover:text-slate-300 hover:bg-[#151c2c]"
              }`}
            >
              <div className={`p-2.5 rounded-xl mb-2 transition duration-300 ${
                formData.vehicleType === "Four Wheeler"
                  ? "bg-cyan-500/15 border border-cyan-500/20 text-cyan-400"
                  : "bg-slate-800/40 text-slate-500"
              }`}>
                <Car size={24} />
              </div>
              <span className="text-xs font-bold block">Four Wheeler</span>
              <span className="text-[9px] text-slate-600 mt-0.5 block">Sedans, SUVs, Trucks</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">License Plate Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Hash size={16} />
            </div>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="e.g. MH12AB1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="w-full bg-[#0d121f] border border-[#1e293b] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 text-white pl-11 pr-4 py-3.5 rounded-xl text-sm font-mono tracking-widest font-bold uppercase transition duration-200 outline-none placeholder-slate-700"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purpose of Visit (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <FileText size={16} />
            </div>
            <input
              type="text"
              name="purpose"
              placeholder="e.g. Guest Meeting, Delivery, Maintenance"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full bg-[#0d121f] border border-[#1e293b] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 text-white pl-11 pr-4 py-3.5 rounded-xl text-sm transition outline-none placeholder-slate-655 font-medium"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 mt-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-900 hover:text-white font-bold rounded-xl transition duration-300 shadow-xl shadow-cyan-500/10 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none group cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2 text-white">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing Ticket...</span>
            </div>
          ) : (
            <>
              <span className="text-white text-xs tracking-wider uppercase font-extrabold">Request Entry Pass</span>
              <ChevronRight size={14} className="text-white transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}