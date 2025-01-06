import AdvertiseForm from "@/components/ui/advertiseForm/advertiseForm";
import AdvertiseHero from "@/components/ui/advertiseHero/advertiseHero";
import AdvertiseQuestion from "@/components/ui/advertiseQuestion/advertiseQuestion";
import AdvertiseStatus from "@/components/ui/advertiseStatus/advertiseStatus";

export const metadata = {
  title: "Advertise with Long & Short - Reach a Global Audience",
  description:
    "Promote your brand with Long & Short. Explore advertising opportunities and engage with a wide, informed audience.",
  alternates: {
    canonical: "https://www.longandshort.com/advertise",
  },
};

export default function Advertise() {
  return (
    <main>
      <AdvertiseHero />
      <AdvertiseStatus />
      <AdvertiseForm />
      <AdvertiseQuestion />
    </main>
  );
}
