// Генерация уникального ID сессии
function getSessionId() {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
}

// Отправка данных о посещении
export async function trackPageView(pagePath) {
  try {
    const data = {
      pagePath: pagePath || window.location.pathname,
      referrer: document.referrer || null,
      language: navigator.language || null,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      sessionId: getSessionId()
    };

    // В продакшене используем относительный путь, в dev - localhost
    const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:4000');
    
    console.log('📊 Tracking page view:', data.pagePath, '→', apiUrl || 'same origin');
    
    const response = await fetch(`${apiUrl}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Analytics tracking failed:', response.status, response.statusText);
    } else {
      console.log('✅ Analytics tracked successfully');
    }
  } catch (error) {
    console.log('❌ Analytics tracking error:', error);
  }
}

// Автоматический трекинг при изменении маршрута
export function initAnalytics() {
  // Трекаем первую загрузку страницы
  trackPageView();

  // Слушаем изменения истории для SPA
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function(...args) {
    originalPushState.apply(this, args);
    trackPageView();
  };

  window.history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    trackPageView();
  };

  // Слушаем popstate (кнопки назад/вперед)
  window.addEventListener('popstate', () => {
    trackPageView();
  });
}
