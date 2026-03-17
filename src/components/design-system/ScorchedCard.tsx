import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ScorchedCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  noPadding?: boolean;
}

export const ScorchedCard = ({ children, className, glow = false, noPadding = false }: ScorchedCardProps) => {
  return (
    <div
      className={cn(
        'corner-marks relative border border-border bg-card transition-all duration-300',
        glow && 'hover:shadow-[0_0_20px_hsl(var(--ember)/0.15)]',
        !noPadding && 'p-3',
        className
      )}
    >
      {children}
    </div>
  );
};
