"use client";
import React from "react";
import { useHVAC } from "../context/HVACContext";
import {
  Activity,
  Cpu,
  Thermometer,
  Gauge,
  ShieldAlert,
  Wrench,
  Zap,
  Clock,
  Play,
  CheckCircle2,
  AlertOctagon,
  FileText,
  Users,
  Settings2,
  RefreshCw,
  ChevronRight
} from "lucide-react";

// Header Component
export const DashboardHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const { isMonitoringActive, startMonitoring } = useHVAC();
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800/80 pb-6 gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cyan-950/50 border border-cyan-500/30 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={startMonitoring}
          disabled={isMonitoringActive}
          className={`relative group px-6 py-3 rounded-xl font-bold flex items-center gap-2 overflow-hidden transition-all duration-300 ${isMonitoringActive
            ? "bg-slate-800/80 text-slate-400 cursor-not-allowed border border-slate-700/50"
            : "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-98"
            }`}
        >
          {isMonitoringActive ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-slate-400" />
              <span>Monitoring Active</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Start AI Monitoring</span>
            </>
          )}
          {!isMonitoringActive && (
            <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          )}
        </button>
      </div>
    </header>
  );
};

// Status Banner Component
export const StatusBanner: React.FC = () => {
  const { status } = useHVAC();
  return (
    <div
      className={`glass-panel rounded-2xl p-5 flex items-center justify-between transition-all duration-500 shadow-xl overflow-hidden relative group ${status === "Healthy"
        ? "glass-panel-green pulse-green bg-green-950/20"
        : status === "Not Monitoring"
          ? "pulse-gray bg-slate-900/40"
          : "glass-panel-red pulse-red bg-red-950/20"
        }`}
    >
      <div className="flex items-center gap-4 z-10">
        <div className={`p-3 rounded-xl ${status === "Healthy"
          ? "bg-green-500/10 text-green-400 border border-green-500/20"
          : status === "Not Monitoring"
            ? "bg-slate-500/10 text-slate-400 border border-slate-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}>
          {status === "Healthy" ? (
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
          ) : status === "Not Monitoring" ? (
            <Settings2 className="w-6 h-6 animate-spin" />
          ) : (
            <AlertOctagon className="w-6 h-6 animate-bounce" />
          )}
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Current System Status
          </span>
          <h2 className={`text-xl font-bold tracking-tight mt-0.5 ${status === "Healthy"
            ? "text-green-400"
            : status === "Not Monitoring"
              ? "text-slate-300"
              : "text-red-400"
            }`}>
            {status === "Healthy"
              ? "HVAC System Operating Normally"
              : status === "Not Monitoring"
                ? "Waiting to Start Monitoring"
                : "Fault Detected - Immediate Maintenance Required"}
          </h2>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 z-10 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800">
        <span>Simulation Mode</span>
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
      </div>
    </div>
  );
};

// Metric Cards Component
export const MetricCards: React.FC = () => {
  const { status, energy, confidence, timestamp, ticket } = useHVAC();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* HVAC Status */}
      <div className="glass-panel hover:-translate-y-1 hover:border-slate-700/80 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Activity className="w-16 h-16 text-slate-400" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              HVAC Status
            </span>
            <span className={`p-1.5 rounded-lg ${status === "Healthy"
              ? "bg-green-500/10 text-green-400"
              : status === "Not Monitoring"
                ? "bg-slate-500/10 text-slate-400"
                : "bg-red-500/10 text-red-400"
              }`}>
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <h3 className={`text-2xl font-black mt-4 tracking-tight ${status === "Healthy"
            ? "text-green-400"
            : status === "Not Monitoring"
              ? "text-slate-400"
              : "text-red-400"
            }`}>
            {status}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 font-medium mt-4">
          Real-time classification
        </p>
      </div>

      {/* Predicted Energy */}
      <div className="glass-panel hover:-translate-y-1 hover:border-cyan-500/50 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap className="w-16 h-16 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Predicted Energy
            </span>
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black mt-4 tracking-tight text-cyan-400 glow-text-cyan">
            {energy}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 font-medium mt-4">
          AI Forecasted energy usage
        </p>
      </div>

      {/* AI Confidence */}
      <div className="glass-panel hover:-translate-y-1 hover:border-amber-500/50 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Gauge className="w-16 h-16 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              AI Confidence
            </span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Gauge className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black mt-4 tracking-tight text-amber-400">
            {confidence}
          </h3>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-800/80 rounded-full h-1">
            <div
              className="bg-amber-400 h-1 rounded-full transition-all duration-500"
              style={{ width: confidence.includes("%") ? confidence : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Last Sensor Update */}
      <div className="glass-panel hover:-translate-y-1 hover:border-slate-700/80 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Clock className="w-16 h-16 text-slate-400" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Last Update
            </span>
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-base font-bold mt-4 tracking-tight text-slate-200 line-clamp-1">
            {timestamp}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 font-medium mt-4">
          Real-time update timestamp
        </p>
      </div>

      {/* Maintenance Status */}
      <div className="glass-panel hover:-translate-y-1 hover:border-slate-700/80 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wrench className="w-16 h-16 text-slate-400" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Maintenance
            </span>
            <span className={`p-1.5 rounded-lg ${status === "Healthy"
              ? "bg-emerald-500/10 text-emerald-400"
              : status === "Not Monitoring"
                ? "bg-slate-500/10 text-slate-400"
                : "bg-red-500/10 text-red-400"
              }`}>
              <Wrench className="w-4 h-4" />
            </span>
          </div>
          <h3 className={`text-base font-bold mt-4 tracking-tight line-clamp-1 ${status === "Healthy" ? "text-emerald-400" : status === "Not Monitoring" ? "text-slate-400" : "text-red-400 animate-pulse"
            }`}>
            {ticket}
          </h3>
        </div>
        <p className="text-[10px] text-slate-500 font-medium mt-4">
          AI Ticket Trigger status
        </p>
      </div>
    </div>
  );
};

// Live Sensor Panel
export const LiveSensorPanel: React.FC = () => {
  const { sensorData, isMonitoringActive } = useHVAC();

  const formatValue = (value: number | string | undefined) => {
    if (value === undefined || value === null) return "--";
    return Number(value).toFixed(2);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border-slate-800 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-200">
              Live Sensor Instrumentation
            </h2>
          </div>
          {isMonitoringActive && (
            <span className="flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 px-2 py-0.5 rounded-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              STREAMING
            </span>
          )}
        </div>

        {sensorData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Compressor Power */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Compressor Power</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    {formatValue(sensorData.RTU_COMP_WATT)}
                    <span className="text-xs text-slate-500 font-bold ml-1">W</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Outdoor Temp */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Outdoor Temp</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    {formatValue(sensorData.RTU_OA_TEMP)}
                    <span className="text-xs text-slate-500 font-bold ml-1">°C</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Supply Air Temp */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Supply Air Temp</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    {formatValue(sensorData.RTU_SA_TEMP)}
                    <span className="text-xs text-slate-500 font-bold ml-1">°C</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Condenser Pressure */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Condenser Pressure</span>
                  <span className="text-lg font-black text-slate-200 mt-0.5 block">
                    {formatValue(sensorData.RTU_REFG_COND_PRES !== undefined && sensorData.RTU_REFG_COND_PRES !== null ? Number(sensorData.RTU_REFG_COND_PRES) / 1000000 : undefined)}
                    <span className="text-xs text-slate-500 font-bold ml-1">MPa</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Total Power */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between hover:border-slate-700/50 transition-all sm:col-span-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 font-medium block">Total Power Consumption</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-emerald-400">
                      {formatValue(sensorData.RTU_TOT_WATT)}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">W</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <Settings2 className="w-12 h-12 text-slate-600 mb-3 animate-spin" />
            <p className="text-sm text-slate-400 font-medium">
              No Live Stream Data Available
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Click "Start AI Monitoring" to activate IoT sensors.
            </p>
          </div>
        )}
      </div>
      <div className="border-t border-slate-800/80 pt-4 mt-6 text-xs text-slate-500 flex items-center justify-between">
        <span>Sensor frequency: 0.5 Hz</span>
        <span>Node ID: RTU-PANTHER-01</span>
      </div>
    </div>
  );
};

// Predictive Maintenance Ticket Component
export const MaintenanceTicket: React.FC = () => {
  const { status, ticket } = useHVAC();
  return (
    <div className="glass-panel rounded-3xl p-6 border-slate-800 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
      <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-5 h-5 ${status === "Healthy" || status === "Not Monitoring" ? "text-slate-400" : "text-red-400 animate-bounce"}`} />
            <h2 className="text-lg font-bold text-slate-200">
              AI Diagnostic Ticket
            </h2>
          </div>
          {status !== "Healthy" && status !== "Not Monitoring" && (
            <span className="text-[10px] font-bold text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded-md animate-pulse">
              HIGH PRIORITY
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Ticket ID
            </span>
            <span className="text-sm font-bold text-slate-200">HVAC-001</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-500" /> Status
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status === "Healthy"
              ? "bg-slate-800 text-slate-400 border border-slate-700/60"
              : status === "Not Monitoring"
                ? "bg-slate-900 text-slate-500 border border-slate-800/80"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}>
              {status === "Healthy" ? "CLOSED" : status === "Not Monitoring" ? "--" : "OPEN"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-500" /> Priority
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status === "Healthy"
              ? "bg-slate-800 text-slate-400 border border-slate-700/60"
              : status === "Not Monitoring"
                ? "bg-slate-900 text-slate-500 border border-slate-800/80"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}>
              {status === "Healthy" ? "LOW" : status === "Not Monitoring" ? "--" : "HIGH"}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" /> Assigned Team
            </span>
            <span className="text-sm font-semibold text-slate-300">HVAC Service Team</span>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Recommendation
            </span>
            <div className={`p-3.5 rounded-xl border text-sm font-medium ${status === "Healthy"
              ? "bg-emerald-950/10 border-emerald-900/30 text-emerald-400/90"
              : status === "Not Monitoring"
                ? "bg-slate-900/40 border-slate-800/80 text-slate-400"
                : "bg-red-950/20 border-red-900/40 text-red-400/90"
              }`}>
              {status === "Healthy"
                ? "System running optimally. No action required."
                : status === "Not Monitoring"
                  ? "Awaiting system startup to run predictive analysis."
                  : "Inspect HVAC Unit Compressor and Refrigerant loop immediately."}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800/80 pt-4 mt-6 text-xs text-slate-500 flex items-center justify-between">
        <span>Automatic dispatch enabled</span>
        <ChevronRight className="w-4 h-4 text-slate-600" />
      </div>
    </div>
  );
};
