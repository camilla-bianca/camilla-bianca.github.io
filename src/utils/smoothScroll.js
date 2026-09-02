const SCROLL_DURATION = 1500 // ms — same duration as the Bootstrap "Agency" theme reference

// Same curve as jQuery's easeInOutExpo (jquery.easing plugin), the one used by the
// Bootstrap "Agency" theme's page-scroll behaviour: near-flat for a while, then a fast
// exponential climb through the middle, then an exponential settle at the end.
function easeInOutExpo(t) {
  if (t === 0) return 0
  if (t === 1) return 1
  return t < 0.5
    ? 0.5 * Math.pow(2, 20 * t - 10)
    : 0.5 * (2 - Math.pow(2, -20 * t + 10))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animates window.scrollTo toward targetY with easeInOutExpo easing (the Agency-theme curve).
// onDone only fires when the animation actually completes, not on a guessed timeout.
export function animatedScrollTo(targetY, duration = SCROLL_DURATION, onDone) {
  const startY = window.scrollY
  const diff = targetY - startY

  if (diff === 0 || prefersReducedMotion()) {
    window.scrollTo(0, targetY)
    onDone?.()
    return
  }

  const startTime = performance.now()

  function step(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutExpo(progress)
    window.scrollTo(0, startY + diff * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      onDone?.()
    }
  }

  requestAnimationFrame(step)
}

// Convenience helper: scrolls to a section by id, accounting for the sticky header height.
// Returns true if the target element was found and the scroll started.
export function scrollToSection(id, onDone) {
  const el = document.getElementById(id)
  if (!el) return false

  const header = document.querySelector('.header')
  const headerHeight = header ? header.offsetHeight : 0
  const targetY = el.offsetTop - headerHeight

  animatedScrollTo(targetY, undefined, onDone)
  return true
}