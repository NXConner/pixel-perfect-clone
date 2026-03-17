import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface MagmaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
}

export const MagmaButton = ({ children, variant = 'primary', size = 'md', className, ...props }: MagmaButtonProps) => {
  return (
    <button
      className={cn(
        'font-mono uppercase tracking-wider transition-all duration-200',
        'border clip-path-angled relative overflow-hidden',
        'hover:shadow-[0_0_12px_hsl(var(--ember)/0.3)]',
        'active:scale-[0.98]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' ? 'px-3 py-1 text-[10px]' : 'px-4 py-1.5 text-xs',
        variant === 'primary' && 'border-primary bg-primary/10 text-primary hover:bg-primary/20',
        variant === 'secondary' && 'border-border bg-secondary text-secondary-foreground hover:bg-secondary/80',
        variant === 'danger' && 'border-destructive bg-destructive/10 text-destructive hover:bg-destructive/20',
        className
      )}
      style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
      {...props}
    >
      {children}
    </button>
  );
};
