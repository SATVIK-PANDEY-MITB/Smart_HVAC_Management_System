"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Cpu, User, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Brief processing delay for smooth UI feedback
    setTimeout(() => {
      const result = login(username, password);
      if (result.success) {
        router.replace("/dashboard");
      } else {
        setError(result.error || "An error occurred during login.");
        setIsSubmitting(false);
      }
    }, 300);
  };

  const handleDemoLogin = () => {
    setUsername("admin");
    setPassword("admin123");
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login("admin", "admin123");
      if (result.success) {
        router.replace("/dashboard");
      } else {
        setError(result.error || "An error occurred during login.");
        setIsSubmitting(false);
      }
    }, 300);
  };

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060b13] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Initializing HVAC AI-OS...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b13] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-2xl mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-wider text-slate-100 uppercase">
            Smart HVAC AI-OS
          </h1>
          <p className="text-xs text-cyan-400/90 font-medium tracking-wide mt-1">
            AI-Powered HVAC Energy & Maintenance Management
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-950/50 border border-red-500/40 rounded-xl flex items-center gap-3 text-red-300 text-xs animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username / Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Username or Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isSubmitting}
                className="w-full pl-10 pr-11 py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-slate-950 px-3 text-slate-500 font-semibold">
              Or Instant Access
            </span>
          </div>
        </div>

        {/* Demo Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-slate-300 font-medium text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:border-cyan-500/50 hover:text-cyan-300"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Demo Login (Admin)</span>
        </button>

        {/* Footer Hint */}
        <div className="mt-6 text-center text-[11px] text-slate-500">
          Demo Credentials: <span className="text-slate-400 font-mono">admin</span> / <span className="text-slate-400 font-mono">admin123</span>
        </div>
      </div>
    </div>
  );
}
