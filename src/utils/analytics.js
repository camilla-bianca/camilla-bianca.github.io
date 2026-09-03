// Safe wrapper if Umami script is not loaded (local dev)
export function trackEvent(name, data) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(name, data)
  }
}