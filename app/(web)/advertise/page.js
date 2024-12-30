import AdvertiseForm from "@/components/ui/advertiseForm/advertiseForm";
import AdvertiseHero from "@/components/ui/advertiseHero/advertiseHero";
import AdvertiseQuestion from "@/components/ui/advertiseQuestion/advertiseQuestion";
import AdvertiseStatus from "@/components/ui/advertiseStatus/advertiseStatus";


export const metadata = {
  title: "Advertise with AltDaily - Reach Investment Experts",
  description:
    "Promote your brand to alternative investment professionals through AltDaily’s newsletters. Connect with an engaged audience effectively.",
  alternates: {
    canonical: "https://www.altdaily.co/advertise",
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
