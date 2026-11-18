"use client";

import { useEffect, useState } from "react";

/** Devuelve el ancla (#id) de la sección visible actualmente. */
export function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState(hrefs[0] ?? "");
  const key = hrefs.join("|");

  useEffect(() => {
    const ids = key.split("|").map((h) => h.replace("#", ""));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) if (el.offsetTop <= y) current = el.id;
      setActive(`#${current}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);

  return active;
}
