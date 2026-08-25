"use client";
import { DashboardHeader, StatusBanner, LiveSensorPanel } from "../components/HVACDashboardComponents";

export default function LiveMonitoringPage() {
  return (
    <main className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      <DashboardHeader
        title="Live Monitoring"
        subtitle="Real-time IoT Sensor Instrumentation & Status"
      />

      <div className="flex-1 flex flex-col gap-6 w-full">
        <StatusBanner />
        <LiveSensorPanel />
      </div>

      <footer className="border-t border-slate-900/60 pt-6 mt-4">
        <div className="w-full flex items-center justify-between text-xs text-slate-500 font-medium">
          <p>© 2026 Smart HVAC Energy & Maintenance Ticketing System</p>
          <p>Live Monitoring Module</p>
        </div>
      </footer>
    </main>
  );
}
