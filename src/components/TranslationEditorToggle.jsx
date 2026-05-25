import { useState } from 'react';
import { useTranslationEditor } from '../context/TranslationEditorContext';
import { Edit3, X, LogOut, Key } from 'lucide-react';

export default function TranslationEditorToggle() {
  const { isEditorMode, adminKey, enableEditorMode, disableEditorMode, logout, showLoginModal, closeLoginModal } = useTranslationEditor();
  const [keyInput, setKeyInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setLoginError('');
    setIsLoggingIn(true);
    const result = await enableEditorMode(keyInput.trim());
    setIsLoggingIn(false);
    if (result?.success) {
      setKeyInput('');
    } else {
      setLoginError(result?.error || 'Неверный ключ');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Выйти из режима редактирования?')) {
      logout();
    }
  };

  if (!isEditorMode && !showLoginModal) {
    return null; // Скрываем кнопку, вход только через секретный клик на логотип
  }

  if (showLoginModal && !isEditorMode) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-8">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex p-4 bg-[#004aad]/10 rounded-full mb-4">
              <Key className="w-8 h-8 text-[#004aad]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Режим редактирования</h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Секретный ключ
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                placeholder="Введите ключ..."
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-sm text-red-600 text-center">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full px-4 py-3 bg-[#004aad] text-white rounded-lg hover:bg-[#003580] transition-colors font-medium disabled:opacity-60"
            >
              {isLoggingIn ? 'Проверка...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9998] flex flex-col gap-2">
      <div className="bg-white rounded-full shadow-lg border border-purple-200 px-4 py-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-gray-700">Режим редактирования</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => disableEditorMode()}
          className={`flex-1 p-3 rounded-full shadow-lg transition-all hover:scale-110 ${
            isEditorMode
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
          title={isEditorMode ? 'Отключить режим' : 'Включить режим'}
        >
          <Edit3 className="w-5 h-5" />
        </button>

        <button
          onClick={handleLogout}
          className="p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110"
          title="Выйти"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
