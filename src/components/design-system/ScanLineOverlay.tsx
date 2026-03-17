export const ScanLineOverlay = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          hsl(var(--scan-line) / 0.03) 2px,
          hsl(var(--scan-line) / 0.03) 4px
        )`,
      }}
    />
  );
};
