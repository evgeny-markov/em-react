export function scrollToTop() {
  const root = document.documentElement
  const previous = root.style.scrollBehavior

  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.scrollTop = 0
  document.body.scrollTop = 0
  root.style.scrollBehavior = previous
}
