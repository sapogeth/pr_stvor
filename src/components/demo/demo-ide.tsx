"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Play, Key, MessageSquare, AlertTriangle, ChevronRight } from "lucide-react";
import { demoChains, type ChainId, type DemoChain } from "@/data/demo";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./animated-counter";
import { TypewriterCode } from "./typewriter-code";

/* ─── step icon ─── */
function StepIcon({ icon }: { icon: "run" | "ok" | "key" | "msg" | "warn" }) {
  const cls = "size-3.5 shrink-0";
  if (icon === "ok")   return <Check className={cn(cls, "text-[#4ade80]")} />;
  if (icon === "key")  return <Key className={cn(cls, "text-[#facc15]")} />;
  if (icon === "msg")  return <MessageSquare className={cn(cls, "text-[#60a5fa]")} />;
  if (icon === "warn") return <AlertTriangle className={cn(cls, "text-[#f97316]")} />;
  return <Play className={cn(cls, "text-[#a78bfa]")} />;
}

/* ─── chain colours ─── */
const CHAIN_GRADIENT: Record<ChainId, string> = {
  ton:     "from-[#0098EA] to-[#006db3]",
  erc4337: "from-[#627EEA] to-[#4261c9]",
  mcp:     "from-[#10b981] to-[#059669]",
  nodejs:  "from-[#84cc16] to-[#4d7c0f]",
};
const CHAIN_GLOW: Record<ChainId, string> = {
  ton:     "border-[#0098EA]/40 shadow-[0_0_32px_-4px_rgba(0,152,234,0.3)]",
  erc4337: "border-[#627EEA]/40 shadow-[0_0_32px_-4px_rgba(98,126,234,0.3)]",
  mcp:     "border-[#10b981]/40 shadow-[0_0_32px_-4px_rgba(16,185,129,0.3)]",
  nodejs:  "border-[#84cc16]/40 shadow-[0_0_32px_-4px_rgba(132,204,22,0.3)]",
};
const CHAIN_TEXT: Record<ChainId, string> = {
  ton:     "text-[#0098EA]",
  erc4337: "text-[#627EEA]",
  mcp:     "text-[#10b981]",
  nodejs:  "text-[#84cc16]",
};

/* ─── terminal ─── */
function Terminal({ chain, running }: { chain: DemoChain; running: boolean }) {
  const [visible, setVisible] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(0);
    if (!running) return;
    let idx = 0;
    let tid: ReturnType<typeof setTimeout>;
    function next() {
      if (idx >= chain.terminalSteps.length) return;
      const step = chain.terminalSteps[idx];
      tid = setTimeout(() => { idx++; setVisible(idx); next(); }, step.delay + (idx === 0 ? 1000 : 0));
    }
    next();
    return () => clearTimeout(tid);
  }, [chain, running]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible]);

  const done = visible >= chain.terminalSteps.length && visible > 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/8 bg-[#0d1117] shrink-0">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[11px] text-white/30 font-mono">terminal</span>
      </div>

      {/* output */}
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed space-y-1.5 min-h-0">
        {!running && !done && (
          <p className="text-white/20 italic text-[11px]">Waiting for run…</p>
        )}
        {chain.terminalSteps.slice(0, visible).map((step, i) => (
          <motion.div
            key={`${chain.id}-s${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-start gap-2"
          >
            <span className="mt-[1px]"><StepIcon icon={step.icon} /></span>
            <span>
              <span className="text-white/85">{step.text}</span>
              {step.sub && (
                <span className="block text-white/30 text-[10.5px] mt-0.5 font-mono">
                  {step.sub}
                </span>
              )}
            </span>
          </motion.div>
        ))}

        {running && !done && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.65 }}
            className="inline-block w-2 h-3.5 bg-white/50 ml-1 align-middle"
          />
        )}

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-[#4ade80] flex items-center gap-1.5 font-semibold"
          >
            <Check size={13} /> Session established — ready.
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/* ─── comparison ─── */
function ComparisonPanel({
  chain,
  show,
  panelRef,
}: {
  chain: DemoChain;
  show: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-white/8 flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
              vs the old way
            </span>
            <span className="text-white/15 text-[11px]">—</span>
            <span className="text-[11px] text-white/30">
              quantum threat + performance breakdown
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px] min-w-[560px]">
              <thead>
                <tr className="border-b border-white/8">
                  {["Metric", "Classic approach", "Stvor"].map((h, i) => (
                    <th
                      key={h}
                      className={cn(
                        "px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.12em]",
                        i === 2 ? CHAIN_TEXT[chain.id] : "text-white/25"
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chain.comparison.map((row, i) => (
                  <motion.tr
                    key={row.metric}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.22 }}
                    className={i < chain.comparison.length - 1 ? "border-b border-white/5" : ""}
                  >
                    <td className="px-5 py-3 font-medium text-white/65 leading-snug">
                      {row.metric}
                    </td>
                    <td className={cn("px-5 py-3 leading-snug", row.classicBad ? "text-[#f87171]" : "text-white/40")}>
                      {row.classic}
                    </td>
                    <td className="px-5 py-3 text-[#4ade80] font-medium leading-snug">
                      {row.metric.includes("latency") ? (
                        <AnimatedCounter value="~14 ms" />
                      ) : (
                        row.stvor
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-white/8 text-[10.5px] text-white/22 leading-relaxed">
            Shor's algorithm runs in polynomial time on a quantum computer and breaks RSA, ECDH, and
            Ed25519. ML-KEM-768 (lattice-based) has no known quantum speedup — secure even against a
            cryptographically-relevant quantum computer (CRQC).
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── main ─── */
export function DemoIDE() {
  const [activeId, setActiveId] = useState<ChainId>("ton");
  const [running, setRunning] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const chain = demoChains.find((c) => c.id === activeId)!;

  const handleRun = useCallback(() => {
    setRunning(false);
    setShowComparison(false);
    setTimeout(() => {
      setRunning(true);
      const totalDelay =
        chain.terminalSteps.reduce((acc, s) => acc + s.delay, 0) + 1000 + 600;
      setTimeout(() => {
        setShowComparison(true);
        // smooth scroll to comparison after it mounts
        setTimeout(() => {
          comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }, totalDelay);
    }, 80);
  }, [chain]);

  // reset on chain switch
  useEffect(() => {
    setRunning(false);
    setShowComparison(false);
  }, [activeId]);

  return (
    <div className="w-full space-y-4">
      {/* ── chain selector ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-wrap gap-2"
      >
        {demoChains.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
            onClick={() => setActiveId(c.id)}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border",
              activeId === c.id
                ? `bg-gradient-to-r ${CHAIN_GRADIENT[c.id]} text-white border-transparent ${CHAIN_GLOW[c.id]}`
                : "bg-white/5 text-white/45 border-white/10 hover:bg-white/10 hover:text-white/80"
            )}
          >
            {c.label}
          </motion.button>
        ))}
      </motion.div>

      {/* ── IDE window ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.995 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "rounded-xl border overflow-hidden bg-[#0d1117]",
            CHAIN_GLOW[activeId]
          )}
        >
          {/* title bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[11px] text-white/35 font-mono">{chain.file}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleRun}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity hover:opacity-90",
                `bg-gradient-to-r ${CHAIN_GRADIENT[activeId]} text-white`
              )}
            >
              <Play size={11} fill="currentColor" />
              Run
            </motion.button>
          </div>

          {/* split pane */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/8">
            {/* code */}
            <div className="h-[380px] lg:h-[440px] overflow-hidden">
              <TypewriterCode
                code={chain.code}
                language={chain.language}
                running={running}
              />
            </div>

            {/* terminal */}
            <div className="h-[280px] lg:h-[440px] bg-[#0a0e14]">
              <Terminal chain={chain} running={running} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* hint */}
      {!running && !showComparison && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-1.5 text-xs text-white/25"
        >
          <ChevronRight size={13} />
          Select a platform and click <strong className="text-white/40">Run</strong> to watch the handshake.
        </motion.p>
      )}

      {/* comparison — auto-scrolled to */}
      <ComparisonPanel chain={chain} show={showComparison} panelRef={comparisonRef} />
    </div>
  );
}
