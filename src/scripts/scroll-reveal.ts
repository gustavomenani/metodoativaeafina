/**
 * Scroll Reveal via Intersection Observer (vanilla, zero libs).
 * Adiciona .is-visible em elementos com .reveal ao entrar no viewport.
 */
export function initScrollReveal(): void {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const elements = document.querySelectorAll<HTMLElement>(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  elements.forEach((el) => observer.observe(el));
}

// Auto-init no client
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal);
  } else {
    initScrollReveal();
  }
}
