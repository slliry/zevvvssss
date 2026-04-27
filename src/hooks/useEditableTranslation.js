import { useTranslation } from 'react-i18next';
import { useTranslationEditor } from '../context/TranslationEditorContext';
import { createElement } from 'react';
import AutoEditableTranslation from '../components/AutoEditableTranslation';

// Хук который автоматически делает все переводы редактируемыми
export function useEditableTranslation() {
  const { t: originalT, ...rest } = useTranslation();
  const { isEditorMode } = useTranslationEditor();

  // Обертка для t() которая возвращает редактируемый компонент
  const t = (key, options) => {
    const translation = originalT(key, options);
    
    // Если режим редактирования выключен, возвращаем просто текст
    if (!isEditorMode) {
      return translation;
    }

    // В режиме редактирования возвращаем обернутый компонент
    return createElement(AutoEditableTranslation, {
      translationKey: key,
      children: translation,
    });
  };

  return { t, ...rest };
}
