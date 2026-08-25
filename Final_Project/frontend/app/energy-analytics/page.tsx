"use client";
import { useHVAC } from "../context/HVACContext";
import { DashboardHeader } from "../components/HVACDashboardComponents";
import {
  Zap,
  TrendingUp,
  Building2,
  Thermometer,
  Wind,
  Droplets,
  Gauge,
  Calendar,
  Globe
} from "lucide-react";

export default function EnergyAnalyticsPage() {
  const { energy, status, confidence, sensorData } = useHVAC();

  return (
    <main className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      <DashboardHeader
        title="Energy Analytics"
        subtitle="AI-Powered Energy Consumption Prediction & Building Profile"
      />

      <div className="flex-1 flex flex-col gap-6 w-full">
        {/* Top Energy Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Energy Prediction Card */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:border-cyan-500/50">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-20 h-20 text-cyan-400" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Predicted Energy Consumption
            </span>
            <h3 className="text-3xl font-black mt-3 tracking-tight text-cyan-400 glow-text-cyan">
              {energy}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-3">
              Forecasted by RandomForest Regressor model
            </p>
          </div>

          {/* System Status Card */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-20 h-20 text-emerald-400" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              System Health
            </span>
            <h3 className={`text-3xl font-black mt-3 tracking-tight ${
              status === "Healthy" ? "text-emerald-400" : status === "Not Monitoring" ? "text-slate-400" : "text-red-400"
            }`}>
              {status}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-3">
              Fault detection confidence: {confidence}
            </p>
          </div>

          {/* Total Power Card */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Gauge className="w-20 h-20 text-amber-400" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Live Total Power
            </span>
            <h3 className="text-3xl font-black mt-3 tracking-tight text-amber-400">
              {sensorData ? `${Number(sensorData.RTU_TOT_WATT).toFixed(2)} W` : "--"}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-3">
              Real-time RTU total wattage reading
            </p>
          </div>
        </section>

        {/* Building Profile */}
        <section className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-slate-200">
                Building Energy Profile
              </h2>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-md">
              PANTHER OFFICE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Building Area</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    4,200 <span className="text-xs text-slate-500 font-bold">sqm</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Air Temperature</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    31 <span className="text-xs text-slate-500 font-bold">°C</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Dew Temperature</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    24 <span className="text-xs text-slate-500 font-bold">°C</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Wind Speed</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    3.2 <span className="text-xs text-slate-500 font-bold">m/s</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Sea Level Pressure</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    1012 <span className="text-xs text-slate-500 font-bold">hPa</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Location</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    28.61°N, 77.21°E
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-6 text-xs text-slate-500 flex items-center justify-between">
            <span>Primary Usage: Office</span>
            <span>Timezone: Asia/Kolkata</span>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-900/60 pt-6 mt-4">
        <div className="w-full flex items-center justify-between text-xs text-slate-500 font-medium">
          <p>© 2026 Smart HVAC Energy & Maintenance Ticketing System</p>
          <p>Energy Analytics Module</p>
        </div>
      </footer>
    </main>
  );
}
