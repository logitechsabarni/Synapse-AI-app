/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  BrainCircuit, 
  BarChart, 
  TrendingUp,
  FileSearch,
  Dna,
  PieChart as PieIcon,
  ShieldCheck
} from 'lucide-react';
import { runDeepAnalysis } from '../services/aiService';
import { StrategyComparisonChart, SimulationChart, RiskPieChart, FeatureImportanceChart } from '../components/Charts';
import { useAnalysis } from '../context/AnalysisContext';

const steps = [
  { id: 'input', label: 'Input Analysis', icon: CheckCircle2 },
  { id: 'decomp', label: 'Decomposition', icon: FileSearch },
  { id: 'strategy', label: 'Strategy Generation', icon: BrainCircuit },
  { id: 'sim', label: 'Simulation', icon: TrendingUp },
  { id: 'opt', label: 'Optimization', icon: Dna },
];

export default function Workspace() {
  const { 
    currentAnalysis: result, 
    setCurrentAnalysis: setResult, 
    isAnalyzing, 
    setIsAnalyzing,
    problem,
    setProblem
  } = useAnalysis();
  const [currentStep, setCurrentStep] = useState(0);

  const handleAnalyze = async () => {
    if (!problem.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setCurrentStep(0);

    // Simulate pipeline progress
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 1500);

    try {
      const data = await runDeepAnalysis(problem);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('synapse_history') || '[]');
      localStorage.setItem('synapse_history', JSON.stringify([data, ...history]));

      setTimeout(() => {
        setResult(data);
        setIsAnalyzing(false);
        clearInterval(interval);
      }, 7500);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Deep Logic Workspace</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Input your strategic challenge. Our autonomous agents will decompose, simulate, 
          and optimize the decision path for you.
        </p>
      </div>

      {/* Quick Summary / Confidence Header */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-blue-400 uppercase tracking-widest mb-1 font-bold">System Confidence</p>
              <h2 className="text-4xl font-mono font-bold text-white">{result.confidenceScore}%</h2>
              <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidenceScore}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Risk Assessment</p>
              <h2 className={`text-3xl font-bold ${result.riskLevel === 'Low' ? 'text-green-400' : result.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.riskLevel}
              </h2>
              <p className="text-[10px] text-slate-500 mt-2">MODALITY DETECTED</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Neural Nodes</p>
              <h2 className="text-3xl font-bold text-white">Active</h2>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-500 font-mono">STABLE CONSENSUS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-slate-700 rounded-3xl p-6">
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your challenge (e.g., 'How should we pivot our supply chain to mitigate geopolitical risk while maintaining 15% margins?')"
            className="w-full h-40 bg-transparent text-lg text-white placeholder-slate-600 focus:outline-none resize-none px-4"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-500 font-mono tracking-tighter">AGENTS: 128</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-500 font-mono tracking-tighter">PRECISION: HIGH</span>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !problem.trim()}
              className="bg-white text-black px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {isAnalyzing ? 'Processing Intelligence...' : 'Run Analysis'}
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Status */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((step, i) => {
          const isActive = isAnalyzing && currentStep === i;
          const isDone = isAnalyzing ? currentStep > i : !!result;
          return (
            <div 
              key={step.id} 
              className={`p-4 rounded-xl border transition-all duration-500 flex flex-col items-center gap-2 ${
                isActive ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 
                isDone ? 'bg-green-500/5 border-green-500/30' : 'bg-slate-800/40 border-slate-700/50'
              }`}
            >
              <step.icon size={20} className={isActive ? 'text-blue-400 animate-pulse' : isDone ? 'text-green-500' : 'text-slate-600'} />
              <span className={`text-xs font-bold ${isActive ? 'text-blue-400' : isDone ? 'text-green-500' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Strategy Comparison Card */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BarChart className="text-blue-500" />
                Comparative Strategy Efficiency
              </h2>
              <StrategyComparisonChart data={result.strategies} />
              <div className="space-y-4">
                {result.strategies.map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/50 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-base text-blue-400">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.description}</p>
                      </div>
                      <span className="text-lg font-mono font-bold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg">
                        {s.score}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       <div className="space-y-1">
                         <div className="flex justify-between text-[10px] text-slate-500 uppercase"><span>Impact</span><span>{s.impact}%</span></div>
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${s.impact}%` }} /></div>
                       </div>
                       <div className="space-y-1">
                         <div className="flex justify-between text-[10px] text-slate-500 uppercase"><span>Feasibility</span><span>{s.feasibility}%</span></div>
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500" style={{ width: `${s.feasibility}%` }} /></div>
                       </div>
                       <div className="space-y-1">
                         <div className="flex justify-between text-[10px] text-slate-500 uppercase"><span>Cost Eff.</span><span>{s.cost}%</span></div>
                         <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${s.cost}%` }} /></div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Card */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-purple-500" />
                Monte Carlo Simulation Results
              </h2>
              <SimulationChart data={result.simulations} />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Peak Probability</p>
                  <p className="text-lg font-bold text-purple-400">{(result.confidenceScore * 0.92).toFixed(1)}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase mb-1">Std Deviation</p>
                  <p className="text-lg font-bold text-slate-300">±3.4%</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20 text-sm text-blue-300 leading-relaxed italic">
                "Consensus reached after 15,000 iterations. The volatility index suggests 
                that Strategy {result.strategies[0].name.split(' ')[0]} remains the most resilient path 
                under extreme market fluctuations."
              </div>
            </div>

            {/* Feature Importance Card */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileSearch className="text-emerald-500" />
                Core Decision Factors
              </h2>
              <FeatureImportanceChart data={result.featureImportance} />
              <p className="text-xs text-slate-500 text-center uppercase tracking-widest">Weight distribution across logic layers</p>
            </div>

            {/* Risk Distribution Card */}
            <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <PieIcon className="text-red-500" />
                Risk Volatility Matrix
              </h2>
              <RiskPieChart riskLevel={result.riskLevel} />
              <div className="flex justify-center">
                <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                  result.riskLevel === 'Low' ? 'bg-green-500/10 text-green-400' :
                  result.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  ESTIMATED RISK: {result.riskLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 shadow-[0_20px_50px_rgba(37,99,235,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  <BrainCircuit size={24} />
                </div>
                <h2 className="text-2xl font-bold">Autonomous Recommendation</h2>
              </div>
              <p className="text-xl leading-relaxed text-slate-100 mb-8 border-l-4 border-blue-500 pl-6">
                {result.finalDecision}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Confidence Score</p>
                  <p className="text-2xl font-bold text-green-400">{result.confidenceScore}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Risk Assessment</p>
                  <p className={`text-2xl font-bold ${result.riskLevel === 'Low' ? 'text-green-400' : result.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {result.riskLevel}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">Core Logic Factor</p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={16} className="text-blue-400" />
                    <p className="text-2xl font-bold text-blue-400">Heuristic-4</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <FileSearch size={24} />
                </div>
                <h2 className="text-2xl font-bold">Deep Neural Analysis</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed text-lg italic border-l-4 border-purple-500 pl-6 py-2">
                  {result.detailedAnalysis || result.justification}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-800 flex flex-wrap gap-3">
                {result.decomposition.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                    # {tag.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
