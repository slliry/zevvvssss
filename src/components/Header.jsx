import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import EditableTranslation from './EditableTranslation';
import { useTranslationEditor } from '../context/TranslationEditorContext';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'kk', label: 'KK' },
  { code: 'uz', label: 'UZ' },
  { code: 'ky', label: 'KY' },
  { code: 'tr', label: 'TR' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showSecretLogin, setShowSecretLogin] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const { openLoginModal } = useTranslationEditor();

  const menuItems = [
    { label: t('header.menu.solutions'), id: 'solutions' },
    { label: t('header.menu.consulting'), href: '/request' },
    { label: t('header.menu.modules'), id: 'modules' },
    { label: t('header.menu.benefits'), id: 'benefits' },
    { label: t('header.menu.testimonials'), id: 'testimonials' },
    { label: t('header.menu.contacts'), id: 'contacts' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Определяем направление скролла
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Скролл вниз - уменьшаем хедер
        setScrollDirection('down');
        setScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        // Скролл вверх - увеличиваем хедер
        setScrollDirection('up');
        setScrolled(currentScrollY > 50);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangMenuOpen && !event.target.closest('.language-switcher')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangMenuOpen]);

  // Сброс счетчика кликов через 3 секунды
  useEffect(() => {
    if (logoClickCount > 0 && logoClickCount < 5) {
      const timer = setTimeout(() => {
        setLogoClickCount(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [logoClickCount]);

  const handleLogoClick = (e) => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount === 5) {
      e.preventDefault(); // Блокируем переход только при 5-м клике
      setLogoClickCount(0);
      // Открываем модальное окно входа
      if (openLoginModal) {
        openLoginModal();
      }
    }
    // Иначе разрешаем обычный переход на главную
  };

  return (
    <header className={`sticky z-50 mx-3 lg:mx-6 transition-all duration-300 ${scrollDirection === 'down' && scrolled ? 'top-2' : 'top-3'}`}>
      <div className={`relative flex max-w-[1280px] mx-auto items-center justify-between rounded-full border border-white/30 bg-white/50 backdrop-blur-xl shadow-[0_4px_24px_0_rgba(0,0,0,0.04)] transition-all duration-300 ${scrollDirection === 'down' && scrolled ? 'min-h-[2.5rem] px-3 py-1 lg:px-5' : 'min-h-[3rem] px-4 py-1.5 lg:px-6'}`}>
        <Link to="/" className="flex items-center" aria-label="Zeus GRC на главную" onClick={handleLogoClick}>
          <img
            src="/Curve.svg"
            alt="Zeus GRC"
            className={`w-auto transition-all duration-300 ${scrollDirection === 'down' && scrolled ? 'h-5 sm:h-6 lg:h-7 lg:max-w-[128px]' : 'h-7 sm:h-9 lg:h-11 lg:max-w-[164px]'} hover:drop-shadow-[0_6px_30px_rgba(0,102,255,0.35)]`}
          />
        </Link>

        <nav className={`hidden items-center md:flex transition-all duration-300 ${scrollDirection === 'down' && scrolled ? 'gap-4' : 'gap-6'}`}>
          {menuItems.map((item) => (
            <Link
              key={item.id || item.href}
              to={item.href || `/#${item.id}`}
              className={`${item.href === '/request' ? 'text-[#004aad] font-bold' : 'text-[#1A1A1A] font-normal'} transition-all duration-300 hover:text-[#004aad] ${scrollDirection === 'down' && scrolled ? 'text-xs' : 'text-sm'}`}
            >
              <EditableTranslation translationKey={`header.menu.${item.id || 'consulting'}`}>
                {item.label}
              </EditableTranslation>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher - Desktop */}
          <div className="relative language-switcher">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className={`flex items-center gap-1 bg-transparent text-[#666] transition-all duration-300 hover:text-[#004aad] ${scrollDirection === 'down' && scrolled ? 'text-xs' : 'text-sm'}`}
              aria-label="Change language"
              style={{ background: 'none', border: 'none' }}
            >
              <Globe className={scrollDirection === 'down' && scrolled ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
              <span className="font-normal">{currentLanguage.toUpperCase()}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full mt-1 rounded-lg border border-white/30 bg-white/90 backdrop-blur-xl shadow-md overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-xs transition-colors bg-transparent ${currentLanguage === lang.code
                      ? 'text-[#004aad] font-medium'
                      : 'text-[#666] hover:text-[#004aad]'
                      }`}
                    style={{ background: 'none', border: 'none' }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/request"
            className={`rounded-full bg-[#004aad] font-normal text-white transition-all hover:bg-[#003580] hover:shadow-lg ${scrollDirection === 'down' && scrolled ? 'px-4 py-1.5 text-xs' : 'px-5 py-2 text-sm'}`}
          >
            <EditableTranslation translationKey="header.cta">
              {t('header.cta')}
            </EditableTranslation>
          </Link>
        </div>

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

      {/* Mobile Menu with Animation */}
      <div
        className={`absolute left-3 right-3 top-full mt-2 overflow-y-auto rounded-2xl border border-white/20 bg-white/70 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out md:hidden ${isMenuOpen
          ? 'max-h-[32rem] opacity-100'
          : 'max-h-0 opacity-0 border-transparent'
          }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.id || item.href}
              to={item.href || `/#${item.id}`}
              className="py-2 text-[#1A1A1A] transition-colors hover:text-[#004aad]"
              onClick={() => setIsMenuOpen(false)}
            >
              <EditableTranslation translationKey={`header.menu.${item.id || 'consulting'}`}>
                {item.label}
              </EditableTranslation>
            </Link>
          ))}

          {/* Language Switcher - Mobile */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Globe className="h-3.5 w-3.5 text-[#666]" />
              <span className="text-xs text-[#666]">Язык:</span>
            </div>
            <div className="flex gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${currentLanguage === lang.code
                    ? 'bg-[#004aad] text-white'
                    : 'bg-transparent text-[#666] hover:text-[#004aad] border border-[#666]/20'
                    }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/request"
            className="mt-4 rounded-full bg-[#004aad] px-6 py-3 text-center text-white transition-all hover:bg-[#003580] hover:shadow-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <EditableTranslation translationKey="header.cta">
              {t('header.cta')}
            </EditableTranslation>
          </Link>
        </nav>
      </div>
    </header>
  );
}
