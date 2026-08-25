"use client";
import {
  Cpu,
  Code2,
  Database,
  BrainCircuit,
  Server,
  Globe,
  BookOpen,
  User,
  Link,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-slate-100 p-4 sm:p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
      <header className="flex items-center gap-4 border-b border-slate-800/80 pb-6">
        <div className="p-3 bg-cyan-950/50 border border-cyan-500/30 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <BookOpen className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
            About This Project
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            Smart HVAC Energy & Maintenance Ticketing System
          </p>
        </div>
      </header>

      <div className="flex-1 flex flex-col gap-6 w-full">
        {/* Project Description */}
        <section className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-200">Project Overview</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              The <strong className="text-cyan-400">Smart HVAC Energy & Maintenance Ticketing System</strong> is an AI-powered enterprise dashboard for real-time monitoring, predictive maintenance, and energy forecasting of commercial HVAC systems.
            </p>
            <p>
              The system uses machine learning models to predict energy consumption and detect faults in HVAC equipment. When a fault is detected, the system automatically generates a maintenance ticket and dispatches it to the assigned service team.
            </p>
            <p>
              It simulates a real-world IoT scenario where sensor data is streamed from Rooftop Units (RTUs) and analyzed by AI models to provide actionable insights for building managers and maintenance teams.
            </p>
          </div>
        </section>

        {/* Technologies & AI Models */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technologies Used */}
          <div className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-slate-200">Technologies Used</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Frontend", value: "Next.js 16, React 19, TailwindCSS 4", icon: Globe, color: "cyan" },
                { label: "Backend", value: "FastAPI, Python 3.x, Uvicorn", icon: Server, color: "emerald" },
                { label: "ML Framework", value: "Scikit-Learn, Pandas, NumPy", icon: BrainCircuit, color: "amber" },
                { label: "Icons", value: "Lucide React", icon: Code2, color: "indigo" },
                { label: "HTTP Client", value: "Axios", icon: Link, color: "teal" },
              ].map((tech) => (
                <div key={tech.label} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 flex items-center gap-3 hover:border-slate-700/50 transition-all">
                  <div className={`p-2 rounded-lg bg-${tech.color}-500/10 text-${tech.color}-400`}>
                    <tech.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">{tech.label}</span>
                    <span className="text-sm font-bold text-slate-200">{tech.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Models */}
          <div className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-slate-200">AI Models</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="text-xs font-bold text-cyan-400 uppercase">Energy Prediction</span>
                </div>
                <p className="text-sm text-slate-300 font-semibold">RandomForest Regressor</p>
                <p className="text-xs text-slate-500 mt-1">Predicts energy consumption (kWh) based on building features, weather data, and temporal patterns.</p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase">Fault Detection</span>
                </div>
                <p className="text-sm text-slate-300 font-semibold">RandomForest Classifier</p>
                <p className="text-xs text-slate-500 mt-1">Classifies HVAC system status as Healthy or Faulty using RTU sensor readings (power, temperature, pressure).</p>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6 mt-8">
              <Database className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-bold text-slate-200">Datasets Used</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <p className="text-sm text-slate-300 font-semibold">ASHRAE Great Energy Predictor III</p>
                <p className="text-xs text-slate-500 mt-1">Building energy consumption data with weather features from Kaggle competition.</p>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/50 transition-all">
                <p className="text-sm text-slate-300 font-semibold">HVAC Fault Detection Dataset</p>
                <p className="text-xs text-slate-500 mt-1">Rooftop Unit (RTU) sensor readings for fault classification training.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Info */}
        <section className="glass-panel rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4 mb-6">
            <User className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-200">Developer</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl">
              <User className="w-10 h-10 text-slate-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-200">Smart HVAC Project Team</h3>
              <p className="text-sm text-slate-400">Academic Capstone Project — AI & IoT in Building Management</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md text-xs font-medium">
                  Machine Learning
                </span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md text-xs font-medium">
                  Full-Stack
                </span>
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md text-xs font-medium">
                  IoT Systems
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-900/60 pt-6 mt-4">
        <div className="w-full flex items-center justify-between text-xs text-slate-500 font-medium">
          <p>© 2026 Smart HVAC Energy & Maintenance Ticketing System</p>
          <p>About Module</p>
        </div>
      </footer>
    </main>
  );
}
