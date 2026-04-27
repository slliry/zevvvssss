import { useTranslationEditor as useEditorContext } from '../context/TranslationEditorContext';
import InlineTranslationEditor from './InlineTranslationEditor';
import GlobalTranslationPanel from './GlobalTranslationPanel';

export default function TranslationEditor() {
  const { selectedElement, setSelectedElement, adminKey, isEditorMode, logout } = useEditorContext();

  const handleClose = () => {
    setSelectedElement(null);
  };

  // Показываем глобальную панель когда режим редактирования активен
  if (isEditorMode && !selectedElement) {
    return (
      <GlobalTranslationPanel
        adminKey={adminKey}
        onClose={() => {}}
        onLogout={logout}
        selectedKey={null}
      />
    );
  }

  // Когда кликнули на элемент - показываем его в глобальной панели
  if (selectedElement) {
    return (
      <GlobalTranslationPanel
        adminKey={adminKey}
        onClose={() => {}}
        onLogout={logout}
        selectedKey={selectedElement.key}
      />
    );
  }

  return null;
}
