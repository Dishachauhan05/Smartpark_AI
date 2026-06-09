import VehicleForm from "@/components/VehicleForm";
import { Car, ShieldCheck, Ticket, HelpCircle, ArrowRightLeft } from "lucide-react";

export const metadata = {
  title: "Gate Registration Kiosk - SmartPark AI",
  description: "Self-service check-in kiosk for visitors and guests entering the facility.",
};

export default function EntryPage() {
  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col md:flex-row relative overflow-hidden">
      <div className="w-full md:w-[38%] bg-[#0b0f19] border-b md:border-b-0 md:border-r border-[#1e293b] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293705_1px,transparent_1px),linear-gradient(to_bottom,#1f293705_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl text-white shadow-xl shadow-cyan-500/20">
              <Car size={22} />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SmartPark <span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] text-cyan-400/80 font-bold tracking-widest uppercase block -mt-1 font-mono">
                Security Node
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 my-10 md:my-0 space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
              Facility Check-In
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Verify your security pass to auto-trigger physical gate arm opening.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex gap-3.5 items-start">
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Input Identity</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Provide driver name and contact number.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">License Plate</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Key in license plate characters exactly.</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Claim Access Pass</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Save digital ticket; barrier opens automatically.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-2 border-t border-[#1e293b]/70 pt-6">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-500" />
              Gate 01 Check-in Node
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
              Online
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center bg-[#070b13] relative overflow-y-auto min-h-screen md:min-h-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visitor Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Welcome! Please fill out the registration form below to obtain parking clearance.
            </p>
          </div>

          <div className="bg-[#0e1422]/60 border border-[#1e293b] rounded-[2rem] p-6 sm:p-8 shadow-2xl">
            <VehicleForm />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 text-center">
            <HelpCircle size={14} />
            <span>Need assistance? Press physical call button on gate kiosk panel.</span>
          </div>
        </div>
      </div>
    </div>
  );
}