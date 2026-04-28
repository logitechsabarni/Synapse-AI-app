/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Trash2, 
  ExternalLink, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('synapse_history') || '[]');
    setHistory(data);
  }, []);

  const deleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('synapse_history', JSON.stringify(updated));
  };

  const filteredHistory = history.filter(item => 
    item.problem.toLowerCase().includes(search.toLowerCase()) ||
    item.finalDecision.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HistoryIcon className="text-blue-500" />
            Intelligence History
          </h1>
          <p className="text-slate-400 mt-2">Access and review all previous strategic assessments.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-slate-800/20 border border-dashed border-slate-700 rounded-3xl text-slate-500">
          <HistoryIcon size={48} className="mb-4 opacity-20" />
          <h2 className="text-lg font-bold">No results found</h2>
          <p>Try a different keyword or run a new analysis.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredHistory.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/reports')}
                className="group p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 hover:border-blue-500/50 transition-all cursor-pointer flex items-center gap-6"
              >
                <div className={`p-4 rounded-xl flex items-center justify-center ${
                  item.riskLevel === 'Low' ? 'bg-green-500/10 text-green-400' :
                  item.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {item.riskLevel === 'Low' ? <TrendingDown size={24} /> : 
                   item.riskLevel === 'Medium' ? <Minus size={24} /> : <TrendingUp size={24} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">ID: {item.id}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg truncate group-hover:text-blue-400 transition-colors">
                    {item.problem}
                  </h3>
                  <p className="text-sm text-slate-500 truncate mt-1">
                    {item.finalDecision}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-500 uppercase tracking-tighter">Confidence</p>
                    <p className="text-xl font-bold font-mono text-white">{item.confidenceScore}%</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => deleteEntry(item.id, e)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
