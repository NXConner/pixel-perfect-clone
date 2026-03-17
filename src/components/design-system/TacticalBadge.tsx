import { cn } from '@/lib/utils';
import type { ThreatCategory } from '@/types';

interface TacticalBadgeProps {
  category: ThreatCategory;
  label?: string;
  className?: string;
}

const categoryColors: Record<ThreatCategory, string> = {
  A: 'border-threat-a text-threat-a bg-threat-a/10',
  B: 'border-threat-b text-threat-b bg-threat-b/10',
  C: 'border-threat-c text-threat-c bg-threat-c/10',
  D: 'border-threat-d text-threat-d bg-threat-d/10',
  E: 'border-threat-e text-threat-e bg-threat-e/10',
  F: 'border-threat-f text-threat-f bg-threat-f/10',
};

const categoryLabels: Record<ThreatCategory, string> = {
  A: 'CRITICAL',
  B: 'HIGH',
  C: 'ELEVATED',
  D: 'MODERATE',
  E: 'LOW',
  F: 'INFO',
};

export const TacticalBadge = ({ category, label, className }: TacticalBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest border',
        categoryColors[category],
        className
      )}
    >
      {label ?? `CAT-${category} ${categoryLabels[category]}`}
    </span>
  );
};
