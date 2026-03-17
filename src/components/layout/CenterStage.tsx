import { useStore } from '@/store/useStore';
import { ScorchedCard, MagmaButton } from '@/components/design-system';
import type { ViewTab } from '@/types';
import { Radar, Clock, Map, Network, Box, Brain } from 'lucide-react';

const tabs: { id: ViewTab; label: string; icon: typeof Radar }[] = [
  { id: 'radar', label: 'RADAR', icon: Radar },
  { id: 'timeline', label: 'TIMELINE', icon: Clock },
  { id: 'map', label: 'MAP', icon: Map },
  { id: 'network', label: 'NETWORK', icon: Network },
  { id: 'echo', label: 'ECHO', icon: Box },
  { id: 'psych', label: 'PSYCH', icon: Brain },
];

export const CenterStage = () => {
  const { activeView, setActiveView } = useStore();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-card/50">
        {tabs.map(({ id, label, icon: Icon }) => (
          <MagmaButton
            key={id}
            size="sm"
            variant={activeView === id ? 'primary' : 'secondary'}
            onClick={() => setActiveView(id)}
          >
            <Icon size={10} className="inline mr-1" />
            {label}
          </MagmaButton>
        ))}
      </div>

      {/* View content */}
      <div className="flex-1 overflow-hidden p-3">
        <ScorchedCard className="h-full flex items-center justify-center" noPadding>
          <div className="text-center">
            <div className="text-[11px] font-mono text-muted-foreground tracking-widest mb-2">
              ◆ {activeView.toUpperCase()} VIEW
            </div>
            <div className="text-[10px] font-mono text-ash">
              Visualization loading...
            </div>
            <div className="mt-4 w-32 h-32 mx-auto relative">
              {/* Placeholder radar animation */}
              <div className="absolute inset-0 border border-border rounded-full" />
              <div className="absolute inset-4 border border-border rounded-full" />
              <div className="absolute inset-8 border border-border rounded-full" />
              <div
                className="absolute top-1/2 left-1/2 w-0.5 h-1/2 bg-primary origin-bottom"
                style={{
                  transform: 'translateX(-50%)',
                  animation: 'spin 4s linear infinite',
                  transformOrigin: 'bottom center',
                }}
              />
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.1) 30deg, transparent 60deg)`,
                  animation: 'spin 4s linear infinite',
                }}
              />
            </div>
          </div>
        </ScorchedCard>
      </div>
    </div>
  );
};
