import type { ReactNode } from "react";

export function DocsBadge({
  children,
  color = "green",
}: {
  children: ReactNode;
  color?: "green" | "indigo" | "amber" | "muted";
}) {
  const styles: Record<string, string> = {
    green: "bg-[rgba(16,185,129,0.08)] text-[rgba(16,185,129,0.9)] border-[rgba(16,185,129,0.2)]",
    indigo: "bg-[rgba(99,102,241,0.08)] text-[rgba(99,102,241,0.9)] border-[rgba(99,102,241,0.2)]",
    amber: "bg-[rgba(245,158,11,0.08)] text-[rgba(245,158,11,0.85)] border-[rgba(245,158,11,0.2)]",
    muted: "bg-[var(--color-bg-elevated)] text-[var(--color-fg-subtle)] border-[var(--color-border)]",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border tracking-wide ${styles[color]}`}
    >
      {children}
    </span>
  );
}

export function DocsNote({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "warn" | "tip";
}) {
  const styles: Record<string, { border: string; bg: string; label: string; labelColor: string }> = {
    info: {
      border: "rgba(99,102,241,0.25)",
      bg: "rgba(99,102,241,0.05)",
      label: "Note",
      labelColor: "rgba(99,102,241,0.9)",
    },
    warn: {
      border: "rgba(245,158,11,0.25)",
      bg: "rgba(245,158,11,0.04)",
      label: "Warning",
      labelColor: "rgba(245,158,11,0.85)",
    },
    tip: {
      border: "rgba(16,185,129,0.25)",
      bg: "rgba(16,185,129,0.04)",
      label: "Tip",
      labelColor: "rgba(16,185,129,0.9)",
    },
  };
  const s = styles[type];
  return (
    <div
      className="my-6 px-5 py-4 rounded-xl border text-sm text-[var(--color-fg-muted)] leading-relaxed"
      style={{ borderColor: s.border, background: s.bg }}
    >
      <span
        className="font-semibold text-[12px] tracking-wide font-mono"
        style={{ color: s.labelColor }}
      >
        {s.label}
      </span>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function DocsH2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-semibold text-[var(--color-fg)] mt-16 mb-4 scroll-mt-28 group first:mt-0"
    >
      <a href={`#${id}`} className="hover:text-[var(--color-accent)] transition-colors">
        {children}
      </a>
    </h2>
  );
}

export function DocsH3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="text-base font-semibold text-[var(--color-fg)] mt-10 mb-3 scroll-mt-28">
      {children}
    </h3>
  );
}

export function DocsP({ children }: { children: ReactNode }) {
  return <p className="text-[14px] text-[var(--color-fg-muted)] leading-[1.8] mb-4">{children}</p>;
}

export function DocsInlineCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[12.5px] px-1.5 py-0.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-fg)]">
      {children}
    </code>
  );
}

export function DocsCode({
  children,
  language = "typescript",
  filename,
}: {
  children: string;
  language?: string;
  filename?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[#0e0e14] overflow-hidden my-6">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
        <span className="w-2 h-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="ml-auto text-[10px] text-[var(--color-fg-subtle)] font-mono tracking-wide">
          {filename ?? language}
        </span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code className="text-[13px] leading-[1.75] font-mono text-[var(--color-fg-muted)] whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  );
}

export function DocsStep({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-5 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] my-4">
      <span className="text-[11px] font-mono font-bold shrink-0 mt-0.5 text-[var(--color-accent)]">
        {n}
      </span>
      <div>
        <p className="text-[13px] font-semibold text-[var(--color-fg)] mb-1.5">{title}</p>
        <div className="text-[13px] text-[var(--color-fg-muted)] leading-[1.7]">{children}</div>
      </div>
    </div>
  );
}

export function AttackDefense({
  attack,
  defense,
}: {
  attack: { title: string; steps: string[]; outcome: string };
  defense: { title: string; steps: string[]; outcome: string };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      <div className="rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.03)] p-5">
        <p className="text-[10px] tracking-[0.14em] uppercase font-mono text-[rgba(239,68,68,0.75)] mb-3">
          Attack
        </p>
        <p className="text-[14px] font-semibold text-[var(--color-fg)] mb-3">{attack.title}</p>
        <ol className="space-y-2 mb-4">
          {attack.steps.map((step, i) => (
            <li key={step} className="text-[12.5px] text-[var(--color-fg-muted)] flex gap-2">
              <span className="text-[var(--color-fg-subtle)] font-mono">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="text-[12px] font-mono text-[rgba(239,68,68,0.8)]">{attack.outcome}</p>
      </div>
      <div className="rounded-xl border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.03)] p-5">
        <p className="text-[10px] tracking-[0.14em] uppercase font-mono text-[var(--color-accent)] mb-3">
          Stvor
        </p>
        <p className="text-[14px] font-semibold text-[var(--color-fg)] mb-3">{defense.title}</p>
        <ol className="space-y-2 mb-4">
          {defense.steps.map((step, i) => (
            <li key={step} className="text-[12.5px] text-[var(--color-fg-muted)] flex gap-2">
              <span className="text-[var(--color-fg-subtle)] font-mono">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="text-[12px] font-mono text-[var(--color-accent)]">{defense.outcome}</p>
      </div>
    </div>
  );
}

export function DocsCardLink({
  href,
  title,
  description,
  external,
}: {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}) {
  const Tag = external ? "a" : "a";
  return (
    <Tag
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 hover:border-[var(--color-border-strong)] transition-colors group"
    >
      <p className="text-[14px] font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
        {title} {external ? "↗" : "→"}
      </p>
      <p className="mt-2 text-[13px] text-[var(--color-fg-muted)] leading-relaxed">{description}</p>
    </Tag>
  );
}
