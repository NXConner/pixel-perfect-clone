import { ScorchedCard } from '@/components/design-system';
import { User, Shield, Activity } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const LeftSidebar = () => {
  const subject = useStore((s) => s.subject);

  return (
    <aside className="h-full overflow-y-auto border-r border-border bg-card p-3 flex flex-col gap-3">
      {/* Subject Profile */}
      <ScorchedCard glow>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 border border-primary bg-primary/10 flex items-center justify-center"
               style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <User size={14} className="text-primary" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold text-foreground">
              {subject?.codename ?? 'SUBJECT_NULL'}
            </div>
            <div className="text-[9px] font-mono text-muted-foreground">
              RISK: {subject?.riskScore ?? '--'}%
            </div>
          </div>
        </div>
      </ScorchedCard>

      {/* Threat Categories */}
      <ScorchedCard>
        <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-2 flex items-center gap-1">
          <Shield size={10} /> THREAT CATEGORIES
        </div>
        <ThreatToggles />
      </ScorchedCard>

      {/* Baseline Metrics */}
      <ScorchedCard>
        <div className="text-[9px] font-mono text-muted-foreground tracking-widest mb-2 flex items-center gap-1">
          <Activity size={10} /> BASELINE METRICS
        </div>
        <div className="space-y-1.5 text-[10px] font-mono">
          <MetricRow label="AVG SCREEN TIME" value={subject ? `${subject.baselineMetrics.avgDailyScreenTime}m` : '--'} />
          <MetricRow label="PEAK HOUR" value={subject ? `${String(subject.baselineMetrics.peakActivityHour).padStart(2, '0')}:00` : '--'} />
          <MetricRow label="CIRCADIAN DEV" value={subject ? `${subject.baselineMetrics.circadianDeviation}%` : '--'} />
          <MetricRow label="SOCIAL FREQ" value={subject ? `${subject.baselineMetrics.socialMediaFrequency}/day` : '--'} />
        </div>
      </ScorchedCard>

      {/* Placeholder for context injection */}
      <ScorchedCard>
        <div className="text-[9px] font-mono text-muted-foreground tracking-widest">
          ◆ CONTEXT INJECTION
        </div>
        <div className="text-[10px] font-mono text-ash mt-1">
          Temporal anchors, entities, targets...
        </div>
      </ScorchedCard>
    </aside>
  );
};

const ThreatToggles = () => {
  const { activeThreatFilters, toggleThreatFilter } = useStore();
  const cats = [
    { cat: 'A' as const, label: 'CRITICAL', color: 'bg-threat-a' },
    { cat: 'B' as const, label: 'HIGH', color: 'bg-threat-b' },
    { cat: 'C' as const, label: 'ELEVATED', color: 'bg-threat-c' },
    { cat: 'D' as const, label: 'MODERATE', color: 'bg-threat-d' },
    { cat: 'E' as const, label: 'LOW', color: 'bg-threat-e' },
    { cat: 'F' as const, label: 'INFO', color: 'bg-threat-f' },
  ];

  return (
    <div className="grid grid-cols-2 gap-1">
      {cats.map(({ cat, label, color }) => (
        <button
          key={cat}
          onClick={() => toggleThreatFilter(cat)}
          className={`flex items-center gap-1.5 px-1.5 py-0.5 text-[9px] font-mono border transition-all ${
            activeThreatFilters.includes(cat)
              ? 'border-border text-foreground'
              : 'border-transparent text-muted-foreground opacity-40'
          }`}
        >
          <span className={`w-1.5 h-1.5 ${color} ${activeThreatFilters.includes(cat) ? '' : 'opacity-30'}`} />
          {cat}-{label}
        </button>
      ))}
    </div>
  );
};

const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);
