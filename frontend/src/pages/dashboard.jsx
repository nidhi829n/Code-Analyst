import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import {
  FaBook,
  FaBolt,
  FaShieldAlt,
  FaTools,
  FaPlay,
  FaCode,
  FaMagic
} from "react-icons/fa";

import Editor from "react-simple-code-editor";
import prism from "prismjs";
import OverallScore from "../components/review/OverallScore";
import MetricCard from "../components/review/MetricCard";
import SummaryCard from "../components/review/SummaryCard";
import StrengthCard from "../components/review/StrengthCard";
import WeaknessCard from "../components/review/WeaknessCard";
import ImprovedCodeCard from "../components/review/ImprovedCodeCard";
import FollowUpChat from "../components/review/FollowUpChat";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";

import { API_URL } from "../config/api";

function Dashboard() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);

      const response = await apiClient.post(
        `${API_URL}/api/v1/ai/get-review`,
        { code, language }
      );

      setReview(response.data.data.review);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Helper to map language to a file extension for the UI
  const getFileExtension = (lang) => {
    const exts = { javascript: "js", python: "py", java: "java", cpp: "cpp", c: "c" };
    return exts[lang] || "txt";
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-800/60">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-500 text-xl shadow-inner">
                <FaCode />
              </div>
              AI Code Workspace
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Analyze, refactor, and audit your codebase instantly using advanced AI models.
            </p>
          </div>

          {/* Unified Action Dock */}
          <div className="flex items-center gap-2 p-1.5 bg-[#121214] border border-zinc-800/80 rounded-2xl shadow-lg">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-zinc-300 pl-4 pr-8 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm font-medium transition-all cursor-pointer appearance-none hover:text-white"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7rem top 50%', backgroundSize: '0.65rem auto' }}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
            </select>

            <button
              onClick={reviewCode}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-xl transition-all text-sm shadow-md flex items-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="animate-spin text-blue-200">↻</span> Analyzing
                </>
              ) : (
                <>
                  <FaPlay className="text-[10px]" /> Review Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Workspace Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: IDE Editor */}
          <div className="xl:col-span-5 bg-[#0e0e11] border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl sticky top-6 flex flex-col">
            {/* Mac-style Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-zinc-800/80">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
              </div>
              <span className="text-xs font-medium text-zinc-500 font-mono tracking-wide">
                main.{getFileExtension(language)}
              </span>
              <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            {/* Editor Area */}
            <div className="p-4 bg-[#0e0e11] min-h-[480px]">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  prism.highlight(
                    code,
                    prism.languages[language] || prism.languages.javascript,
                    language
                  )
                }
                padding={8}
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: "450px",
                  color: "#e4e4e7",
                  outline: "none",
                }}
                className="focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column: AI Analysis Output */}
          <div className="xl:col-span-7 space-y-6">
            {!review && !loading && (
              <div className="h-full min-h-[480px] rounded-2xl border-2 border-dashed border-zinc-800/80 bg-gradient-to-b from-[#121214] to-[#09090b] flex flex-col items-center justify-center p-10 text-center shadow-sm">
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-700/50 rounded-2xl flex items-center justify-center text-blue-400 text-2xl shadow-xl relative z-10 transform rotate-3">
                    <FaMagic />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2 tracking-tight">Ready for Analysis</h3>
                <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                  Paste your snippet in the editor on the left and click <span className="text-zinc-300 font-medium">Review Code</span> to generate performance metrics, security checks, and refactored code.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[480px] rounded-2xl border border-zinc-800 bg-[#121214] flex flex-col items-center justify-center p-10 text-center shadow-xl space-y-5 animate-pulse">
                <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/30 text-blue-500 rounded-full flex items-center justify-center text-xl shadow-inner">
                  <FaBolt className="animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-zinc-200">AI is analyzing your code...</h3>
                  <p className="text-zinc-500 text-sm mt-2">Checking readability, syntax patterns, and security vectors.</p>
                </div>
              </div>
            )}

            {review && !loading && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Overall Score Badge Banner */}
                <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                  <OverallScore score={review.score.overall} />
                </div>

                {/* Metric Breakdown Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard title="Readability" score={review.score.readability} icon={<FaBook />} color="text-blue-400" />
                  <MetricCard title="Performance" score={review.score.performance} icon={<FaBolt />} color="text-yellow-400" />
                  <MetricCard title="Security" score={review.score.security} icon={<FaShieldAlt />} color="text-green-400" />
                  <MetricCard title="Maintainability" score={review.score.maintainability} icon={<FaTools />} color="text-purple-400" />
                </div>

                <SummaryCard summary={review.summary} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StrengthCard strengths={review.strengths} />
                  <WeaknessCard weaknesses={review.weaknesses} />
                </div>

                <ImprovedCodeCard code={review.improvedCode} language={language} />

                <FollowUpChat code={code} language={language} review={review} />
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;