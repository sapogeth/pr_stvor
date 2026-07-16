import demoFixture from "../../public/fixtures/demo-deny-receipt.json";

export type DemoTrustReceipt = (typeof demoFixture)["receipt"];

export const DEMO_DENY_FIXTURE = demoFixture;
export const DEMO_DENY_RECEIPT = demoFixture.receipt;
export const DEMO_COMMITTED_TO = demoFixture.committed.to;

/** Shorten long hex strings for display; full value stays in title/copy. */
export function shortenHex(value: string, head = 10, tail = 4): string {
  if (value.length <= head + tail + 3) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}
