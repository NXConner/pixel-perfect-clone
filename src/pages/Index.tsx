import { useStore } from '@/store/useStore';
import { EmberBackground, ScanLineOverlay } from '@/components/design-system';
import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/LeftSidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { CenterStage } from '@/components/layout/CenterStage';
import { CLITerminal } from '@/components/layout/CLITerminal';
import { useEffect } from 'react';
import { sampleEvents, sampleSubject, sampleAnalysis } from '@/data/sampleData';

const Index = () => {
  const { mode, leftSidebarOpen, rightSidebarOpen, setEvents, setSubject, setAnalysis } = useStore();

  // Load sample data on mount
  useEffect(() => {
    setEvents(sampleEvents);
    setSubject(sampleSubject);
    setAnalysis(sampleAnalysis);
  }, [setEvents, setSubject, setAnalysis]);

  return (
    <div className={mode === 'ANNA' ? 'anna-mode' : ''}>
      <div className="h-screen w-screen flex flex-col overflow-hidden bg-background relative">
        <EmberBackground />
        <ScanLineOverlay />

        {/* Header */}
        <Header />

        {/* Main body */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Left sidebar */}
          {leftSidebarOpen && (
            <div className="w-72 flex-shrink-0">
              <LeftSidebar />
            </div>
          )}

          {/* Center stage */}
          <div className="flex-1 min-w-0">
            <CenterStage />
          </div>

          {/* Right sidebar */}
          {rightSidebarOpen && (
            <div className="w-80 flex-shrink-0">
              <RightSidebar />
            </div>
          )}
        </div>

        {/* CLI Terminal */}
        <div className="h-40 flex-shrink-0">
          <CLITerminal />
        </div>
      </div>
    </div>
  );
};

export default Index;
