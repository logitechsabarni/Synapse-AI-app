/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, Briefcase, MessageSquare, FileText, History, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/workspace', icon: Briefcase, label: 'Workspace' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/reports', icon: FileText, label: 'Reports' },
  { path: '/history', icon: History, label: 'History' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
          <Zap className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Synapse AI
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500" />
            <div className="text-xs">
              <p className="text-white font-medium">Enterprise Plan</p>
              <p className="text-slate-500">Premium Access</p>
            </div>
          </div>
          <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors">
            Manage Subscription
          </button>
        </div>
      </div>
    </aside>
  );
}
