import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DOCS_SIDEBAR } from "@/data/docs-nav";

export function DocsPageShell({
  section,
  children,
}: {
  section: keyof typeof DOCS_SIDEBAR;
  children: ReactNode;
}) {
  const groups = DOCS_SIDEBAR[section] ?? DOCS_SIDEBAR[""];
  return (
    <div className="container-page pt-24 pb-20">
      <div className="flex gap-10 lg:gap-14">
        <DocsSidebar groups={groups} />
        <main className="flex-1 min-w-0 max-w-3xl pb-16">{children}</main>
      </div>
    </div>
  );
}
