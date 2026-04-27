import { useTranslation } from 'react-i18next';
import { useTranslationEditor } from '../context/TranslationEditorContext';

export default function EditableTranslation({ translationKey, children, className = '' }) {
  const { t } = useTranslation();

  // Всегда добавляем data-translation-key для глобального обработчика
  return (
    <span
      data-translation-key={translationKey}
      className={className}
    >
      {children}
    </span>
  );
}
