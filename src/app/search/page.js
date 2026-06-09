"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import SearchVehicle from "@/components/SearchVehicle";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const plate = searchParams.get("plate") || "";

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="border-b border-[#1e293b]/70 pb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Vehicle Lookup Center
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Query the centralized database logs for visitor records and exit times
        </p>
      </div>

      <SearchVehicle initialPlate={plate} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <AdminLayout>
      <Suspense fallback={
        <div className="glass-panel rounded-2xl p-12 text-center border border-[#1e293b] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Initializing search terminal...</p>
        </div>
      }>
        <SearchPageContent />
      </Suspense>
    </AdminLayout>
  );
}