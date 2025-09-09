interface BackArrowProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function BackArrow({ size = 24, className = 'text-black', onClick }: BackArrowProps) {
  return (
    <button onClick={onClick} className="p-2 -ml-2">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// Standardized header component with consistent back arrow positioning
interface StandardHeaderProps {
  onBack: () => void;
  className?: string;
}

export function StandardHeader({ onBack, className = '' }: StandardHeaderProps) {
  return (
    <div
      className={`relative z-10 flex items-center justify-start p-6 pt-12 shrink-0 ${className}`}
    >
      <BackArrow onClick={onBack} />
    </div>
  );
}
