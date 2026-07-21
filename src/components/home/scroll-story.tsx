"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// ── Step definitions ─────────────────────────────────────────────────────────

const STEPS = [
  {
    n: 1,
    label: "01 — Intent",
    title: "An AI agent initiates a $50,000 vendor payment.",
    sub: "The agent has instructions, a destination address, and authorization. It is ready to execute. No human is in the loop.",
    code: [
      "agent.execute({",
      '  action:   "payment.execute",',
      '  to:       "0x7a3f91cd...4e",',
      "  amount:   50_000,",
      '  currency: "USDC"',
      "})",
    ],
    active: "agent" as const,
    showLine1: true,
    showLine2: false,
    showLine3: false,
    showAttack: false,
    showDenied: false,
    showReceipt: false,
  },
  {
    n: 2,
    label: "02 — Commitment",
    title: "STVOR anchors the intent before execution begins.",
    sub: "The exact destination, amount, and agent identity are hashed and signed. Any modification will break this hash. Nothing can change silently now.",
    code: [
      "commitment: {",
      '  hash:        "sha256:a3f7c291...",',
      '  destination: "0x7a3f91cd...4e",',
      "  amount:      50_000,",
      '  signed:      "es256:7Kx2mN..."',
      "}",
    ],
    active: "commitment" as const,
    showLine1: true,
    showLine2: true,
    showLine3: false,
    showAttack: false,
    showDenied: false,
    showReceipt: false,
  },
  {
    n: 3,
    label: "03 — Attack",
    title: "The destination is silently rewritten in transit.",
    sub: "Address poisoning. Prompt injection. Man-in-the-middle. The amount is identical. The timestamp is correct. The agent sees nothing wrong. The money was going to the wrong wallet.",
    code: [
      "// What was committed:",
      '  to: "0x7a3f91cd...4e"',
      "",
      "// What arrived at execution: ←",
      '  to: "0x4c1b82f7...3a7"',
      "",
      "  // Different wallet. Different owner.",
    ],
    active: "stvor" as const,
    showLine1: true,
    showLine2: true,
    showLine3: false,
    showAttack: true,
    showDenied: false,
    showReceipt: false,
  },
  {
    n: 4,
    label: "04 — Intercept",
    title: "STVOR compares commitment against what arrived.",
    sub: "The hash does not match. The destination field was modified. STVOR halts execution at the moment of the check — before a single dollar moves.",
    code: [
      "verify:",
      '  committed:  "0x7a3f91cd...4e"',
      '  received:   "0x4c1b82f7...3a7"',
      "",
      "  ✗ MISMATCH",
      "    field: destination",
      "    execution: HALTED",
    ],
    active: "stvor" as const,
    showLine1: true,
    showLine2: true,
    showLine3: false,
    showAttack: true,
    showDenied: false,
    showReceipt: false,
  },
  {
    n: 5,
    label: "05 — Blocked",
    title: "The payment is blocked. $50,000 stays where it belongs.",
    sub: "The attacker's wallet receives nothing. The original funds are untouched. The incident is recorded with a timestamp, the mismatched fields, and the commitment hash.",
    code: [
      'status:     "BLOCKED"',
      'reason:     "DESTINATION_MISMATCH"',
      'commitment: "sha256:a3f7c291..."',
      'detected:   "2026-07-02T14:23:09Z"',
    ],
    active: "denied" as const,
    showLine1: true,
    showLine2: true,
    showLine3: false,
    showAttack: false,
    showDenied: true,
    showReceipt: false,
  },
  {
    n: 6,
    label: "06 — Trust Receipt",
    title: "A cryptographically signed receipt is issued. Permanent proof.",
    sub: "Immutable record of the blocked execution. Verifiable at stvor.xyz/verifier. Present it to compliance teams, auditors, or counterparties.",
    code: [
      "{",
      '  decision:    "DENY",',
      '  reason:      "PAYLOAD_MISMATCH",',
      '  signature:   "rQ3nsY5ghE3QT7acZGfWTmZJkoKkNgnE30CH-d2Ie22dAmBGW_mf49e7o1NOsn0EayW63fzbe_ZJhvdsfzXiuA",',
      '  receiptId:   "rec_41gdRVEv7_Yo",',
      '  binding:     "agent-committed"',
      "}",
    ],
    active: "receipt" as const,
    showLine1: true,
    showLine2: true,
    showLine3: true,
    showAttack: false,
    showDenied: false,
    showReceipt: true,
  },
] as const;

// Pre-computed particle positions for the DENIED burst
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  const dist = 28 + (i % 3) * 22;
  return {
    id: i,
    dx: Math.cos(angle) * dist,
    dy: Math.sin(angle) * dist,
    delay: (i % 4) * 0.04,
  };
});

// ── Sub-components ────────────────────────────────────────────────────────────

type ActiveNode = "agent" | "commitment" | "stvor" | "denied" | "receipt";

function FlowDiagram({
  step,
}: {
  step: (typeof STEPS)[number];
}) {
  const active = step.active;
  const isStvor = active === "stvor";
  const isDenied = active === "denied";
  const isReceipt = active === "receipt";

  // Shared node style helper
  function nodeStyle(which: ActiveNode) {
    const isActive = active === which;
    if (which === "stvor" && (isStvor || isDenied)) {
      return {
        fill: isDenied ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.07)",
        stroke: isDenied ? "rgba(239,68,68,0.45)" : "rgba(16,185,129,0.45)",
        textFill: isDenied ? "rgba(239,68,68,0.9)" : "rgba(16,185,129,0.9)",
      };
    }
    if (which === "receipt" && isReceipt) {
      return {
        fill: "rgba(16,185,129,0.06)",
        stroke: "rgba(16,185,129,0.4)",
        textFill: "rgba(16,185,129,0.9)",
      };
    }
    return {
      fill: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
      stroke: isActive ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)",
      textFill: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.28)",
    };
  }

  const agentStyle = nodeStyle("agent");
  const commitStyle = nodeStyle("commitment");
  const stvorStyle = nodeStyle("stvor");
  const receiptStyle = nodeStyle("receipt");

  return (
    <svg
      viewBox="0 0 260 530"
      width="260"
      height="530"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* ── Arrow defs ── */}
      <defs>
        <marker id="arrow-red" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 Z" fill="rgba(239,68,68,0.7)" />
        </marker>
      </defs>

      {/* ── Connectors (opacity-driven, no duplicate) ── */}
      {/* Agent → Commitment */}
      <path
        d="M 130 68 L 130 148"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        style={{ opacity: step.showLine1 ? 1 : 0, transition: "opacity 0.4s" }}
      />
      {/* Commitment → Stvor */}
      <path
        d="M 130 198 L 130 268"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        style={{ opacity: step.showLine2 ? 1 : 0, transition: "opacity 0.4s" }}
      />
      {/* Stvor → Receipt (green, only on step 6) */}
      <path
        d="M 130 320 L 130 438"
        stroke="rgba(16,185,129,0.22)"
        strokeWidth="1"
        style={{ opacity: step.showLine3 ? 1 : 0, transition: "opacity 0.5s" }}
      />

      {/* ── Attack arrow: slides in from right ── */}
      <motion.path
        d="M 255 293 L 207 293"
        stroke="rgba(239,68,68,0.65)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#arrow-red)"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: step.showAttack ? 1 : 0,
          pathLength: step.showAttack ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.text
        x="258" y="284"
        fontSize="9"
        fill="rgba(239,68,68,0.65)"
        textAnchor="start"
        fontFamily="var(--font-mono)"
        letterSpacing="0.04em"
        initial={{ opacity: 0 }}
        animate={{ opacity: step.showAttack ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        TAMPERED
      </motion.text>

      {/* ── Node: AI Agent ── */}
      <motion.g animate={{ opacity: 1 }} initial={{ opacity: 0.4 }}>
        <rect
          x="70" y="28" width="120" height="40" rx="6"
          fill={agentStyle.fill}
          stroke={agentStyle.stroke}
          strokeWidth="1"
          style={{ transition: "fill 0.3s, stroke 0.3s" }}
        />
        <text
          x="130" y="44" textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)"
          fill={agentStyle.textFill}
          style={{ transition: "fill 0.3s" }}
        >
          AI Agent
        </text>
        <text
          x="130" y="59" textAnchor="middle"
          fontSize="9" fontFamily="var(--font-mono)"
          fill="rgba(255,255,255,0.2)"
        >
          finance_agent_v1
        </text>
      </motion.g>

      {/* ── Node: Commitment ── */}
      <rect
        x="70" y="148" width="120" height="40" rx="6"
        fill={commitStyle.fill}
        stroke={commitStyle.stroke}
        strokeWidth="1"
        style={{ opacity: step.showLine1 ? 1 : 0.3, transition: "all 0.3s" }}
      />
      <text
        x="130" y="164" textAnchor="middle"
        fontSize="11" fontFamily="var(--font-mono)"
        fill={commitStyle.textFill}
        style={{ opacity: step.showLine1 ? 1 : 0.3, transition: "all 0.3s" }}
      >
        Commitment
      </text>
      <text
        x="130" y="179" textAnchor="middle"
        fontSize="9" fontFamily="var(--font-mono)"
        fill="rgba(255,255,255,0.2)"
        style={{ opacity: step.showLine1 ? 1 : 0 }}
      >
        sha256:a3f7c291...
      </text>

      {/* ── Node: Stvor ── */}
      <rect
        x="55" y="268" width="150" height="50" rx="6"
        fill={stvorStyle.fill}
        stroke={stvorStyle.stroke}
        strokeWidth="1.5"
        style={{ transition: "all 0.35s" }}
      />
      <text
        x="130" y="287" textAnchor="middle"
        fontSize="12" fontWeight="600" fontFamily="var(--font-mono)"
        fill={stvorStyle.textFill}
        style={{ transition: "fill 0.35s" }}
      >
        Stvor
      </text>
      <text
        x="130" y="304" textAnchor="middle"
        fontSize="9" fontFamily="var(--font-mono)"
        fill={isStvor || isDenied ? stvorStyle.textFill : "rgba(255,255,255,0.2)"}
        style={{ transition: "fill 0.35s", opacity: step.showLine2 ? 1 : 0 }}
      >
        {isDenied ? "✗ BLOCKED" : "Verification Layer"}
      </text>

      {/* ── DENIED particles — burst from Stvor center ── */}
      {isDenied &&
        PARTICLES.map((p) => (
          <motion.circle
            key={p.id}
            r={2}
            fill="rgba(239,68,68,0.75)"
            initial={{ cx: 130, cy: 293, opacity: 1, r: 2 }}
            animate={{ cx: 130 + p.dx, cy: 293 + p.dy, opacity: 0, r: 0 }}
            transition={{
              duration: 0.65,
              delay: p.delay,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}

      {/* ── Node: Trust Receipt ── */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: step.showReceipt ? 1 : 0.15,
          y: step.showReceipt ? 0 : 10,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.32, 1] }}
      >
        <rect
          x="55" y="438" width="150" height="50" rx="6"
          fill={receiptStyle.fill}
          stroke={receiptStyle.stroke}
          strokeWidth="1.5"
          style={{ transition: "all 0.3s" }}
        />
        <text
          x="130" y="459" textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)"
          fill={receiptStyle.textFill}
          style={{ transition: "fill 0.3s" }}
        >
          Trust Receipt
        </text>
        <text
          x="130" y="476" textAnchor="middle"
          fontSize="9" fontFamily="var(--font-mono)"
          fill={step.showReceipt ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.15)"}
          style={{ transition: "fill 0.3s" }}
        >
          rec_41gdRVEv7_Yo
        </text>
      </motion.g>
    </svg>
  );
}

// Shared easing tuple (framer-motion needs typed tuple, not number[])
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.32, 1];

// ── Main component ────────────────────────────────────────────────────────────

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!entered && v > 0) setEntered(true);
    const idx = Math.min(
      STEPS.length - 1,
      Math.floor(v * STEPS.length)
    );
    setCurrentIdx(idx);
  });

  const step = STEPS[currentIdx];

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Progress bar */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-border)]">
          <motion.div
            className="w-full bg-[var(--color-accent)]"
            style={{ height: `${((currentIdx + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />
        </div>

        <div className="container-page w-full">
          <div className="flex items-center gap-16 lg:gap-24 min-h-[540px]">

            {/* ── Left: text ── */}
            <div className="flex-1 min-w-0">
              {/*
                mode="wait" — exit fully completes BEFORE enter begins.
                This eliminates the double-animation overlap that looked choppy.
              */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.38,
                    ease: EASE_OUT,
                  }}
                >
                  {/* Step label */}
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent)] mb-5 font-medium">
                    {step.label}
                  </p>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.25] text-[var(--color-fg)] mb-3">
                    {step.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed mb-8 max-w-sm">
                    {step.sub}
                  </p>

                  {/* Code panel */}
                  <div className="story-code-block">
                    <div className="story-code-dots">
                      <span /><span /><span />
                    </div>
                    <pre className="story-code-pre">
                      {step.code.map((line, i) => (
                        <CodeLine key={i} line={line} stepIdx={currentIdx} lineIdx={i} />
                      ))}
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right: flow diagram — fades in with the section ── */}
            <motion.div
              className="hidden md:flex flex-shrink-0 items-center justify-center"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: entered ? 1 : 0, x: entered ? 0 : 16 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            >
              <FlowDiagram step={step} />
            </motion.div>
          </div>
        </div>

        {/* Step counter dots */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="h-[2px] rounded-full"
              animate={{
                width: i === currentIdx ? 24 : 8,
                background:
                  i <= currentIdx
                    ? "var(--color-accent)"
                    : "var(--color-border-strong)",
              }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeLine({
  line,
  stepIdx,
  lineIdx,
}: {
  line: string;
  stepIdx: number;
  lineIdx: number;
}) {
  // Highlight specific lines
  const isWarning =
    line.includes("MISMATCH") ||
    line.includes("BLOCKED") ||
    line.includes("✗") ||
    line.includes("// Received") ||
    line.includes("different") ||
    line.includes("halted");

  const isSuccess =
    line.includes("✓") ||
    line.includes("receipt_sig") ||
    (line.startsWith("  status") && line.includes("BLOCKED") === false);

  return (
    <span
      className="block"
      style={{
        color: isWarning
          ? "rgba(239,68,68,0.85)"
          : isSuccess
          ? "rgba(16,185,129,0.85)"
          : line === ""
          ? "transparent"
          : "rgba(255,255,255,0.65)",
      }}
    >
      {line || " "}
    </span>
  );
}
