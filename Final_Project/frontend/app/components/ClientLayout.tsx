"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HVACProvider } from "../context/HVACContext";
import {
  LayoutDashboard,
  Activity,
  Zap,
  ShieldAlert,
  Info,
  Cpu
} from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Live Monitoring", path: "/live-monitoring", icon: Activity },
    { name: "Energy Analytics", path: "/energy-analytics", icon: Zap },
    { name: "Maintenance Tickets", path: "/maintenance", icon: ShieldAlert },
    { name: "About Project", path: "/about", icon: Info },
  ];

  return (
    <HVACProvider>
      <div className="flex min-h-screen bg-[#060b13] text-slate-100 font-sans">
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-950/70 border-r border-slate-900 backdrop-blur-xl flex flex-col justify-between shrink-0 sticky top-0 h-screen">
          <div>
            {/* Sidebar Logo Header */}
            <div className="p-6 border-b border-slate-900/60 flex items-center gap-3">
              <div className="p-2 bg-cyan-950/50 border border-cyan-500/30 rounded-xl">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold tracking-wider text-cyan-400 uppercase">
                  HVAC AI-OS
                </h2>
                <span className="text-[10px] text-slate-500 font-bold tracking-tight block -mt-0.5">
                  v1.2.0 Enterprise
                </span>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="p-4 space-y-1.5 mt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path || (item.path === "/dashboard" && pathname === "/");
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400 shadow-[inset_4px_0_12px_rgba(6,182,212,0.05)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                    }`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-slate-900/60">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-3 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">
                Node Status
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </HVACProvider>
  );
}
