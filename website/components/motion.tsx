"use client";
import { usePathname } from "../i18n/navigation";
import { useEffect } from "react";

/** Elements revealed on scroll. They are present in the server HTML, so the CSS hides them only when scripting is enabled. */
export const revealSelector =
  "[data-reveal], .doc-article > section, .release-contract, .release-validation";

/**
 * Scroll reveals for every page. Elements entering together are staggered.
 * New nodes (client navigation, docs topic changes) are picked up by a
 * MutationObserver. Reduced motion is handled entirely in CSS.
 */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const intersection = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.style.setProperty("--reveal-order", String(order++));
          element.classList.add("is-visible");
          intersection.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () => {
      for (const element of document.querySelectorAll(revealSelector)) {
        if (seen.has(element)) continue;
        seen.add(element);
        intersection.observe(element);
      }
    };
    scan();
    let frame = 0;
    const mutation = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mutation.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutation.disconnect();
      intersection.disconnect();
    };
  }, [pathname]);
  return null;
}
