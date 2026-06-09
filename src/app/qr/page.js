"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { QRCodeCanvas } from "qrcode.react";
import {
  QrCode,
  Download,
  Printer,
  Smartphone,
  CheckCircle,
  Car
} from "lucide-react";

export default function QRPage() {
  const [qrValue, setQrValue] = useState("http://localhost:3000/entry");
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setQrValue(`${window.location.origin}/entry`);
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168.")
      ) {
        setIsLocalhost(true);
      }
    }
  }, []);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "smartpark-registration-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const printQR = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in duration-300 print:bg-white print:text-black">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b]/70 pb-6 print:hidden">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <QrCode className="text-cyan-400" size={32} />
              <span>Gate Entry QR Pass</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Print or download the registration board to display at your parking check-in gates
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadQR}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-[#232d45] transition cursor-pointer"
            >
              <Download size={14} />
              <span>Download PNG</span>
            </button>
            <button
              onClick={printQR}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl transition shadow-lg shadow-cyan-500/10 cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Poster</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-[#0d121f] border-2 border-dashed border-[#232d45] rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden print:border-solid print:border-black print:p-10 print:bg-white print:text-black print:shadow-none">
              <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-cyan-400/40 print:hidden"></div>
              <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 print:hidden"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-cyan-400/40 print:hidden"></div>
              <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 print:hidden"></div>

              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-cyan-500 text-slate-900 rounded-xl print:bg-black print:text-white">
                  <Car size={20} />
                </div>
                <span className="font-extrabold text-lg tracking-tight print:text-black">
                  SmartPark <span className="text-cyan-400 print:text-black font-extrabold">AI</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-white print:text-black tracking-tight mb-2">
                Visitor Registration
              </h2>
              <p className="text-xs text-slate-400 print:text-black mb-8 max-w-xs">
                Scan this QR code to register your vehicle details before entering the parking facility.
              </p>

              <div className="p-4 bg-white rounded-2xl shadow-xl shadow-cyan-500/5 border border-cyan-500/10 flex items-center justify-center print:border-none print:shadow-none">
                <QRCodeCanvas
                  id="qr-canvas"
                  value={qrValue}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="mt-8 font-mono text-[10px] text-slate-500 print:text-black">
                URL: <span className="text-cyan-400 font-bold underline print:text-black print:no-underline">{qrValue}</span>
              </div>
              {isLocalhost && (
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl text-[11px] leading-relaxed max-w-sm text-left print:hidden">
                  <span className="font-bold block mb-1">💡 Mobile Testing Notice</span>
                  You are viewing this console via a local host. Mobile cameras scanning this QR code will not resolve localhost. To test check-ins on your phone:
                  <ol className="list-decimal pl-4 mt-1.5 space-y-1 font-medium text-slate-300">
                    <li>Connect both phone and computer to the same Wi-Fi network.</li>
                    <li>Access the console on your computer via local IP (e.g. <code className="bg-slate-950 px-1 py-0.5 rounded text-cyan-400 font-mono">http://192.168.x.x:3000/qr</code>).</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 print:hidden">
            <h3 className="text-lg font-bold text-white">How it works</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-[#0d121f]/60 border border-[#1e293b]">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl h-fit">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">1. Driver Scans Pass</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Drivers scan this QR code with their mobile device camera at the gate barrier.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-[#0d121f]/60 border border-[#1e293b]">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl h-fit">
                  <QrCode size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">2. Form Check-in</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    They fill in their name, phone number, vehicle type, and plate number in the browser kiosk.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-[#0d121f]/60 border border-[#1e293b]">
                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl h-fit">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">3. Ticket Pass Issued</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    On submission, a digital check-in confirmation is generated, notifying the security desk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}