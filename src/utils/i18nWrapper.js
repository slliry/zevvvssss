import { createElement } from 'react';
import AutoEditableTranslation from '../components/AutoEditableTranslation';

// Обертка для useTranslation которая автоматически делает все переводы редактируемыми
export function useEditableTranslation(originalHook) {
  const result = originalHook();
  const originalT = result.t;

  // Перехватываем функцию t() и оборачиваем результат
  const wrappedT = (key, options) => {
    const translation = originalT(key, options);
    
    // Возвращаем объект с методом для рендера
    return {
      toString: () => translation,
      valueOf: () => translation,
      // Для JSX рендера
      [Symbol.toPrimitive]: () => translation,
      // Специальный метод для обертки
      __editable: true,
      __key: key,
      __value: translation,
    };
  };

  return {
    ...result,
    t: wrappedT,
  };
}

// HOC для автоматической обертки компонентов
export function withEditableTranslations(Component) {
  return function WrappedComponent(props) {
    return createElement(Component, props);
  };
}
