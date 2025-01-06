import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/hero/Hero";
import Latest from "@/components/ui/latest/latest";
import ArchiveHome from "@/components/ui/archiveHome/archiveHome";
import Subscribe from "@/components/ui/subscribe/subscribe";

export const metadata = {
  title: "Long & Short - News, Analysis & Insights",
  description: "Stay updated with in-depth news, expert analysis, and insightful stories on global events, politics, business, and more.",
  alternates: {
    canonical: "https://www.longandshort.com/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Latest />
      <ArchiveHome />
      <Subscribe />
    </main>
  );
}
