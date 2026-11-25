const envApiUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const isLocalHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(envApiUrl);

// Never point a deployed site to localhost even if VITE_API_URL was baked from a local .env
export const API_URL =
  envApiUrl && (!pointsToLocalhost || isLocalHost)
    ? envApiUrl
    : import.meta.env.DEV || isLocalHost
      ? 'http://localhost:5000'
      : '';
