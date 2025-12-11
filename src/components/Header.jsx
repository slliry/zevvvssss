import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const menuItems = ['Решения', 'Модули', 'Преимущества', 'Отзывы', 'Контакты'];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#E8F2F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[4rem] max-w-[1440px] items-center justify-between px-6 py-0.5 lg:px-12">
        <Link to="/" className="flex items-center pl-2" aria-label="Zeus GRC на главную">
          <img
            src="/logozeus.svg"
            alt="Zeus GRC"
            className="h-16 w-auto sm:h-20 lg:h-22 lg:max-w-[260px] transition-[filter] duration-200 hover:drop-shadow-[0_6px_30px_rgba(0,102,255,0.35)]"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/#${item.toLowerCase()}`}
              className="text-[#1A1A1A] font-normal transition-colors hover:text-[#0066FF]"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link
          to="/request"
          className="hidden rounded-3xl bg-[#0066FF] px-6 py-3 font-normal text-white transition-colors hover:bg-[#0052CC] md:block"
        >
          Оставить заявку
        </Link>

        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/#${item.toLowerCase()}`}
                className="py-2 text-[#1A1A1A] transition-colors hover:text-[#0066FF]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/request"
              className="mt-2 rounded-3xl bg-[#0066FF] px-6 py-3 text-center text-white transition-colors hover:bg-[#0052CC]"
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
