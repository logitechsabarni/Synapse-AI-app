/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnalysisResult } from '../types';

interface AnalysisContextType {
  currentAnalysis: AnalysisResult | null;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
  problem: string;
  setProblem: (value: string) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(() => {
    const saved = localStorage.getItem('synapse_active_analysis');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [problem, setProblem] = useState(() => {
    return localStorage.getItem('synapse_active_problem') || '';
  });

  useEffect(() => {
    if (currentAnalysis) {
      localStorage.setItem('synapse_active_analysis', JSON.stringify(currentAnalysis));
    } else {
      localStorage.removeItem('synapse_active_analysis');
    }
  }, [currentAnalysis]);

  useEffect(() => {
    localStorage.setItem('synapse_active_problem', problem);
  }, [problem]);

  return (
    <AnalysisContext.Provider value={{ 
      currentAnalysis, 
      setCurrentAnalysis, 
      isAnalyzing, 
      setIsAnalyzing,
      problem,
      setProblem
    }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
