import { Navigate, Link } from "react-router-dom";
import { FaCode, FaShieldAlt, FaBolt, FaArrowRight, FaCheckCircle } from "react-icons/fa";

function Landing() {
  const token = localStorage.getItem("token");

  // Redirect to dashboard if already logged in
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 flex flex-col items-center text-center relative z-10">
        
        {/* Top Product Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121214] border border-zinc-800 text-xs font-medium text-zinc-300 mb-8 shadow-inner animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Powered by Advanced AI Code Engines
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-[1.1]">
          AI Powered <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
            Code Reviews & Audits
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Review your code instantly using AI. Detect bugs, optimize performance, follow best practices, and ship production-ready software faster than ever.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/signup"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            Get Started Free <FaArrowRight className="text-xs" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto bg-[#121214] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all text-sm cursor-pointer"
          >
            Sign In
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full text-left">
          
          <div className="bg-[#121214] border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-lg mb-4">
              <FaBolt />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Instant Analysis</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Get immediate feedback on your codebase metrics, including readability, speed, and maintainability.
            </p>
          </div>

          <div className="bg-[#121214] border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-lg mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Security & Vulnerabilities</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Proactively spot security flaws, unsafe logic patterns, and bad practices before deploying to production.
            </p>
          </div>

          <div className="bg-[#121214] border border-zinc-800/80 p-6 rounded-2xl shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center text-lg mb-4">
              <FaCode />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Refactored Solutions</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Receive cleaner, optimized code snippets generated automatically to fix identified code weaknesses.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Landing;