// Safe wrapper if Umami script is not loaded (local dev)
function trackEvent(name, data) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(name, data)
  }
}