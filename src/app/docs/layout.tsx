import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">{children}</div>
      <Footer />
    </>
  );
}
