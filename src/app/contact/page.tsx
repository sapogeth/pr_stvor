import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Message ${siteConfig.contact.handle} on Telegram — demos, pilots, integration questions.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  redirect(siteConfig.contact.telegram);
}
