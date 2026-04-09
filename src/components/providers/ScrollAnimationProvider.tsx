"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply the UI slide down animation and reveal
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("animate-ui-fade-in", "translate-y-0");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Apply observer to all `<section>` elements globally after DOM updates
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll("section");
      elements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          // Pre-hide before they scroll into view
          el.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-1000", "ease-out");
          observer.observe(el);
        }
      });
    }, 100); // small delay to ensure Next.js has mounted the new DOM

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
