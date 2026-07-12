"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { DocsNavGroup } from "@/data/docs-nav";
import { cn } from "@/lib/utils";

export function DocsSidebar({ groups }: { groups: DocsNavGroup[] }) {
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const anchors = groups
      .flatMap((g) => g.items)
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    if (anchors.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
    );

    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groups]);

  const nav = (
    <nav className="space-y-6">
      {groups.map((group) => (
        <div key={group.group}>
          <p className="text-[10px] tracking-[0.16em] uppercase font-semibold text-[var(--color-fg-subtle)] mb-2.5 font-mono">
            {group.group}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const isHash = item.href.startsWith("#");
              const isExternal = item.external;
              const isActive = isHash && activeId === item.href.slice(1);
              const className = cn(
                "block text-[13px] py-1.5 px-2 -mx-2 rounded-md transition-colors",
                isActive
                  ? "text-[var(--color-fg)] bg-[var(--color-bg-elevated)]"
                  : "text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)]"
              );

              if (isExternal) {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              }

              if (isHash) {
                return (
                  <li key={item.href}>
                    <a href={item.href} className={className} onClick={() => setOpen(false)}>
                      {item.label}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link href={item.href} className={className} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]/95 backdrop-blur text-sm text-[var(--color-fg)] shadow-lg"
        onClick={() => setOpen((v) => !v)}
        aria-label="Table of contents"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
        Contents
      </button>

      {open && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "w-56 xl:w-64 shrink-0",
          "lg:block",
          open
            ? "fixed z-40 top-20 left-4 right-4 max-w-xs max-h-[70vh] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 shadow-xl lg:static lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
            : "hidden"
        )}
      >
        <div className="lg:sticky lg:top-28">{nav}</div>
      </aside>
    </>
  );
}
