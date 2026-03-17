import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useStore } from '@/store/useStore';

export const CLITerminal = () => {
  const { cliHistory, addCLIEntry, clearCLI, mode, toggleMode, events } = useStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [cliHistory]);

  const executeCommand = (cmd: string) => {
    const ts = new Date().toISOString();
    addCLIEntry({ timestamp: ts, command: cmd, output: '', type: 'input' });

    const parts = cmd.trim().toLowerCase().split(' ');
    const command = parts[0];

    switch (command) {
      case 'help':
        addCLIEntry({ timestamp: ts, command: '', type: 'output',
          output: 'Available: help, status, mode, clear, mark <id>, execute, events, version' });
        break;
      case 'status':
        addCLIEntry({ timestamp: ts, command: '', type: 'output',
          output: `MODE: ${mode} | EVENTS: ${events.length} | FEED: ACTIVE | INTEGRITY: VALID` });
        break;
      case 'mode':
        toggleMode();
        addCLIEntry({ timestamp: ts, command: '', type: 'system',
          output: `Operating mode switched to ${mode === 'ISAC' ? 'A.N.N.A.' : 'I.S.A.C.'}` });
        break;
      case 'clear':
        clearCLI();
        break;
      case 'version':
        addCLIEntry({ timestamp: ts, command: '', type: 'output',
          output: 'PANOPTICON × ANIMUS × BSAT V94.0 | Build 2024.03.17' });
        break;
      case 'events':
        addCLIEntry({ timestamp: ts, command: '', type: 'output',
          output: `Total events: ${events.length} | Cat-A: ${events.filter(e => e.category === 'A').length} | Cat-B: ${events.filter(e => e.category === 'B').length}` });
        break;
      default:
        addCLIEntry({ timestamp: ts, command: '', type: 'error',
          output: `Unknown command: "${cmd}". Type "help" for available commands.` });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div
      className="h-full border-t border-border bg-card flex flex-col font-mono text-[11px] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="px-3 py-1 border-b border-border flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground tracking-widest">◆ TERMINAL</span>
        <span className="text-[9px] text-terminal">● CONNECTED</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5">
        {cliHistory.map((entry, i) => (
          <div key={i} className={
            entry.type === 'input' ? 'text-terminal' :
            entry.type === 'error' ? 'text-destructive' :
            entry.type === 'system' ? 'text-primary' :
            'text-foreground'
          }>
            {entry.type === 'input' ? `> ${entry.command}` : entry.output}
          </div>
        ))}
      </div>
      <div className="px-3 py-1.5 flex items-center gap-1 border-t border-border">
        <span className="text-terminal">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal outline-none placeholder:text-ash"
          placeholder="type 'help' for commands..."
          spellCheck={false}
        />
        <span className="text-terminal" style={{ animation: 'blink 1s infinite' }}>█</span>
      </div>
    </div>
  );
};
