import { createContext, useContext, useState, useEffect } from 'react';

const TranslationEditorContext = createContext();

export function TranslationEditorProvider({ children }) {
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('translation_admin_key');
    const savedMode = localStorage.getItem('translation_editor_mode') === 'true';
    
    if (savedKey) {
      setAdminKey(savedKey);
    }
    if (savedMode && savedKey) {
      setIsEditorMode(true);
    }
  }, []);

  const enableEditorMode = (key) => {
    setAdminKey(key);
    setIsEditorMode(true);
    setShowLoginModal(false);
    localStorage.setItem('translation_admin_key', key);
    localStorage.setItem('translation_editor_mode', 'true');
  };

  const disableEditorMode = () => {
    setIsEditorMode(false);
    setSelectedElement(null);
    localStorage.setItem('translation_editor_mode', 'false');
  };

  const logout = () => {
    setIsEditorMode(false);
    setAdminKey('');
    setSelectedElement(null);
    setShowLoginModal(false);
    localStorage.removeItem('translation_admin_key');
    localStorage.removeItem('translation_editor_mode');
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <TranslationEditorContext.Provider
      value={{
        isEditorMode,
        adminKey,
        selectedElement,
        setSelectedElement,
        enableEditorMode,
        disableEditorMode,
        logout,
        showLoginModal,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </TranslationEditorContext.Provider>
  );
}

export function useTranslationEditor() {
  const context = useContext(TranslationEditorContext);
  if (!context) {
    throw new Error('useTranslationEditor must be used within TranslationEditorProvider');
  }
  return context;
}
