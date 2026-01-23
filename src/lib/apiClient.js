const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:4000' : '');

async function apiRequest(path, { method = 'GET', body, token, signal, query } = {}) {
  // Если API_BASE_URL пустой (production на том же домене), используем window.location.origin
  const baseUrl = API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const url = new URL(`${baseUrl}${path}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      url.searchParams.set(key, value);
    });
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || data?.error || 'Ошибка запроса';
    throw new Error(message);
  }

  return data;
}

export { apiRequest, API_BASE_URL };
