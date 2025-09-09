interface SimpleArrowRightProps {
  size?: number;
  color?: string;
  className?: string;
}

export function SimpleArrowRight({
  size = 24,
  color = 'currentColor',
  className = '',
}: SimpleArrowRightProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
