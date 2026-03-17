export type OperatingMode = 'ISAC' | 'ANNA';

export type ThreatCategory = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ViewTab = 'radar' | 'timeline' | 'map' | 'network' | 'echo' | 'psych';

export type EventPlatform =
  | 'google' | 'safari' | 'chrome' | 'firefox'
  | 'instagram' | 'snapchat' | 'tiktok' | 'twitter' | 'facebook'
  | 'whatsapp' | 'telegram' | 'signal' | 'imessage'
  | 'gps' | 'wifi' | 'bluetooth' | 'cellular'
  | 'vault' | 'calculator_app' | 'notepad'
  | 'pornhub' | 'onlyfans' | 'reddit'
  | 'venmo' | 'cashapp' | 'zelle'
  | 'tinder' | 'bumble' | 'hinge'
  | 'unknown';

export interface ForensicEvent {
  id: string;
  timestamp: string;
  platform: EventPlatform;
  category: ThreatCategory;
  title: string;
  description: string;
  intensity: number; // 0-100
  coordinates?: { lat: number; lng: number };
  metadata?: Record<string, string>;
  flagged: boolean;
  marked: boolean;
}

export interface SubjectProfile {
  codename: string;
  realName?: string;
  avatarUrl?: string;
  age?: number;
  baselineMetrics: {
    avgDailyScreenTime: number; // minutes
    peakActivityHour: number; // 0-23
    primaryPlatforms: EventPlatform[];
    circadianDeviation: number; // percentage
    socialMediaFrequency: number; // posts per day
  };
  sourceDistribution: Record<EventPlatform, number>;
  riskScore: number; // 0-100
}

export interface GottmanScores {
  criticism: number;
  contempt: number;
  defensiveness: number;
  stonewalling: number;
  magicRatio: number; // positive:negative ratio (healthy > 5:1)
}

export interface AnalysisResults {
  gottman: GottmanScores;
  recidivismScore: number; // 0-100
  deceptionIndex: number; // 0-100
  sentimentTimeline: { date: string; score: number }[];
  socialPerformance: {
    public: number; // 0-100
    private: number; // 0-100
    delta: number;
  };
  targetFixation: {
    target: string;
    searchFrequency: number;
    contactAttempts: number;
    mentionCount: number;
  };
  ldaTopics: { topic: string; weight: number }[];
}

export interface ContextInjection {
  temporalAnchors: { label: string; date: string; description: string }[];
  knownEntities: { name: string; relationship: string; risk: ThreatCategory }[];
  externalTargets: { name: string; platform: EventPlatform; notes: string }[];
  relationalBaseline: { metric: string; value: string }[];
}

export interface CLIHistoryEntry {
  timestamp: string;
  command: string;
  output: string;
  type: 'input' | 'output' | 'error' | 'system';
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'subject' | 'contact' | 'target' | 'entity';
  classification: ThreatCategory;
  interactionCount: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight: number;
  platform: EventPlatform;
}
