import ContactForm from "@/components/ui/contactForm/contactForm";
import Faq from "@/components/ui/faq/faq";
import Subscribe from "@/components/ui/subscribe/subscribe";
import libre from "@/components/libre-font";
import ContactHeader from "@/components/ui/contactHeader/contactHeader";

export const metadata = {
  title: "Contact Long & Short - Get in Touch with Us",
  description:
    "Have questions or feedback? Contact Long & Short for inquiries, support, and partnership opportunities.",
  alternates: {
    canonical: "https://www.longandshort.com/contact",
  },
};

export default function Contact() {
  return (
    <main>
      {/* <header className="px-4 lg:px-16 py-20 max-w-7xl mx-auto">
        <h1 className={`text-4xl text-nl_background ${libre.className}`}>
          Contact us
        </h1>
      </header> */}
      <ContactHeader />
      <ContactForm />
      <Faq />
      <Subscribe />
    </main>
  );
}
