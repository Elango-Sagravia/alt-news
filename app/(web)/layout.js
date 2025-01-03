import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar/navbar";
import Footer from "@/components/ui/footer/footer";
import AppProvider from "@/context/appContext";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "AltDaily News",
//   description: "Alternative insights, fresh off the press",
// };

const thumbnail = "/og.png";
const baseUrl = process.env.url;
export async function generateMetadata() {
  const title = "Long and Short";

  const description = "Markets in minutes";

  return {
    metadataBase: new URL(process.env.url),
    title,
    description,
    themeColor: "#6b705c",
    openGraph: {
      title,
      description,
      url: baseUrl,
      images: [
        {
          url: thumbnail,
          secureUrl: thumbnail,
          alt: "AltDaily",
        },
      ],
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Presidential Summary",
  alternateName: "presidentialsummary",
  url: "https://www.presidentialsummary.com/",
  logo: "https://www.presidentialsummary.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "(307) 429-0673",
    contactType: "customer service",
    contactOption: "TollFree",
    areaServed: "US",
    availableLanguage: "en",
  },
  sameAs: [
    "https://www.facebook.com/people/Presidential-Summary/61562652791256/",
    "https://www.instagram.com/presidentialsummary/",
    "https://www.linkedin.com/showcase/presidentialsummary/",
  ],
};
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en" className={inter.className}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      />

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </AppProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-B6YDWDXPKZ" />
    </html>
  );
}
