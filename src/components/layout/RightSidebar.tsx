import { useStore } from '@/store/useStore';
import { ScorchedCard, TacticalBadge } from '@/components/design-system';
import { Search, Pause, Play } from 'lucide-react';

export const RightSidebar = () => {
  const { events, feedPaused, toggleFeedPause, feedFilter, setFeedFilter, activeThreatFilters } = useStore();

  const filteredEvents = events
    .filter((e) => activeThreatFilters.includes(e.category))
    .filter((e) =>
      !feedFilter || e.title.toLowerCase().includes(feedFilter.toLowerCase()) ||
      e.platform.toLowerCase().includes(feedFilter.toLowerCase())
    )
    .slice(0, 50);

  return (
    <aside className="h-full overflow-hidden border-l border-border bg-card flex flex-col">
      {/* Feed header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        <span className="text-[9px] font-mono text-muted-foreground tracking-widest">◆ EVENT FEED</span>
        <button onClick={toggleFeedPause} className="text-muted-foreground hover:text-foreground">
          {feedPaused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2 bg-secondary px-2 py-1">
          <Search size={10} className="text-muted-foreground" />
          <input
            type="text"
            value={feedFilter}
            onChange={(e) => setFeedFilter(e.target.value)}
            placeholder="Filter events..."
            className="bg-transparent text-[10px] font-mono text-foreground w-full outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Event list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filteredEvents.length === 0 ? (
          <div className="text-[10px] font-mono text-muted-foreground text-center py-8">
            {events.length === 0 ? 'AWAITING DATA INGESTION...' : 'NO MATCHING EVENTS'}
          </div>
        ) : (
          filteredEvents.map((event) => (
            <ScorchedCard key={event.id} className="p-2" glow>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <TacticalBadge category={event.category} label={`CAT-${event.category}`} />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase">{event.platform}</span>
                  </div>
                  <div className="text-[10px] font-mono text-foreground truncate">{event.title}</div>
                  <div className="text-[9px] font-mono text-muted-foreground mt-0.5">
                    {new Date(event.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                  </div>
                </div>
                {/* Intensity meter */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-1.5 h-10 bg-secondary relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-primary transition-all"
                      style={{ height: `${event.intensity}%` }}
                    />
                  </div>
                  <span className="text-[8px] font-mono text-muted-foreground">{event.intensity}</span>
                </div>
              </div>
            </ScorchedCard>
          ))
        )}
      </div>

      {/* Feed status */}
      <div className="p-2 border-t border-border text-[9px] font-mono text-muted-foreground text-center">
        {filteredEvents.length}/{events.length} EVENTS {feedPaused ? '⏸ PAUSED' : '● LIVE'}
      </div>
    </aside>
  );
};
