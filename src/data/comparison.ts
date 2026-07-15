export type ComparisonRow = {
  feature: string;
  fireblocks: string;
  blockaid: string;
  safe: string;
  monitoring: string;
  stvor: string;
  note?: string;
};

export const comparisonColumns = [
  { key: "feature",     label: "Capability" },
  { key: "fireblocks",  label: "Fireblocks / Custody" },
  { key: "blockaid",    label: "Blockaid / Simulation" },
  { key: "safe",        label: "Safe / Multisig" },
  { key: "monitoring",  label: "Hypernative / Monitor" },
  { key: "stvor",       label: "Stvor", highlight: true },
] as const;

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Timing",
    fireblocks:  "Post-approval",
    blockaid:    "Pre-sign simulation",
    safe:        "Pre-sign (human review)",
    monitoring:  "Post-execution",
    stvor:       "Pre-execution",
    note: "Stvor verifies before a signed payload is submitted — after signing but before broadcast. Blockaid simulates before signing. Monitoring tools catch issues after funds move.",
  },
  {
    feature: "Works with AI agents",
    fireblocks:  "No — human custody model",
    blockaid:    "Partial — tx simulation only",
    safe:        "No — human signer required",
    monitoring:  "Partially",
    stvor:       "Yes — built for agents",
    note: "Stvor's commitment anchoring model is designed for autonomous execution where no human is in the approval loop.",
  },
  {
    feature: "Custody requirement",
    fireblocks:  "Requires Fireblocks custody",
    blockaid:    "None",
    safe:        "Requires Safe wallet",
    monitoring:  "None",
    stvor:       "None — custody-agnostic",
    note: "Stvor sits between intent and execution. It does not hold funds, manage keys, or require you to use a specific custody provider.",
  },
  {
    feature: "Cryptographic proof",
    fireblocks:  "Policy log (internal)",
    blockaid:    "Simulation report",
    safe:        "Multisig signatures",
    monitoring:  "Alert log",
    stvor:       "Signed Trust Receipt (ES256 P-256)",
    note: "Stvor issues a cryptographically signed receipt for every verified execution. The receipt is verifiable offline using the published public key — no Stvor API call required.",
  },
  {
    feature: "Self-hostable",
    fireblocks:  "No",
    blockaid:    "Partial",
    safe:        "Yes",
    monitoring:  "Partial",
    stvor:       "Yes (MIT reference)",
  },
  {
    feature: "Open standard receipt format",
    fireblocks:  "No",
    blockaid:    "No",
    safe:        "No",
    monitoring:  "No",
    stvor:       "Yes",
    note: "Stvor's Trust Receipt is a portable, open-format JSON document signed with ES256 (P-256). Any auditor, regulator, or counterparty can verify it offline without a vendor relationship.",
  },
  {
    feature: "Blocks payload manipulation",
    fireblocks:  "Policy only",
    blockaid:    "Simulates — does not block",
    safe:        "Signers must notice",
    monitoring:  "Alerts after",
    stvor:       "Yes — commitment mismatch halts execution",
    note: "If the destination, amount, or method selector changes between commitment and execution, Stvor throws a VerificationError before the transaction is broadcast.",
  },
  {
    feature: "SDK integration time",
    fireblocks:  "Weeks (custody migration)",
    blockaid:    "Hours",
    safe:        "Days (wallet migration)",
    monitoring:  "Hours",
    stvor:       "< 30 minutes",
    note: "Stvor is a verification middleware layer. It does not require migrating custody, changing wallets, or restructuring your existing transaction flow.",
  },
  {
    feature: "Compliance audit trail",
    fireblocks:  "Yes (internal)",
    blockaid:    "Partial",
    safe:        "Signature chain",
    monitoring:  "Alert log",
    stvor:       "Yes — exportable, verifiable",
    note: "Every Trust Receipt contains the commitment hash, verified fields, agent identity, and a timestamp — ready for MiCA, GENIUS Act, or SOC 2 audit requirements.",
  },
];
