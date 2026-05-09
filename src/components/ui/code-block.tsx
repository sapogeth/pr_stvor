import { highlightCode } from "@/lib/shiki";
import type { BundledLanguage } from "shiki";

type Props = {
  code: string;
  language?: BundledLanguage;
  className?: string;
  filename?: string;
};

export async function CodeBlock({ code, language = "ts", className, filename }: Props) {
  const html = await highlightCode(code, language);
  return (
    <div
      className={`relative rounded-lg border border-[var(--color-border)] bg-[#0d0d12] overflow-hidden ${className ?? ""}`}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <span className="text-xs font-mono text-[var(--color-fg-subtle)]">{filename}</span>
        </div>
      )}
      <div
        className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
