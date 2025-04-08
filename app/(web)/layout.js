import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar/navbar";
import Footer from "@/components/ui/footer/footer";
import AppProvider from "@/context/appContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "AltDaily News",
//   description: "Alternative insights, fresh off the press",
// };

const thumbnail = "/og.png";
const baseUrl = process.env.url;
export async function generateMetadata() {
  const title = "Long & Short - Markets in minutes";

  const description =
    "Stay informed with Long & Short. Unbiased, fact-checked finance news, 5-minute read.";

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
          alt: "Long & Short",
        },
      ],
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Long & Short",
  alternateName: "longandshort",
  url: "https://www.longandshort.com/",
  logo: "https://www.longandshort.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "(307) 429-0673",
    contactType: "customer service",
    contactOption: "TollFree",
    areaServed: "US",
    availableLanguage: "en",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61563115340167",
    "https://www.instagram.com/readlongandshort/",
    "https://x.com/longandshortsum",
  ],
};

const nameJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Long and Short",
  url: "https://www.longandshort.com/",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en" className={inter.className}>
      <head>
        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <Script
          id="schema-name"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(nameJsonLd),
          }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        {/* Microsoft Clarity Script */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qd9yosh9k3");`}
        </Script>
        <Script id="gm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MS32H9TZ');`}
        </Script>
        <Script
          id="gtm-noscript"
          dangerouslySetInnerHTML={{
            __html: `
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MS32H9TZ"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      </noscript>
    `,
          }}
        />
        <meta name="application-name" content="Long and Short" />
        <meta property="og:site_name" content="Long and Short" />
        <meta name="apple-mobile-web-app-title" content="Long and Short" />
      </head>

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
