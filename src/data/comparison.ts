export type ComparisonRow = {
  feature: string;
  diy: string;
  xmtp: string;
  msAgent: string;
  stvor: string;
  note?: string;
};

export const comparisonColumns = [
  { key: "feature", label: "Feature" },
  { key: "diy", label: "Build in-house" },
  { key: "xmtp", label: "XMTP" },
  { key: "msAgent", label: "MS Agent Mesh" },
  { key: "stvor", label: "Stvor", highlight: true },
] as const;

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Post-quantum cryptography",
    diy: "DIY",
    xmtp: "Hybrid PQ via MLS XWING",
    msAgent: "Classical (Ed25519)",
    stvor: "Hybrid PQ extended through ratchet",
    note: "All hybrid approaches combine ML-KEM with classical curves for defense-in-depth. Implementations differ in how PQ properties are extended through the session.",
  },
  {
    feature: "AA UserOperation binding",
    diy: "No",
    xmtp: "No",
    msAgent: "No",
    stvor: "ERC-4337 + TON Wallet v5",
    note: "Cryptographically binds an E2EE session to the wallet that signed the UserOperation, blocking session hijacking by mathematical impossibility.",
  },
  {
    feature: "Agent delegation with on-chain scope",
    diy: "DIY",
    xmtp: "No",
    msAgent: "App-level only",
    stvor: "Cryptographic + on-chain enforceable",
    note: "Delegated capabilities are signed and revocable on-chain — enforcement does not depend on a single application or vendor's policy engine.",
  },
  {
    feature: "Vendor neutral",
    diy: "Yes (you build)",
    xmtp: "SDK open, network shared",
    msAgent: "No (Azure-tied)",
    stvor: "Self-hostable end-to-end",
    note: "XMTP's SDK is open source, but production messaging traffic flows through the shared XMTP Network. Stvor's relays and registry can run entirely inside your own infrastructure.",
  },
  {
    feature: "On-chain identity registry",
    diy: "DIY",
    xmtp: "Off-chain (XMTP Network)",
    msAgent: "Off-chain (Azure)",
    stvor: "On-chain (FunC + Solidity)",
  },
  {
    feature: "Quickstart to working demo",
    diy: "Weeks of crypto research",
    xmtp: "Hours",
    msAgent: "Hours (within Azure)",
    stvor: "Minutes",
    note: "Time to a hello-world integration. Production hardening and audit-grade deployment are a separate, longer track for any vendor on this list — including us.",
  },
  {
    feature: "Self-hosted option",
    diy: "Yes",
    xmtp: "No",
    msAgent: "No",
    stvor: "Yes",
  },
  {
    feature: "NIST FIPS 203/204 algorithms",
    diy: "DIY",
    xmtp: "Partial (XWING hybrid)",
    msAgent: "No",
    stvor: "Yes (vendored from upstream)",
    note: "We use ML-KEM-768 (FIPS 203) and ML-DSA-65 (FIPS 204) implementations vendored from audited upstream libraries (liboqs / pq-crystals). Independent CMVP/CAVP validation is on the security roadmap, not yet completed.",
  },
];
