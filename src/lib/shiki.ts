import { codeToHtml, type BundledLanguage } from "shiki";

let cached: Map<string, string> | null = null;

export async function highlightCode(
  code: string,
  language: BundledLanguage = "ts"
): Promise<string> {
  cached ??= new Map();
  const key = `${language}::${code}`;
  const hit = cached.get(key);
  if (hit) return hit;

  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
  });
  cached.set(key, html);
  return html;
}
