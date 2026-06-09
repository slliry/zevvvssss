import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback, memo } from 'react';

function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = useCallback(() => {
    // Скрываем стрелку если прокрутили больше 100px
    const shouldShow = window.scrollY <= 100;
    setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div 
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className={isVisible ? 'animate-bounce' : ''}>
        {/* Две стрелки вертикально, растянутые горизонтально */}
        <div className="flex flex-col items-center" style={{ transform: 'scaleX(2)' }}>
          <ChevronDown size={40} className="text-[#004aad] opacity-60 -mb-6" strokeWidth={2.5} />
          <ChevronDown size={40} className="text-[#004aad] opacity-60" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

export default memo(ScrollIndicator);
