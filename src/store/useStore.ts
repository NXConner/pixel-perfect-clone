import { create } from 'zustand';
import type {
  OperatingMode, ViewTab, ForensicEvent, SubjectProfile,
  AnalysisResults, ContextInjection, CLIHistoryEntry, ThreatCategory
} from '@/types';

interface AppState {
  // Operating mode
  mode: OperatingMode;
  setMode: (mode: OperatingMode) => void;
  toggleMode: () => void;

  // Active view
  activeView: ViewTab;
  setActiveView: (view: ViewTab) => void;

  // Events
  events: ForensicEvent[];
  setEvents: (events: ForensicEvent[]) => void;
  toggleEventMark: (id: string) => void;
  markedEvents: string[];

  // Subject
  subject: SubjectProfile | null;
  setSubject: (subject: SubjectProfile) => void;

  // Analysis
  analysis: AnalysisResults | null;
  setAnalysis: (analysis: AnalysisResults) => void;

  // Context
  context: ContextInjection;
  setContext: (context: ContextInjection) => void;

  // CLI
  cliHistory: CLIHistoryEntry[];
  addCLIEntry: (entry: CLIHistoryEntry) => void;
  clearCLI: () => void;

  // Feed
  feedPaused: boolean;
  toggleFeedPause: () => void;
  feedFilter: string;
  setFeedFilter: (filter: string) => void;
  activeThreatFilters: ThreatCategory[];
  toggleThreatFilter: (cat: ThreatCategory) => void;

  // UI state
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  mode: 'ISAC',
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((s) => ({ mode: s.mode === 'ISAC' ? 'ANNA' : 'ISAC' })),

  activeView: 'radar',
  setActiveView: (activeView) => set({ activeView }),

  events: [],
  setEvents: (events) => set({ events }),
  toggleEventMark: (id) => set((s) => ({
    markedEvents: s.markedEvents.includes(id)
      ? s.markedEvents.filter((e) => e !== id)
      : [...s.markedEvents, id],
  })),
  markedEvents: [],

  subject: null,
  setSubject: (subject) => set({ subject }),

  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),

  context: {
    temporalAnchors: [],
    knownEntities: [],
    externalTargets: [],
    relationalBaseline: [],
  },
  setContext: (context) => set({ context }),

  cliHistory: [],
  addCLIEntry: (entry) => set((s) => ({ cliHistory: [...s.cliHistory, entry] })),
  clearCLI: () => set({ cliHistory: [] }),

  feedPaused: false,
  toggleFeedPause: () => set((s) => ({ feedPaused: !s.feedPaused })),
  feedFilter: '',
  setFeedFilter: (feedFilter) => set({ feedFilter }),
  activeThreatFilters: ['A', 'B', 'C', 'D', 'E', 'F'],
  toggleThreatFilter: (cat) => set((s) => ({
    activeThreatFilters: s.activeThreatFilters.includes(cat)
      ? s.activeThreatFilters.filter((c) => c !== cat)
      : [...s.activeThreatFilters, cat],
  })),

  leftSidebarOpen: true,
  rightSidebarOpen: true,
  toggleLeftSidebar: () => set((s) => ({ leftSidebarOpen: !s.leftSidebarOpen })),
  toggleRightSidebar: () => set((s) => ({ rightSidebarOpen: !s.rightSidebarOpen })),
}));
