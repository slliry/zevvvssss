import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const menuItems = ['Решения', 'Модули', 'Преимущества', 'Отзывы', 'Контакты'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky z-50 mx-3 lg:mx-6 transition-all duration-300 ${scrolled ? 'top-2' : 'top-3'}`}>
      <div className={`relative flex max-w-[1100px] mx-auto items-center justify-between rounded-full border border-white/30 bg-white/50 backdrop-blur-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] transition-all duration-300 ${scrolled ? 'min-h-[2.5rem] px-3 py-1 lg:px-5' : 'min-h-[3rem] px-4 py-1.5 lg:px-6'}`}>
        <Link to="/" className="flex items-center" aria-label="Zeus GRC на главную">
          <img
            src="/logozeus.svg"
            alt="Zeus GRC"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-8 sm:h-9 lg:h-10 lg:max-w-[160px]' : 'h-10 sm:h-12 lg:h-14 lg:max-w-[200px]'} hover:drop-shadow-[0_6px_30px_rgba(0,102,255,0.35)]`}
          />
        </Link>

        <nav className={`hidden items-center md:flex transition-all duration-300 ${scrolled ? 'gap-4' : 'gap-6'}`}>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className={`text-[#1A1A1A] font-normal transition-all duration-300 hover:text-[#004aad] ${scrolled ? 'text-xs' : 'text-sm'}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link
          to="/request"
          className={`hidden rounded-full bg-[#004aad] font-normal text-white transition-all hover:bg-[#003580] hover:shadow-lg md:block ${scrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'}`}
        >
          Оставить заявку
        </Link>

        <button
          className="bg-transparent p-2 text-[#1A1A1A] transition-colors hover:text-[#004aad] md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          style={{ background: 'none', border: 'none' }}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mt-2 rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                className="py-2 text-[#1A1A1A] transition-colors hover:text-[#004aad]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/request"
              className="mt-2 rounded-full bg-[#004aad] px-6 py-3 text-center text-white transition-all hover:bg-[#003580] hover:shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
