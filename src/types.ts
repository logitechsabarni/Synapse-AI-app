/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AnalysisResult {
  id: string;
  timestamp: string;
  problem: string;
  decomposition: string[];
  strategies: Strategy[];
  simulations: SimulationResult[];
  finalDecision: string;
  confidenceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  justification: string;
  actionPlan: string[];
  featureImportance: FeatureImportance[];
  detailedAnalysis: string;
}

export interface Strategy {
  name: string;
  description: string;
  score: number;
  impact: number;
  feasibility: number;
  cost: number;
}

export interface SimulationResult {
  iteration: number;
  outcome: number;
  label: string;
}

export interface FeatureImportance {
  feature: string;
  value: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
