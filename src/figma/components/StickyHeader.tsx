import codewordLogo from 'figma:asset/8aa4453b37447b473b5ab4bb23f9f7ca1aa1cfea.png';

interface StickyHeaderProps {
  hideBorder?: boolean;
}

export function StickyHeader({ hideBorder = false }: StickyHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-50 shadow-sm ${hideBorder ? '' : 'border-b border-gray-700'}`}
      style={{ backgroundColor: '#642975' }}
    >
      {/* Header content */}
      <div className="flex items-center justify-center px-4 py-5">
        {/* Centered Codeword logo */}
        <img src={codewordLogo} alt="Codeword" className="h-6 object-contain" />
      </div>
    </div>
  );
}
