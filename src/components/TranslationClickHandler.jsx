import { useEffect } from 'react';
import { useTranslationEditor } from '../context/TranslationEditorContext';

// Глобальный обработчик кликов для всех переводов
export default function TranslationClickHandler() {
  const { isEditorMode, setSelectedElement } = useTranslationEditor();

  useEffect(() => {
    if (!isEditorMode) return;

    const handleClick = (e) => {
      // Ищем ближайший элемент с data-translation-key
      let target = e.target;
      let attempts = 0;
      
      while (target && attempts < 5) {
        const key = target.getAttribute('data-translation-key');
        if (key) {
          e.preventDefault();
          e.stopPropagation();
          
          setSelectedElement({
            key: key,
            text: target.textContent,
          });
          return;
        }
        target = target.parentElement;
        attempts++;
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isEditorMode, setSelectedElement]);

  // Добавляем стили для подсветки
  useEffect(() => {
    if (!isEditorMode) return;

    const style = document.createElement('style');
    style.id = 'translation-editor-styles';
    style.textContent = `
      [data-translation-key] {
        cursor: pointer !important;
        position: relative;
        transition: all 0.2s ease;
      }
      [data-translation-key]:hover {
        background-color: rgba(254, 240, 138, 0.5) !important;
        outline: 2px solid rgb(250, 204, 21) !important;
        outline-offset: 2px;
        border-radius: 4px;
      }
      [data-translation-key]:hover::after {
        content: '✏️ ' attr(data-translation-key);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10000;
        margin-bottom: 4px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('translation-editor-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isEditorMode]);

  return null;
}
