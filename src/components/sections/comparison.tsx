import { Check, Minus, Info } from "lucide-react";
import { Section } from "@/components/ui/section";
import { comparisonColumns, comparisonRows } from "@/data/comparison";

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

export function Comparison() {
  return (
    <Section
      id="compare"
      eyebrow="Why Stvor"
      title="How we compare"
      description="No vendor lock-in. No 12-month rewrites. Drop into ERC-4337 or TON quickly."
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {comparisonColumns.map((col, idx) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={[
                      "px-4 md:px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em]",
                      "highlight" in col && col.highlight
                        ? "text-[var(--color-brand)]"
                        : "text-[var(--color-fg-muted)]",
                      idx === 0
                        ? "sticky left-0 bg-[var(--color-bg-subtle)] z-10"
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
                      className="sticky left-0 z-10 bg-[var(--color-bg-elevated)] px-4 md:px-5 py-4 text-left font-medium text-[var(--color-fg)] align-top"
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
                    <td className="px-4 md:px-5 py-4 align-top">
                      <CellContent value={row.diy} />
                    </td>
                    <td className="px-4 md:px-5 py-4 align-top">
                      <CellContent value={row.xmtp} />
                    </td>
                    <td className="px-4 md:px-5 py-4 align-top">
                      <CellContent value={row.msAgent} />
                    </td>
                    <td className="px-4 md:px-5 py-4 align-top bg-[var(--color-brand)]/[0.04]">
                      <CellContent value={row.stvor} highlight />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[var(--color-fg-subtle)] text-center">
        Comparison is informational and reflects publicly documented behavior at time of writing
        (May 2026). Sources available on request — email{" "}
        <a
          href="mailto:founder@stvor.xyz?subject=Comparison%20sources"
          className="hover:text-[var(--color-fg-muted)] underline underline-offset-2"
        >
          founder@stvor.xyz
        </a>
        .
      </p>
    </Section>
  );
}
