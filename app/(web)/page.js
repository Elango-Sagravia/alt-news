import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "@/components/ui/hero/Hero";
import Latest from "@/components/ui/latest/latest";
import ArchiveHome from "@/components/ui/archiveHome/archiveHome";
import Subscribe from "@/components/ui/subscribe/subscribe";

export const metadata = {
  title: "Long and Short",
  description:
    "Markets in minutes",
  alternates: {
    canonical: "https://www.altdaily.co/",
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
