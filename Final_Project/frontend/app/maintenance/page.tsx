"use client";
import { DashboardHeader, StatusBanner, MaintenanceTicket } from "../components/HVACDashboardComponents";
import { useHVAC } from "../context/HVACContext";
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Wrench
} from "lucide-react";

export default function MaintenancePage() {
  const { status, ticket } = useHVAC();

  return (
    <main className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      <DashboardHeader
        title="Maintenance Tickets"
        subtitle="AI-Powered Predictive Maintenance & Service Dispatch"
      />

      <div className="flex-1 flex flex-col gap-6 w-full">
        <StatusBanner />

        {/* Ticket Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Total Tickets</span>
            </div>
            <h3 className="text-3xl font-black text-slate-200">1</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2">Active ticket count</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${status !== "Healthy" && status !== "Not Monitoring" ? "bg-red-500/10 text-red-400" : "bg-slate-500/10 text-slate-400"}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Open</span>
            </div>
            <h3 className={`text-3xl font-black ${status !== "Healthy" && status !== "Not Monitoring" ? "text-red-400" : "text-slate-400"}`}>
              {status !== "Healthy" && status !== "Not Monitoring" ? "1" : "0"}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2">Requires attention</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${status === "Healthy" ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Closed</span>
            </div>
            <h3 className={`text-3xl font-black ${status === "Healthy" ? "text-emerald-400" : "text-slate-400"}`}>
              {status === "Healthy" ? "1" : "0"}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2">Resolved tickets</p>
          </div>

          <div className="glass-panel rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Assigned Team</span>
            </div>
            <h3 className="text-lg font-black text-slate-200">HVAC Service</h3>
            <p className="text-[10px] text-slate-500 font-medium mt-2">Primary response team</p>
          </div>
        </section>

        {/* Main Ticket Detail */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MaintenanceTicket />

          {/* Maintenance Guidelines */}
          <div className="glass-panel rounded-3xl p-6 border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
              <Wrench className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-slate-200">
                Maintenance Protocols
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-xs font-bold text-red-400 uppercase">High Priority</span>
                </div>
                <p className="text-sm text-slate-300">Inspect compressor, refrigerant loop, and condenser coils. Check for pressure anomalies and wattage spikes.</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase">Medium Priority</span>
                </div>
                <p className="text-sm text-slate-300">Scheduled filter replacement, belt tension check, and thermostat calibration within 48 hours.</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400 uppercase">Low Priority</span>
                </div>
                <p className="text-sm text-slate-300">Routine quarterly inspection. Verify sensor calibration, clean condenser fins, log performance data.</p>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-4 mt-6 text-xs text-slate-500 flex items-center justify-between">
              <span>SLA Response: 4 hours</span>
              <span>Dispatch: Automatic</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-900/60 pt-6 mt-4">
        <div className="w-full flex items-center justify-between text-xs text-slate-500 font-medium">
          <p>© 2026 Smart HVAC Energy & Maintenance Ticketing System</p>
          <p>Maintenance Tickets Module</p>
        </div>
      </footer>
    </main>
  );
}
