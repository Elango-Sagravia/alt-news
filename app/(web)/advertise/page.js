import AdvertiseForm from "@/components/ui/advertiseForm/advertiseForm";
import AdvertiseHero from "@/components/ui/advertiseHero/advertiseHero";
import AdvertiseQuestion from "@/components/ui/advertiseQuestion/advertiseQuestion";
import AdvertiseStatus from "@/components/ui/advertiseStatus/advertiseStatus";

const title = "Advertise on Long & Short Newsletter";
const description =
  "Promote your brand in Long & Short newsletter. Reach a global, informed audience through targeted and effective newsletter advertising.";
export const metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.longandshort.com/advertise",
  },
  openGraph: {
    title,
    description,
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
