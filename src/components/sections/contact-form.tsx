"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const useCases = [
  "AA Wallet",
  "AI Agent Platform",
  "AI Dev Tools",
  "Compliance / Regulated AI",
  "Other",
];

const roles = ["CTO", "Founder", "Engineer", "Compliance", "Other"];

export function ContactForm() {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessKey) return;
    setStatus("submitting");
    setError(null);

    const form = new FormData(e.currentTarget);
    form.append("access_key", accessKey);
    form.append("subject", "New Stvor inquiry from /contact");
    form.append("from_name", "Stvor Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (!accessKey) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 text-center">
        <p className="text-sm text-[var(--color-fg-muted)] mb-5">
          The contact form is being configured. In the meantime, please reach out directly:
        </p>
        <ButtonLink href={siteConfig.cta.contact} variant="primary" size="lg">
          Message {siteConfig.contact.handle}
        </ButtonLink>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-8 text-center">
        <CheckCircle2
          size={32}
          className="mx-auto mb-3 text-[var(--color-accent)]"
        />
        <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-2">
          Message sent
        </h3>
        <p className="text-sm text-[var(--color-fg-muted)]">
          We'll get back to you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-7 space-y-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" name="company" />
        <SelectField label="Role" name="role" options={roles} />
      </div>
      <SelectField
        label="Use case"
        name="use_case"
        options={useCases}
      />
      <TextAreaField
        label="What are you building?"
        name="message"
        rows={4}
        required
      />

      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--color-fg-subtle)]">
          We'll never share your details. Replies from {siteConfig.emails.founder}.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg h-11 px-5 text-sm font-medium transition-colors",
            "bg-[var(--color-brand)] text-[var(--color-brand-fg)] hover:bg-[var(--color-brand-hover)] disabled:opacity-60"
          )}
        >
          {status === "submitting" ? "Sending…" : (
            <>
              Send message <Send size={14} />
            </>
          )}
        </button>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 p-3 text-sm text-[var(--color-danger)]">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error ?? "Something went wrong. Please try again or email us directly."}</span>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-fg-muted)]">
        {label}
        {required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-10 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-fg-muted)]">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="h-10 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-colors"
      >
        <option value="" disabled>
          Choose…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  rows,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-fg-muted)]">
        {label}
        {required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-colors resize-y"
      />
    </label>
  );
}
