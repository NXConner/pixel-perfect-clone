import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export const GlitchText = ({ text, className, as: Tag = 'span' }: GlitchTextProps) => {
  return (
    <Tag className={cn('relative inline-block font-mono font-bold', className)}>
      <span className="relative z-10">{text}</span>
      <span
        aria-hidden
        className="absolute inset-0 text-magma opacity-70"
        style={{ animation: 'glitch-1 3s infinite linear' }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-primary opacity-70"
        style={{ animation: 'glitch-2 3s infinite linear reverse' }}
      >
        {text}
      </span>
    </Tag>
  );
};
