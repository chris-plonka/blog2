import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/shared/provider";
import Footer from "@/components/shared/footer";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/constants";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/favicon/site.webmanifest",
  twitter: {
    title: SITE_NAME,
    card: "summary_large_image",
    site: "@AkshayMoolya",
    creator: "@AkshayMoolya",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png",
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION,
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  keywords: ["blog", "one-blog", "full-stack blog", "nextjs blog"],
  themeColor: "#000000",
  creator: "Akshay Moolya",
  openGraph: {
    url: SITE_URL,
    type: "website",
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en-US",
    images: [
      {
        url: "/favicon/android-chrome-512x512.png",
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION,
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-4 pb-16 pt-20 lg:pt-24">
            {children}
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
