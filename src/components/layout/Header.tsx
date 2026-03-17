import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import { GlitchText, MagmaButton } from '@/components/design-system';
import {
  Shield, Radio, Maximize, Minimize, PanelLeftOpen, PanelLeftClose,
  PanelRightOpen, PanelRightClose
} from 'lucide-react';

export const Header = () => {
  const {
    mode, toggleMode, events,
    leftSidebarOpen, rightSidebarOpen,
    toggleLeftSidebar, toggleRightSidebar
  } = useStore();
  const [clock, setClock] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) + ' EST');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-3 z-50 relative">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button onClick={toggleLeftSidebar} className="text-muted-foreground hover:text-foreground transition-colors">
          {leftSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
        </button>
        <div className="flex items-center gap-2">
          <Shield size={18} className="text-primary" />
          <GlitchText text="PANOPTICON" className="text-sm text-foreground" />
          <span className="text-[9px] font-mono text-muted-foreground tracking-widest">V94.0</span>
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <Radio size={10} className="text-primary animate-pulse" />
            <span>{events.length} EVENTS</span>
          </span>
          <span className="text-border">│</span>
          <span>{clock}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <MagmaButton
          size="sm"
          variant={mode === 'ISAC' ? 'primary' : 'secondary'}
          onClick={toggleMode}
        >
          {mode === 'ISAC' ? '◆ I.S.A.C.' : '◇ A.N.N.A.'}
        </MagmaButton>
        <button onClick={toggleFullscreen} className="text-muted-foreground hover:text-foreground transition-colors">
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </button>
        <button onClick={toggleRightSidebar} className="text-muted-foreground hover:text-foreground transition-colors">
          {rightSidebarOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
        </button>
      </div>
    </header>
  );
};
