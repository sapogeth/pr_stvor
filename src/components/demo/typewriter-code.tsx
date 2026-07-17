"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

/* Simple syntax highlighter — no shiki dependency in client component.
   Covers TypeScript / Solidity well enough for the demo use-case. */
function tokenize(line: string): { text: string; cls: string }[] {
  const tokens: { text: string; cls: string }[] = [];

  const patterns: { re: RegExp; cls: string }[] = [
    { re: /^(\/\/.*)/, cls: "text-[#6e7681]" },                          // comment
    { re: /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, cls: "text-[#a5d6ff]" }, // string
    { re: /^(import|export|from|const|let|async|await|new|return|if|for|of|true|false|null|undefined|type|interface)\b/, cls: "text-[#ff7b72]" }, // keyword
    { re: /^(function|class|extends|implements|constructor|void|string|number|boolean|Promise)\b/, cls: "text-[#ff7b72]" }, // type keyword
    { re: /^(Stvor|StvorMCPTransport|TonWallet|ERC4337Provider|McpServer|Session)\b/, cls: "text-[#d2a8ff]" }, // class names
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/, cls: "text-[#d2a8ff]" }, // function call
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*:)/, cls: "text-[#79c0ff]" }, // object key
    { re: /^(0x[0-9a-fA-F]+|\d+)/, cls: "text-[#f8c555]" },              // number/hex
    { re: /^([{}()[\];,.<>])/, cls: "text-[#c9d1d9]" },                  // punctuation
    { re: /^([a-zA-Z_$][a-zA-Z0-9_$]*)/, cls: "text-[#c9d1d9]" },       // identifier
    { re: /^(\s+)/, cls: "" },                                             // whitespace
    { re: /^(.)/, cls: "text-[#c9d1d9]" },                               // fallback
  ];

  let rest = line;
  while (rest.length) {
    let matched = false;
    for (const { re, cls } of patterns) {
      const m = rest.match(re);
      if (m) {
        tokens.push({ text: m[0], cls });
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: rest[0], cls: "text-[#c9d1d9]" });
      rest = rest.slice(1);
    }
  }
  return tokens;
}

type Props = {
  code: string;
  language: string;
  running: boolean;
};

const CHARS_PER_FRAME = 3; // characters revealed per animation frame
const FRAME_MS = 16;       // ~60fps

export function TypewriterCode({ code, running }: Props) {
  const [revealed, setRevealed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const lines = code.split("\n");

  useEffect(() => {
    setRevealed(0);
    if (!running) return;

    // small initial delay so terminal starts just after code begins
    const initTimer = setTimeout(() => {
      startRef.current = null;

      function frame(ts: number) {
        if (startRef.current === null) startRef.current = ts;
        const elapsed = ts - startRef.current;
        const target = Math.min(
          Math.floor(elapsed / FRAME_MS) * CHARS_PER_FRAME,
          code.length
        );
        setRevealed(target);
        if (target < code.length) {
          rafRef.current = requestAnimationFrame(frame);
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }, 200);

    return () => {
      clearTimeout(initTimer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [code, running]);

  // Build visible text
  const visibleText = code.slice(0, revealed);
  const visibleLines = visibleText.split("\n");

  return (
    <div className="relative h-full">
      {/* line numbers + code */}
      <div className="overflow-auto h-full px-0 py-3 font-mono text-[12.5px] leading-[1.65]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, lineIdx) => {
              const isVisible = lineIdx < visibleLines.length;
              const visLine =
                lineIdx < visibleLines.length - 1
                  ? line // full line
                  : visibleLines[visibleLines.length - 1]; // partial last line

              const tokens = isVisible ? tokenize(visLine) : [];

              return (
                <tr key={lineIdx} className="group">
                  <td className="select-none text-right pr-4 pl-4 text-white/20 text-[11px] w-10 align-top pt-0">
                    {lineIdx + 1}
                  </td>
                  <td className="pr-6 whitespace-pre align-top">
                    {isVisible ? (
                      <>
                        {tokens.map((tok, ti) => (
                          <span key={ti} className={cn(tok.cls)}>
                            {tok.text}
                          </span>
                        ))}
                        {/* blinking cursor on active line */}
                        {lineIdx === visibleLines.length - 1 &&
                          revealed < code.length && (
                            <span className="inline-block w-[7px] h-[13px] bg-white/70 align-middle animate-pulse ml-px" />
                          )}
                      </>
                    ) : (
                      <span className="text-transparent select-none">{line || " "}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
