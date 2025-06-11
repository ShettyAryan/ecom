import type { Metadata } from "next";
import { Providers } from "./provider";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import PageLoader from "@/components/PageLoader";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'], // add other weights if needed
});

// app/page.tsx or any page file
export const metadata = {
  title: 'QuickCart: E-commerce website',
  description: 'A Full Stack E-commerce website wigth seller dashboard and payment integration',
  openGraph: {
    title: 'Ecom website- Quick Cart',
    description: 'A Full Stack E-commerce website wigth seller dashboard and payment integration',
    url: 'https://ecom-nine.vercel.app/',
    siteName: 'Quick Cart',
    images: [
      {
        url: 'https://res.cloudinary.com/dsvgadc5d/image/upload/v1749650113/ecom-nine.vercel.app__mzpaku.png', // <-- Preview image
        width: 1200,
        height: 630,
        alt: 'Website preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Cart E-Com Website',
    description: 'Twitter description',
    images: ['https://res.cloudinary.com/dsvgadc5d/image/upload/v1749650113/ecom-nine.vercel.app__mzpaku.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Toaster />
        <PageLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
