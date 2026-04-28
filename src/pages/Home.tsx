/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Cpu, Target, Layers, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  { icon: Layers, title: 'Multi-Agent Intelligence', desc: 'Swarms of AI agents working in parallel to solve complex logic.' },
  { icon: Cpu, title: 'Simulation Engine', desc: 'Predict outcomes across thousands of market scenarios instantly.' },
  { icon: Target, title: 'Decision Optimization', desc: 'Mathematical weighting for optimal resource allocation.' },
  { icon: Shield, title: 'Explainable AI', desc: 'Every decision comes with human-readable reasoning and logic.' },
  { icon: Zap, title: 'What-if Analysis', desc: 'Adjust variables and see downstream effects in real-time.' },
  { icon: BarChart3, title: 'Visual Intelligence', desc: 'Rich data visualizations for deep strategic insights.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 max-w-7xl mx-auto text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 fill-current" />
            <span>v3.0 Next-Gen Decision Engine</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
            Synapse AI <span className="text-blue-500 italic">⚡</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The world's first autonomous decision intelligence platform. 
            Break down complex problems, simulate outcomes, and make 
            unrivaled strategic moves with agents you can trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/workspace')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              Run Analysis <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/chat')}
              className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-2xl hover:bg-slate-700 transition-colors border border-slate-700"
            >
              Chat with AI
            </button>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
