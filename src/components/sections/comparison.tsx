import { Check, Minus, Info } from "lucide-react";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";
import { comparisonColumns, comparisonRows, type ComparisonRow } from "@/data/comparison";

function CellContent({ value, highlight }: { value: string; highlight?: boolean }) {
  if (value === "No") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[var(--color-fg-subtle)]">
        <Minus size={14} aria-hidden="true" />
        <span>No</span>
      </span>
    );
  }
  if (value === "Yes") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] font-medium">
        <Check size={14} aria-hidden="true" />
        <span>Yes</span>
      </span>
    );
  }
  return (
    <span
      className={
        highlight
          ? "text-[var(--color-fg)] font-medium"
          : "text-[var(--color-fg-muted)]"
      }
    >
      {value}
    </span>
  );
}

const DATA_KEYS: Array<keyof Omit<ComparisonRow, "feature" | "note">> = [
  "fireblocks",
  "blockaid",
  "safe",
  "monitoring",
  "stvor",
];

export function Comparison() {
  return (
    <Section
      id="compare"
      eyebrow="Why Stvor"
      title="Different category, not just a better tool"
      description="Custody providers, simulation layers, and monitoring tools all solve pieces of the problem — after the fact. Stvor is pre-execution verification: the commitment is anchored before the transaction is built."
    >
      {/* Mobile scroll hint */}
      <p className="flex items-center gap-1.5 text-[11px] text-[var(--color-fg-subtle)] mb-3 sm:hidden">
        <span>Scroll right for full table</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </p>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {comparisonColumns.map((col, idx) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={[
                      "px-4 md:px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em]",
                      "highlight" in col && col.highlight
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-fg-muted)]",
                      idx === 0
                        ? "sticky left-0 bg-[var(--color-bg-subtle)] z-10"
                        : "",
                      col.key === "stvor"
                        ? "bg-[var(--color-accent)]/[0.06]"
                        : "",
                    ].join(" ")}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => {
                const lastRow = idx === comparisonRows.length - 1;
                return (
                  <tr
                    key={row.feature}
                    className={lastRow ? "" : "border-b border-[var(--color-border)]"}
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-[var(--color-bg-elevated)] px-4 md:px-5 py-4 text-left font-medium text-[var(--color-fg)] align-top min-w-[160px]"
                    >
                      <span className="inline-flex items-start gap-1.5">
                        <span>{row.feature}</span>
                        {row.note && (
                          <span
                            className="group relative inline-flex shrink-0 mt-0.5"
                            tabIndex={0}
                          >
                            <Info
                              size={13}
                              className="text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors cursor-help"
                              aria-label={`More info: ${row.note}`}
                            />
                            <span
                              role="tooltip"
                              className="pointer-events-none absolute left-0 top-full mt-1 z-30 hidden group-hover:block group-focus-within:block w-72 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-xs font-normal leading-relaxed text-[var(--color-fg-muted)] shadow-lg"
                            >
                              {row.note}
                            </span>
                          </span>
                        )}
                      </span>
                    </th>
                    {DATA_KEYS.map((key) => (
                      <td
                        key={key}
                        className={[
                          "px-4 md:px-5 py-4 align-top text-sm",
                          key === "stvor" ? "bg-[var(--color-accent)]/[0.04]" : "",
                        ].join(" ")}
                      >
                        <CellContent value={row[key]} highlight={key === "stvor"} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--color-fg-subtle)] text-center">
        Comparison reflects publicly documented behavior at time of writing (July 2026).
        Sources and corrections welcome —{" "}
        <a
          href={siteConfig.cta.contact}
          className="hover:text-[var(--color-fg-muted)] underline underline-offset-2"
        >
          {siteConfig.contact.handle}
        </a>
        .
      </p>
    </Section>
  );
}
