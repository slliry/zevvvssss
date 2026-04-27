import { useTranslationEditor } from '../context/TranslationEditorContext';

// Автоматическая обертка для всех переводов
// Перехватывает все t() вызовы и делает их редактируемыми
export default function AutoEditableTranslation({ translationKey, children }) {
  const { isEditorMode, setSelectedElement } = useTranslationEditor();

  const handleClick = (e) => {
    if (isEditorMode) {
      e.preventDefault();
      e.stopPropagation();
      
      setSelectedElement({
        key: translationKey,
        text: typeof children === 'string' ? children : String(children),
      });
    }
  };

  if (!isEditorMode) {
    return children;
  }

  return (
    <span
      onClick={handleClick}
      className="cursor-pointer hover:bg-yellow-100 hover:outline hover:outline-2 hover:outline-yellow-400 hover:outline-offset-2 transition-all rounded px-1 inline-block"
      title={`✏️ ${translationKey}`}
      style={{ position: 'relative' }}
    >
      {children}
    </span>
  );
}
