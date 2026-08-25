"use client";
import { DashboardHeader, StatusBanner, MetricCards, LiveSensorPanel, MaintenanceTicket } from "../components/HVACDashboardComponents";

export default function DashboardPage() {
  return (
    <main className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-8">
      <DashboardHeader
        title="Smart HVAC Energy & Maintenance Ticketing System"
        subtitle="AI-Powered Predictive Maintenance & Building Management"
      />

      <div className="flex-1 flex flex-col gap-6 w-full">
        <StatusBanner />
        <MetricCards />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LiveSensorPanel />
          </div>
          <MaintenanceTicket />
        </section>
      </div>

      <footer className="border-t border-slate-900/60 pt-6 mt-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© 2026 Smart HVAC Energy & Maintenance Ticketing System</p>
          <div className="flex items-center gap-1.5">
            <span>Powered by</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">FastAPI</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">Next.js</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">Scikit-Learn</span>
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">TailwindCSS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
