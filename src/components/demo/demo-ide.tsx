"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Play, Key, MessageSquare, AlertTriangle, ChevronRight } from "lucide-react";
import { demoChains, type ChainId, type DemoChain } from "@/data/demo";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./animated-counter";
import { TypewriterCode } from "./typewriter-code";

/* ── icons per step ── */
function StepIcon({ icon }: { icon: "run" | "ok" | "key" | "msg" | "warn" }) {
  const cls = "size-3.5 shrink-0";
  if (icon === "ok")   return <Check className={cn(cls, "text-[#4ade80]")} />;
  if (icon === "key")  return <Key className={cn(cls, "text-[#facc15]")} />;
  if (icon === "msg")  return <MessageSquare className={cn(cls, "text-[#60a5fa]")} />;
  if (icon === "warn") return <AlertTriangle className={cn(cls, "text-[#f97316]")} />;
  return <Play className={cn(cls, "text-[#a78bfa]")} />;
}

/* ── chain selector tab ── */
const CHAIN_COLORS: Record<ChainId, string> = {
  ton:     "from-[#0098EA] to-[#006db3]",
  erc4337: "from-[#627EEA] to-[#4261c9]",
  mcp:     "from-[#10b981] to-[#059669]",
  nodejs:  "from-[#84cc16] to-[#4d7c0f]",
};

const CHAIN_ACCENT: Record<ChainId, string> = {
  ton:     "border-[#0098EA]/50 shadow-[0_0_20px_rgba(0,152,234,0.25)]",
  erc4337: "border-[#627EEA]/50 shadow-[0_0_20px_rgba(98,126,234,0.25)]",
  mcp:     "border-[#10b981]/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
  nodejs:  "border-[#84cc16]/50 shadow-[0_0_20px_rgba(132,204,22,0.25)]",
};

/* ── terminal panel ── */
function Terminal({ chain, running }: { chain: DemoChain; running: boolean }) {
  const [visible, setVisible] = useState<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(0);
    if (!running) return;

    let idx = 0;
    let tid: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      if (idx >= chain.terminalSteps.length) return;
      const step = chain.terminalSteps[idx];
      tid = setTimeout(() => {
        idx++;
        setVisible(idx);
        scheduleNext();
      }, step.delay + (idx === 0 ? 1200 : 0));
    }
    scheduleNext();
    return () => clearTimeout(tid);
  }, [chain, running]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visible]);

  return (
    <div className="flex flex-col h-full">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-[#0d1117]">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs text-white/40 font-mono">terminal</span>
      </div>

      {/* output */}
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-relaxed space-y-1.5 scrollbar-thin">
        {chain.terminalSteps.slice(0, visible).map((step, i) => (
          <motion.div
            key={`${chain.id}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <span className="mt-0.5"><StepIcon icon={step.icon} /></span>
            <span>
              <span className="text-white/85">{step.text}</span>
              {step.sub && (
                <span className="block text-white/35 text-[11px] mt-0.5 ml-0 font-mono">
                  {step.sub}
                </span>
              )}
            </span>
          </motion.div>
        ))}

        {/* blinking cursor */}
        {running && visible < chain.terminalSteps.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-2 h-3.5 bg-white/50 ml-1 align-middle"
          />
        )}

        {/* done */}
        {visible >= chain.terminalSteps.length && visible > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-[#4ade80] flex items-center gap-1.5"
          >
            <Check size={13} />
            <span>Session established — ready to send encrypted messages.</span>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/* ── comparison table ── */
function ComparisonPanel({ chain, show }: { chain: DemoChain; show: boolean }) {
  const latencyRow = chain.comparison.find((r) => r.metric.includes("latency"));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6 rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-white/8 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
              vs the old way
            </span>
            <span className="text-xs text-white/20">—</span>
            <span className="text-xs text-white/40">quantum threat + performance comparison</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[580px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
                    Metric
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
                    Classic approach
                  </th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                    Stvor
                  </th>
                </tr>
              </thead>
              <tbody>
                {chain.comparison.map((row, i) => {
                  const isLatency = row.metric.includes("latency");
                  return (
                    <motion.tr
                      key={row.metric}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.25 }}
                      className={i < chain.comparison.length - 1 ? "border-b border-white/5" : ""}
                    >
                      <td className="px-5 py-3 font-medium text-white/70">{row.metric}</td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            row.classicBad ? "text-[#f87171]" : "text-white/50"
                          )}
                        >
                          {row.classic}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[#4ade80] font-medium">
                        {isLatency ? (
                          <AnimatedCounter value="~14 ms" />
                        ) : (
                          row.stvor
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Shor explanation */}
          <div className="px-5 py-3 border-t border-white/8 text-[11px] text-white/25 leading-relaxed">
            Shor's algorithm runs in polynomial time on a quantum computer and breaks RSA, ECDH, and Ed25519.
            ML-KEM-768 (lattice-based) has no known quantum speedup — it remains secure even against a
            cryptographically-relevant quantum computer (CRQC).
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── main IDE component ── */
export function DemoIDE() {
  const [activeId, setActiveId] = useState<ChainId>("ton");
  const [running, setRunning] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const chain = demoChains.find((c) => c.id === activeId)!;

  const handleRun = useCallback(() => {
    setRunning(false);
    setShowComparison(false);
    // short delay so state resets cleanly before re-animating
    setTimeout(() => {
      setRunning(true);
      // show comparison after all terminal steps complete
      const totalDelay = chain.terminalSteps.reduce((acc, s) => acc + s.delay, 0) + 1200 + 800;
      setTimeout(() => setShowComparison(true), totalDelay);
    }, 80);
  }, [chain]);

  // auto-run on chain switch
  useEffect(() => {
    setRunning(false);
    setShowComparison(false);
  }, [activeId]);

  return (
    <div className="w-full">
      {/* Chain selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {demoChains.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={cn(
              "relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border",
              activeId === c.id
                ? `bg-gradient-to-r ${CHAIN_COLORS[c.id]} text-white border-transparent ${CHAIN_ACCENT[c.id]}`
                : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white/80"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* IDE window */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "rounded-xl border overflow-hidden bg-[#0d1117] transition-shadow duration-300",
            activeId ? CHAIN_ACCENT[activeId] : "border-white/10"
          )}
        >
          {/* IDE top bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/8">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-xs text-white/40 font-mono">{chain.file}</span>
            </div>
            <button
              onClick={handleRun}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all",
                `bg-gradient-to-r ${CHAIN_COLORS[activeId]} text-white hover:opacity-90 active:scale-95`
              )}
            >
              <Play size={11} />
              Run
            </button>
          </div>

          {/* Split pane */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/8">
            {/* Left: code */}
            <div className="min-h-[400px] lg:min-h-[460px] overflow-auto">
              <TypewriterCode
                code={chain.code}
                language={chain.language}
                running={running}
              />
            </div>

            {/* Right: terminal */}
            <div className="min-h-[300px] lg:min-h-[460px] bg-[#0a0e14]">
              <Terminal chain={chain} running={running} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CTA if not yet run */}
      {!running && !showComparison && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex items-center gap-2 text-sm text-white/30"
        >
          <ChevronRight size={14} />
          <span>Select a platform above and click <strong className="text-white/50">Run</strong> to see the handshake live.</span>
        </motion.div>
      )}

      {/* Comparison panel */}
      <ComparisonPanel chain={chain} show={showComparison} />
    </div>
  );
}
