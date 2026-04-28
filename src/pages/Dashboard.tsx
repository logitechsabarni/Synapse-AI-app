/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Database, 
  Cpu, 
  Globe, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { MiniLineChart, SimulationChart, StrategyComparisonChart, RiskPieChart } from '../components/Charts';
import { useAnalysis } from '../context/AnalysisContext';

const stats = [
  { label: 'Analyses Run', value: '1,284', change: '+12%', icon: Activity, data: [20, 30, 25, 40, 35, 50, 45] },
  { label: 'Agent Uptime', value: '99.98%', change: '+0.01%', icon: Globe, data: [99, 99.5, 99.8, 99.9, 99.98, 99.97, 99.98] },
  { label: 'Tokens Processed', value: '14.2M', change: '+54%', icon: Database, data: [10, 15, 12, 18, 22, 28, 32] },
  { label: 'Decision Power', value: '8.4 PFLOPS', change: '+5%', icon: Cpu, data: [5, 6, 5.5, 7, 7.5, 8, 8.4] },
];

export default function Dashboard() {
  const { currentAnalysis } = useAnalysis();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold mb-2">Systems Overview</h1>
        <p className="text-slate-400">Real-time metrics from the Synapse neural network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors group cursor-default"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-slate-700/50 text-blue-400 group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-green-400 px-2 py-1 rounded-full bg-green-400/10">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold mb-4">{stat.value}</h3>
            <MiniLineChart data={stat.data} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-blue-500" />
              Intelligence Trends
            </h2>
            <button className="text-sm text-blue-400 hover:underline flex items-center gap-1">
              Live Feed <ArrowUpRight size={14} />
            </button>
          </div>
          {currentAnalysis ? (
            <div className="space-y-4">
               <p className="text-xs text-slate-500 uppercase tracking-widest">Active Analysis Simulation Trend</p>
               <SimulationChart data={currentAnalysis.simulations} />
            </div>
          ) : (
            <div className="h-[240px] flex items-end gap-3 px-4">
              {[45, 60, 55, 70, 85, 95, 80, 90, 100, 110, 95, 105].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg transition-all duration-1000" 
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Activity className="text-purple-500" />
            Decision Distribution
          </h2>
          {currentAnalysis ? (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <StrategyComparisonChart data={currentAnalysis.strategies} />
              <p className="text-xs text-slate-500 text-center uppercase mt-4">Comparative Strategy Efficiency</p>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-[240px] text-slate-500 border border-dashed border-slate-700/50 rounded-2xl">
               <TrendingUp size={48} className="mb-4 opacity-20" />
               <p className="text-sm">No active data stream to display</p>
             </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 flex flex-col items-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Risk Profile Matrix</h3>
            {currentAnalysis ? (
              <RiskPieChart riskLevel={currentAnalysis.riskLevel} />
            ) : (
              <div className="w-full aspect-square relative flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-8 border-slate-700/30"></div>
                 <div className="w-2/3 h-2/3 rounded-full bg-slate-800/50 animate-pulse"></div>
                 <span className="text-xs text-slate-600 absolute">STANDBY</span>
              </div>
            )}
            <p className="text-[10px] text-slate-500 mt-8 text-center uppercase">Real-time risk volatility weighting based on active neural compute</p>
        </div>

        <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-blue-500" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Q1 Strategy Analysis', type: 'Complete', time: '12m ago' },
              { label: 'Simulation Batch #42', type: 'Failed', time: '4h ago', error: true },
              { label: 'Risk Assessment: Project X', type: 'Running', time: 'Now' },
              { label: 'Cloud Agent Synced', type: 'Success', time: '2d ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-700/30 transition-colors">
                <div className={`w-2 h-2 rounded-full ${activity.error ? 'bg-red-500' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.label}</p>
                  <p className="text-xs text-slate-500">{activity.type} • {activity.time}</p>
                </div>
                {activity.error && <AlertTriangle size={14} className="text-red-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
